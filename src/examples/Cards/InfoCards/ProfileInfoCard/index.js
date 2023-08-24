/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import React, { useState } from "react";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "../../../../assets/theme/base/colors";
import typography from "../../../../assets/theme/base/typography";
import { Button, Form, Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import SoftButton from "../../../../soft-components/SoftButton";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import SoftInput from "../../../../soft-components/SoftInput";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../../../../firebase";
import Swal from "sweetalert2";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Input } from "antd";

const TextArea = Input.TextArea;


function ProfileInfoCard({ title, description, info, social, action }) {
  const [modalShow, setModalShow] = React.useState(false);
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [institution, setInstitution] = useState('')
  const [mobile, setMobile] = useState('')
  const [bio, setBio] = useState('')
  const [show, setShow] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = React.useState(false);


  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleOpenBackdrop = () => {
    setOpen(true);
  };


  const handleChangeInstitution = (event) => {
    setInstitution(event.target.value);
  };

  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });
  
    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);


  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  const openModalFun = (firstName, lastName, mobile, bio) => {
    setModalShow(true);
    setFirstName(firstName)
    setLastName(lastName)
    setMobile(mobile)
    setBio(bio)
  }

  const handleClose = () => {
    setShow(false);
    setProfilePhoto(null);
    setPreviewImage(null);
  };

  const handleShow = () => setShow(true);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePhotoUpload = () => {
    handleOpenBackdrop()
    const storageRef = storage.ref(`profile_photos/${authId}`);
    const uploadTask = storageRef.put(profilePhoto);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Profile photo updated',
          text: `Error uploading profile photo:', ${error}`,
          customClass: {
            container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
          }
        })
        handleCloseBackdrop()
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection('users').doc(authId).update({ profilePhoto: downloadURL });
          handleClose();
          handleCloseBackdrop()
          Swal.fire({
            icon: 'success',
            title: 'Profile photo updated',
            text: 'Your profile photo has been updated successfully!',
            customClass: {
              container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
            }
          })
        })
      }
    );
  };

  const UpdateProfile = () => {
     handleOpenBackdrop()
     
    db.collection('users').doc(authId).update({ firstName: firstName, lastName: lastName, phone: mobile, bio: bio })
    .then(() => {
      handleCloseBackdrop()
      Swal.fire({
        icon: 'success',
        title: 'Profile updated',
        text: 'Your profile has been updated successfully!',
        customClass: {
          container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
        }
      })
    }).catch((error) => {
      handleCloseBackdrop()
      Swal.fire({
        icon: 'error',
        title: 'Profile not updated',
        text: `Error updating profile:', ${error}`,
        customClass: {
          container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
        }
      })
    })
  };

  const requestAccountDelete = () =>{
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete your account. This action cannot be undone!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleOpenBackdrop();

        db.collection('users')
          .doc(authId)
          .update({ requestDelete: true })
          .then(() => {
            handleCloseBackdrop();
            Swal.fire({
              icon: 'success',
              title: 'Account Deletion Request',
              text: 'Your request has been sent to the admin and shall be reviewed within 24 hrs!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
          })
          .catch((error) => {
            handleCloseBackdrop();
            Swal.fire({
              icon: 'error',
              title: 'Account Deletion Request',
              text: 'Error during sending of your request. Please try again later!',
              customClass: {
                container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
              },
            });
          });
      }
    });
  }

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SoftBox key={label} display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SoftTypography>
      <SoftTypography style={{color:'#BABABA'}} variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </SoftTypography>
    </SoftBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <SoftBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </SoftBox>
  ));

  return (
    <Card 
    sx={{
      backdropFilter: `saturate(200%) blur(30px)`,
      backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
      border:'1px solid #D1D1D1'
    }}
    height="100%"
    style={{background:"transparent"}}
    >
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip onClick={() => openModalFun(currentUser?.firstName, currentUser?.lastName, currentUser?.phone, currentUser?.bio)} title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" style={{color:'#BABABA'}} fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        <SoftBox>
          {renderItems}

        </SoftBox>
      </SoftBox>

      <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{
        zIndex:1500
      }}
    >
      <Modal.Header 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: 'linear-gradient(310deg, #050816, #090325)',
        color: '#fff',
        backdropFilter: 'blur(10px)', // Apply the blur effect
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add a semi-transparent background color
      }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Profile Edit
        </Modal.Title>
        <CloseIcon onClick={() => setModalShow(false)} fontSize="medium" style={{cursor:'pointer'}} />
      </Modal.Header>
      <Modal.Body
      style={{
        background: 'linear-gradient(310deg, #050816, #090325)',
        color: '#fff',
        backdropFilter: 'blur(10px)', // Apply the blur effect
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
        height:'auto',
        overflowY:'auto'
      }}
      >
        <MDBRow style={{
          height:'100%',
          background: 'linear-gradient(310deg, #050816, #090325)',
        }}  className="justify-content-center align-items-center h-100">
          <MDBCol
          style={{
            width:'100%',
            height:'100%',
            background: 'linear-gradient(310deg, #050816, #090325)',
          }}
          lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem',height: '100%', background: 'linear-gradient(310deg, #050816, #090325)', border:'none' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage onClick={handleShow} src={currentUser?.profilePhoto}
                    alt={currentUser?.firstName} className="my-5" style={{ width:80, height:80, borderRadius:80/2, cursor: 'pointer', objectFit: 'cover',display:'table',margin:'auto' }} fluid />
                  <MDBTypography style={{color:'#D1D1D1'}} tag="h5">{currentUser?.firstName} {currentUser?.lastName}</MDBTypography>
                  <MDBCardText>Member</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                  
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography style={{color:'#D1D1D1'}} tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" style={{color:'#D1D1D1'}}/>
                    <MDBRow className="pt-1">
                    <Grid item xs={12} sm={6}>
                    <MDBTypography style={{color:'#D1D1D1'}} tag="h6">First Name</MDBTypography>
                    <SoftInput 
                    fullWidth
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Jessy" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <MDBTypography style={{color:'#D1D1D1'}} tag="h6">Last Name</MDBTypography>
                  <SoftInput 
                  fullWidth
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Bandya" />
                  </Grid>
                  </MDBRow>
                    <br />
                    <MDBRow className="pt-1">
                    <Grid item xs={12} sm={6}>
                    <MDBTypography style={{color:'#D1D1D1'}} tag="h6">Mobile Phone</MDBTypography>
                    <SoftInput 
                    fullWidth
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    placeholder="0746749307" />
                  </Grid>
                  </MDBRow>
                  <MDBRow className="pt-1">
                  <Grid item xs={12}>
                  <MDBTypography style={{color:'#D1D1D1'}} tag="h6">Bio</MDBTypography>
                  <TextArea 
                  fullWidth
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Your Bio..." />
                </Grid>
                </MDBRow>
                  </MDBCardBody>

                  <center style={{bottom: 1}}>
                  <SoftButton
                  component="a"
                  target="_blank"
                  rel="noreferrer"
                  fullWidth
                  onClick={UpdateProfile}
                  className="blinking-button"
                >
                Update Profile
                </SoftButton>
                  </center>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Modal.Body>
      <Modal.Footer
      style={{
        background: 'linear-gradient(310deg, #050816, #090325)',
        color: '#fff',
        backdropFilter: 'blur(10px)', // Apply the blur effect
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
      }}
      >
        <Button style={{backgroundColor:'red', border:'1px solid red'}} onClick={requestAccountDelete}>Remove Account</Button>
      </Modal.Footer>
    </Modal>


    <Modal show={show} onHide={handleClose}
    centered
    style={{
      zIndex:1501
    }}
    >
    <Modal.Header
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: 'linear-gradient(310deg, #050816, #090325)',
      color: '#fff',
      backdropFilter: 'blur(10px)', // Apply the blur effect
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add a semi-transparent background color
    }}
    closeButton>
      <Modal.Title>Change Profile Photo</Modal.Title>
    </Modal.Header>
    <Modal.Body
    style={{
      background: 'linear-gradient(310deg, #050816, #090325)',
      color: '#fff',
      backdropFilter: 'blur(10px)', // Apply the blur effect
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add a semi-transparent background color
    }}
    >
    {previewImage && (
      <div className="image-preview-container">
        <img src={previewImage} alt="Preview" className="image-preview" />
      </div>
    )}
    <Form>
      <Form.Group>
        <Form.Label>Choose a new photo:</Form.Label>
        <Form.Control type="file" onChange={handlePhotoChange} />
      </Form.Group>
    </Form>
    <Backdrop
    sx={{ color: '#fff', zIndex: 2000 }}
    open={open}
    onClick={handleCloseBackdrop}
  >
    Processing...<CircularProgress color="inherit" />
  </Backdrop>
  </Modal.Body>
    <Modal.Footer
    style={{
      background: 'linear-gradient(310deg, #050816, #090325)',
      color: '#fff',
      backdropFilter: 'blur(10px)', // Apply the blur effect
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add a semi-transparent background color
    }}
    >
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button className="blinking-button" variant="primary" onClick={handlePhotoUpload}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>


    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
