import { Id } from "@/convex/_generated/dataModel";

export async function getText(url: string) {
  const res = await fetch("http://localhost:3000/api#/parsers/PdfParserController_parsePdfFromUrl", {
    method: "POST",
    headers: {
      "X-API-Key": process.env.X_API_KEY as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (res.status === 422) {
    return "";
  }

  // if (!res.ok) {
  //   throw new Error("Failed to do text recognition");
  // }

  const { content } = await res.json();
  return content;
}


export function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}
