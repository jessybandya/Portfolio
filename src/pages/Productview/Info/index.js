import { Rating } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db } from '../../../auth/firebase';
import CartContext from '../../../auth/store/cart-context';
import ReactTextCollapse from 'react-text-collapse/dist/ReactTextCollapse'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Modal1 from '../../Shopping/Post/Modal1';
import MealItemForm from './Meals/MealItemForm';


const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: '... show more', // text to show when collapsed
    expandText: 'show less', // text to show when expanded
    minHeight: 155, // component height when closed
    maxHeight: 250, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
      color: "blue",
      fontSize: "16px",
      fontWeight:'bold',
      cursor:'pointer'
    }
  }





function Info({ id,commentsNo }) {
    const [product, setProduct] = useState('')
    const [posts2, setPosts2] = useState([])
    const cartCtx = useContext(CartContext);
    const commaNumber = require('comma-number')
    const [see,setSee] = useState('')

    useEffect(() => {
        db.collection('users').doc(`${auth?.currentUser?.uid}`).collection("Favourites").doc(id).onSnapshot((doc) => {
            setSee(doc.data());
        });
    }, [])

    useEffect(() => {
        db.collection('electronics').doc(id).onSnapshot((doc) => {
            setProduct(doc.data());
        });
    }, [])

    useEffect(() => {
        db.collection("electronics").doc(id).collection('reviews').onSnapshot(snapshot => {
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
         db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").where("fromId", "==", auth?.currentUser?.uid).where("electronicID", "==",id ).get().then(
             snap => {
               if (snap.docs.length > 0) {
                 db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").doc(id).delete().then(function() {
                 }).catch(function(error) {
                     alert("Error removing post: ", error);
                 });                
             
               } else {
                 db.collection("users").doc(auth?.currentUser?.uid).collection("Favourites").doc(id).set({
                   fromId: auth?.currentUser?.uid,
                   electronicID:id,
                   type:'electronic',
                   timestamp:Date.now(),  
                   liked:true,  
                   images:product.images, 
                   title:product.title, 
                   category:product.category,       
                   })
                   toast.success("Marked as favourite")
               }
             }
           )
     }



     function abbrNum(number, decPlaces) {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);
      
        // Enumerate number abbreviations
        var abbrev = [ "K", "M", "B", "T" ];
      
        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) {
      
            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10,(i+1)*3);
      
            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                 // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                 // This gives us nice rounding to a particular decimal place.
                 number = Math.round(number*decPlaces/size)/decPlaces;
      
                 // Add the letter for the abbreviation
                 number += abbrev[i];
      
                 // We are done... stop
                 break;
            }
        }
      
        return number;
      }

      const addToCartHandler = amount => {
        cartCtx.addItem({
          id: id,
          name:product?.title,
          amount: amount,
          price: product?.discount === true ? product?.finalPrice : product?.initialPrice,
          image:product?.images[0].url,
          received:false,
        });
      };
      const reviewsSize = posts2.length

  return (
    <div>
    <section style={{marginTop:-15}} className="product-details-area mtb-60px">
  <div className="container">
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-12">
        <div className="product-details-img product-details-tab">
          <div className="zoompro-wrap zoompro-2">
            <div style={{padding:10}} className="zoompro-border zoompro-span">

                <Modal1 mealImage={product.images} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12">
        <div className="product-details-content">
          <h2>{product?.title}</h2>
          <div style={{display:'flex',alignItems:'center'}} className="pro-details-rating-wrap">
          <div style={{display:'flex',alignItems:'center'}}><Rating  style={{cursor:'pointer'}} name="half-rating-read" value={a} precision={0.5} readOnly />{numberOfRatings === 0 ?(<></>):(<>{a}</>)}</div> 
            <div style={{marginTop:5}} className="read-review"><a className="reviews">Reviews ({abbrNum(reviewsSize,1)})</a></div>
          </div>
          <div className="pricing-meta">
            <ul>
              <li className="old-price not-cut">Ksh.{commaNumber(product?.initialPrice)}</li>
            </ul>
          </div>
          <div className="pro-details-list">
          {product?.description?.length < 300 ?(
            <>{product?.description}</>
          ):(
            <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
            {product?.description}
    </ReactTextCollapse>
          )}
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} className="pro-details-quality mt-0px">
          <div className="quantity buttons_added">
          <MealItemForm id = {id} onAddToCart={addToCartHandler} />
        </div>
        <div>

        <div className="pro-details-wish-com">
        <div className="pro-details-wishlist">
        {auth?.currentUser?.uid ?(
          <a className="woo_cart_btn btn_save">
            {see?.liked === true ?(
            <FavoriteIcon onClick={likePost} fontSize='medium' style={{color: '#2152ff',backgroundColor:'#fff',borderRadius:10}}/>
            ):(
              <FavoriteBorderOutlinedIcon fontSize='medium' onClick={likePost} className="ti-heart" style={{color:'#2152ff',backgroundColor:'#fff',borderRadius:10}}/>
            )}
            </a>
          ):(
            <li><a onClick={() => alert("Kindly sign In first.\nThanks!")} className="woo_cart_btn btn_save">
              
              <FavoriteBorderOutlinedIcon fontSize='medium' style={{color:'#2152ff',backgroundColor:'#fff',borderRadius:10}} className="ti-heart" /></a></li>
    )} <span style={{marginRight:10,marginLeft:-10,color:'#88888888'}}>Add as favorite</span>
        </div>
        <div className="pro-details-compare">
        <div className="social-info">
        <ul>
          <li>
            <a title="Facebook" href="#"><i className="ion-social-facebook" /></a>
          </li>
          <li>
            <a title="Twitter" href="#"><i className="ion-social-twitter" /></a>
          </li>
          <li>
            <a title="Google+" href="#"><i className="ion-social-google" /></a>
          </li>
          <li>
            <a title="Instagram" href="#"><i className="ion-social-instagram" /></a>
          </li>
        </ul>
      </div>
        </div>
      </div>
                   

        
        
        </div> 
          </div>


        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Info