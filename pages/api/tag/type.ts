export interface Tag {
  id: number;
  name: string;
  postsCount: number;
}

export interface Folder {
  id: number;
  name: string;
  tags: Tag[];
}

export interface GetTagsFolderRes {
  success: boolean;
  data: Folder[];
}

export interface CreateTagsFolderReq {
  name: string;
}

export interface CreateTagsFolderRes {
  success: boolean;
  data: {
    name: string;
    user_id: {
      github_id: string;
      name: string;
      refresh_token: string;
      description: string;
      profile_image: string;
      created_at: string;
      updated_at: string;
      deleted_at: string;
    };
    id: number;
  };
}

export interface RemoveTagsFolderRes {
  success: boolean;
  data: {
    raw: [];
    affected: number;
  };
}
