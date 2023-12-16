import React from "react";
import ImageGallery from "./ImageGallery";
import { useState, useEffect } from "react";
import "./Admin.css";

const Home = ({ currentUser, setcurrentUser,setHasAccess, hasAccess, setIsAdmin }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState(
    JSON.parse(localStorage.getItem("galleryImages")) || []
  );

  useEffect(()=>{
    setIsAdmin(true);
    localStorage.setItem("currentUser", "admin");
  
  })
  const handleImageUpload = async (e) => {

    if (selectedImage) {
      // Read the selected image file as base64
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create a new image object with a unique ID (you can use a library like uuid)
        const newImage = {
          id: new Date().getTime(),
          name: selectedImage.name,
          uploadedBy: "admin",
          data: e.target.result.split(",")[1], // Extract base64 data
        };

        // Update the galleryImages state with the new image
        setGalleryImages((prevImages) => [...prevImages, newImage]);

        // Update local storage with the new galleryImages array
        localStorage.setItem(
          "galleryImages",
          JSON.stringify([...galleryImages, newImage])
        );

        // Clear the selected image after upload
        setSelectedImage(null);

      };

      reader.readAsDataURL(selectedImage);
      setSelectedImage(null);
    }
    // Read the selected image as a data URL
  };

  const handleDeleteImage = (imageId) => {
    // Delete image from local storage
    const updatedImages = galleryImages.filter((image) => image.id !== imageId);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    setGalleryImages(updatedImages);
  };

  return (
    <>
      
        <div className="images">
          <div className="heading">
            <div class="upload-btn-wrapper">
              <button class="btn" onClick={()=>{
                setSelectedImage(null);
                handleImageUpload()}}>
                Upload New Image
              </button>
              <input
                type="file"
                accept="image/*"
                name="myfile"
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                  handleImageUpload(e);
                }}
              />
            </div>
            <h1> Gallery</h1>
          </div>
          {galleryImages!=null?<ImageGallery userImages={galleryImages} isAdmin={true} handleDeleteImage={handleDeleteImage} /> :<h1>Nothing to show</h1>}

        </div>
         
    </>
  );
};

export default Home;
