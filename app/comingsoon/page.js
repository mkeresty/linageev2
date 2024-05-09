"use client";

export default function ComingSoon(){

    return(
<section className="flex flex-col justify-center items-center min-h-[70vh] py-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Coming soon</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Check back later!</p>
            <a href="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
        </div>   
    </div>
</section>
    )
}