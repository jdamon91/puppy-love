import React, { Fragment, useState } from "react";
import config from '../../config';
import "./EditSelection.css";

const { API_ENDPOINT } = config;

const EditSelection = (props) => {
  console.log(props.user)
  const { photo_url } = props.user;
  const { user_id } = props.user;
  console.log(photo_url)
  const [description, setDescription] = useState(props.photo_url);
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [err, setErr] = useState("");


  //Profile image file

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const [show, setShow] = useState(false);

  const showModal = e => {
    setShow(true);
  };

  const onClose = e => {
    setShow(false);
  };

  //edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      console.log(previewSource)
      const body = { previewSource, user_id };
      const response = await fetch(
        `${API_ENDPOINT}users/${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!show) {
    return (
      <button
      className="dash-btn"
      id="centered-toggle-button"
      onClick={e => {
          showModal(e);
        }}
      >
      {" "}
      Update Profile <i className="fas fa-caret-right"></i>{" "}
      </button>
    )
  }

  return (
    <Fragment>
      <div className="modal" id="modal-img">
        <i id="modal-close" class="fas fa-window-close pink" onClick={onClose}></i>
        <div class="modal-content">
            <div class="modal-body">
             <div className='input-field'>
                {previewSource && (
                  <img 
                    className="profile-preview"
                    src={previewSource} 
                    alt="chosen" 
                  />
                )}
                {!previewSource && (
                  <i className="fas fa-user-circle"></i>
                )}
                <input type="file"
                  value={fileInputState} 
                  onChange={handleFileInputChange} 
                  name="image" 
                  id="file" 
                  className="inputfile" 
                />
                <label htmlFor="file">Upload Picture</label>
                <div className="err-msg">{err}</div>
                <button id="img-submit" className="dash-btn mb-25" onClick={e => updateDescription(e)}>Submit</button>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default EditSelection;