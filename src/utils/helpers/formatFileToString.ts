import fs from "fs";
import path from "path";

export function formatFileToString(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}

export const formatDataURLToFile = (url: string, fileName: string) => {
  const mimeType = getMimeTypeFromBase64(url);

  const byteCharacters = Buffer.from(url, "base64");
  const file = fs.writeFileSync(fileName, byteCharacters, {
    encoding: "binary",
  });

  return file;
  // const res = await fetch(url);
  // const buf = await res.arrayBuffer();

  // return new File([buf], filename, { type: mimeType });
  // const filePath = path.join(__dirname, fileName);
  // const buffer = Buffer.from(url, "base64");

  // fs.writeFileSync(filePath, buffer, "base64");

  // const fileStats = fs.statSync(filePath);

  // return {
  //   name: fileName,
  //   size: fileStats.size,
  //   type: mimeType,
  //   buffer: buffer,
  //   path: filePath,
  // };
};

const getMimeTypeFromBase64 = (base64String: string) => {
  const mimeTypeRegex = /^data:(.+);base64,(.*)$/;

  const splittedMimeType = base64String.match(mimeTypeRegex);
  if (splittedMimeType) {
    return splittedMimeType[1];
  }
  return "image/png";
};
