const imageRepo = require('../repositories/imageRepository')
const path = require('path')
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
}



