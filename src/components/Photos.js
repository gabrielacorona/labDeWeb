import React, { useState } from "react";


async function addPhoto(photo) {
    return fetch('/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: photo
    }).catch(error => error.json())
}
  
const Photos = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
    let resp = await addPhoto(selectedImage)
}

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={handleSubmit}
      />
    </div>
  );
};

export default Photos;