import React, { useContext, useEffect, useState } from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Meals from './Meals';
import ScrollableFeed from 'react-scrollable-feed'
import Menuinfo from './Menuinfo';
import { auth, db } from '../../../auth/firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Reviews from './Reviews';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CartContext from '../../../auth/store/cart-context';
import MealItemForm from './Meals/MealItemForm';
import StarIcon from '@mui/icons-material/Star';
import swal from '@sweetalert/with-react';
import { Input } from 'antd';
import { SendOutlined } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';



const { TextArea } = Input;

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

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



function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}



function Post({ title, description, initialPrice, images, category, electronicID, timestamp,finalPrice,discount, categoryName }) {
    const [lgShow, setLgShow] = useState(false);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [see,setSee] = useState()
    const [posts2, setPosts2] = useState([])
    const cartCtx = useContext(CartContext);
    const [value1, setValue1] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [comment, setComment] = useState('')
    const [countReviews, setCountReviews] = useState(0)
    const [posts3, setPosts3] = useState([])
    const [user, setUser] = useState('')
    const [submitComment, setSubmitComment] = useState('')


    const submitCommentFun = () => {
      if(value1 === 0){
        toast.error("Kindly rate the stars!")
    }else if(value1 === null){
     toast.error("Kindly rate the stars!")
    }else if(submitComment === ''){
      toast.error("Kindly leave a comment!")
     }else{
     db.collection("electronics").doc(electronicID).collection("reviews").add({
         ratedByUid:auth?.currentUser?.uid,
         rating:value1,
         ratingComment:submitComment,
         ratingTime: Date.now(),
     }).
     then((e)=> 
     setValue1(0),
     setSubmitComment(""),
     swal("Thanks for your feedback ✔️!")
     )
    }
    }
    

    useEffect(() => {
      db.collection('users').doc(`${auth?.currentUser?.uid}`).onSnapshot((doc) => {
        setUser(doc.data());
      });
  }, [])



    const submitReview = () => {
      if(value1 === 0){
          toast.error("Kindly rate the stars!")
      }else if(!comment){
       toast.error("Comment is required!")
    }else{
       db.collection("electronics").doc(electronicID).collection("reviews").add({
           electronicID,
           ratedByName:`${user?.firstName} ${user?.lastName}`,
           ratedByPhone:`${user?.phone}`,
           ratedByUid:auth?.currentUser?.uid,
           rating:value1,
           ratingComment:comment,
           ratingTime: Date.now(),
       }).
       then((e)=> 
       setValue1(0),
       setComment(""),
       swal("Thanks for your feedback ✔️!")
       )
      }
    }


    useEffect(() => {
      db.collection("electronics").doc(electronicID).collection('reviews').onSnapshot(snapshot => {
          setPosts2(snapshot.docs.map(doc => ({
              id: doc.id,
              post: doc.data(),
          })));
      })
  }, []);

 const totalRatings = (posts2.reduce((a,v) =>  a = a + v.post.rating , 0 ))
 const numberOfRatings = posts2.length
 const rating2 = totalRatings / numberOfRatings
 var a = Math.round(rating2 * 10) / 10
 var b = posts2.length
    
    const likePost = () =>{
      // Alert.alert("Be Aware", "You liked the post!") 
      db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").where("fromId", "==", auth?.currentUser?.uid).where("electronicID", "==",electronicID ).get().then(
          snap => {
            if (snap.docs.length > 0) {
              db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").doc(electronicID).delete().then(function() {
              }).catch(function(error) {
                  alert("Error removing post: ", error);
              });                
          
            } else {
              db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").doc(electronicID).set({
                fromId: auth?.currentUser?.uid,
                electronicID,
                type:'electronic',
                timestamp:Date.now(),  
                liked:true,  
                images, 
                title, 
                category,       
                })
                toast.success("Marked as favourite")
            }
          }
        )
  }
  useEffect(() => {
    db.collection('users').doc(`${auth?.currentUser?.uid}`).collection("Favourites").doc(electronicID).onSnapshot((doc) => {
        setSee(doc.data());
    });
}, [])
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const addToCartHandler = amount => {
      cartCtx.addItem({
        id: electronicID,
        name:title,
        amount: amount,
        price: discount === true ? finalPrice : initialPrice,
        image: images.length === 0 ? "https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" : images[0].url,
        received:false,
      });
    };

    const date = new Date;
    let hours = date.getHours();
    let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");

    const navigate = useNavigate();
  return (
    <>
      <div className="col-xl-3 col-md-4 col-sm-6 ">
      <article className="list-product">
        <div className="img-block">
        <Link to={`/product-view/${electronicID}`} className="thumbnail">
          {images.length === 0 ?(
            <img src="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" style={{height:130,width:'100%',objectFit:'cover'}} className="img-fluid item-img" />
          ):(
            <>
  
              <img className="first-img" style={{height:130,width:'100%',objectFit:'contain'}} src={images[0].url} alt="" />
              <img className="second-img" style={{height:130,width:'100%',objectFit:'contain'}} src={images[1].url}  alt="" />
              </>
          )}
      </Link>
        </div>
        <ul className="product-flag">
          <li className="new">New</li>
        </ul>
        <div className="product-decs">
          <h2><Link to={`/product-view/${electronicID}`}  className="product-link">
          
          {title.length > 30 ?(
            <>
            {title.substring(0,28)}...
            </>
          ):(
            <>
            {title}
            </>
          )}
          </Link></h2>
          <div className="rating-product">
          <Rating  style={{cursor:'pointer'}} name="half-rating-read" value={a} precision={0.5} readOnly />
          </div>
          <div className="pricing-meta">
            <ul>
              <li style={{color:'#2152ff',fontSize:15}} className="current-price">Ksh.{numberWithCommas(initialPrice)}</li>
            </ul>
          </div>
        </div>
        <div className="add-to-link">
          <ul>
            <li className="cart">
            <MealItemForm id = {electronicID} onAddToCart={addToCartHandler} />
            </li>
            {auth?.currentUser?.uid ?(
              <>
                {see?.liked === true ?(
                  <li onClick={likePost}>
                <FavoriteIcon  fontSize='medium' style={{color: '#2152ff',backgroundColor:'#fff',borderRadius:10,marginTop:-5, cursor:'pointer'}}/>
                </li>
                ):(
                  <li onClick={likePost}>
                  <FavoriteBorderOutlinedIcon fontSize='medium' className="ti-heart" style={{color:'#2152ff',backgroundColor:'#fff',borderRadius:10,marginTop:-5,cursor:'pointer'}}/>
                  </li>
                )}
                </>
              ):(
                <li onClick={() => alert("Kindly sign In first.\nThanks!")}>                
                  <FavoriteBorderOutlinedIcon fontSize='medium' style={{color:'#2152ff',backgroundColor:'#fff',borderRadius:10,marginTop:-5,cursor:'pointer'}} className="ti-heart" />
                  </li>
        )}
          </ul>
        </div>
      </article>
  
  
  
  
  
  
  
  
  
  
  
  
      <Modal
  size="lg"
  show={lgShow}
  onHide={() => setLgShow(false)}
  aria-labelledby="example-modal-sizes-title-lg"
  >
  <Modal.Header closeButton style={{position: 'sticky',top:0, zIndex:4, height:50}}>
   <Modal.Title id="example-modal-sizes-title-lg">
  
    {/* <center>Menu Details</center>  */}
    <ClearOutlinedIcon style={{cursor:'pointer'}} onClick={() => setLgShow(false)}/>
   </Modal.Title>
  </Modal.Header>
  <Modal.Body
  style={{
   height:'70vh',
   overflowY:'auto'
  }}
  >
  <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
  <AppBar style={{position: 'sticky',top:0, zIndex:4,width:'100%'}}>
  <Tabs
   value={value}
   onChange={handleChange}
   indicatorColor="secondary"
   backgroundColor='#fff'
   textColor="inherit"
   variant="fullWidth"
   aria-label="full width tabs example"
   style={{backgroundColor: '#fff'}}
  >
   <Tab label={`INFORMATION`} {...a11yProps(0)} />
   <Tab label={`RATES & REVIEWS (${b})`} {...a11yProps(1)} />
  </Tabs>
  </AppBar>
  <SwipeableViews
  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  index={value}
  onChangeIndex={handleChangeIndex}
  >
  <TabPanel value={value} index={0} dir={theme.direction}>
  <ScrollableFeed>
   <Menuinfo images={images} price={initialPrice} category={category} description={description} electronicID={electronicID} name={title} a={a} numberOfRatings={numberOfRatings}/>
  </ScrollableFeed>
  </TabPanel>
  <TabPanel value={value} index={1} dir={theme.direction}>
  <ScrollableFeed>
  <Reviews electronicID={electronicID}/>
  </ScrollableFeed>
  </TabPanel>
  </SwipeableViews>
  </Box>
  </Modal.Body>
  
  
  
  <div>
  {auth?.currentUser?.uid &&(
   <>
   {value === 1 &&(
     <center>
     <Box
     sx={{
       width: 200,
       display: 'flex',
       alignItems: 'center',
     }}
   >
     <Rating
       name="hover-feedback"
       value={value1}
       precision={1}
       getLabelText={getLabelText}
       onChange={(event, newValue) => {
         setValue1(newValue);
       }}
       onChangeActive={(event, newHover) => {
         setHover(newHover);
       }}
       emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
     />
     {value !== null && (
       <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
     )}
   </Box>
   <div style={{display:'flex',alignItems:'center',padding:5}}>
   <TextArea placeholder={`${status} customer, we value your feedback!😊`} style={{borderRadius:10,width:'100%'}}
   value={submitComment}
   onChange={e => setSubmitComment(e.target.value)}
   /> 
   
   <SendOutlined onClick={submitCommentFun} fontSize="medium" style={{marginRight:20,marginLeft:3,cursor:'pointer',fontSize:'25px',color:'#2a68af'}}/>
   </div>
    </center>
   )}
   </>
  )}
  </div>
  </Modal>
    </div>
    </>         
  )
}

export default Post
