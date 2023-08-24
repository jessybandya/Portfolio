import { CircularProgress, Slide, TableCell, TableRow } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import { db, storage } from '../../../../../../../firebase';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'; 
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import General from './General';
import Progress from './Progress';
import Images from './Images';
import Documents from './Documents';
import { Modal } from 'react-bootstrap';
import firebase from 'firebase';
import Backdrop from '@mui/material/Backdrop';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Post({ name, postID, descriptions, cancel, category, clientID, dueDate, features, images, orderID, paidAmount, paidStatus, progress, projectLinks, projectStatus, webLinks, subCategory, subList, techies, timestamp, totalAmount}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('')
  const vertical= "bottom"
  const horizontal= "right"
  const [openModal, setOpenModal] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const onFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };



  const onDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    setFiles(updatedFiles);
  };

  const onUpload = async () => {
    handleOpenBackdrop()
    if (files.length === 0) {
      toast.error("Kindly add images!");
      handleCloseBackdrop()
    } else {
      handleOpenBackdrop()
      const storageRef = storage.ref("project-progress-images");
      const imageUploadPromises = files.map(async (file, index) => {
        const fileRef = storageRef.child(`${postID}/${file.name}`);
        await fileRef.put(file);
        return {
          name: file.name,
          url: await fileRef.getDownloadURL(),
          timestamp: Date.now(),
        };
      });

      const uploadedImages = await Promise.all(imageUploadPromises);

      db.collection("orders")
        .doc(postID)
        .update({
          images: firebase.firestore.FieldValue.arrayUnion(...uploadedImages),
        });
        handleCloseBackdrop()
        setModalShow(false)
        setFiles([])
      toast.success("Successfully uploaded photos...");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClickClose = () => {
    setOpenModal(false);
  };

  const handleClick = (text) => {
    setOpen(true);
    setText(text)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      handleClick(`Copied: ${text}`)
    });
  };
  var d = timestamp;
  //var d =val.timestamp;
  //NB: use + before variable name
  var date = new Date(+d);

  const cancelFun = () => {
    const confirmation = window.confirm(
      `Are you sure you want to cancel ${name} - orderID: ${orderID}?`
    );
  
    if (confirmation) {
      db.collection('orders')
        .doc(postID)
        .update({
          cancel: true,
        })
        .then(() => {
          sendEmail()
          toast.success(`${name} - ${orderID} is now cancelled`, {
            position: 'top-center',
          });
        })
        .catch((err) => {
          toast.error(`Failed to cancel ${name} - ${orderID}`, {
            position: 'top-center',
          });
        });
    }
  };

  const sendEmail = () => {
    const email = `jessy.bandya5@gmail.com`; // Replace with the email address you want to send the email to
    const subject = `Cancellation ID:${orderID?.toString()} - ${name}`; // Replace with the subject of your email

    const messageMarkdown = `
Order ID: ${orderID?.toString()}
Name: ${name}
    `;

    const body = `
Dear Uwimana Jessy Bandya, Hope this email finds you well. I am writing to inform you that I've cancelled my Order.

${messageMarkdown}

    `;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, '_blank');
  }
  
  return (
    <TableRow>
      <TableCell style={{fontWeight:'bold',color:'#BABABA'}}>{orderID} <ContentCopyIcon style={{color:'#D1D1D1',cursor:'pointer'}} onClick={() => copyToClipboard(orderID)}/></TableCell>
      <TableCell align='right'>{projectStatus === "Pending" ? <span style={{color:'#FF5C5C',fontWeight:'bold'}}>Pending</span>: projectStatus === "Accepted" ? <span style={{color:'#2EFF2E',fontWeight:'bold'}}>Accepted</span>: projectStatus === "Ongoing" ? <span style={{color:'#D396FF',fontWeight:'bold'}}>Ongoing</span> : <span style={{color:'#FFB52E',fontWeight:'bold'}}>Completed</span>}</TableCell>
      <TableCell align='right'><RemoveRedEyeIcon onClick={handleClickOpen} style={{fontWeight:'bold',color:'#BABABA',cursor:'pointer'}}/></TableCell>
      <TableCell align='right' style={{fontWeight:'bold',color:'#BABABA'}}>{date.toDateString()}</TableCell>
      <TableCell align='right'>{cancel === false ? <CloseIcon onClick={cancelFun} style={{fontWeight:'bold',color:'#BABABA',cursor:'pointer'}}/> : <span style={{fontWeight:'bold',color:'#FF8A8A'}}>Cancelled</span>}</TableCell>


          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
    anchorOrigin={{ vertical, horizontal }}
    TransitionComponent={SlideTransition}
    >
    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
      {text}
    </Alert>
  </Snackbar>



  <Dialog
  fullScreen
  open={openModal}
  onClose={handleClickClose}
  TransitionComponent={Transition}
  sx={{ zIndex: 1000}}

>
  <AppBar 
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    background: 'linear-gradient(310deg, #050816, #090325)',
    color: '#fff',
    position: 'relative',
    backdropFilter: 'blur(0px)', // Apply the blur effect
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add a semi-transparent background color
  }}
  >
    <Toolbar>
      <Typography sx={{ flex: 1, fontSize:15 }} variant="h6" component="div">
        <b>ID:</b> {orderID}
      </Typography>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClickClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
    </Toolbar>
  </AppBar>

  <Box 
  style={{
    background: 'linear-gradient(310deg, #050816, #090325)',
    color: '#fff',
    backdropFilter: 'blur(10px)', // Apply the blur effect
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color,
  }}
  className="modal-content"
  >
  <AppBar position="static"
  style={{
    background: 'linear-gradient(310deg, #050816, #090325)',
    color: '#fff',
    backdropFilter: 'blur(10px)', // Apply the blur effect
    backgroundColor: 'rgba(0, 0, 0, 5)', // Add a semi-transparent background color,
  }}
  >
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="inherit"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <Tab label="General" {...a11yProps(0)} />
      <Tab label="Progress" {...a11yProps(1)} />
      <Tab label="Images" {...a11yProps(2)} />
      <Tab label="Documents" {...a11yProps(3)} />
    </Tabs>
  </AppBar>
  <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={value}
    onChangeIndex={handleChangeIndex}
  >
    <TabPanel value={value} index={0} dir={theme.direction}>
      <General  postID={postID} name={name} category={category} subCategory={subCategory} features={features} descriptions={descriptions} techies={techies}/>
    </TabPanel>
    <TabPanel value={value} index={1} dir={theme.direction}>
      <Progress totalAmount={totalAmount} dueDate={dueDate} paidAmount={paidAmount} paidStatus={paidStatus} progress={progress} projectLinks={projectLinks} webLinks={webLinks} subList={subList} projectStatus={projectStatus}/>
    </TabPanel>
    <TabPanel value={value} index={2} dir={theme.direction}>
    <center style={{marginTop:-20}}>     
    <Fab onClick={() => setModalShow(true)} color="primary" aria-label="add" style={{backgroundColor:'#2a68af'}}>
    <Add fontSize="large" />
  </Fab>
  </center>
      <Images postID={postID} images={images} name={name}/>
    </TabPanel>
    <TabPanel value={value} index={3} dir={theme.direction}>
      <Documents />
  </TabPanel>
  </SwipeableViews>
