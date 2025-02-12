
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://comment-extractor-31b4ed03cc0f.herokuapp.com';  // Update with your Heroku URL

 export async function fetchComments(url: string, limit: number = 25, format: 'json' | 'text' = 'json'): Promise<CommentResponse> {
   try {
     const response = await fetch(
       `${API_BASE_URL}/api/v1/comments?url=${encodeURIComponent(url)}&limit=${limit}&format=${format}`,
       {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'User-Agent': 'web:com.commentextractor.app:v1.0.0 (by /u/Jpeg30286)',
           'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzM5NDY4MDkyLjk0NDI1MywiaWF0IjoxNzM5MzgxNjkyLjk0NDI1MywianRpIjoiZE5MUzVWZDBsZ1pOamEyc2Q3cEFiMTFmRFU4OUhnIiwiY2lkIjoicDkxOHpqcVdLRU55SlZTajVXRTJFUSIsImxpZCI6InQyXzFqNHIyNGd2dGMiLCJsY2EiOjE3MzkzODE2OTI5MzAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo2fQ.FNndtd2_hnZWkfjqYN9sNTTNvaEU0Re8dmaI9Jdg-9EhrqNEcKaHygxbG4ZwsU-LhydOwi5YfjGl-c6hTzrEsS5HjV5VqLiVcPM5G5CyFPB3uW1J99Ck4ys4YyKVl2ehWxesMw2CoG9leOyokf7MrE4MUfosDr78VBipfUuwxdz5oB7t7OkTV3qA6j7DIZsYbfhT9xXfOdII4x6XbXiMhFcv2Uohx05jYCHcSU76MNrYPfoBfZzkUdm2dV2pwrU03cF7Djy39AvvfOrystPAQ0f-4YUiPXPspuju4GUAOYSyh9b97n2ucE9K9mVwHkuQVGHXn_jkT-6Wr-6jy4sGEw`
         },
         // Important for CORS
         mode: 'cors',
       }
     );

     if (!response.ok) {
       const error = await response.json();
       throw new Error(error.detail || 'Failed to fetch comments');
     }

     return await response.json();
   } catch (error) {
     console.error('API Error:', error);
     throw error;
   }
 }



