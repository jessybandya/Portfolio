import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { Delete, Download, MoreVert } from '@mui/icons-material';
import {toast } from "react-toastify"
import axios from 'axios';
import firebase from 'firebase';
import { db, storage } from '../../../../../../firebase';

export default function Options({ imageId, electronicID,images}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [fetchedImages, setFetchedImages] = React.useState([]);


  const onDeleteFirestore = async (index) => {
    const imageToDelete = images[index];
    // console.log(imageToDelete);
    const storageRef = storage.ref("project-progress-images");
    const fileRef = storageRef.child(`${electronicID}/${imageToDelete?.name}`); 
  
    try {
      // Delete the image from storage
      await fileRef.delete();
  
      // Remove the image from fetchedImages array in Firestore
      await db.collection("orders").doc(electronicID).update({
        images: firebase.firestore.FieldValue.arrayRemove(imageToDelete),
      });
  
      // Fetch updated images from Firestore and update fetchedImages state
      const doc = await db.collection("orders").doc(electronicID).get();
      const data = doc.data();
      if (data && data.images) {
        setFetchedImages(data.images);
      }
  
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("An error occurred while deleting the image");
    }
  };
  


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              color: 'white',
              background: 'rgba(0,0,0,.3)',
            }}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <MenuItem onClick={() => onDeleteFirestore(imageId)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
