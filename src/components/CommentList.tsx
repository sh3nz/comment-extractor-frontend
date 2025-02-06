// import { useState } from 'react';
// import { Comment } from '@/types';
// import CommentCard from './CommentCard';
// import { 
//   Copy, 
//   Download, 
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
//   MessageCircle,
//   User
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface CommentListProps {
//   comments: Comment[];
//   postTitle: string;
//   postAuthor: string;
//   onCopy: () => void;
//   onDownload: () => void;
// }

// export default function CommentList({
//   comments,
//   postTitle,
//   postAuthor,
//   onCopy,
//   onDownload,
// }: CommentListProps) {
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [areCommentsCollapsed, setAreCommentsCollapsed] = useState(true);

//   const sortedComments = [...comments].sort((a, b) => {
//     return sortOrder === 'desc' 
//       ? b.upvotes - a.upvotes 
//       : a.upvotes - b.upvotes;
//   });

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-6"
//     >
//       {/* Original Post Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
//                 Original Post
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <MessageCircle size={16} className="text-gray-400" />
//               <span>{comments.length} comments</span>
//             </div>
//           </div>

//           <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">
//             {postTitle}
//           </h1>
          
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <User size={16} className="text-gray-400" />
//             <span>Posted by {postAuthor}</span>
//           </div>
//         </div>
//       </div>

//       {/* Actions Bar */}
//       <motion.div 
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="flex flex-wrap items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
//       >
//         {/* Left side - Primary actions */}
//         <div className="flex items-center gap-2">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setAreCommentsCollapsed(!areCommentsCollapsed)}
//             className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
//           >
//             {areCommentsCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
//             {areCommentsCollapsed ? 'Expand All' : 'Collapse All'}
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
//             className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
//           >
//             <ArrowUpDown size={16} />
//             Sort {sortOrder === 'desc' ? 'Highest' : 'Lowest'}
//           </motion.button>
//         </div>

//         {/* Right side - Export actions */}
//         <div className="ml-auto flex gap-2">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onCopy}
//             className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
//           >
//             <Copy size={16} />
//             Copy All
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onDownload}
//             className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
//           >
//             <Download size={16} />
//             Download Excel
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Comments Section */}
//       <AnimatePresence mode="wait">
//         {areCommentsCollapsed ? (
//           <motion.div 
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="text-center py-12 bg-white rounded-xl border border-gray-200"
//           >
//             <MessageCircle size={24} className="mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-600">
//               Comments are collapsed. Click "Expand All" to view them.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setAreCommentsCollapsed(false)}
//               className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
//             >
//               Show {comments.length} Comments
//             </motion.button>
//           </motion.div>
//         ) : (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="space-y-4"
//           >
//             {sortedComments.map((comment, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <CommentCard
//                   author={comment.author}
//                   text={comment.text}
//                   upvotes={comment.upvotes}
//                   created_utc={comment.created_utc}
//                   reply={comment.reply}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Comments status bar */}
//       {!areCommentsCollapsed && comments.length > 0 && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-center text-sm text-gray-500 py-2"
//         >
//           Showing {comments.length} comments • Sorted by {sortOrder === 'desc' ? 'highest' : 'lowest'} upvotes
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }




'use client';

