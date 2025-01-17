// import CommentSkeleton from './CommentSkeleton';

// export default function LoadingSpinner() {
//   return (
//     <div className="flex flex-col items-center justify-center p-8 gap-4">
//       <div className="w-full max-w-2xl space-y-4">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="animate-pulse">
//             <CommentSkeleton />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      {/* Loading animation */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      
      {/* Loading message */}
      <div className="text-center">
        <p className="text-gray-600 text-lg">Just a moment while we fetch comments for you...</p>
        <p className="text-gray-500 text-sm mt-2">This might take a few seconds</p>
      </div>
    </div>
  );
}