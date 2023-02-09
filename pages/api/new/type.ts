export interface CreateNewPostReq {
  title: string;
  content: string;
  user_id: number;
  category_id: number;
  tags: string[];
  files: string[];
}
