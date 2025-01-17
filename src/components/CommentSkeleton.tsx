export default function CommentSkeleton() {
    return (
      <div className="border border-gray-200 rounded-lg p-4 space-y-4 animate-pulse">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }