import { ImageFromApi } from "~/server/models/todos";
import { Image } from "~/utils/types";

export const formatToImage = (image: ImageFromApi): Image => {
  return {
    bucketId: image.bucketId,
    fileId: image.$id,
  };
};
