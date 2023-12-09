import { getPlaiceholder } from "plaiceholder";
import type { Photo, ImagesResults } from "@/app/models/Images";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error("Could not fetch image");
    }
    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}

export default async function addBlurredDataUrl(
  images: ImagesResults
): Promise<Photo[]> {
  const base64Promises = images.photos.map((photo) =>
    getBase64(photo.src.large)
  );
  const base64Results = await Promise.all(base64Promises);
  const photosWithBlur: Photo[] = images.photos.map((photo, index) => {
    {
      photo.blurredDataUrl = base64Results[index];
      return photo;
    }
  });
  return photosWithBlur;
}
