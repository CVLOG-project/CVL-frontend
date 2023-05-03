export interface DeleteDetail {
  success: boolean;
  data: {
    generatedMaps: [];
    raw: [];
    affected: number;
  };
}

export interface PatchDetailType {
  success: boolean;
  data: {
    generatedMaps: [];
    raw: [];
    affected: number;
  };
}
