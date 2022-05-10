import React, { useState } from "react";
import axios from 'axios'



async function postImage(image, description) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)
  const result=""
  try{
    result = await axios.post('/fotos', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    
  }catch(err){
    console.log(err.message)
  }
  return result.data
}

  
const Photos = () => {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const handleSubmit = async e => {
      e.preventDefault()
      const picture = document.getElementById("addImage")
      let file = picture.files[0]
      const imgDescription = document.getElementById("imageDesc")
      postImage(file, imgDescription.value)
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    console.log(file)
		setFile(file)
	}

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      <br />
      <br /> 
      <form onSubmit={handleSubmit}>
        <input
        id="addImage"
        type="file"
        accept="image/*"
        />
        <input
        id="imageDesc"
        value={description}
        onChange={e => setDescription(e.target.value)} 
        type="text"/>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}
      <img src="https://control-de-moldes.s3.amazonaws.com/2022-5-10%2013%3A13%3A52%20dibujo2.png"></img>

        

    </div>
  );
};

export default Photos;