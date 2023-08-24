import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Button,Modal } from 'react-bootstrap';
import Allorders from './Allpendings';
import ClearIcon from '@mui/icons-material/Clear';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Swal from 'sweetalert2';
import { auth, db } from '../../../firebase';
import SoftTypography from '../../../soft-components/SoftTypography';
import { makeStyles } from '@mui/styles';
import { Grid, TextField } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';





const useStyles = makeStyles({
    customTextField: {
        backgroundColor: '#050816',
        marginBottom: '0px',
        '& .MuiInputBase-input': {
          color: 'white',
          padding: '8px',
        },
        '& .MuiFormLabel-root': {
          color: '#BABABA',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent', // Remove border color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#BABABA', // Apply border color on hover
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#BABABA', // Apply border color when focused
        },
      },
      notchedOutline: {
        borderWidth: '0', // Remove border
      }, 
  });
  
  const defaultTheme = createTheme();
function Cancelled() {
  const [modalShow, setModalShow] = React.useState(false);
  const [posts1, setPosts1] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [linksData, setLinksData] = React.useState();
  const classes = useStyles();
  const authId = useSelector(state => state.authId);
  const [totalOrders, setTotalOrders] = React.useState([]);

  React.useEffect(() => {
    db.collection('orders').where("clientID", "==", `${authId}`).orderBy("timestamp","desc").onSnapshot(snapshot => {
        setTotalOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);



  // Fetch data from Firebase Firestore and update `posts1` state
  React.useEffect(() => {
    db.collection('orders').where("cancel","==", true).onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    });
  }, []);
  
  // Filter posts based on `searchTerm`
  React.useEffect(() => {
    if (posts1 !== undefined) {
      const finalPosts = posts1.filter((res) => {
        return res?.orderID?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      setFilteredPosts(finalPosts);
    }
  }, [searchTerm, posts1]);
  
  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value);
  };




  
  return (
    <SoftTypography>
    <ThemeProvider theme={defaultTheme}>
    <Grid item xs={12}>
    <TextField
    fullWidth
    className={classes.customTextField}
    onChange={updateSearchResults}
    value={searchTerm}
    placeholder={`Search by Order ID `}
    />
  </Grid>
  
  
  <Allorders filteredPosts={filteredPosts} searchTerm={searchTerm}/>
  </ThemeProvider>
    </SoftTypography>
  )
}

export default Cancelled