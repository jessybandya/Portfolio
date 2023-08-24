import React, { useEffect, useState } from 'react'
import Footer from '../../examples/Footer'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Info from './Info';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../Shopping/Post/Reviews';
import StarIcon from '@mui/icons-material/Star';
import swal from '@sweetalert/with-react';
import { Input } from 'antd';
import { SendOutlined } from "@mui/icons-material";
import { auth, db } from '../../auth/firebase';
import { toast } from 'react-toastify';
import Rating from '@mui/material/Rating';
import TelegramIcon from '@mui/icons-material/Telegram';


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


function Productview() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const {id} = useParams()
    const [value1, setValue1] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [submitComment, setSubmitComment] = useState('')
    const [commentsNo, setCommentsNo] = useState('')

    useEffect(() => {
      db.collection('electronics').doc(id).onSnapshot((doc) => {
        setCommentsNo(doc.data());
      });
  }, [])


    const submitCommentFun = () => {
      if(value1 === 0){
        toast.error("Kindly rate the stars!")
    }else if(value1 === null){
     toast.error("Kindly rate the stars!")
    }else if(submitComment === ''){
      toast.error("Kindly leave a comment!")
     }else{
     db.collection("electronics").doc(id).collection("reviews").add({
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
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const date = new Date;
    let hours = date.getHours();
    let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
    const navigate = useNavigate();

  return (
    <div className="header_sticky">
    <DashboardNavbar />
    <div className="boxed">
      <div className="overlay" />

      <section className="flat-product-detail">
        <div className="container">
          <div
          className="row">
            <div className="col-md-6">
            <center>
            <div className="flexslider">
            <ul className="slides">
              <li data-thumb="/images/product/flexslider/thumb/2.jpg">
                <a href="#" id="zoom1" className="zoom"><img src="/images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
                <span>NEW</span>
              </li>
              <li data-thumb="/images/product/flexslider/thumb/3.jpg">
                <a href="#" id="zoom1" className="zoom"><img src="/images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
              </li>
              <li data-thumb="/images/product/flexslider/thumb/4.jpg">
                <a href="#" id="zoom1" className="zoom"><img src="/images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
                <span>NEW</span>
              </li>
              <li data-thumb="/images/product/flexslider/big-size.jpg">
                <a href="#" id="zoom1" className="zoom"><img src="/images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
              </li>
            </ul>{/* /.slides */}
          </div>{/* /.flexslider */}
            </center>
            </div>{/* /.col-md-6 */}
            <div className="col-md-6">
              <div className="product-detail style4">
                <div className="header-detail">
                  <h4 className="name">Warch 42 mm Smart Watches</h4>

                  <div className="reviewed">
                    <div className="review">
                      <div className="queue">
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                      </div>
                      <div className="text">
                        <span>3 Reviews</span>
                        <span className="add-review">Add Your Review</span>
                      </div>
                    </div>
                    <div className="status-product">
                      Availablity <span>In stock</span>
                    </div>
                  </div>{/* /.reviewed */}
                </div>{/* /.header-detail */}
                <div className="content-detail">
                  <div className="price">
                    <div className="regular">
                      $2,999.00
                    </div>
                    <div className="sale">
                      $1,999.00
                    </div>
                  </div>
                  <div className="info-text">
                    Vivamus in tempor eros. Phasellus rhoncus in nunc sit amet mattis. Integer in ipsum vestibulum, molestie arcu ac, efficitur tellus. Phasellus id vulputate erat.
                  </div>
                  <div className="product-id">
                    SKU: <span className="id">FW511948218</span>
                  </div>
                </div>{/* /.content-detail */}
                <div className="footer-detail">
                  <div className="box-cart style2">
                    <div className="btn-add-cart">
                      <a href="#" title><img src="/images/icons/add-cart.png" alt="" />Add to Cart</a>
                    </div>
                    <div className="compare-wishlist">
                      <a href="compare.html" className="compare" title><img src="/images/icons/compare.png" alt="" />Compare</a>
                      <a href="compare.html" className="wishlist" title><img src="/images/icons/wishlist.png" alt="" />Wishlist</a>
                    </div>
                  </div>{/* /.box-cart style2 */}
                  <div className="social-single">
                    <span>SHARE</span>
                    <ul className="social-list style2">
                      <li>
                        <a href="#" title>
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title>
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title>
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title>
                          <i className="fa fa-pinterest" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title>
                          <i className="fa fa-dribbble" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title>
                          <i className="fa fa-google" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>{/* /.social-single */}
                </div>{/* /.footer-detail */}
              </div>{/* /.product-detail style4 */}
            </div>{/* /.col-md-6 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </section>{/* /.flat-product-detail */}


      <section className="flat-product-content">
        <ul className="product-detail-bar">
          <li className="active">Description</li>
          <li>Tecnical Specs</li>
          <li>Reviews</li>
        </ul>{/* /.product-detail-bar */}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="description-text">
                <div className="box-text">
                  <h4>Nuqqam Et Massa</h4>
                  <p>Sed sodales sed orci molestie tristique. Nunc dictum, erat id molestie vestibulum, ex leo vestibulum justo, luctus tempor erat sem quis diam. Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="box-text">
                  <h4>Wireless</h4>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                </div>
                <div className="box-text">
                  <h4>Fresh Design</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                </div>
                <div className="box-text">
                  <h4>Fabolous Sound</h4>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                </div>
              </div>{/* /.description-text */}
            </div>{/* /.col-md-6 */}
            <div className="col-md-6">
              <div className="description-image">
                <div className="box-image">
                  <img src="/images/product/single/01.png" alt="" />
                </div>
                <div className="box-text">
                  <h4>Nuqqam Et Massa</h4>
                  <p>Sed sodales sed orci molestie tristique. Nunc dictum, erat id molestie vestibulum, ex leo vestibulum justo, luctus tempor erat sem quis diam. Lorem ipsum dolor sit amet.</p>
                </div>
              </div>{/* /.description-image */}
            </div>{/* /.col-md-6 */}
            <div className="col-md-12">
              <div className="different-color">
                <div className="title">
                  Different Colors
                </div>
                <p>
                  Sed sodales sed orci<br />molestie
                </p>
              </div>{/* /.defferent-color */}
            </div>{/* /.col-md-12 */}
            <div className="col-md-6">
              <div className="box-left">
                <div className="img-line">
                  <img src="/images/product/single/line-1.png" alt="" />
                </div>
                <div className="img-product">
                  <img src="/images/product/single/06.png" alt="" />
                </div>
              </div>{/* /.box-left */}
            </div>{/* /.col-md-6 */}
            <div className="col-md-6">
              <div className="box-right">
                <div className="img-line">
                  <img src="/images/product/single/line-2.png" alt="" />
                  <img src="/images/product/single/04.png" alt="" />
                </div>
                <div className="img-product">
                </div>
                <div className="box-text">
                  <h4>Nuqqam Et Massa</h4>
                  <p>Sed sodales sed orci molestie tristique. Nunc dictum, erat id molestie vestibulum, ex leo vestibulum justo, luctus tempor erat sem quis diam. Lorem ipsum dolor sit amet.</p>
                </div>
              </div>{/* /.box-right */}
            </div>{/* /.col-md-6 */}
          </div>{/* /.row */}
          <div className="row">
            <div className="col-md-12">
              <div className="tecnical-specs">
                <h4 className="name">
                  Warch 42 mm Smart Watches
                </h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Height</td>
                      <td>38.6mm</td>
                    </tr>
                    <tr>
                      <td>Meterial</td>
                      <td>Stainless Stee</td>
                    </tr>
                    <tr>
                      <td>Case</td>
                      <td>40g</td>
                    </tr>
                    <tr>
                      <td>Color</td>
                      <td>blue, gray, green, light blue, lime, purple, red, yellow</td>
                    </tr>
                    <tr>
                      <td>Depth</td>
                      <td>10.5mm</td>
                    </tr>
                    <tr>
                      <td>Width</td>
                      <td>33.3mm</td>
                    </tr>
                    <tr>
                      <td>Size</td>
                      <td>Large, Medium, Small</td>
                    </tr>
                  </tbody>
                </table>
              </div>{/* /.tecnical-specs */}
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
          <div className="row">
            <div className="col-md-6">
              <div className="rating">
                <div className="title">
                  Based on 3 reviews
                </div>
                <div className="score">
                  <div className="average-score">
                    <p className="numb">4.3</p>
                    <p className="text">Average score</p>
                  </div>
                  <div className="queue">
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                    <i className="fa fa-star" aria-hidden="true" />
                  </div>
                </div>
                <ul className="queue-box">
                  <li className="five-star">
                    <span>
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </span>
                    <span className="numb-star">3</span>
                  </li>
                  <li className="four-star">
                    <span>
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </span>
                    <span className="numb-star">4</span>
                  </li>
                  <li className="three-star">
                    <span>
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </span>
                    <span className="numb-star">3</span>
                  </li>
                  <li className="two-star">
                    <span>
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </span>
                    <span className="numb-star">2</span>
                  </li>
                  <li className="one-star">
                    <span>
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </span>
                    <span className="numb-star">0</span>
                  </li>
                </ul>
              </div>{/* /.rating */}
            </div>{/* /.col-md-6 */}
            <div className="col-md-6">
              <div className="form-review">
                <div className="title">
                  Add a review 
                </div>
                <div className="your-rating queue">
                  <span>Your Rating</span>
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                </div>
                <form action="#" method="get" acceptCharset="utf-8">
                  <div className="review-form-name">
                    <input type="text" name="name-author" defaultValue placeholder="Name" />
                  </div>
                  <div className="review-form-email">
                    <input type="text" name="email-author" defaultValue placeholder="Email" />
                  </div>
                  <div className="review-form-comment">
                    <textarea name="review-text" placeholder="Your Name" defaultValue={""} />
                  </div>
                  <div className="btn-submit">
                    <button type="submit">Add Review</button>
                  </div>
                </form>
              </div>{/* /.form-review */}
            </div>{/* /.col-md-6 */}
            <div className="col-md-12">
              <ul className="review-list">
                <li>
                  <div className="review-metadata">
                    <div className="name">
                      Ali Tufan : <span>April 3, 2016</span>
                    </div>
                    <div className="queue">
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </div>
                  </div>{/* /.review-metadata */}
                  <div className="review-content">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                    </p> 
                  </div>{/* /.review-content */}
                </li>
                <li>
                  <div className="review-metadata">
                    <div className="name">
                      Peter Tufan : <span>April 3, 2016</span>
                    </div>
                    <div className="queue">
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </div>
                  </div>{/* /.review-metadata */}
                  <div className="review-content">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                    </p> 
                  </div>{/* /.review-content */}
                </li>
                <li>
                  <div className="review-metadata">
                    <div className="name">
                      Jon Tufan : <span>April 3, 2016</span>
                    </div>
                    <div className="queue">
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                      <i className="fa fa-star" aria-hidden="true" />
                    </div>
                  </div>{/* /.review-metadata */}
                  <div className="review-content">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                    </p> 
                  </div>{/* /.review-content */}
                </li>
              </ul>{/* /.review-list */}
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </section>{/* /.flat-product-content */}





      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="widget-ft widget-about">
                <div className="logo logo-ft">
                  <a href="index.html" title>
                    <img src="/images/logos/logo-ft.png" alt="" />
                  </a>
                </div>{/* /.logo-ft */}
                <div className="widget-content">
                  <div className="icon">
                    <img src="/images/icons/call.png" alt="" />
                  </div>
                  <div className="info">
                    <p className="questions">Got Questions ? Call us 24/7!</p>
                    <p className="phone">Call Us: (888) 1234 56789</p>
                    <p className="address">
                      PO Box CT16122 Collins Street West, Victoria 8007,<br />Australia.
                    </p>
                  </div>
                </div>{/* /.widget-content */}
                <ul className="social-list">
                  <li>
                    <a href="#" title>
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <i className="fa fa-pinterest" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <i className="fa fa-dribbble" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <i className="fa fa-google" aria-hidden="true" />
                    </a>
                  </li>
                </ul>{/* /.social-list */}
              </div>{/* /.widget-about */}
            </div>{/* /.col-lg-3 col-md-6 */}
            <div className="col-lg-3 col-md-6">
              <div className="widget-ft widget-categories-ft">
                <div className="widget-title">
                  <h3>Find By Categories</h3>
                </div>
                <ul className="cat-list-ft">
                  <li>
                    <a href="#" title>Desktops</a>
                  </li>
                  <li>
                    <a href="#" title>Laptops &amp; Notebooks</a>
                  </li>
                  <li>
                    <a href="#" title>Components</a>
                  </li>
                  <li>
                    <a href="#" title>Tablets</a>
                  </li>
                  <li>
                    <a href="#" title>Software</a>
                  </li>
                  <li>
                    <a href="#" title>Phones &amp; PDAs</a>
                  </li>
                  <li>
                    <a href="#" title>Cameras</a>
                  </li>
                </ul>{/* /.cat-list-ft */}
              </div>{/* /.widget-categories-ft */}
            </div>{/* /.col-lg-3 col-md-6 */}
            <div className="col-lg-2 col-md-6">
              <div className="widget-ft widget-menu">
                <div className="widget-title">
                  <h3>Customer Care</h3>
                </div>
                <ul>
                  <li>
                    <a href="#" title>
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      Site Map
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      My Account
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      Wish List
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      Delivery Information
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>{/* /.widget-menu */}
            </div>{/* /.col-lg-2 col-md-6 */}
            <div className="col-lg-4 col-md-6">
              <div className="widget-ft widget-newsletter">
                <div className="widget-title">
                  <h3>Sign Up To New Letter</h3>
                </div>
                <p>Make sure that you never miss our interesting <br />
                  news by joining our newsletter program
                </p>
                <form action="#" className="subscribe-form" method="get" acceptCharset="utf-8">
                  <div className="subscribe-content">
                    <input type="text" name="email" className="subscribe-email" />
                    <button type="submit"><img src="/images/icons/right-2.png" alt="" /></button>
                  </div>
                </form>{/* /.subscribe-form */}
                <ul className="pay-list">
                  <li>
                    <a href="#" title>
                      <img src="/images/logos/ft-01.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="/images/logos/ft-02.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="/images/logos/ft-03.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="/images/logos/ft-04.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="/images/logos/ft-05.png" alt="" />
                    </a>
                  </li>
                </ul>{/* /.pay-list */}
              </div>{/* /.widget-newsletter */}
            </div>{/* /.col-lg-4 col-md-6 */}
          </div>{/* /.row */}
          <div className="row">
            <div className="col-md-12">
              <div className="widget widget-apps">
                <div className="widget-title">
                  <h3>Mobile Apps</h3>
                </div>
                <ul className="app-list">
                  <li className="app-store">
                    <a href="#" title>
                      <div className="img">
                        <img src="/images/icons/app-store.png" alt="" />
                      </div>
                      <div className="text">
                        <h4>App Store</h4>
                        <p>Available now on the</p>
                      </div>
                    </a>
                  </li>{/* /.app-store */}
                  <li className="google-play">
                    <a href="#" title>
                      <div className="img">
                        <img src="/images/icons/google-play.png" alt="" />
                      </div>
                      <div className="text">
                        <h4>Google Play</h4>
                        <p>Get in on</p>
                      </div>
                    </a>	
                  </li>{/* /.google-play */}
                </ul>{/* /.app-list */}
              </div>{/* /.widget-apps */}
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </footer>{/* /footer */}

    </div>{/* /.boxed */}
    {/* Javascript */}
  </div>
  )
}

export default Productview