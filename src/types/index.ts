// export interface Reply {
//     author: string;
//     text: string;
//     upvotes: number;
//     created_utc: number;
//   }
  
//   export interface Comment {
//     author: string;
//     text: string;
//     upvotes: number;
//     created_utc: number;
//     reply?: Reply;
//   }
  
//   export interface CommentResponse {
//     comments: Comment[];
//     post_title: string;
//     post_author: string;
//     total_comments: number;
//     text?: string;
//   }


export interface Reply {
  author: string;
  text: string;
  upvotes: number;
  created_at: number;
}

export interface Comment {
  author: string;
  post_author_url:string;
  text: string;
  upvotes: number;
  created_at: number;
  reply?: Reply;
}

export interface CommentResponse {
  comments: Comment[];
  post_title: string;
  retrieved_replies: string;
  post_url:string;
  post_author_url:string;
  post_author: string;
  total_comments: number;
  retrieved_comments:number
  text?: string;
}