import { useState } from 'react';
import { Comment } from '@/types';
import CommentCard from './CommentCard';
import { 
  Copy, 
  Download, 
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// interface CommentListProps {
//   comments: Comment[];
//   postTitle: string;
//   postAuthor: string;
//   onCopy: () => void;
//   onDownload: () => void;
// }

interface CommentListProps {
  comments: Comment[];
  postTitle: string;
  postUrl:string;
  postAuthorUrl:string
  postAuthor: string;
  totalComments: number;
  retrievedComments: number;
  retrievedReplies: string;
  onCopy: () => void;
  onDownloadExcel: () => void;
  onDownloadJson: () => void;
}

export default function CommentList({
  comments,
  postTitle,
  postUrl,
  postAuthorUrl,
  postAuthor,
  totalComments,
  retrievedComments,
  retrievedReplies,
  onCopy,
  onDownloadExcel,
  onDownloadJson,
}: CommentListProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [areCommentsCollapsed, setAreCommentsCollapsed] = useState(true);

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'desc' 
      ? b.upvotes - a.upvotes 
      : a.upvotes - b.upvotes;
  });

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-700 font-lexend">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Original Post Card */}
      
      <div className="bg-white  overflow-auto">
      <div className="p-6 bg-white  rounded-xl  space-y-6">
  {/* Header Section */}
  <div className="flex items-center justify-between">
    {/* <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
      Original Post
    </span> */}
    <div className="flex items-end justify-end gap-2 text-gray-600">
    
      <MessageCircle size={20} className="text-gray-400" />
      {/* <span className="text-sm">{comments.length} comments</span> */}
      <span className="text-sm">Top Level Comments :</span>
      <span className="text-sm font-semibold"> {retrievedComments} comments</span>
              
    </div>
  </div>

  {/* Post Title */}
  <div className="p-2 bg-white rounded-xl space-y-3">
  {/* <h1 className="text-2xl font-bold text-gray-900 leading-tight">
{postTitle}
</h1> */}
<a 
        href={postUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        <h1 className="text-2xl font-semibold text-gray-900 leading-tight hover:underline ">
          {/* {postTitle} */}
          Original Post
        </h1>
      </a>
<div className="flex items-center gap-2 text-gray-600">
      <MessageCircle size={18} className="text-gray-400" />
            <span className="text-sm">{totalComments} comments / {retrievedReplies} replies</span>
              
    </div>
{/* Author Information */}
<div className="flex items-center gap-2 text-sm text-gray-600">
  <User size={16} className="text-gray-400" />
  {/* <span className="font-medium">Posted by {postAuthor}</span> */}
  <a href={postAuthorUrl} target="_blank" rel="noopener noreferrer">
  <span className="font-medium">Posted by {postAuthor}</span>
</a>

</div>


  {/* Action Buttons */}
<div className="flex gap-4">
<motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg transition-all"
      >
        <Download size={14} />
        <button onClick={onDownloadExcel} className="text-gray-800 hover:text-gray-900">
          Excel
        </button>
        <span className="text-gray-300">|</span>
        <button onClick={onDownloadJson} className="text-gray-600 hover:text-gray-900">
          JSON
        </button>
      </motion.div>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onCopy}
    className="inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-600 border rounded-lg transition-all"
  >
    <Copy size={14} />
    Copy 
  </motion.button>
</div>
</div>
</div>

      </div>

      {/* Actions Grid */}
      {/* <div className="grid grid-cols-2 gap-3">
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAreCommentsCollapsed(!areCommentsCollapsed)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
        >
          {areCommentsCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          {areCommentsCollapsed ? 'Expand All' : 'Collapse All'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
        >
          <ArrowUpDown size={16} />
          Sort {sortOrder === 'desc' ? 'Highest' : 'Lowest'}
        </motion.button>

        
      </div> */}

      {/* Comments Section */}
      {/* <AnimatePresence mode="wait">
        {areCommentsCollapsed ? (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center py-12 bg-white rounded-lg "
          >
            <MessageCircle size={24} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">
              Comments are collapsed. Click &quot;Expand All&quot; to view them.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAreCommentsCollapsed(false)}
              className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Show {comments.length} Comments
            </motion.button>
          </motion.div>
        ) : (
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {sortedComments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                
                <CommentCard

                sequence={index + 1}
                  author={comment.author}
                  text={comment.text}
                  upvotes={comment.upvotes}
                  reply={comment.reply}
                />
                
              </motion.div>
              
            ))}
          </motion.div>
          
        )}
      </AnimatePresence> */}

<AnimatePresence mode="wait">
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    {sortedComments.map((comment, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <CommentCard
          sequence={index + 1}
          // postAuthorUrl={comment.post_author_url}
          author={comment.author}
          text={comment.text}
          upvotes={comment.upvotes}
          created_at={comment.created_at}
          reply={comment.reply}
        />
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>


      {/* Comments status bar */}
      {!areCommentsCollapsed && comments.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-gray-500 py-2"
        >
          Showing {comments.length} comments • Sorted by {sortOrder === 'desc' ? 'highest' : 'lowest'} upvotes
        </motion.div>
      )}
    </motion.div>
    
    </div>
    
  );
}
