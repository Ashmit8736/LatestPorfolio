import multer from 'multer';
import nc from 'next-connect';
import path from 'path';

// Disable Next.js default body parser to allow multer to parse multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  }),
});

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.use(upload.single('image'));

handler.post((req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // The path starts from the public directory, so the URL should be /uploads/...
  const imageUrl = `/uploads/${req.file.filename}`;
  
  res.status(200).json({ url: imageUrl });
});

export default handler;
