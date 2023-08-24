import React from 'react'
import { db } from '../../../../../../firebase';
import { Box, Grid } from '@mui/material';

function Owner({ clientID}) {
    const [currentUser, setCurrentUser] = React.useState(null);


    React.useEffect(() => {
      const unsubscribe = db
        .collection('users')
        .doc(clientID)
        .onSnapshot((snapshot) => {
          setCurrentUser(snapshot.data());
        });
  
      return () => unsubscribe();
    }, [clientID]);
  return (
    <div>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
    <label style={{color:'#BABABA'}}>First Name</label>
    <hr style={{width:'100%'}}/>
      <Box style={{marginTop:5}}>
       {currentUser?.firstName}
      </Box>
  </Grid>
  <hr />
  <Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
  <label style={{color:'#BABABA'}}>Last Name</label>
  <hr style={{width:'100%'}}/>
  <Box style={{marginTop:5}}>
    {currentUser?.lastName}
  </Box>
</Grid>
<Grid item xs={12} sm={4} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
<label style={{color:'#BABABA'}}>Country</label>
<hr style={{width:'100%'}}/>
<Box style={{marginTop:5}}>
 {currentUser?.country}
</Box>
</Grid>
    </Grid>

    <Grid container spacing={2} style={{marginTop:5}}>
    <Grid item xs={12} sm={6} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
    <label style={{color:'#BABABA'}}>Phone Number</label>
    <hr style={{width:'100%'}}/>
     <a href={`tel:${currentUser?.phone}`} style={{textDecoration:'none',color:'#1976d2'}}>
      <Box style={{marginTop:5}}>
       {currentUser?.phone}
      </Box>
      </a>
  </Grid>
  <hr />
  <Grid item xs={12} sm={6} style={{border:'1px solid #1976d2',borderRadius:8,paddingBottom:5}}>
  <label style={{color:'#BABABA'}}>Email</label>
  <hr style={{width:'100%'}}/>
  <a href={`mailto:${currentUser?.email}`} style={{textDecoration:'none',color:'#1976d2'}}>
  <Box style={{marginTop:5}}>
   {currentUser?.email}
  </Box>
  </a>
</Grid>
    </Grid>
    </div>
  )
}

export default Owner