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
function saveImage(imageName, imagePath, parent = null, imagText, imageTitle) {

  const metadata = loadMetadata();
  const lastId = metadata.images.length > 0 
    ? Math.max(...metadata.images.map(img => img.id)) + 1
    : 0;
    
  // אם parent הוא null, אז מדובר בתמונה ראשית
  if (parent === null) {
    parent = lastId;  // השג את ה-ID החדש של התמונה הראשית
  }

  const newImage = {
    id: lastId,
    name: imageName,
    path: imagePath,
    parentId: Number(parent),  // תמונה ראשית תקבל ID שלה כתמונה אב
    text: imagText,
    title: imageTitle,
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
  return x;
}
function deleteImage(id) {
  const metadata = loadMetadata();
  const updatedImages = metadata.images.filter(image => image.id !== Number(id)&&image.parentId!=Number(id));
  metadata.images = updatedImages;
  saveMetadata(metadata);
  return true;
}




// const imageDirectory = path.join(__dirname, '..', 'images');

// Function to retrieve all image file names
// function getAllImages() {
//   return fs.readdirSync(imageDirectory);
// }

// Function to retrieve a specific image by name
function getImage(id) {
  const metadata = loadMetadata();

  const x= metadata.images.find((image) => image.id===Number(id));
   console.log(x)
    return x;
}
// function getAllImages() {
//   return fs.readdirSync(imageDirectory).map(file => path.join(imageDirectory, file));
// }

module.exports={
  saveImage,
  getParentImages,
  getChildImages,
  deleteImage,
// getAllImages,
 getImage,
};
