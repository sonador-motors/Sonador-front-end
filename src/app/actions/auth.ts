// // src/app/actions/auth.ts
// 'use server';
//
// import axios, { AxiosError } from 'axios';
// import { getCookie, removeCookie, setCookie, baseUrl } from "@/lib/utils";
// import { revalidatePath } from 'next/cache'; // To revalidate data after auth changes
// import {
//     User,
//     JWTTokens,
//     LoginCredentials,
//     ApiResponse,
//     DjoserErrorResponse,
//     SignupCredentials,
//     DjoserDetailResponse,
//     UpdateUserPayload,
//     ActivateUserCredentials, ResetPasswordConfirmCredentials
// } from '@/lib/types'; // Import all necessary types
//
//
// // Server-side Axios instance (no client-side interceptors needed here)
// const serverAuthAxios = axios.create({
//     baseURL: baseUrl,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     }
// });
//
// // Helper to get access token from server-side cookies
// function getAccessTokenServer(): string | undefined {
//     return getCookie('accesstoken')
// }
//
// // Helper to get refresh token from server-side cookies
// function getRefreshTokenServer(): string | undefined {
//     return getCookie('refreshtoken')
// }
//
// // Helper for setting secure HttpOnly cookies on the server
// function setAuthCookies(accessToken: string, refreshToken: string) {
//     // Access Token (short-lived, e.g., 1 hour)
//     setCookie('accessToken', accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax', // Use 'lax' for better compatibility with CSRF if needed, 'strict' is more secure
//         maxAge: 60 * 60, // 1 hour
//         path: '/'
//     });
//     // Refresh Token (long-lived, e.g., 90 days)
//     setCookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 60 * 60 * 24 * 90, // 90 days
//         path: '/'
//     });
// }
//
// // Helper for removing cookies on the server
// function removeAuthCookies() {
//     removeCookie('accessToken')
//     removeCookie('refreshToken')
// }
//
// // Server-side token refresh (used internally by server actions if needed)
// async function serverRefreshAccessToken(): Promise<ApiResponse<JWTTokens>> {
//     try {
//         const refreshToken = getRefreshTokenServer()
//         if (!refreshToken) {
//             removeAuthCookies();
//             return { success: false, error: 'No refresh token available on server.' };
//         }
//         const res = await serverAuthAxios.post<JWTTokens>('jwt/refresh/', { refresh: refreshToken })
//         setAuthCookies(res.data.access, res.data.refresh);
//         return { success: true, data: res.data }
//     } catch (error: unknown) {
//         console.error("Server-side token refresh failed:", error);
//         removeAuthCookies(); // Clear tokens on refresh failure
//         if (axios.isAxiosError(error)) {
//             const errorResponse = error.response?.data as DjoserErrorResponse;
//             const errorMessage = errorResponse?.detail || 'Failed to refresh token on server.'
//             return { success: false, error: errorMessage }
//         }
//         return { success: false, error: 'An unexpected error occurred during server-side token refresh.' }
//     }
// }
//
// // Server-side function to get current user data
// export async function serverWhoami(): Promise<ApiResponse<User>> {
//     const accessToken = getAccessTokenServer()
//     if (!accessToken) {
//         return { success: false, error: 'Not authenticated.' }
//     }
//
//     try {
//         const res = await serverAuthAxios.get<User>('users/me/', {
//             headers: {
//                 'Authorization': `JWT ${accessToken}`
//             }
//         });
//         return { success: true, data: res.data }
//     } catch (error: unknown) {
//         console.error("Server-side whoami failed:", error)
//         if (axios.isAxiosError(error)) {
//             if (error.response?.status === 401) {
//                 // Attempt to refresh token and retry if 401
//                 const refreshResult = await serverRefreshAccessToken();
//                 if (refreshResult.success && refreshResult.data) {
//                     // Retry whoami with new token
//                     try {
//                         const retryRes = await serverAuthAxios.get<User>('users/me/', {
//                             headers: {
//                                 'Authorization': `JWT ${refreshResult.data.access}`
//                             }
//                         })
//                         return { success: true, data: retryRes.data }
//                     } catch (retryError: unknown) {
//                         console.error("Server-side whoami retry failed:", retryError)
//                         removeAuthCookies();
//                         return { success: false, error: 'Authentication failed after token refresh.' }
//                     }
//                 } else {
//                     removeAuthCookies();
//                     return { success: false, error: refreshResult.error || 'Authentication required.' }
//                 }
//             }
//             const errorResponse = error.response?.data as DjoserErrorResponse;
//             const errorMessage = errorResponse?.detail || 'Failed to fetch user data on server.'
//             return { success: false, error: errorMessage }
//         }
//         return { success: false, error: 'An unexpected error occurred during server-side user fetch.' }
//     }
// }
//
// // Server Action: Login
// export async function serverLogin(credentials: LoginCredentials): Promise<ApiResponse<User>> {
//     try {
//         const tokenRes = await serverAuthAxios.post<JWTTokens>('jwt/create/', credentials);
//         setAuthCookies(tokenRes.data.access, tokenRes.data.refresh);
//
//         // Fetch the user data immediately on the server after successful login
//         const userRes = await serverAuthAxios.get<User>('users/me/', {
//             headers: {
//                 'Authorization': `JWT ${tokenRes.data.access}`
//             }
//         });
//
//         // Revalidate any paths that might depend on auth status (e.g., the root layout)
//         revalidatePath('/');
//
//         return { success: true, data: userRes.data, message: 'Login successful!' };
//
//     } catch (error: unknown) {
//         console.error("Server Action Login failed:", error);
//         if (axios.isAxiosError(error)) {
//             const errorResponse = error.response?.data as DjoserErrorResponse;
//             const errorMessage = errorResponse?.detail || errorResponse?.email?.[0] || 'Invalid credentials.';
//             return { success: false, error: errorMessage };
//         }
//         return { success: false, error: 'An unexpected error occurred during login.' };
//     }
// }
//
// // Server Action: Logout
// export async function serverLogout(): Promise<ApiResponse<undefined>> {
//     try {
//         removeAuthCookies();
//         revalidatePath('/'); // Revalidate to clear client-side auth state
//         return { success: true, message: 'Logged out successfully.' }
//     } catch (error: unknown) {
//         console.error("Server Action Logout failed:", error);
//         return { success: false, error: 'An error occurred during logout.' }
//     }
// }
//
// // Server Action: Signup
// export async function serverSignup(credentials: SignupCredentials): Promise<ApiResponse<User>> {
//     try {
//         const res = await serverAuthAxios.post<User>('users/', credentials)
//         revalidatePath('/'); // Revalidate if signup affects any public user lists
//         return {
//             success: true,
//             data: res.data,
//             message: `${res.data.name}'s account has been successfully created. Kindly check your email to activate it. Thank you for choosing Sonador Motors Co.,Ltd`
//         };
//     } catch (error: unknown) {
//         console.error("Server Action Signup failed:", error);
//         if (axios.isAxiosError(error)) {
//             const errorResponse = error.response?.data as DjoserErrorResponse;
//             let errorMessage = 'An error occurred during signup.';
//             if (errorResponse) {
//                 if (errorResponse.email) errorMessage = `Email: ${errorResponse.email.join(' ')}`
//                 else if (errorResponse.name) errorMessage = `Username: ${errorResponse.name.join(' ')}`
//                 else if (errorResponse.password) errorMessage = `Password: ${errorResponse.password.join(' ')}`
//                 else if (errorResponse.detail) errorMessage = errorResponse.detail;
//                 else errorMessage = Object.values(errorResponse).flat().filter(Boolean).join(' ') || errorMessage
//             }
//             return { success: false, error: errorMessage }
//         }
//         return { success: false, error: 'An unexpected error occurred during signup.' };
//     }
// }
//
// // Server Action: Activate User
// export async function serverActivateUser(credentials: ActivateUserCredentials): Promise<ApiResponse<undefined>> {
//     try {
//         const res = await serverAuthAxios.post<DjoserDetailResponse>('users/activation/', credentials);
//         revalidatePath('/') // Revalidate to reflect user's active status
//         return {
//             success: res.status === 204,
//             message: 'User account activated successfully. You can now log in.',
//         };
//     } catch (error: unknown) {
//         console.error("Server Action Activate User failed:", error)
//         if (axios.isAxiosError(error)) {
//             const errorResponse = error.response?.data as DjoserErrorResponse
//             const errorMessage = (errorResponse?.detail || errorResponse?.uid?.[0] || errorResponse?.token?.[0] || 'There was an error activating the account!');
//             return { success: false, error: errorMessage }
//         }
//         return { success: false, error: 'An unexpected error occurred during activation.' }
//     }
// }
//
// // Server Action: Reset Password
// export async function serverResetPwd(email: string): Promise<ApiResponse<DjoserDetailResponse>> {
//     try {
//         const res = await serverAuthAxios.post<DjoserDetailResponse>('users/reset_password/', { email });
//         return { success: true, message: res.data.detail };
//     } catch (error: unknown) {
//         console.error("Server Action Reset Password failed:", error);
//         if (axios.isAxiosError(error)) {
//             const errorResponse: DjoserErrorResponse = error.response?.data as DjoserErrorResponse;
//             if (errorResponse?.email && Array.isArray(errorResponse.email)) {
//                 return { success: false, error: errorResponse.email.join(' ') || 'User does not exist. Please check your email address.' };
//             }
//             const errorDetail = errorResponse?.detail || Object.values(errorResponse).flat().filter(Boolean).join(' ');
//             return { success: false, error: errorDetail || 'An error occurred during password reset.' };
//         }
//         return { success: false, error: 'An unexpected error occurred during password reset.' };
//     }
// }
//
// // Server Action: Reset Password Confirm
// export async function serverResetPwdConfirm(data: ResetPasswordConfirmCredentials): Promise<ApiResponse<DjoserDetailResponse>> {
//     try {
//         const res = await serverAuthAxios.post<DjoserDetailResponse>('users/reset_password_confirm/', data);
//         return { success: true, message: res.data.detail };
//     } catch (error: unknown) {
//         console.error("Server Action Reset Password Confirm failed:", error);
//         if (axios.isAxiosError(error)) {
//             const errorResponse: DjoserErrorResponse = error.response?.data as DjoserErrorResponse;
//             if (errorResponse?.token && Array.isArray(errorResponse.token)) {
//                 return { success: false, error: errorResponse.token.join(' ') || 'Invalid or expired token. Please request for a new password reset link' };
//             } else if (errorResponse?.uid && Array.isArray(errorResponse.uid)) {
//                 return { success: false, error: errorResponse.uid.join(' ') || 'User ID does not exist, Please check your email.' };
//             }
//             const errorDetail = errorResponse?.detail || Object.values(errorResponse).flat().filter(Boolean).join(' ');
//             return { success: false, error: errorDetail || 'An error occurred during password reset confirmation.' };
//         }
//         return { success: false, error: 'An unexpected error occurred during password reset confirmation.' };
//     }
// }
//
// // Server Action: Update User
// export async function serverUpdateUser(data: UpdateUserPayload): Promise<ApiResponse<User>> {
//     const accessToken = getAccessTokenServer();
//     if (!accessToken) {
//         return { success: false, error: 'Authentication required to update user.' };
//     }
//     try {
//         const res = await serverAuthAxios.patch<User>('users/me/', data, {
//             headers: {
//                 'Authorization': `JWT ${accessToken}`
//             }
//         });
//         revalidatePath('/account/profile'); // Revalidate profile page if applicable
//         return { success: true, data: res.data, message: 'Profile data updated successfully!' };
//     } catch (error: unknown) {
//         console.error("Server Action Update User failed:", error);
//         if (axios.isAxiosError(error)) {
//             const errorResponse = error.response?.data as DjoserErrorResponse;
//             const errorMessage = errorResponse?.detail || 'An error occurred while updating user data.';
//             return { success: false, error: errorMessage };
//         }
//         return { success: false, error: 'An unexpected error occurred while updating user data.' };
//     }
// }