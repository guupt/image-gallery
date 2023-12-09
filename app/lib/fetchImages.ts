import type { ImagesResults } from "@/app/models/Images";
import { ImageSchemaWithPhotos } from "../models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.API_PEXELS_KEY,
      },
    });
    if (!res.ok) throw new Error("Fetch Images error!\n");
    const ImagesResults: ImagesResults = await res.json();
    console.log(ImagesResults);
    //Parse data with zod schema
    const parsedData = ImageSchemaWithPhotos.parse(ImagesResults);

    if (parsedData.total_results === 0) return undefined;

    return parsedData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
}
