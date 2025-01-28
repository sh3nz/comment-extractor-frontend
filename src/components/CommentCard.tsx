// 'use client';

// import { Copy } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import { useState } from 'react';
// import { toast } from 'sonner';

// interface CommentCardProps {
//   author: string;
//   text: string;
//   upvotes: number;
//   created_utc: number;
//   reply?: {
//     author: string;
//     text: string;
//     upvotes: number;
//     created_utc: number;
//   };
// }

// export default function CommentCard({ 
//   author, 
//   text, 
//   upvotes, 
//   created_utc,
//   reply 
// }: CommentCardProps) {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleCopy = async (content: string) => {
//     try {
//       await navigator.clipboard.writeText(content);
//       toast.success('Comment copied to clipboard!');
//     } catch (err) {
//       toast.error('Failed to copy comment');
//     }
//   };

//   const formatTimestamp = (timestamp: number) => {
//     return formatDistanceToNow(timestamp * 1000, { addSuffix: true });
//   };

//   return (
//     <div 
//       className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Comment Header */}
//       <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
//         <span className="text-sm font-medium text-gray-600">Comment</span>
//       </div>

//       {/* Main comment */}
//       <div className="p-4 space-y-2">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="font-medium text-gray-900">{author}</span>
//             <span className="text-sm text-gray-500">•</span>
//             <span className="text-sm text-gray-500">{formatTimestamp(created_utc)}</span>
//           </div>
//           <div className="flex items-center gap-2 flex-shrink-0">
//             <span className="text-sm text-gray-500">{upvotes} upvotes</span>
//             {isHovered && (
//               <button
//                 onClick={() => handleCopy(text)}
//                 className="p-1 hover:bg-gray-100 rounded transition-colors"
//                 title="Copy comment"
//               >
//                 <Copy size={16} className="text-gray-500" />
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="break-words overflow-hidden">
//           <p className="text-gray-700 whitespace-pre-wrap break-all">{text}</p>
//         </div>
//       </div>

//       {/* Reply */}
//       {reply && (
//         <div className="relative">
//           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
//           <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 ml-8">
//             <span className="text-sm font-medium text-gray-600">Reply</span>
//           </div>
//           <div className="ml-8 p-4 bg-gray-50 rounded-b-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium text-gray-900">{reply.author}</span>
//                 <span className="text-sm text-gray-500">•</span>
//                 <span className="text-sm text-gray-500">{formatTimestamp(reply.created_utc)}</span>
//               </div>
//               <span className="text-sm text-gray-500 flex-shrink-0">{reply.upvotes} upvotes</span>
//             </div>
//             <div className="break-words overflow-hidden mt-2">
//               <p className="text-gray-700 whitespace-pre-wrap break-all">{reply.text}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { Copy } from 'lucide-react';
import { comment } from 'postcss';
import { useState } from 'react';
import { toast } from 'sonner';

interface CommentCardProps {
  sequence: number;
  author: string;
  text: string;
  upvotes: number;
  created_at: number;
  reply?: {
    author: string;
    text: string;
    upvotes: number;
    created_at:number
  };
}

export default function CommentCard({ 
  sequence, 
  author, 
  text, 
  upvotes, 
  reply ,
  created_at
}: CommentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  

  return (
    
    <div
  className="  bg-white  overflow-y-auto "
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Main Comment Section */}

  <div className="border-l-4 border-black pl-4">
        <div className="space-y-4 font-lexend transition-all duration-300">
          {/* Header */}
          <span className="text-sm text-gray-500 flex justify-end">{created_at}</span>
          <div className="flex items-center justify-between mb-4">
            {/* Author Info */}
            <div className="flex items-center gap-4 rounded-lg transition-all duration-300">
              <span className="text-sm font-medium text-gray-900">{sequence}.</span>
              <span className="text-sm font-bold text-gray-800">{author}</span>
              
            </div>


            {/* Upvotes and Timestamp */}
            <div className="flex items-center gap-6">
            
              <span className="text-sm text-gray-500">{upvotes} upvotes</span>
              
            </div>
          </div>

          {/* Comment Content */}
          <div className="mt-2 text-gray-700 text-sm leading-relaxed">
            <p className="whitespace-pre-wrap break-words">{text}</p>
          </div>
        </div>

        {/* Reply Section */}
        {reply && (
          <div className="relative">
            {/* Reply Header */}
            <div className="ml-8 p-4 rounded-lg">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-800">Reply</span>
                <span className="text-sm text-gray-500 flex justify-end">{reply.created_at}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-sm">{reply.author}</span>
                  
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{reply.upvotes} upvotes</span>
                  
                </div>
              </div>

              {/* Reply Content */}
              <div className="mt-2 text-gray-600 text-sm leading-relaxed">
                <p className="whitespace-pre-wrap break-words">{reply.text}</p>
              </div>
              <div className="absolute left-8 top-5 bottom-4 w-0.5 bg-black"></div>
            </div>
          </div>
        )}
      </div>
</div>

  );
}

