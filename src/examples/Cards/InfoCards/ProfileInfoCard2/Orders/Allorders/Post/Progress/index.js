import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { PropTypes } from 'prop-types';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import Todo from './Todo';
import Product from './Product';
import Project from './Project';
import { db } from '../../../../../../../../firebase';
import { toast } from 'react-toastify';


function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" style={{color:'#fff',fontWeight:'bold'}}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
const useStyles = makeStyles({
    customTextField: {
      backgroundColor: '#050816', // Change this to your desired background color
      '& .MuiInputBase-input': {
        color: '#BABABA', // Change this to your desired text color
      },
         '& .MuiFormLabel-root': {
        color: '#BABABA', // Change this to your desired label color
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#BABABA', // Change this to your desired outline color
      },
    },
    customSelect: {
        '& .MuiInputBase-root': {
          color: '#BABABA', // Change this to your desired text color
          backgroundColor: '#050816', // Change this to your desired background color
          height: '54px', // Change this to your desired height
        },
        '& .MuiInputLabel-root': {
          color: '#BABABA', // Change this to your desired label color
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#BABABA', // Change this to your desired outline color
        },
        '& .MuiSelect-icon': {
          color: '#BABABA', // Change this to your desired select icon color
        },
        '& .MuiMenuItem-root': {
          color: 'white', // Change this to your desired menu item text color
        },
      },    
  });
function Progress({name1, orderID, clientID, totalAmount, dueDate, paidAmount, paidStatus, progress, projectLinks, webLinks, subList, projectStatus, postID }) {
    const classes = useStyles();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [name, setName] = React.useState('');
    const [progressName, setProgressName] = React.useState('');
    const [paymentStatus, setPaymentStatus] = React.useState(paidStatus);
    const [projectDuration, setProjectDuration] = React.useState(dueDate);
    const [projectTotalAmount, setProjectTotalAmount] = React.useState(totalAmount);
    const [projectPaidAmount, setProjectPaidAmount] = React.useState(paidAmount);
    const commaNumber = require('comma-number')
    const [clientDetails, setClientDetails] = React.useState(null);

  const checkedItemsCount = subList?.filter(item => item.checked).length;

  var progress1 = ((checkedItemsCount / subList?.length) * 100).toFixed(0);
  const displayPercentage = isNaN(progress1) ? 0 : progress1;

  React.useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(clientID)
      .onSnapshot((snapshot) => {
        setClientDetails(snapshot.data());
      });

    return () => unsubscribe();
  }, [clientID]);

  const handleChangePaymentStatus = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleChangeProjectDuration = (event) => {
    setProjectDuration(event.target.value);
  };

    const handleShow = (name) => {
      setModalShow(true);
        setName(name);        
    }

    const handleShowModal1 = (name) => {
      setModalShow1(true);
      setProgressName(name)
    }

    const paymentStatusUpdate = () => {
      db.collection('orders')
      .doc(postID)
      .update({
        paidStatus: paymentStatus,
      })
      .then(() => {
        toast.success("Payment Status Updated Successfully", {
          position: 'top-center',
        });
      })
      .catch((err) => {
        toast.error(`Failed to Update Payment Status`, {
          position: 'top-center',
        });
      });
    }
    const projectDurationUpdate = () => {
      db.collection('orders')
      .doc(postID)
      .update({
        dueDate: projectDuration,
      })
      .then(() => {
        toast.success("Project Duration Status Updated Successfully", {
          position: 'top-center',
        });
      })
      .catch((err) => {
        toast.error(`Failed to Update Project Duration Status`, {
          position: 'top-center',
        });
      });
    }

    const totalAmountUpdate = () => {
      db.collection('orders')
      .doc(postID)
      .update({
        totalAmount: projectTotalAmount,
      })
      .then(() => {
        toast.success("Project Total Amount Updated Successfully", {
          position: 'top-center',
        });
      })
      .catch((err) => {
        toast.error(`Failed to Update Project Total Amount`, {
          position: 'top-center',
        });
      });
    }
    
    const paidAmountUpdate = () => {
      db.collection('orders')
      .doc(postID)
      .update({
        paidAmount: projectPaidAmount,
      })
      .then(() => {
        toast.success("Project Paid Amount Updated Successfully", {
          position: 'top-center',
        });
      })
      .catch((err) => {
        toast.error(`Failed to Update Project Paid Amount`, {
          position: 'top-center',
        });
      });
    }

    const sendUpdatesViaEmail = () => {
      const email = `${clientDetails?.email}`; // Replace with the email address you want to send the email to
      const subject = `Updates ID:${orderID?.toString()} - ${name1}`; // Replace with the subject of your email
  
      const messageMarkdown = `
  Order ID: ${orderID?.toString()}
  Name: ${name1}
  Progress: ${displayPercentage}%
      `;
  
      const body = `
  Dear ${clientDetails?.firstName} ${clientDetails?.lastName}, Hope this email finds you well. I am writing to inform you that your order has been updated.You can visit your profile under order progress tab. Please find summary details below:
  
  ${messageMarkdown}
  
      `;
  
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.open(mailtoLink, '_blank');
    }
     
  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
    <label style={{color:'#BABABA'}}>Project Status</label>
    <hr style={{width:'100%'}}/>
      <Box style={{marginTop:5}}>
      {projectStatus === "Pending" ? <span style={{color:'#FF5C5C',fontWeight:'bold'}}>Pending</span>: projectStatus === "Accepted" ? <span style={{color:'#2EFF2E',fontWeight:'bold'}}>Accepted</span>: projectStatus === "Ongoing" ? <span style={{color:'#D396FF',fontWeight:'bold'}}>Ongoing</span> : <span style={{color:'#FFB52E',fontWeight:'bold'}}>Completed</span>}
      </Box>
  </Grid>
  <hr />
  <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
  <label style={{color:'#BABABA'}}>Progress</label>
  <hr style={{width:'100%'}}/>
  <Box style={{marginTop:5}}>
  <CircularProgressWithLabel value={displayPercentage} />
  </Box>
