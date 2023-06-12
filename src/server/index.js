import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Configure AWS
AWS.config.update({ 
accessKeyId: 'AKIA5LURTCX2SFCBQMWK', 
secretAccessKey: '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', 
region: 'us-east-1', 
});

const s3 = new aws.S3();

// Configure multer middleware for file uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'anantadiassignment',
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Enable JSON body parsing
app.use(bodyParser.json());

// Handle video uploads
app.post('/api/videos', upload.array('videos', 5), (req, res) => {
  const uploadedFiles = req.files.map((file) => {
    return {
      filename: file.originalname,
      location: file.location,
      key: file.key,
    };
  });

  res.json({ files: uploadedFiles });
});

// Handle JSON uploads
app.post('/api/json', upload.array('json', 5), (req, res) => {
  console.log(req.files);
  res.json({ message: 'JSON files uploaded successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
