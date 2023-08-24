import React, { useEffect, useState } from 'react';
import { Button, Checkbox, ListItem, ListItemText, TextField } from '@mui/material';
import { db } from '../../../../../../../../../firebase';
import firebase from 'firebase';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';

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
function Project({ projectLinks, postID }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = db.collection('orders').doc(postID);
        const snapshot = await docRef.get();
        const data = snapshot.data();

        if (data && data.subList) {
          setItems(data.subList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleAddItem = async () => {
    if (newItem.trim() !== '') {
      try {
        const docRef = db.collection('orders').doc(postID);
        await docRef.update({
          projectLinks: firebase.firestore.FieldValue.arrayUnion({
            text: newItem,
          }),
        });

        setNewItem('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };




  const handleRemoveItem = async (index) => {
    try {
      const docRef = db.collection('orders').doc(postID);
      const snapshot = await docRef.get();
      const data = snapshot.data();

      if (data && data.subList) {
        const updatedItems = data.subList.filter((_, i) => i !== index);

        await docRef.update({ projectLinks: updatedItems });
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };


  return (
    <div>
      <div>
      <TextField
      fullWidth
      className={classes.customTextField}
          placeholder="Add a new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={handleAddItem}>
          Add
        </Button>
      </div>
      <ul
      style={{
        height: '400px',
        overflow: 'auto',
        padding: '0px',
        listStyle: 'none',

      }}
      >
        {projectLinks?.map((item, index) => (
          <ListItem style={{display:'flex',justifyContent:'space-between'}} key={index}>
          <a href={item.text} target="_blank" rel="noreferrer">
          <ListItemText primary={item.text} />
          </a>
            <DeleteIcon onClick={() => handleRemoveItem(index)} style={{cursor:'pointer',right:0}}/>
          </ListItem>
        ))}
      </ul>
    </div>
  )
}

export default Project