</Box>

<Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    style={{
      zIndex:1501,
    }}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
  >
    <Modal.Header
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: 'linear-gradient(310deg, #050816, #090325)',
      color: '#fff',
      backdropFilter: 'blur(10px)', // Apply the blur effect
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
      borderLeft: "1px solid #fff",
      borderTop: "1px solid #fff",
      borderRight: "1px solid #fff"
    }}
    >
      <Modal.Title id="contained-modal-title-vcenter">
      Upload Images
      </Modal.Title>
      <CloseIcon onClick={() => setModalShow(false)} fontSize="medium" style={{cursor:'pointer'}} />
    </Modal.Header>
    <Modal.Body
    style={{
      background: 'linear-gradient(310deg, #050816, #090325)',
      color: '#fff',
      backdropFilter: 'blur(10px)', // Apply the blur effect
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
      borderLeft: "1px solid #fff",
      borderBottom: "1px solid #fff",
      borderRight: "1px solid #fff"
    }}
    >
      <div>
      <center>
      <input type="file" multiple onChange={onFileChange} />
      </center>
      <div style={{display:'flex', alignItems:'center',flexWrap:'wrap',justifyContent:'center'}}>
        {files.map((file, index) => (
          <div style={{margin:3}} key={index}>
            <center>
            <button onClick={() => onDelete(index)}>Remove</button>
            </center>
            <img src={URL.createObjectURL(file)} alt={`loading...`} style={{height:100, width:100, objectFit:'cover'}} />
          </div>
        ))}
      </div>
      <Button
      className="blinking-button"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
        onClick={onUpload}
      >
       Upload
      </Button>
    </div>

    </Modal.Body>
  </Modal>

  <Backdrop
  sx={{ color: '#fff', zIndex: 2001 }}
  open={openBackdrop}
  onClick={handleCloseBackdrop}
>
  Uploading...<CircularProgress color="inherit" />
</Backdrop>
</Dialog>
    </TableRow>
  )
}

export default Post