const imageRepo = require('../repositories/imageRepository')
const path = require('path')
const nodemailer = require("nodemailer");
require('dotenv').config();  // Load environment variables

const sendEmail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {

    // Configure your SMTP transporter (e.g., using Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // Using environment variables
        pass: process.env.EMAIL_PASS,  // Using environment variables
      },
    });

    // Define email details
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: process.env.DESIGNER_EMAIL, // Designer's email address from environment variable
      subject: "New Message from Website",
      text: `You have a new message from ${name} (${phone}, ${email}):\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
};







const uploadImage = (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const parentId = req.body.parentId || null
    const imageName = req.file.originalname;
    imagePath = path.join('images', req.file.filename)
    const savedImage = imageRepo.saveImage(imageName, imagePath, parentId)
    // const imageData=req.file.path;
    // imageRepo.saveImage(imageName, imageData)

    res.status(200).json({ message: 'Image uploaded successfully', image: savedImage });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}
const getParentImages=(req, res) => {
  try {
    const images = imageRepo.getParentImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getChildImages =(req, res) => {
  try {
    const { parenId } = req.params;
    const images = imageRepo.getChildImages(parenId);
    res.status(200).json(images);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getImages = (req, res) => {
  const images = imageRepo.getAllImages();
  res.status(200).json(images)
}
const getImage = (req, res) => {
  try {
    const imageName = req.params.imageName
    const imagePath = imageRepo.getImage(imageName)
    res.sendFile(imagePath)
  } catch (error) {
    res.status(404).json({ error: error.message }); // Return 404 if the image is not found
  }


}

module.exports = { 
  getImages, 
  getImage,  
  uploadImage,
  getParentImages,
  getChildImages, 
  sendEmail
}



