'use client';

import { useState } from 'react';
import { fetchComments } from '@/lib/api';
import { CommentResponse } from '@/types';
import UrlInput from '@/components/UrlInput';
import CommentList from '@/components/CommentList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CommentResponse | null>(null);

  const handleSubmit = async (url: string, limit: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchComments(url, limit);
      setData(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
  };

  const handleCopy = async () => {
    if (data) {
      try {
        const textToCopy = formatCommentsForCopy(data);
        await navigator.clipboard.writeText(textToCopy);
        toast.success('Content copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy content');
        console.log(err)
      }
    }
  };

  const formatCommentsForCopy = (data: CommentResponse): string => {
    let text = `Post: ${data.post_title}\n`;
    text += `Author: ${data.post_author}\n\n`;

    data.comments.forEach((comment, index) => {
      text += `${index + 1}. ${comment.author} (${comment.upvotes} upvotes):\n`;
      text += `${comment.text}\n`;
      if (comment.reply) {
        text += `\nReply from ${comment.reply.author} `;
        text += `(${comment.reply.upvotes} upvotes):\n`;
        text += `${comment.reply.text}\n`;
      }
      text += '\n---\n\n';
    });

    return text;
  };

  // const handleDownload = () => {
  //   if (data) {
  //     const workbook = XLSX.utils.book_new();
      
  //     const postInfo = [
  //       ['Post Title', data.post_title],
  //       ['Post Author', data.post_author],
  //       ['Total Comments', data.comments.length.toString()]
  //     ];
  //     const postSheet = XLSX.utils.aoa_to_sheet(postInfo);
  //     XLSX.utils.book_append_sheet(workbook, postSheet, 'Post Information');

  //     const commentsData = data.comments.map((comment, index) => [
  //       index + 1,
  //       comment.author,
  //       comment.text,
  //       comment.upvotes,
  //       comment.reply?.author || '',
  //       comment.reply?.text || '',
  //       comment.reply?.upvotes || ''
  //     ]);

  //     const commentsHeaders = [
  //       'No.',
  //       'Comment Author',
  //       'Comment Text',
  //       'Comment Upvotes',
  //       'Reply Author',
  //       'Reply Text',
  //       'Reply Upvotes'
  //     ];
  //     commentsData.unshift(commentsHeaders);

  //     const commentsSheet = XLSX.utils.aoa_to_sheet(commentsData);
      
  //     const colWidths = [5, 15, 50, 10, 15, 50, 10];
  //     commentsSheet['!cols'] = colWidths.map(width => ({ width }));

  //     XLSX.utils.book_append_sheet(workbook, commentsSheet, 'Comments');

  //     try {
  //       XLSX.writeFile(workbook, 'reddit-comments.xlsx');
  //       toast.success('Excel file downloaded successfully!');
  //     } catch (err) {
  //       toast.error('Failed to download Excel file');
  //       console.error('Download error:', err);
  //     }
  //   }
  // };


  const handleExcelDownload = () => {
    if (data) {
      const workbook = XLSX.utils.book_new();
      
      const postInfo = [
        ['Post Title', data.post_title],
        ['Post Author', data.post_author],
        ['Total Comments', data.comments.length.toString()]
      ];
      const postSheet = XLSX.utils.aoa_to_sheet(postInfo);
      XLSX.utils.book_append_sheet(workbook, postSheet, 'Post Information');

      const commentsData = data.comments.map((comment, index) => [
        index + 1,
        comment.author,
        comment.text,
        comment.upvotes,
        comment.reply?.author || '',
        comment.reply?.text || '',
        comment.reply?.upvotes || ''
      ]);

      const commentsHeaders = [
        'No.',
        'Comment Author',
        'Comment Text',
        'Comment Upvotes',
        'Reply Author',
        'Reply Text',
        'Reply Upvotes'
      ];
      commentsData.unshift(commentsHeaders);

      const commentsSheet = XLSX.utils.aoa_to_sheet(commentsData);
      
      const colWidths = [5, 15, 50, 10, 15, 50, 10];
      commentsSheet['!cols'] = colWidths.map(width => ({ width }));

      XLSX.utils.book_append_sheet(workbook, commentsSheet, 'Comments');

      try {
        XLSX.writeFile(workbook, 'reddit-comments.xlsx');
        toast.success('Excel file downloaded successfully!');
      } catch (err) {
        toast.error('Failed to download Excel file');
        console.error('Download error:', err);
      }
    }
  };

  const handleJsonDownload = () => {
    if (data) {
      try {
        // Create a formatted JSON object
        const jsonData = {
          post_info: {
            title: data.post_title,
            author: data.post_author,
            total_comments: data.comments.length
          },
          comments: data.comments.map((comment, index) => ({
            number: index + 1,
            author: comment.author,
            text: comment.text,
            upvotes: comment.upvotes,
            reply: comment.reply ? {
              author: comment.reply.author,
              text: comment.reply.text,
              upvotes: comment.reply.upvotes
            } : null
          }))
        };

        // Convert to string with proper formatting
        const jsonString = JSON.stringify(jsonData, null, 2);
        
        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reddit-comments.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('JSON file downloaded successfully!');
      } catch (err) {
        toast.error('Failed to download JSON file');
        console.error('Download error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-lexend">
      <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="font-semibold text-gray-900">Reddit Extractor</span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            {!data && !isLoading && (
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-white bg-clip-text text-transparent">
                  Reddit Comment Extractor
                </h1>
                <p className="text-gray-600 font-lexend font-semibold text-lg max-w-md mx-auto">
                  Extract and analyze comments from any Reddit post in seconds
                </p>
              </div>
            )}

            {data && !isLoading && (
              <button
                onClick={handleReset}
                className="mb-6 group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>New Search</span>
              </button>
            )}

            {!data && !isLoading && (
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-2xl" />
                <div className="relative">
                  <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {isLoading && (
              <div className="mt-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
                <LoadingSpinner />
              </div>
            )}

            {data && !isLoading && (
  // <CommentList
  //   comments={data.comments}
  //   postTitle={data.post_title}
  //   postAuthor={data.post_author}
  //   onCopy={handleCopy}
  //   onDownloadExcel={handleExcelDownload}
  //   onDownloadJson={handleJsonDownload}
  // />
  <CommentList
  comments={data.comments}
  postTitle={data.post_title}
  postAuthor={data.post_author}
  totalComments={data.total_comments}
  retrievedComments={data.retrieved_comments}
  onCopy={handleCopy}
  onDownloadExcel={handleExcelDownload}
  onDownloadJson={handleJsonDownload}
/>

)}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Developed by Sawyer Trice • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}




//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <nav className="bg-white/70 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold">R</span>
//             </div>
//             <span className="font-semibold text-gray-900">Reddit Extractor</span>
//           </div>
//           <a
//             href="https://github.com/yourusername/reddit-extractor"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <Github size={20} />
//             <span className="hidden sm:inline">View on GitHub</span>
//           </a>
//         </div>
//       </nav>

//       <main className="pt-24 pb-12">
//         <div className="container mx-auto px-4 flex flex-col items-center">
//           <div className="w-full max-w-2xl">
//             {!data && !isLoading && (
//               <div className="text-center mb-12">
//                 <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   Reddit Comment Extractor
//                 </h1>
//                 <p className="text-gray-600 text-lg max-w-md mx-auto">
//                   Extract and analyze comments from any Reddit post in seconds
//                 </p>
//               </div>
//             )}

//             {data && !isLoading && (
//               <button
//                 onClick={handleReset}
//                 className="mb-6 group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//                 <span>New Search</span>
//               </button>
//             )}

//             {!data && !isLoading && (
//               <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-2xl" />
//                 <div className="relative">
//                   <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
//                 </div>
//               </div>
//             )}

//             {error && (
//               <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//                 <p className="text-red-600">{error}</p>
//               </div>
//             )}

//             {isLoading && (
//               <div className="mt-12">
//                 <LoadingSpinner />
//               </div>
//             )}

//             {data && !isLoading && (
//               <CommentList
//                 comments={data.comments}
//                 postTitle={data.post_title}
//                 postAuthor={data.post_author}
//                 onCopy={handleCopy}
//                 onDownload={handleDownload}
//               />
//             )}
//           </div>
//         </div>
//       </main>

//       <footer className="border-t border-gray-200 bg-white/70 backdrop-blur-md">
//         <div className="container mx-auto px-4 py-6">
//           <p className="text-center text-gray-500 text-sm">
//             Built with Next.js and FastAPI • {new Date().getFullYear()}
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
