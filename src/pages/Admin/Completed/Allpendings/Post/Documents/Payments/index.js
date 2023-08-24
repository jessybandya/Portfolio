import React from 'react'
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
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Slide } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

  const MpessData = [
    ['Phone Number', '0768405710'],
    ['Full Name', 'Phelix Odero'],
  ];

  const localBankData = [
    ['Account Number(Equity)', '1180180997720'],
    ['Paybill(Alt. with Mpesa)', '247247'],
    ['Account Number(Alt. with Mpesa)', '1180180997720'],
    ['Full Name', 'Uwimana Jessy Alexis'],
  ];

  const intBankData = [
    ['Bank Name', 'Equity Bank'],
    ['Account Number', '1180180997720'],
    ['Swift Code', 'EQBLKENA'],
    ['Bank Branch Code', '68118'],
    ['Bank Branch Name', 'Kasarani Branch'],
    ['Bank Branch Address', 'Kasarani, Nairobi Kenya'],
    ['Full Name', 'Uwimana Jessy Alexis'],
  ];
  

function Payments() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('')
    const vertical= "top"
    const horizontal= "center"

    const handleClick = (text) => {
        setOpen(true);
        setText(text)
      };

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setValue(index);
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
  return (
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
        <Tab label="Local" {...a11yProps(0)} />
        <Tab label="International" {...a11yProps(1)} />
      </Tabs>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={value} index={0} dir={theme.direction}>
      <TableContainer component={Paper}
      style={{
        background: 'linear-gradient(310deg, #050816, #090325)',
        color: '#fff',
        backdropFilter: 'blur(10px)', // Apply the blur effect
        backgroundColor: 'rgba(0, 0, 0, 5)', // Add a semi-transparent background color,
        border:'1px solid #fff'
      }}
      >
      <center>Mpesa</center>
      <Table>
        <TableBody>
          {MpessData.map((row, index) => (
            <TableRow key={index}>
              <TableCell
              style={{
                color:'#fff',
                fontWeight:'bold'
              }}
              >{row[0]}</TableCell>
              <TableCell align="right"
              style={{
                color:'#E8E8E8',
              }}
              >
              {row[1]}
              <IconButton onClick={() => copyToClipboard(row[1])}>
              <ContentCopyIcon style={{color:'#D1D1D1'}}/>
            </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper}
    style={{
      background: 'linear-gradient(310deg, #050816, #090325)',
      marginTop:8,
      color: '#fff',
      backdropFilter: 'blur(10px)', // Apply the blur effect
      backgroundColor: 'rgba(0, 0, 0, 5)', // Add a semi-transparent background color,
      border:'1px solid #fff'
    }}
    >
    <center>Bank</center>
    <Table>
      <TableBody>
        {localBankData.map((row, index) => (
          <TableRow key={index}>
            <TableCell
            style={{
              color:'#fff',
              fontWeight:'bold'
            }}
            >{row[0]}</TableCell>
            <TableCell align="right"
            style={{
              color:'#E8E8E8',
            }}
            >
            {row[1]}
            <IconButton onClick={() => copyToClipboard(row[1])}>
            <ContentCopyIcon style={{color:'#D1D1D1'}}/>
          </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>

      <TableContainer component={Paper}
      style={{
        background: 'linear-gradient(310deg, #050816, #090325)',
        color: '#fff',
        backdropFilter: 'blur(10px)', // Apply the blur effect
        backgroundColor: 'rgba(0, 0, 0, 5)', // Add a semi-transparent background color,
        border:'1px solid #fff'
      }}
      >
      <center>Bank</center>
      <Table>
        <TableBody>
          {intBankData.map((row, index) => (
            <TableRow key={index}>
              <TableCell
              style={{
                color:'#fff',
                fontWeight:'bold'
              }}
              >{row[0]}</TableCell>
              <TableCell align="right"
              style={{
                color:'#E8E8E8',
              }}
              >
              {row[1]}
              <IconButton onClick={() => copyToClipboard(row[1])}>
              <ContentCopyIcon style={{color:'#D1D1D1'}}/>
            </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </TabPanel>
    </SwipeableViews>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
    anchorOrigin={{ vertical, horizontal }}
    TransitionComponent={SlideTransition}
    >
    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
      {text}
    </Alert>
  </Snackbar>
  </Box>
  )
}

export default Payments