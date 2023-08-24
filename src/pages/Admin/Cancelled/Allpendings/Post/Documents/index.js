import { Box, Button, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import Payments from './Payments';
import Receipt from './Receipt';


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
function Documents() {
    const classes = useStyles();
    const [name, setName] = React.useState('');
    const [modalShow, setModalShow] = React.useState(false);

    const clickedButton = (name) => {
        setName(name);
        setModalShow(true);
    }
  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
    <label style={{color:'#BABABA'}}>Payment</label>
    <hr style={{width:'100%'}}/>
    <Box style={{marginTop:5}}>
    <Button
      onClick={() => clickedButton('Payment')}
      type="submit"
      variant="contained"
      sx={{fontWeight: 'bold' }}
    >
     Click Here
    </Button>
    </Box>
  </Grid>
  <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
  <label style={{color:'#BABABA'}}>Invoice</label>
  <hr style={{width:'100%'}}/>
  <Box style={{marginTop:5}}>
  <Button

    type="submit"
    variant="contained"
    sx={{fontWeight: 'bold' }}
  >
   Click Here
  </Button>
  </Box>
</Grid>
<Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
<label style={{color:'#BABABA'}}>Receipt</label>
<hr style={{width:'100%'}}/>
<Box style={{marginTop:5}}>
<Button
onClick={() => clickedButton('Receipt')}
  type="submit"
  variant="contained"
  sx={{fontWeight: 'bold' }}
>
 Click Here
</Button>
</Box>
</Grid>
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
    {name === 'Payment' ?(
         <Payments />
    ): name === 'Receipt' ? (
        <Receipt />
    ):(
      <></>
    )}
    </Modal.Body>
  </Modal>
    </>
  )
}

export default Documents