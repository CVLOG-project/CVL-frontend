export interface NewPostComment {
  post_id: number;
  content: string;
}

export interface User_id {
  profile_image: string;
  github_id: string;
  id: number;
}

export interface CommentType {
  success: boolean;
  data: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user_id: User_id;
}

export interface CommentTypeData {
  data: CommentType[];
}