</Grid>
<Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
<label style={{color:'#BABABA'}}>Pay Status</label>
<hr style={{width:'100%'}}/>
<Box style={{marginTop:5,cursor:'pointer'}}>
{paidStatus}
</Box>
</Grid>
    </Grid>


    <Grid container style={{marginTop:5}} spacing={2}>
    <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
    <label style={{color:'#BABABA'}}>Total Amount</label>
    <hr style={{width:'100%'}}/>
    <Box style={{marginTop:5,cursor:'pointer'}}>
    Ksh{commaNumber(totalAmount)}
    </Box>
  </Grid>
  <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
  <label style={{color:'#BABABA'}}>Paid Amount</label>
  <hr style={{width:'100%'}}/>
  <Box style={{marginTop:5,cursor:'pointer'}}>
  Ksh{commaNumber(paidAmount)} - (Bal: Ksh{commaNumber(totalAmount - paidAmount)})
  </Box>
</Grid>
<Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
<label style={{color:'#BABABA'}}>Duration</label>
<hr style={{width:'100%'}}/>
<Box style={{marginTop:5,cursor:'pointer'}}>
{dueDate}
</Box>
</Grid>
    </Grid>

    <Grid container style={{marginTop:5}} spacing={2}>
    <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
    <label style={{color:'#BABABA'}}>Todo List({subList.length})</label>
    <hr style={{width:'100%'}}/>
    <Box style={{marginTop:5}}>
    <Button
      onClick={() => handleShow('Todo List')}
      type="submit"
      variant="contained"
      sx={{fontWeight: 'bold' }}
    >
     Click Here
    </Button>
    </Box>
  </Grid>
  <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
  <label style={{color:'#BABABA'}}>Web Links({webLinks.length})</label>
  <hr style={{width:'100%'}}/>
  <Box style={{marginTop:5}}>
  <Button
    onClick={() => handleShow('Product Links')}
    type="submit"
    variant="contained"
    sx={{fontWeight: 'bold' }}
  >
   Click Here
  </Button>
  </Box>
</Grid>
<Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
<label style={{color:'#BABABA'}}>Project Links({projectLinks.length})</label>
<hr style={{width:'100%'}}/>
<Box style={{marginTop:5}}>
<Button
  onClick={() => handleShow('Project Links')}
  type="submit"
  variant="contained"
  sx={{fontWeight: 'bold' }}
>
 Click Here
