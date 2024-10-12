import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "uploads/"));
  },
  filename(req, file, cb) {
    const date = new Date().toISOString().replace(/:/g, "-");
    cb(null, `${date}-${file.originalname.toLowerCase()}`);
  },
});

function verifyFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extension = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extension && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Wrong file format"));
  }
}

const options: multer.Options = {
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter(req, file, cb) {
    verifyFileType(file, cb);
  },
};

const multipleOptions: multer.Options = {
  ...options,
  limits: { fileSize: options.limits?.fileSize, files: 6 },
};

const uploadSingle = multer(options).single("image");
const uploadMultiple = multer(multipleOptions).array("image");

export { uploadSingle, uploadMultiple };
