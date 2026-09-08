import LoadingSkeleton from "@/ui/loading-skeleton";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"/>
            
            {/* Centered loader */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <LoadingSkeleton/>
            </div>
        </div>
    );
}
