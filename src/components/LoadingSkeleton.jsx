import React from 'react'

const LoadingSkeleton = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="card bg-base-200 w-96 shadow-sm animate-pulse transition-all duration-500 ease-in-out">
                        <figure className="w-full h-48 bg-gray-300 rounded-t-xl"></figure>
                        <div className="card-body">
                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                            <div className="flex justify-end mt-4">
                                <div className="btn btn-disabled bg-gray-400 text-transparent border-none w-24 h-8"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-gray-400 mt-6 text-lg">Fetching latest news...</p>
        </div>
    )
}

export default LoadingSkeleton