'use client'

import {getCookie, baseUrl, setCookie, removeCookie} from "@/lib/utils";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import React from "react";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import Cookies from 'js-cookie'
import {
    User,
    LoginCredentials,
    SignupCredentials,
    ResetPasswordConfirmCredentials,
    UpdateUserPayload,
    DjoserDetailResponse,
    DjoserErrorResponse,
    JWTTokens,
    ApiResponse
} from "@/lib/types";

// --- AuthContextType and AuthProviderProps (remain unchanged) ---
interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<ApiResponse<JWTTokens>>;
    logout: () => void;
    loading?: boolean;
    error?: string | null;
    redirectToLogin: (url: string) => void;
    signup: (credentials: SignupCredentials) => Promise<ApiResponse<User>>;
    activateUser: (uid: string, token: string) => Promise<ApiResponse<undefined>>;
    resetPwd: (email: string) => Promise<ApiResponse<DjoserDetailResponse>>;
    resetPwdConfirm: (data: ResetPasswordConfirmCredentials) => Promise<ApiResponse<DjoserDetailResponse>>;
    updateUser: (data: UpdateUserPayload) => Promise<ApiResponse<User>>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const csrfToken = Cookies.get('csrftoken');
    
    // axios instances should be created once outside of renders or memoized
    const api = React.useMemo(() => axios.create({
        baseURL: baseUrl,
        withCredentials: true
    }), []); // Dependencies for memoization: [] as they are constants
    
    const auth = React.useMemo(() => axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken || ''
        }
    }), [csrfToken]); // Dependency on csrfToken
    
    const getAccessToken = () => getCookie('accessToken');
    const getRefreshToken = () => getCookie('refreshToken');
    
    // --- Memoize all functions that are used as dependencies in useEffect ---
    const redirectToLogin = React.useCallback((url: string) => router.push(`/account/login?from=${url}`), [router]);
    const removeTokens = React.useCallback(() => {
        removeCookie('accessToken');
        removeCookie('refreshToken');
    }, []);
    
    const setTokens = React.useCallback((accessToken: string, refreshToken: string) => {
        const ninetyDays = 90;
        const oneHour = 1 / 24;
        setCookie('accessToken', accessToken, {expires: oneHour});
        setCookie('refreshToken', refreshToken, {expires: ninetyDays});
    }, []);
    
    const refreshAccessToken = React.useCallback(async (): Promise<ApiResponse<JWTTokens>> => {
        try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                return {success: false, message: 'No refresh Token available'};
            }
            const res = await auth.post<JWTTokens>('jwt/refresh/', {refresh: refreshToken});
            const {access} = res.data;
            setCookie('accessToken', access); // Set the new access token
            return {success: true, data: res.data};
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorDetail = (error.response?.data as DjoserErrorResponse)?.detail || 'Error refreshing access token.';
                console.error("Error refreshing token:", errorDetail);
                return {success: false, error: errorDetail};
            }
            console.error("Unknown error refreshing token:", error);
            return {success: false, error: 'An unknown error occurred during token refresh!'};
        }
    }, [auth]); // Dependency on 'auth' instance
    
    const verifyAccessToken = React.useCallback(async (accessToken: string | null = null): Promise<{
        valid: boolean;
        reason?: string
    }> => {
        if (!accessToken) {
            return {valid: false, reason: 'No token provided for verification'};
        }
        try {
            const res = await auth.post<{ code?: string }>('jwt/verify/', {token: accessToken});
            return {valid: res.status === 200};
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400 && (error.response.data as {
                    code?: string
                })?.code === 'token_not_valid') {
                    return {valid: false, reason: 'Token is invalid or expired.'};
                }
                console.error("Error verifying access token:", error.response?.data || error.message);
            } else {
                console.error("Unknown error verifying access token:", error);
            }
            return {valid: false, reason: 'Network or server error during token verification.'};
        }
    }, [auth]);
    
    const whoami = React.useCallback(async (): Promise<ApiResponse<User>> => {
        const MAX_RETRIES = 2;
        let attempt = 0;
        while (attempt < MAX_RETRIES) {
            try {
                const res = await api.get<User>('users/me/');
                return {success: true, data: res.data};
            } catch (error: unknown) {
                attempt++;
                if (axios.isAxiosError(error)) {
                    console.error(`Attempt ${attempt} failed to fetch user data:`, error.response?.data || error.message);
                    if (attempt >= MAX_RETRIES) {
                        const errorDetail = (error.response?.data as DjoserErrorResponse)?.detail || 'Failed to fetch user data.';
                        return {success: false, error: errorDetail};
                    }
                } else if (error instanceof Error) {
                    console.error(`Attempt ${attempt} failed to fetch user data (non-Axios):`, error.message);
                    if (attempt >= MAX_RETRIES) {
                        return {success: false, error: error.message || 'An unexpected error occurred!'};
                    }
                } else {
                    console.error(`Attempt ${attempt} failed to fetch user data (unknown error):`, error);
                    if (attempt >= MAX_RETRIES) {
                        return {success: false, error: 'An unknown error occurred while fetching user data.'};
                    }
                }
            }
        }
        return {success: false, error: 'Failed to fetch user after multiple retries due to an unhandled error.'};
    }, [api]);
    
    // Interceptor setup:
    // Use an effect to set up interceptors to ensure they use the most current
    // `redirectToLogin`, `refreshAccessToken`, `getAccessToken`, `csrfToken` values.
    // Ensure interceptors are cleaned up to prevent memory leaks or duplicate handlers.
    React.useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            async config => {
                const accessToken = getAccessToken();
                if (!accessToken) {
                    redirectToLogin(pathname);
                    return Promise.reject(new Error("No access token available, redirecting to login."));
                } else {
                    config.headers.Authorization = `JWT ${accessToken}`;
                    if (csrfToken) { // Only add if csrfToken exists
                        config.headers['X-CSRFToken'] = csrfToken;
                    }
                }
                return config;
            },
            error => Promise.reject(error)
        );
        
        const responseInterceptor = api.interceptors.response.use(
            response => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
                
                if (!originalRequest || !originalRequest.headers) {
                    return Promise.reject(error);
                }
                
                // Handle token expiration specifically
                // Check for 401 status and ensure it's not a retried request to avoid infinite loops
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    
                    try {
                        // Wait for the refresh token attempt to finish
                        const refreshResult = await refreshAccessToken();
                        
                        if (refreshResult.success) {
                            // If successful, retry the failed request with new token
                            const newAccess = getAccessToken();
                            if (newAccess) {
                                originalRequest.headers.Authorization = `JWT ${newAccess}`;
                            }
                            if (csrfToken) {
                                originalRequest.headers['X-CSRFToken'] = csrfToken;
                            }
                            return api(originalRequest);
                        } else {
                            // Wait briefly before redirecting, ensures refresh fully finished
                            await new Promise(res => setTimeout(res, 500));
                            redirectToLogin(pathname);
                            return Promise.reject(refreshResult.error);
                        }
                    } catch (refreshError: unknown) {
                        console.error("Error during refresh token retry:", refreshError);
                        await new Promise(res => setTimeout(res, 500)); // Give refresh flow time
                        redirectToLogin(pathname);
                        return Promise.reject(refreshError);
                    }
                }
                
                
                return Promise.reject(error);
            }
        );
        
        // Cleanup interceptors on unmount
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [api, redirectToLogin, pathname, refreshAccessToken, csrfToken]); // Dependencies for interceptors
    
    
    // Login function - use the memoized 'auth' instance
    const login = React.useCallback(async (credentials: LoginCredentials): Promise<ApiResponse<JWTTokens>> => {
        const MAX_RETRIES = 2;
        let attempt = 0;
        let errorMessage: string | undefined;
        
        while (attempt < MAX_RETRIES) {
            try {
                const res = await auth.post<JWTTokens>('jwt/create/', credentials);
                const {access, refresh} = res.data;
                setTokens(access, refresh); // Use memoized setTokens
                
                const response = await whoami(); // Use memoized whoami
                if (response.success && response.data) {
                    setUser(response.data);
                    const prevPage = searchParams.get('from') || '/account/profile';
                    router.push(prevPage);
                    return {success: true, data: res.data};
                } else {
                    errorMessage = response.error || 'An error occurred while fetching user data after login.';
                    return {success: false, error: errorMessage};
                }
            } catch (error: unknown) {
                attempt++;
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        const errorResponse = error.response.data as DjoserErrorResponse;
                        errorMessage = errorResponse.detail || errorResponse.email?.[0] || 'Unauthorized, please check your credentials';
                    } else if (error.message) {
                        errorMessage = error.message;
                    } else {
                        errorMessage = 'An unknown error occurred during login.';
                    }
                } else if (error instanceof Error) {
                    errorMessage = error.message || 'An unexpected error occurred during login.';
                } else {
                    errorMessage = 'An unknown error occurred during login.';
                }
                
                if (attempt >= MAX_RETRIES) {
                    return {success: false, error: errorMessage};
                }
            }
        }
        return {
            success: false,
            error: errorMessage || 'Login failed after multiple retries due to an unhandled error.'
        };
    }, [auth, setTokens, whoami, router, searchParams]); // Dependencies for login
    
    // Logout
    const logout = React.useCallback(() => {
        if (pathname !== '/') {
            router.push('/');
        }
        removeTokens();
        setUser(null);
    }, [pathname, router, removeTokens]);
    
    // Signup, ActivateUser, ResetPwd, ResetPwdConfirm, UpdateUser
    // These functions should also be wrapped in useCallback and have correct dependencies
    // I'll provide one example, apply similar logic to others.
    
    const signup = React.useCallback(async (credentials: SignupCredentials): Promise<ApiResponse<User>> => {
        try {
            const res = await auth.post<User>('users/', credentials);
            return {
                success: true,
                message: `${res.data.name}'s account has been successfully created. Kindly check your email to activate it. Thank you for choosing Sonador Motors Co.,Ltd`
            };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error during signup:", error.response?.data || error.message);
                const errorResponse = error.response?.data as DjoserErrorResponse;
                let errorMessage = 'An error occurred during signup.';
                if (errorResponse) {
                    if (errorResponse.email) errorMessage = `Email: ${errorResponse.email.join(' ')}`;
                    else if (errorResponse.name) errorMessage = `Name: ${errorResponse.name.join(' ')}`;
                    else if (errorResponse.password) errorMessage = `Password: ${errorResponse.password.join(' ')}`;
                    else if (errorResponse.detail) errorMessage = errorResponse.detail;
                    else errorMessage = Object.values(errorResponse).flat().filter(Boolean).join(' ') || errorMessage;
                }
                return {success: false, error: errorMessage};
            } else if (error instanceof Error) {
                console.error("Error during signup (non-Axios):", error.message);
                return {success: false, error: error.message || 'An unexpected error occurred!'};
            }
            return {success: false, error: 'An unknown error occurred during signup.'};
        }
    }, [auth]);
    
    const activateUser = React.useCallback(async (uid: string, token: string): Promise<ApiResponse<undefined>> => {
        try {
            const res = await auth.post<DjoserDetailResponse>('users/activation/', {uid, token});
            return {
                success: res.status === 204,
                message: 'User account activated successfully. You can now log in.',
            };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorResponse = error.response?.data as DjoserErrorResponse;
                const errorMessage = (errorResponse?.detail || errorResponse?.uid?.[0] || errorResponse?.token?.[0] || 'There was an error activating the account!');
                return {success: false, error: errorMessage};
            } else if (error instanceof Error) {
                return {success: false, error: error.message || 'An unexpected error occurred!'};
            }
            return {success: false, error: 'An unknown error occurred during account activation.'};
        }
    }, [auth]);
    
    const resetPwdConfirm = React.useCallback(async (data: ResetPasswordConfirmCredentials): Promise<ApiResponse<DjoserDetailResponse>> => {
        try {
            const res = await auth.post<DjoserDetailResponse>('users/reset_password_confirm/', data);
            return {success: true, message: res.data.detail};
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorResponse: DjoserErrorResponse = error.response?.data as DjoserErrorResponse;
                if (errorResponse) {
                    if (errorResponse?.token && Array.isArray(errorResponse.token)) {
                        return {
                            success: false,
                            error: errorResponse.token.join(' ') || 'Invalid or expired token. Please request for a new password reset link'
                        };
                    } else if (errorResponse?.uid && Array.isArray(errorResponse.uid)) {
                        return {
                            success: false,
                            error: errorResponse.uid.join(' ') || 'User ID does not exist, Please check your email.'
                        };
                    }
                    const errorDetail = errorResponse?.detail || Object.values(errorResponse).flat().filter(Boolean).join(' ');
                    return {
                        success: false,
                        error: errorDetail || 'An error occurred during password reset confirmation.'
                    };
                }
            } else if (error instanceof Error) {
                return {success: false, error: error.message || 'An unexpected error occurred!'};
            }
            return {success: false, error: 'An error occurred during password reset confirmation.'};
        }
    }, [auth]);
    
    const resetPwd = React.useCallback(async (email: string): Promise<ApiResponse<DjoserDetailResponse>> => {
        try {
            const res = await auth.post<DjoserDetailResponse>('users/reset_password/', {"email": email});
            return {success: true, message: res.data.detail};
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorResponse: DjoserErrorResponse = error.response?.data as DjoserErrorResponse;
                if (errorResponse) {
                    if (errorResponse?.email && Array.isArray(errorResponse.email)) {
                        return {
                            success: false,
                            error: errorResponse.email.join(' ') || 'User does not exist. Please check your email address.'
                        };
                    }
                    const errorDetail = errorResponse?.detail || Object.values(errorResponse).flat().filter(Boolean).join(' ');
                    return {success: false, error: errorDetail || 'An error occurred during password reset.'};
                }
            } else if (error instanceof Error) {
                return {success: false, error: error.message || 'An unexpected error occurred!'};
            }
            return {success: false, error: 'An error occurred during password reset.'};
        }
    }, [auth]);
    
    const updateUser = React.useCallback(async (data: UpdateUserPayload): Promise<ApiResponse<User>> => {
        try {
            const res = await api.patch<User>('users/me/', data);
            setUser(res.data);
            return {success: true, data: res.data, message: 'Profile data updated successfully!'};
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorDetail = (error.response?.data as DjoserErrorResponse)?.detail || 'An error occurred while updating user data.';
                return {success: false, error: errorDetail};
            } else if (error instanceof Error) {
                return {success: false, error: error.message || 'An unexpected error occurred!'};
            }
            return {success: false, error: 'An unknown error occurred while updating user data.'};
        }
    }, [api]);
    
    
    // --- The Main Initialization Effect ---
    React.useEffect(() => {
        let isMounted = true; // Flag to prevent state updates on unmounted component
        
        const initializeAuth = async () => {
            setLoading(true); // Start loading
            
            // Check if user is already set or if a successful token validation has occurred in session storage
            // This prevents redundant re-initialization on subsequent renders if `user` is already valid
            // or if we've already done the check and confirmed a valid token.
            const tokenValidatedInSession = sessionStorage.getItem('tokenValidated');
            
            // Only proceed with full validation if:
            // 1. `tokenValidatedInSession` is not 'true' (meaning we haven't confirmed validity yet this session)
            // OR
            // 2. `user` is null (meaning we need to try and establish a user, even if session storage thought it was valid,
            //    e.g., after a hard refresh or if session storage was tampered with).
            // This ensures we try to fetch user on first load or if previous attempts failed.
            if (tokenValidatedInSession !== 'true' || user === null) {
                const accessToken = getAccessToken();
                
                if (!accessToken) {
                    // No token at all, definitely not logged in.
                    if (isMounted) {
                        setUser(null);
                        sessionStorage.setItem('tokenValidated', 'false');
                        removeTokens(); // Ensure no stale tokens are left
                    }
                } else {
                    // Token exists, attempt to validate/refresh and fetch user
                    try {
                        const userDecoded = jwtDecode(accessToken) as { exp: number };
                        const isExpired = dayjs.unix(userDecoded.exp).diff(dayjs()) < 1;
                        
                        let tokenStatus: { valid: boolean; reason?: string };
                        if (isExpired) {
                            const refreshResult = await refreshAccessToken();
                            if (refreshResult.success) {
                                const newAccessToken = getAccessToken(); // Get the newly set token
                                tokenStatus = await verifyAccessToken(newAccessToken);
                            } else {
                                tokenStatus = {valid: false, reason: refreshResult.error || 'Failed to refresh token'};
                            }
                        } else {
                            tokenStatus = await verifyAccessToken(accessToken);
                        }
                        
                        if (tokenStatus.valid) {
                            sessionStorage.setItem('tokenValidated', 'true');
                            const response = await whoami();
                            if (isMounted) { // Only update if component is still mounted
                                if (response.success && response.data) {
                                    setUser(response.data);
                                } else {
                                    console.error("Failed to fetch user data after token validation:", response.error);
                                    setUser(null);
                                    sessionStorage.setItem('tokenValidated', 'false'); // Mark as invalid
                                    removeTokens();
                                }
                            }
                        } else {
                            console.warn("Token validation failed:", tokenStatus.reason);
                            if (isMounted) {
                                setUser(null);
                                sessionStorage.setItem('tokenValidated', 'false'); // Mark as invalid
                                removeTokens();
                            }
                        }
                    } catch (error: unknown) {
                        console.error("Error during authentication initialization:", error);
                        if (isMounted) {
                            setUser(null);
                            sessionStorage.setItem('tokenValidated', 'false'); // Mark as invalid on error
                            removeTokens();
                        }
                    }
                }
            } else {
                // If token already validated in session and user is not null, just set loading to false.
                // This covers subsequent renders where no re-validation is needed.
                console.log("Auth already initialized or token validated in session.");
            }
            
            if (isMounted) {
                setLoading(false); // End loading regardless of outcome
            }
        };
        
        initializeAuth();
        
        // Cleanup function for useEffect:
        // Set isMounted to false when component unmounts to prevent state updates
        return () => {
            isMounted = false;
        };
        
    }, [refreshAccessToken, verifyAccessToken, whoami, removeTokens, user]); // Added `user` to dependencies for a more robust (though less common) initialization pattern.
    // The key is that `user === null` ensures it runs if user is not set.
    
    
    const contextValue = React.useMemo(() => ({
        user,
        isLoading: loading,
        login,
        logout,
        redirectToLogin,
        signup,
        activateUser,
        resetPwd,
        resetPwdConfirm,
        updateUser
    }), [user, loading, login, logout, redirectToLogin, signup, activateUser, resetPwd, resetPwdConfirm, updateUser]);
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};