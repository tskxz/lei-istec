import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { path?: string[] } | Promise<{ path?: string[] }> }
) {
  const params = await context.params;
  const root = path.join(process.cwd(), "content");
  const requestedPath = params?.path ?? [];
  const safePath = path.normalize(path.join(root, ...requestedPath));

  if (!safePath.startsWith(root) || !fs.existsSync(safePath)) {
    return new NextResponse("Ficheiro não encontrado", { status: 404 });
  }

  const stat = fs.statSync(safePath);
  if (!stat.isFile()) {
    return new NextResponse("Não é um ficheiro", { status: 400 });
  }

  const fileBuffer = fs.readFileSync(safePath);
  const contentType = getContentType(safePath);
  const fileName = path.basename(safePath);
  const isDownload = [".zip", ".rar", ".7z", ".tar", ".gz"].includes(path.extname(safePath).toLowerCase());

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": isDownload ? `attachment; filename="${fileName}"` : "inline",
    },
  });
}

function getContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".pdf":
      return "application/pdf";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".md":
      return "text/markdown; charset=utf-8";
    case ".html":
      return "text/html; charset=utf-8";
    case ".json":
      return "application/json";
    case ".zip":
      return "application/zip";
    case ".rar":
      return "application/vnd.rar";
    case ".7z":
      return "application/x-7z-compressed";
    case ".tar":
      return "application/x-tar";
    case ".gz":
      return "application/gzip";
    default:
      return "application/octet-stream";
  }
}
