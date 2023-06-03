import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState(); 
  const [previewUrl, setPreviewUrl] = useState(); 
  const [isValid, setIsValid] = useState(false); 

  const filePickerRef = useRef(); // Reference to the file input element

  useEffect(() => {
    // This effect runs when the 'file' state changes
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file); 
  }, [file]);

  const pickedHandler = event => {
    // Event handler for when a file is picked
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      // If a file is selected
      pickedFile = event.target.files[0]; 
      setFile(pickedFile); 
      setIsValid(true);
      fileIsValid = true; 
    } else {
      setIsValid(false); 
      fileIsValid = false; 
    }
    props.onInput(props.id, pickedFile, fileIsValid); 
  };

  const pickImageHandler = () => {
    // Event handler for picking an image
    filePickerRef.current.click(); 
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />} {/* Display the image preview if available */}
          {!previewUrl && <p>Please pick an image.</p>} {/* Display a message if no image is selected */}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>} {/* Display an error message if the selected image is not valid */}
    </div>
  );
};

export default ImageUpload;
