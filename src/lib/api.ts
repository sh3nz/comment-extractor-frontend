
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://comment-extractor-31b4ed03cc0f.herokuapp.com';  // Update with your Heroku URL

// export async function fetchComments(url: string, limit: number = 25, format: 'json' | 'text' = 'json'): Promise<CommentResponse> {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/api/v1/comments?url=${encodeURIComponent(url)}&limit=${limit}&format=${format}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add any other required headers
//         },
//         // Important for CORS
//         mode: 'cors',
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.detail || 'Failed to fetch comments');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// }



import { CommentResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://comment-extractor-31b4ed03cc0f.herokuapp.com';  // Update with your Heroku URL

export async function fetchComments(url: string, limit: number = 25, format: 'json' | 'text' = 'json'): Promise<CommentResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/comments?url=${encodeURIComponent(url)}&limit=${limit}&format=${format}`,
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch comments');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
