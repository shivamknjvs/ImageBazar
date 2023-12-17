// ImageGallery.js
import React from 'react';
import './ImageGallery.css';

const ImageGallery = ({ userImages, isAdmin, handleDeleteImage}) => {
 
  const handleImageClick = (imageId) => {
    if (isAdmin) {
      // If the user is an admin, trigger the delete action
      handleDeleteImage(imageId);
    }
    // Add any other actions you want to perform when a non-admin user clicks on an image
  };
  return (
    <>
   {isAdmin&&<span className='delete'> <h2>Click on the image to delete it</h2></span>}
    <div className="gallery "  >
    
      {userImages.map((image) => (
       
   <img key={image.id} src={`data:image/png;base64,${image.data}`} alt={image.name}  onClick={() => handleImageClick(image.id)}/>
   
       
        ))}
    </div>
    </>
  );
};

export default ImageGallery;
