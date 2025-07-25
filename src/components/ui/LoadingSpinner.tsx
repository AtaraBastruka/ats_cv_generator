"use client";
export default function LoadingSpinner() {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 
                        border-4 border-t-transparent 
                        border-b-transparent">
            </div>
        </div>
    )
}