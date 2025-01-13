
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer=require('multer')
const imageController = require('./controllers/imageController'); // Import your controller
const PORT = process.env.PORT || 3000;

const nodemailer = require("nodemailer")
const app = express();
app.use(express.json());
// Enable CORS for the specified frontend origin
app.use(cors({
  origin: 'http://localhost:3001', // Adjust to match your frontend origin
}));
// Serve static images from the 'images' directory
// app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use('/images', express.static(path.join(__dirname, 'images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images')); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  },
});
const upload = multer({ storage });
app.post('/upload/send-email/',upload.none(), imageController.sendEmail);


app.post('/upload', upload.single('image'), imageController.uploadImage);

// Route to get all image filenames
app.get('/images/getParentImages', imageController.getParentImages);
app.get('/images/getChildImages/:parenId', imageController.getChildImages);


// Route to get a specific image by name
// app.get('/images/:imageName', imageController.getImage);
// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

