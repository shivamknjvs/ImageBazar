import React from "react";
import ImageGallery from "../Componets/ImageGallery";
import { useState } from "react";
import "./Home.css";

const Home = ({ currentUser, setHasAccess, hasAccess }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState(
    JSON.parse(localStorage.getItem("galleryImages")) || []
  );

  const handleImageUpload = async (e) => {
    if (selectedImage) {
      // Read the selected image file as base64
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create a new image object with a unique ID (you can use a library like uuid)
        const newImage = {
          id: new Date().getTime(),
          name: selectedImage.name,
          uploadedBy: currentUser.username,
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

        setUploading(false);
        setUploadProgress(0);
      };

      reader.readAsDataURL(selectedImage);
    }
    // Read the selected image as a data URL
  };
  const subscribe = () => {
    const user = JSON.parse(localStorage.getItem(currentUser.username));
    console.log("useeeeer", user);
    user.hasAccess = true;
    localStorage.setItem(currentUser.username, JSON.stringify(user));

    window.alert("Thanks for subscribing");
    setHasAccess(true);
  };

  console.log("currrrent user", currentUser);

  var currentUserImages = currentUser
    ? galleryImages.filter((image) => image.uploadedBy === currentUser.username)
    : [];
  var otherUserImages = currentUser
    ? galleryImages.filter((image) => image.uploadedBy != currentUser.username)
    : [];

  console.log("currentUser from homeeeee", currentUserImages);
  console.log("hjdsfsd", otherUserImages);

  return (
    <>
      {currentUser != null ? (
        <div className="images">
          <div className="heading">
            <div class="upload-btn-wrapper">
              <button class="btn" onClick={handleImageUpload}>
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

          {currentUserImages ? (
            <ImageGallery userImages={currentUserImages} />
          ) : (
            <section className="noimages">
              {" "}
              <h1>No Images to show</h1>
            </section>
          )}

          {hasAccess ? (
            <>
              <section className="access">
                <h1>Images uploaded by Other Users</h1>
              </section>
              <ImageGallery userImages={otherUserImages} />
            </>
          ) : (
            <section className="noAccess">
              <button
                onClick={() => {
                  subscribe();
                }}
              >
                <h1>Subscribe to see images of Other users</h1>
              </button>
            </section>
          )}
        </div>
      ) : (
        <div className="hero">
          <h1>Welcome to the ImageBazar!</h1>
          <p>Please log in or sign up to see the images.</p>
        </div>
      )}
    </>
  );
};

export default Home;
