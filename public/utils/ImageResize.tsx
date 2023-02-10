import imageCompression from 'browser-image-compression';

export const imageResizing = (file: File[]) => {
  if (file) {
    const imageFile = file[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
    };
    const resizedImage = imageCompression(imageFile, options);
    return resizedImage;
  }
};

// 라이브러리에 적혀있는 options
// interface Options {
//   /** @default Number.POSITIVE_INFINITY */
//   maxSizeMB?: number;

//   /** @default undefined */
//   maxWidthOrHeight?: number;

//   /** @default true */
//   useWebWorker?: boolean;

//   /** @default 10 */
//   maxIteration?: number;

//   /** Default to be the exif orientation from the image file */
//   exifOrientation?: number;

//   /** A function takes one progress argument (progress from 0 to 100) */
//   onProgress?: (progress: number) => void;

//   /** Default to be the original mime type from the image file */
//   fileType?: string;

//   /** @default 1.0 */
//   initialQuality?: number;

//   /** @default false */
//   alwaysKeepResolution?: boolean;

//   /** @default undefined */
//   signal?: AbortSignal;
// }
