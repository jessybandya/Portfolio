import { Button, Checkbox, CircularProgress, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { db } from '../../../../../../../../firebase';
import React from 'react'
import Swal from 'sweetalert2';
import Backdrop from '@mui/material/Backdrop';

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
function General({ postID, name, category, subCategory, features, descriptions, techies}) {
    const classes = useStyles();
    const [projectName, setProjectName] = React.useState(name);
    const [projectCategory, setProjectCategory] = React.useState(category);
    const [projectSubCategory, setProjectSubCategory] = React.useState(subCategory);
    const [projectFeatures, setProjectFeatures] = React.useState(features);
    const [projectDescriptions, setProjectDescriptions] = React.useState(descriptions);
    const [projectTechnologies, setProjectTechnologies] = React.useState(techies);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    const handleChangeCategory = (event) => {
        setProjectCategory(event.target.value);
      };
      const handleChangeSubCategory = (event) => {
        setProjectSubCategory(event.target.value);
      };

      const handleChangeTechies = (event) => {
        const {
          target: { value },
        } = event;
        setProjectTechnologies(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const updateProject = async () => {
        handleOpen()
        db.collection('orders').doc(postID).update({
            name: projectName,
            category: projectCategory,
            subCategory: projectSubCategory,
            features: projectFeatures,
            descriptions: projectDescriptions,
            techies: projectTechnologies,            
        })
        .then(() => {
            handleClose()
            Swal.fire({
                icon: 'success',
                title: 'Project Updated Successfully!',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                    container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
                  }
              })
        })
        
      }

  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={4}>
    <TextField
    className={classes.customTextField}
      autoComplete="given-name"
      name="firstName"
      fullWidth
      label="Project Name"
      value={projectName}
      onChange={e => setProjectName(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={4}>
  <FormControl fullWidth size="small"
  className={classes.customSelect}
  >
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    MenuProps={{
      style: { zIndex: 2001 },
    }}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={projectCategory}
    label="Category"
    onChange={handleChangeCategory}
    displayEmpty
    renderValue={projectCategory !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
  >
      <MenuItem value="School Project">School Project</MenuItem>
      <MenuItem value="Non-School Project(Production)">Non-School Project(Production)</MenuItem>
  </Select>
</FormControl>
</Grid>
<Grid item xs={12} sm={4}>
<FormControl fullWidth size="small"
className={classes.customSelect}
>
<InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
<Select
  MenuProps={{
    style: { zIndex: 2001 },
  }}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={projectSubCategory}
  label="Sub-Category"
  onChange={handleChangeSubCategory}
  displayEmpty
  renderValue={projectSubCategory !== '' ? undefined : () => <span style={{ color: '#9E9E9E' }}></span>}
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
    </Grid>


    <Grid container style={{marginTop:5}} spacing={2}>
    <Grid item xs={12} sm={4}>
    <TextField
    className={classes.customTextField}
      autoComplete="given-name"
      name="firstName"
       multiline
      fullWidth
      label="Features"
      value={projectFeatures}
      onChange={e => setProjectFeatures(e.target.value)}
      rows={4}
    />
  </Grid>
  <Grid item xs={12} sm={4}>
  <TextField
  className={classes.customTextField}
    autoComplete="given-name"
    name="firstName"
    fullWidth
    label="Descriptions"
    value={projectDescriptions}
    onChange={e => setProjectDescriptions(e.target.value)}
    rows={4}
    multiline
  />
</Grid>
<Grid item xs={12} sm={4}>
<FormControl fullWidth size="small"
className={classes.customSelect}
multiline
rows={4}
>
<InputLabel id="demo-simple-select-label">Technology (optional)</InputLabel>
<Select
  MenuProps={{
    style: { zIndex: 2001 },
  }}
  labelId="demo-multiple-name-label"
  id="demo-multiple-name"
  multiple
  value={projectTechnologies}
  onChange={handleChangeTechies}
  input={<OutlinedInput label="Technology (optional)" />}
  renderValue={(selected) => selected.join(', ')}
>
{names.map((name) => (
    <MenuItem key={name} value={name}>
    <Checkbox checked={projectTechnologies.indexOf(name) > -1} />
    <ListItemText primary={name} />
  </MenuItem>
  ))}
</Select>
</FormControl>
</Grid>
    </Grid>

    <Grid container style={{marginTop:5}} spacing={2}>
    <Grid item xs={12} sm={4}>
  </Grid>
  <Grid item xs={12} sm={4}>
  <Button
  className="blinking-button"
    type="submit"
    fullWidth
    variant="contained"
    sx={{fontWeight: 'bold' }}
    onClick={updateProject}
  >
   Update
  </Button>
</Grid>
<Grid item xs={12} sm={4}>
</Grid>
    </Grid>

    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
    onClick={handleClose}
  >
    Updating...<CircularProgress color="inherit" />
  </Backdrop>
    </>
  )
}

export default General