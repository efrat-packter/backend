const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, 'imageMetadata.json');

function loadMetadata() {
  if (!fs.existsSync(metadataPath)) {
    fs.writeFileSync(metadataPath, JSON.stringify({ images: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
}
function saveMetadata(metadata) {
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
}

// function saveImage(imageName, imagePath, parentId = null) {
//   const metadata = loadMetadata();
//   const newImage = {
//     id: metadata.images.length + 1,
//     name: imageName,
//     path: imagePath,
//     parentId,
//   };
//   metadata.images.push(newImage);
//   saveMetadata(metadata);
// }
function saveImage(imageName, imagePath, parent = null) {
  const metadata = loadMetadata();
  if(parent==null)
  {

    parent=  Number(metadata.images.length + 1)
  }
  const newImage = {
    id: Number(metadata.images.length + 1),
    name: imageName,
    path: imagePath,
parentId:Number(parent)
  };
  
  metadata.images.push(newImage);
  saveMetadata(metadata);
  return newImage;
}

function getParentImages() {
  const metadata = loadMetadata();
  return metadata.images.filter((image) => image.parentId === image.id);
}

function getChildImages(parentId) {
  const metadata = loadMetadata();
 x= metadata.images.filter((image) => image.parentId===Number(parentId));
 console.log(x)
  return x;
}



// const imageDirectory = path.join(__dirname, '..', 'images');

// Function to retrieve all image file names
// function getAllImages() {
//   return fs.readdirSync(imageDirectory);
// }

// Function to retrieve a specific image by name
// function getImage(imageName) {
//   const imagePath = path.join(imageDirectory, imageName);
//   if (fs.existsSync(imagePath)) {
//     return imagePath;
//   } else {
//     throw new Error('Image not found');
//   }
// }
// function getAllImages() {
//   return fs.readdirSync(imageDirectory).map(file => path.join(imageDirectory, file));
// }

module.exports={
  saveImage,
  getParentImages,
  getChildImages,
// getAllImages,
// getImage,
};
