import imageCompression from 'browser-image-compression';

export const imageResizing = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const imageFile = e.target.files[0];
    const options = {
      maxWidthOrHeight: 1024,
    };
    // 미리보기용 이미지 url 만드는 함수
    // const promise = imageCompression.getDataUrlFromFile(compressedFile);
    // promise.then(urldata => {
    //   urldata = 미리보기 url
    // });
    try {
      const resizedImage = await imageCompression(imageFile, options);
      return resizedImage;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
