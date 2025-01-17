
// 'use client';

// import { useState } from 'react';
// import { Clipboard, ArrowRight } from 'lucide-react';

// interface UrlInputProps {
//   onSubmit: (url: string, limit: number) => void;
//   isLoading: boolean;
// }

// export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
//   const [url, setUrl] = useState('');
//   const [limit, setLimit] = useState(25);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (url.trim()) {
//       onSubmit(url.trim(), limit);
//     }
//   };

//   const handlePaste = async () => {
//     try {
//       const text = await navigator.clipboard.readText();
//       setUrl(text);
//     } catch (err) {
//       console.error('Failed to paste:', err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* URL Input Group */}
//       <div className="space-y-3">
//         <label htmlFor="url" className="block text-sm font-medium text-gray-700">
//           Reddit Post URL
//         </label>
//         <div className="relative group">
//           <input
//             type="url"
//             id="url"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             placeholder="https://www.reddit.com/r/subreddit/comments/..."
//             className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12 group-hover:border-gray-300"
//             required
//           />
//           <button
//             type="button"
//             onClick={handlePaste}
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
//             title="Paste from clipboard"
//           >
//             <Clipboard size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Comments Limit Selection */}
//       <div className="space-y-3">
//         <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
//           Number of Comments
//         </label>
//         <select
//           id="limit"
//           value={limit}
//           onChange={(e) => setLimit(Number(e.target.value))}
//           className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-gray-300 transition-all pr-12"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'right 1rem center',
//             backgroundSize: '1.5em 1.5em'
//           }}
//         >
//           <option value={25}>25 comments</option>
//           <option value={50}>50 comments</option>
//           <option value={100}>100 comments</option>
//         </select>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 group"
//       >
//         {isLoading ? (
//           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//         ) : (
//           <>
//             <span>Fetch Comments</span>
//             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//           </>
//         )}
//       </button>
//     </form>
//   );
// }



'use client';

import { useState } from 'react';
import { Clipboard, ArrowRight } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string, limit: number) => void;
  isLoading: boolean;
}

export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [limit, setLimit] = useState(25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim(), limit);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Reddit Post URL
        </label>
        <div className="relative group">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.reddit.com/r/subreddit/comments/..."
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12 group-hover:border-gray-300"
            required
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
            title="Paste from clipboard"
          >
            <Clipboard size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
          Number of Comments
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-gray-300 transition-all pr-12"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.5em 1.5em'
          }}
        >
          <option value={25}>25 comments</option>
          <option value={50}>50 comments</option>
          <option value={100}>100 comments</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 group"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Fetching Comments...</span>
          </>
        ) : (
          <>
            <span>Fetch Comments</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}