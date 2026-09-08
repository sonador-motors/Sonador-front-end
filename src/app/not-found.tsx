import Link from "next/link";

const NotFound = () => {
    return (
        <section className="content-grid">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-red-600 md:text-4xl">Something&apos;s
                        missing.</p>
                    <p className="mb-4 text-lg font-light text-red-500">Sorry, we can&apos;t find that
                        page. You&apos;ll find lots to explore on the home page. </p>
                    <Link href="/"
                       className="inline-flex bg-yellow-200 border border-yellow-900 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 text-center ease-in transition-colors text-yellow-900 uppercase my-4">Back
                        to Homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;