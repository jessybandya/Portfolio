import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { auth, db } from '../../../../../firebase';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
    'React.js',
    'Next.js',
    'React Native (Expo)',
    'React Native (CLI)',
    'Firebase (Firestore)',
    'PHP',
    'Node.js',
    'Django',
    'Python',
    'C Language',
    'C++',
    'MongoDB',
    'MySQL',

  ];
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const useStyles = makeStyles({
    customTextField: {
      backgroundColor: '#050816', // Change this to your desired background color
      '& .MuiInputBase-input': {
        color: 'white', // Change this to your desired text color
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

const defaultTheme = createTheme();

export default function Makeorder({ closeModal,firstName, lastName, phone, senderEmail, country }) {
    const classes = useStyles();
    const [name, setName] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [subCategory, setSubCategory] = React.useState('')
    const [descriptions, setDescriptions] = React.useState('')
    const [features, setFeatures] = React.useState('')
    const [techies, setTechies] = React.useState([])
    const [dueDate, setDueDate] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const id = db.collection('orders').doc().id
    const orderID = Math.floor(Math.random() * 1000000000000000)

    const submitFun = () => {
        setLoading(true)
        

        if(!name){
            toast.error('Please enter project name!',{
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)            
        }else if(!category){
            toast.error('Please select category!',{
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
        }else if(!subCategory){
            toast.error('Please select sub category!',{
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
        }else if(!descriptions){
            toast.error('Please enter descriptions!',{
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
          }else if(!dueDate){
            toast.error('Please select due date!',{
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
          }else{

        Swal.fire({
            title: 'Confirm Submission',
            text: `Please check your project details before submitting.`,
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Proceed',
            customClass: {
              container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
            }
        }).then((result) => {
            if (result.isConfirmed) {
                db.collection('orders').doc(id).set({
                    orderID: orderID?.toString(),
                    name: name,
                    category: category,
                    subCategory: subCategory,
                    descriptions: descriptions,
                    features: features,
                    techies: techies,
                    dueDate: dueDate,
                    projectStatus: 'Pending',
                    timestamp: Date.now(),
                    id: id,
                    subList:[],
                    clientID: auth?.currentUser?.uid,
                    totalAmount:0,
                    paidAmount:0,
                    webLinks:[],
                    projectLinks:[],
                    images:[],
                    paidStatus:'Unpaid',
                    progress:0,
                    cancel:false,
                }).then(() => {
                    setLoading(false)
                    sendEmail()
                    Swal.fire({
                       icon: 'success',
                        title: 'Successfully Placed Your Order!',
                        text: `Order ID: ${orderID}`,
                        customClass: {
                          container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
                        }
                    })
                    setName('')
                    setCategory('')
                    setSubCategory('')
                    setDescriptions('')
                    setFeatures('')
                    setTechies([])
                    setDueDate('')
                    setLoading(false)
                    closeModal()
                })
            } else {
              setLoading(false)
            }
        });
          }
    }


    const sendEmail = () => {
      const email = 'jessy.bandya5@gmail.com '; // Replace with the email address you want to send the email to
      const subject = `Order ID:${orderID?.toString()} - ${name}`; // Replace with the subject of your email
      const fullName = `${firstName} ${lastName}`;
  
      const messageMarkdown = `
  Order ID: ${orderID?.toString()}
  Name: ${name}
  Category: ${category}
  Sub Category: ${subCategory}
  Descriptions: ${descriptions}
  Features: ${features}
  Techies: ${techies}
      `;
  
      const body = `
  Dear Uwimana Jessy Bandya,
  
  ${messageMarkdown}
  
  Full Name: ${fullName}
  Email: ${senderEmail}
  Phone Number: ${phone}
      `;
  
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.open(mailtoLink, '_blank');
  };
  

    // const handleDateChange = (date) => {
    //   setDueDate(date);
    // };
  
    // const getFormattedDate = () => {
    //   if (dueDate) {
    //     return dueDate.format('ddd MMM DD YYYY');
    //   }
    //   return 'Select a date';
    // };

    // const handleDateChange = (date) => {
    //   if (date) {
    //     const formattedDate = date.format('ddd MMM DD YYYY');
    //     const unixTimestamp = date.valueOf();
        
    //     console.log('Formatted date:', formattedDate);
    //     console.log('Unix timestamp:', unixTimestamp);
    //   }
    // };


    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
      };
      const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value);
      };
      const handleChangeTechies = (event) => {
        const {
          target: { value },
        } = event;
        setTechies(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
      const handleChangeDueTime = (event) => {
        setDueDate(event.target.value);
      };

  return (
    <ThemeProvider theme={defaultTheme}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.customTextField}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="Name of Project"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small"
              className={classes.customSelect}
              >
              <InputLabel id="demo-simple-select-label">Category*</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 2001 },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category*"
                onChange={handleChangeCategory}
                displayEmpty
                renderValue={category !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
              >
                  <MenuItem value="School Project">School Project</MenuItem>
                  <MenuItem value="Non-School Project(Production)">Non-School Project(Production)</MenuItem>
              </Select>
            </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small"
              className={classes.customSelect}
              >
              <InputLabel id="demo-simple-select-label">Sub-Category*</InputLabel>
              <Select
                MenuProps={{
                  style: { zIndex: 2001 },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategory}
                label="Sub-Category*"
                onChange={handleChangeSubCategory}
                displayEmpty
                renderValue={subCategory !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
              >
                  <MenuItem value="Fullstack Mobile Development">Fullstack Mobile Development</MenuItem>
                  <MenuItem value="Fullstack Web Development">Fullstack Web Development</MenuItem>
                  <MenuItem value="Fullstack Mobile & Web Development">Fullstack Mobile & Web Development</MenuItem>
                  <MenuItem value="Mobile Development (Frontend Only)">Mobile Development (Frontend Only)</MenuItem>
                  <MenuItem value="Web Development (Frontend Only)">Web Development (Frontend Only)</MenuItem>
                  <MenuItem value="Web Development (Backend Only)">Web Development (Backend Only)</MenuItem>
                  <MenuItem value="I'm not sure">I'm not sure</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small"
            className={classes.customSelect}
            >
            <InputLabel id="demo-simple-select-label">Technology (optional)</InputLabel>
            <Select
              MenuProps={{
                style: { zIndex: 2001 },
              }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={techies}
              onChange={handleChangeTechies}
              input={<OutlinedInput label="Technology (optional)" />}
              renderValue={(selected) => selected.join(', ')}
            >
            {names.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={techies.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
              ))}
            </Select>
          </FormControl>
            </Grid>
              <Grid item xs={12}>
                <TextField
                className={classes.customTextField}
                  required
                  fullWidth
                  label="Summary Description"
                  rows={4}
                  multiline
                  value={descriptions}
                  onChange={e => setDescriptions(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.customTextField}
                  fullWidth
                  label="Any other Features(optional)"
                  value={features}
                  onChange={e => setFeatures(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small"
              className={classes.customSelect}
              >
              <InputLabel id="demo-simple-select-label">Anticipated Duration*</InputLabel>
              <Select
              MenuProps={{
                style: { zIndex: 2001 },
              }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dueDate}
                label="Anticipated Duration*"
                onChange={handleChangeDueTime}
                displayEmpty
                renderValue={dueDate !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
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

            </Grid>
            </Grid>
            <Button
            className="blinking-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
              onClick={submitFun}
            >
             {loading ? <>Submitting...<CircularProgress size={20} style={{color:'#fff'}} /></> : "Submit"}
            </Button>
          </Box>

    </ThemeProvider>
  );
}