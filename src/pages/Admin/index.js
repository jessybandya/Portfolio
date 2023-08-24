import React, { useEffect, useState } from 'react'
import SoftTypography from '../../soft-components/SoftTypography'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth,db } from '../../firebase'
import { Box, Card, Grid } from '@mui/material'
import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard'
import SoftBox from '../../soft-components/SoftBox'

// Data
import reportsBarChartData from "../../layouts/dashboard/data/reportsBarChartData";
import ReportsBarChart from "../../examples/Charts/BarCharts/ReportsBarChart";
import typography from '../../assets/theme/base/typography'
import axios from 'axios'
import Members from './Members'
import Contact from './Contact'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Pending from './Pending'
import Ongoing from './Ongoing'
import Completed from './Completed'
import Cancelled from './Cancelled'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();
  const [pendingOrders, setPendingOrders] = React.useState([])
  const [ongoingOrders, setOngoingOrders] = React.useState([])
  const [completedOrders, setCompletedOrders] = React.useState([])
  const [contacts, setContacts] = React.useState([])
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const commaNumber = require('comma-number')
  const [open, setOpen] = React.useState(false);
  const [selectedName, setSelectedName] = React.useState("");
  const [cancelledOrders, setCancelledOrders] = React.useState([])

  React.useEffect(() => {
    db.collection('orders').where("cancel","==", true).onSnapshot((snapshot) => {
      setCancelledOrders(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])
  const handleClickOpen = (name) => {
    setOpen(true);
    setSelectedName(name)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedName('')
  };



  React.useEffect(() => {
    db.collection('orders').where("projectStatus","==", "Pending").where("cancel","==", false).onSnapshot((snapshot) => {
      setPendingOrders(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])
  React.useEffect(() => {
    db.collection('orders').where("projectStatus","==", "Ongoing").where("cancel","==", false).onSnapshot((snapshot) => {
      setOngoingOrders(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('orders').where("projectStatus","==", "Completed").where("cancel","==", false).onSnapshot((snapshot) => {
      setCompletedOrders(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('contacts').onSnapshot((snapshot) => {
      setContacts(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])


const date1 = new Date();

let day = date1.getDate();
let month = date1.getMonth() + 1;
let year = date1.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}/${month}/${year}`;

const date = new Date;
let hours = date.getHours();


let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
  return (
    <div style={{padding:10,marginTop:40}}>
    {authId === "MMbxWqSyeOPLO9OSd5RiouSDl8k2" ?(
       <>
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:60}}>
       <div>
       <span style={{fontWeight:'bold',color:'#BABABA'}}>{status}, Jessy Bandya</span>
       </div>
       <div>
       <span style={{cursor:'pointer',fontWeight:'bold',color:'#BABABA'}}>{currentDate}</span>
       </div>
       </div>
       <SoftTypography>
       <SoftBox py={3}>
       <SoftBox mb={3}>
         <Grid container spacing={1}>
           <Grid onClick={() => handleClickOpen("Pending Orders")} style={{cursor:'pointer'}} item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Pending Orders" }}
               count={commaNumber(pendingOrders.length)}
               percentage={{ color: "success", text: "+55%" }}
               icon={{ color: "info", component: "group" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3} onClick={() => handleClickOpen("Ongoing Orders")} style={{cursor:'pointer'}}>
             <MiniStatisticsCard
               title={{ text: "Ongoing Orders" }}
               count={commaNumber(ongoingOrders.length)}
               percentage={{ color: "success", text: "+3%" }}
               icon={{ color: "info", component: "speaker" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3} onClick={() => handleClickOpen("Completed Orders")} style={{cursor:'pointer'}}>
             <MiniStatisticsCard
               title={{ text: "Completed Orders" }}
               count={commaNumber(completedOrders.length)}
               percentage={{ color: "error", text: "-2%" }}
               icon={{ color: "info", component: "list_alt" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3} onClick={() => handleClickOpen("Cancelled Orders")} style={{cursor:'pointer'}}>
             <MiniStatisticsCard
               title={{ text: "Cancelled Orders" }}
               count={commaNumber(cancelledOrders.length)}
               percentage={{ color: "success", text: "+5%" }}
               icon={{
                 color: "info",
                 component: "assignment",
               }}
             />
           </Grid>

         </Grid>
       </SoftBox>
   
   
       <SoftBox>
         <Grid item >
           <ReportsBarChart
             chart={chart}
             items={items}
           />
         </Grid>
     </SoftBox>
     </SoftBox>

     <Dialog
     fullScreen
     open={open}
     onClose={handleClose}
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
       backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background color
       borderBottom:'1px solid #D1D1D1'
     }}
     >
       <Toolbar>
         <Typography sx={{ flex: 1, fontSize:15,color:'#fff' }} variant="h6" component="div">
           <b>{selectedName}</b>
         </Typography>
         <IconButton
           edge="start"
           color="inherit"
           onClick={handleClose}
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
    {selectedName === "Pending Orders" ? (
         <Pending />
    ): selectedName === "Ongoing Orders" ? (
         <Ongoing />
    ): selectedName === "Completed Orders" ? (
       <Completed />
    ):(
      <Cancelled />
    )}

   </Box>
   
 
   </Dialog>

       </SoftTypography>
       </>
    ):(
      <></>
    )}
    </div>
  )
}

export default Admin