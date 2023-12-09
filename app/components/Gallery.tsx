import fetchImages from "@/app/lib/fetchImages";
import type { Photo, ImagesResults } from "@/app/models/Images";
import Image from "next/image";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrl from "../lib/getBase64";

type Props = {
  topic?: string | undefined;
  photo?: Photo;
};

export default async function Gallery({ topic }: Props) {
  const url = !topic
    ? `https://api.pexels.com/v1/curated`
    : `https://api.pexels.com/v1/search?query=${topic}`;

  const images: ImagesResults | undefined = await fetchImages(url);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images found</h2>;

  const photoWithBlur = await addBlurredDataUrl(images);

  return (
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery auto-rows[10px]">
      {photoWithBlur.map((photo) => (
        <ImgContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
}