</Button>
</Box>
</Grid>

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
      {name}
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
  
    {name === 'Todo List' ?(
      <Todo subList={subList} postID={postID}/>
    ): name === 'Product Links' ? (
       <Product webLinks={webLinks} postID={postID}/>
    ):(
       <Project projectLinks={projectLinks} postID={postID}/>
    )}

    </Modal.Body>
  </Modal>


  <Modal
    show={modalShow1}
    onHide={() => setModalShow1(false)}
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
      {progressName}
      </Modal.Title>
      <CloseIcon onClick={() => setModalShow1(false)} fontSize="medium" style={{cursor:'pointer'}} />
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
  
    {progressName === 'Pay Status' ?(
         <>
         <FormControl fullWidth size="small"
         className={classes.customSelect}
         >
         <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
         <Select
           MenuProps={{
             style: { zIndex: 2001 },
           }}
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={paymentStatus}
           label="Payment Status"
           onChange={handleChangePaymentStatus}
           displayEmpty
           renderValue={paymentStatus !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
         >
             <MenuItem value="Unpaid">Unpaid</MenuItem>
             <MenuItem value="Partially Paid">Partially Paid</MenuItem>
             <MenuItem value="Fully Paid">Fully Paid</MenuItem>
         </Select>
       </FormControl>
         <Button
          onClick={paymentStatusUpdate}
          type="submit"
          variant="contained"
          sx={{fontWeight: 'bold',marginTop:2 }}
          fullWidth
          >
          Update
          </Button>
         </>
    ): progressName === 'Total Amount' ? (
         <>
         <TextField
         fullWidth
         label="Total Amount"
         variant="outlined"
         className={classes.customTextField}
         value={projectTotalAmount}
         onChange={(e) => setProjectTotalAmount(e.target.value)}
         />
          <Button
          onClick={totalAmountUpdate}
          type="submit"
          variant="contained"
          sx={{fontWeight: 'bold',marginTop:2 }}
          fullWidth>
          Update
          </Button>
         </>
    ): progressName === 'Paid Amount' ? (
      <>
      <TextField
      fullWidth
      label="Paid Amount"
      variant="outlined"
      className={classes.customTextField}
      value={projectPaidAmount}
      onChange={(e) => setProjectPaidAmount(e.target.value)}
      />
       <Button
       onClick={paidAmountUpdate}
       type="submit"
       variant="contained"
       sx={{fontWeight: 'bold',marginTop:2 }}
       fullWidth>
       Update
       </Button>
      </>
    ): progressName === 'Duration' ? (
      <>
      <FormControl fullWidth size="small"
      className={classes.customSelect}
      >
      <InputLabel id="demo-simple-select-label">Project Duration</InputLabel>
      <Select
        MenuProps={{
          style: { zIndex: 2001 },
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={projectDuration}
        label="Project Duration"
        onChange={handleChangeProjectDuration}
        displayEmpty
        renderValue={projectDuration !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
      >
      <MenuItem value="One Week">One Week</MenuItem>
      <MenuItem value="One & Half Weeks">One & Half Weeks</MenuItem>
      <MenuItem value="Two Weeks">Two Weeks</MenuItem>
      <MenuItem value="Two & Half Weeks">Two & Half Weeks</MenuItem>
      <MenuItem value="Three Weeks">Three Weeks</MenuItem>
      <MenuItem value="Three & Half Weeks">Three & Half Weeks</MenuItem>
      <MenuItem value="One Month">One Month</MenuItem>
      <MenuItem value="One & Half Months">One & Half Months</MenuItem>
      <MenuItem value="Two Months">Two Months</MenuItem>
      <MenuItem value="More Than Two Months">More Than Two Months</MenuItem>
      <MenuItem value="After Discussion With Admin">After Discussion With Admin</MenuItem>
      </Select>
    </FormControl>
      <Button
       onClick={projectDurationUpdate}
       type="submit"
       variant="contained"
       sx={{fontWeight: 'bold',marginTop:2 }}
       fullWidth
       >
       Update
       </Button>
      </>
    ):(
      <></>
    )}
    </Modal.Body>
  </Modal>
    </Grid>

    <Button
    variant="contained"
    fullWidth
    className='blinking-button'
    style={{marginTop:15,fontWeight:'bold'}}
    onClick={sendUpdatesViaEmail}
    >
    Send Update to Client
    </Button>
    </>
  )
}

export default Progress