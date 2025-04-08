import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to create uploads dir if not exist
const createUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export async function POST(req) {
  const uploadDir = path.join(process.cwd(), "/public/uploads");
  createUploadDir(uploadDir);

  const form = formidable({
    multiples: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      return `${Date.now()}-${part.originalFilename.replace(/\s/g, "_")}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Upload Error:", err);
        return resolve(
          NextResponse.json({ error: "Failed to upload files" }, { status: 500 })
        );
      }

      const uploaded = Array.isArray(files.file) ? files.file : [files.file];
      const urls = uploaded.map((file) => `/uploads/${path.basename(file.filepath)}`);

      return resolve(NextResponse.json({ urls }, { status: 200 }));
    });
  });
}
