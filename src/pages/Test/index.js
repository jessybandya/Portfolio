import React,{useState} from 'react'
import datas from '../../assets/data/categories/data'
import Header from '../../components1/Header'
import {Modal, Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import Toprated from '../../sub-components/Toprated';
import Newarrivals from '../../sub-components/Newarrivals';
import Offers from '../../sub-components/Offers';
import Footer from '../../examples/Footer';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import SoftButton from '../../components/SoftButton';
import Typewriter from 'typewriter-effect';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByLatLng } from 'react-google-places-autocomplete';
import { updateAddress, updateAuthId, updateLatitude, updateLongitude } from '../../auth/redux/dataSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import swal from '@sweetalert/with-react';
import Geocode from "react-geocode";
import SoftInput from '../../components/SoftInput';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Slider1 from '../../sub-components/Slider1';


function Test() {
  const [modalShow, setModalShow] = React.useState(false);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const address = useSelector((state) => state.address);
  const dispatch = useDispatch();


  React.useEffect(() => {
    if(address === ''){
      navigator.geolocation.getCurrentPosition(function(position) {
  
        var lat1 = position.coords.latitude
        var long1 = position.coords.longitude
        setLat(lat1)
        setLong(long1)
       dispatch(updateLatitude(lat1))
       dispatch(updateLongitude(long1))
       getAddress(lat1,long1)
      });
    }
  }, [address]);




     // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyCAawMnC6vfUa40ZNFsLN-ov7Pa4DjcUrM');

// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("ke");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.

  const [lat, setLat] = useState(`${latitude}`)
  const [long, setLong] = useState(`${longitude}`)

  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {

      var lat1 = position.coords.latitude
      var long1 = position.coords.longitude
      setLat(lat1)
      setLong(long1)
     dispatch(updateLatitude(lat1))
     dispatch(updateLongitude(long1))
     getAddress(lat1,long1)
    });
  }

  const clearMyLocation = () => {
    dispatch(updateAddress(''))
    dispatch(updateLatitude(''))
    dispatch(updateLongitude(''))
  }

  console.log(`Lat: ${latitude}`)
  console.log(`Long: ${longitude}`)
  const getAddress = (lat, lng) => {
    // Get address from latitude & longitude.
Geocode.fromLatLng(lat, lng).then(
  (response) => {
    const address = response.results[0].formatted_address;
    dispatch(updateAddress(address))
    swal(`Current location address-> ${address}`)
  },
  (error) => {
    console.error(error);
  }
);
  }


  return (
    <div className="header_sticky">
    <div className="boxed">
      <div className="overlay" />
      {/* Preloader */}
      <div className="preloader">
        <div className="clear-loading loading-effect-2">
          <span />
        </div>
      </div>{/* /.preloader */}
      <section id="header" className="header">
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <ul className="flat-support">
                  <li>
                    <a href="faq.html" title>Support</a>
                  </li>
                  <li>
                    <a href="store-location.html" title>Store Locator</a>
                  </li>
                  <li>
                    <a href="order-tracking.html" title>Track Your Order</a>
                  </li>
                </ul>{/* /.flat-support */}
              </div>{/* /.col-md-4 */}
              <div className="col-md-4">
                <ul className="flat-infomation">
                  <li className="phone">
                    Call Us: <a href="#" title>(888) 1234 56789</a>
                  </li>
                </ul>{/* /.flat-infomation */}
              </div>{/* /.col-md-4 */}
              <div className="col-md-4">
                <ul className="flat-unstyled">
                  <li className="account">
                    <a href="#" title>My Account<i className="fa fa-angle-down" aria-hidden="true" /></a>
                    <ul className="unstyled">
                      <li>
                        <a href="#" title>Login</a>
                      </li>
                      <li>
                        <a href="wishlist.html" title>Wishlist</a>
                      </li>
                      <li>
                        <a href="shop-cart.html" title>My Cart</a>
                      </li>
                      <li>
                        <a href="my-account.html" title>My Account</a>
                      </li>
                      <li>
                        <a href="shop-checkout.html" title>Checkout</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" title>USD<i className="fa fa-angle-down" aria-hidden="true" /></a>
                    <ul className="unstyled">
                      <li>
                        <a href="#" title>Euro</a>
                      </li>
                      <li>
                        <a href="#" title>Dolar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" title>English<i className="fa fa-angle-down" aria-hidden="true" /></a>
                    <ul className="unstyled">
                      <li>
                        <a href="#" title>Turkish</a>
                      </li>
                      <li>
                        <a href="#" title>English</a>
                      </li>
                      <li>
                        <a href="#" title>اللغة العربية</a>
                      </li>
                      <li>
                        <a href="#" title>Español</a>
                      </li>
                      <li>
                        <a href="#" title>Italiano</a>
                      </li>
                    </ul>
                  </li>
                </ul>{/* /.flat-unstyled */}
              </div>{/* /.col-md-4 */}
            </div>{/* /.row */}
          </div>{/* /.container */}
        </div>{/* /.header-top */}
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div id="logo" className="logo">
                  <a href="index.html" title>
                    <img src="images/logos/logo.png" alt="" />
                  </a>
                </div>{/* /#logo */}
              </div>{/* /.col-md-3 */}
              <div className="col-md-6">
                <div className="top-search">
                  <form action="#" method="get" className="form-search" acceptCharset="utf-8">
                    <div className="cat-wrap">
                      <select name="category">
                        <option value hidden>All Category</option>
                        <option value hidden>Cameras</option>
                        <option value hidden>Computer</option>
                        <option value hidden>Laptops</option>
                      </select>
                      <span><i className="fa fa-angle-down" aria-hidden="true" /></span>
                      <div className="all-categories">
                        <div className="cat-list-search">
                          <div className="title">
                            Electronics
                          </div>
                          <ul>
                            <li>Components</li>
                            <li>Laptop</li>
                            <li>Monitor</li>
                            <li>Mp3 player</li>
                            <li>Scanners</li>
                          </ul>
                        </div>{/* /.cat-list-search */}
                        <div className="cat-list-search">
                          <div className="title">
                            Furniture
                          </div>
                          <ul>
                            <li>Bookcases</li>
                            <li>Barstools</li>
                            <li>TV stands</li>
                            <li>Desks</li>
                            <li>Accent chairs</li>
                          </ul>
                        </div>{/* /.cat-list-search */}
                        <div className="cat-list-search">
                          <div className="title">
                            Accessories
                          </div>
                          <ul>
                            <li>Software</li>
                            <li>Mobile</li>
                            <li>TV stands</li>
                            <li>Printers</li>
                            <li>Media</li>
                          </ul>
                        </div>{/* /.cat-list-search */}
                      </div>{/* /.all-categories */}
                      <span><i className="fa fa-angle-down" aria-hidden="true" /></span>
                    </div>{/* /.cat-wrap */}
                    <div className="box-search">
                      <input type="text" name="search" placeholder="Search what you looking for ?" />
                      <span className="btn-search">
                        <button type="submit" className="waves-effect"><img src="images/icons/search.png" alt="" /></button>
                      </span>
                      <div className="search-suggestions">
                        <div className="box-suggestions">
                          <div className="title">
                            Search Suggestions
                          </div>
                          <ul>
                            <li>
                              <div className="image">
                                <img src="images/product/other/s05.jpg" alt="" />
                              </div>
                              <div className="info-product">
                                <div className="name">
                                  <a href="#" title>Razer RZ02-01071500-R3M1</a>
                                </div>
                                <div className="price">
                                  <span className="sale">
                                    $50.00
                                  </span>
                                  <span className="regular">
                                    $2,999.00
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="image">
                                <img src="images/product/other/s06.jpg" alt="" />
                              </div>
                              <div className="info-product">
                                <div className="name">
                                  <a href="#" title>Notebook Black Spire V Nitro VN7-591G</a>
                                </div>
                                <div className="price">
                                  <span className="sale">
                                    $24.00
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="image">
                                <img src="images/product/other/14.jpg" alt="" />
                              </div>
                              <div className="info-product">
                                <div className="name">
                                  <a href="#" title>Apple iPad Mini G2356</a>
                                </div>
                                <div className="price">
                                  <span className="sale">
                                    $90.00
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="image">
                                <img src="images/product/other/02.jpg" alt="" />
                              </div>
                              <div className="info-product">
                                <div className="name">
                                  <a href="#" title>Razer RZ02-01071500-R3M1</a>
                                </div>
                                <div className="price">
                                  <span className="sale">
                                    $50.00
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="image">
                                <img src="images/product/other/l01.jpg" alt="" />
                              </div>
                              <div className="info-product">
                                <div className="name">
                                  <a href="#" title>Apple iPad Mini G2356</a>
                                </div>
                                <div className="price">
                                  <span className="sale">
                                    $24.00
                                  </span>
                                  <span className="regular">
                                    $2,999.00
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="image">
                                <img src="images/product/other/s08.jpg" alt="" />
                              </div>
                              <div className="info-product">
                                <div className="name">
                                  <a href="#" title>Beats Snarkitecture Headphones</a>
                                </div>
                                <div className="price">
                                  <span className="sale">
                                    $90.00
                                  </span>
                                  <span className="regular">
                                    $2,999.00
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>{/* /.box-suggestions */}
                        <div className="box-cat">
                          <div className="cat-list-search">
                            <div className="title">
                              Categories
                            </div>
                            <ul>
                              <li>
                                <a href="#">Networking &amp; Internet Devices</a>
                              </li>
                              <li>
                                <a href="#">Laptops, Desktops &amp; Monitors</a>
                              </li>
                              <li>
                                <a href="#">Hard Drives &amp; Memory Cards</a>
                              </li>
                              <li>
                                <a href="#">Printers &amp; Ink</a>
                              </li>
                              <li>
                                <a href="#">Networking &amp; Internet Devices</a>
                              </li>
                              <li>
                                <a href="#">Computer Accessories</a>
                              </li>
                              <li>
                                <a href="#">Software</a>
                              </li>
                            </ul>
                          </div>{/* /.cat-list-search */}
                        </div>{/* /.box-cat */}
                      </div>{/* /.search-suggestions */}
                    </div>{/* /.box-search */}
                  </form>{/* /.form-search */}
                </div>{/* /.top-search */}
              </div>{/* /.col-md-6 */}
              <div className="col-md-3">
                <div className="box-cart">
                  <div className="inner-box">
                    <ul className="menu-compare-wishlist">
                      <li className="compare">
                        <a href="compare.html" title>
                          <img src="images/icons/compare.png" alt="" />
                        </a>
                      </li>
                      <li className="wishlist">
                        <a href="wishlist.html" title>
                          <img src="images/icons/wishlist.png" alt="" />
                        </a>
                      </li>
                    </ul>{/* /.menu-compare-wishlist */}
                  </div>{/* /.inner-box */}
                  <div className="inner-box">
                    <a href="#" title>
                      <div className="icon-cart">
                        <img src="images/icons/cart.png" alt="" />
                        <span>4</span>
                      </div>
                      <div className="price">
                        $0.00
                      </div>
                    </a>
                    <div className="dropdown-box">
                      <ul>
                        <li>
                          <div className="img-product">
                            <img src="images/product/other/img-cart-1.jpg" alt="" />
                          </div>
                          <div className="info-product">
                            <div className="name">
                              Samsung - Galaxy S6 4G LTE <br />with 32GB Memory Cell Phone
                            </div>
                            <div className="price">
                              <span>1 x</span>
                              <span>$250.00</span>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <span className="delete">x</span>
                        </li>
                        <li>
                          <div className="img-product">
                            <img src="images/product/other/img-cart-2.jpg" alt="" />
                          </div>
                          <div className="info-product">
                            <div className="name">
                              Sennheiser - Over-the-Ear Headphone System - Black
                            </div>
                            <div className="price">
                              <span>1 x</span>
                              <span>$250.00</span>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <span className="delete">x</span>
                        </li>
                      </ul>
                      <div className="total">
                        <span>Subtotal:</span>
                        <span className="price">$1,999.00</span>
                      </div>
                      <div className="btn-cart">
                        <a href="shop-cart.html" className="view-cart" title>View Cart</a>
                        <a href="shop-checkout.html" className="check-out" title>Checkout</a>
                      </div>
                    </div>
                  </div>{/* /.inner-box */}
                </div>{/* /.box-cart */}
              </div>{/* /.col-md-3 */}
            </div>{/* /.row */}
          </div>{/* /.container */}
        </div>{/* /.header-middle */}
        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-2">
                <div id="mega-menu">
                  <div className="btn-mega"><span />ALL CATEGORIES</div>
                  <ul className="menu">
                    <li>
                      <a href="#" title className="dropdown">
                        <span className="menu-img">
                          <img src="images/icons/menu/01.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Laptops &amp; Mac
                        </span>
                      </a>
                      <div className="drop-menu">
                        <div className="one-third">
                          <div className="cat-title">
                            Laptop And Mac
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Networking &amp; Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Laptops, Desktops &amp; Monitors</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Computer Accessories</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <div className="cat-title">
                            Audio &amp; Video
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Headphones &amp; Speakers</a>
                            </li>
                            <li>
                              <a href="#" title>Home Entertainment Systems</a>
                            </li>
                            <li>
                              <a href="#" title>MP3 &amp; Media Players</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <ul className="banner">
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Headphones
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-01.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  TV &amp; Audio
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-02.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Computers
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-03.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                          </ul>	
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="#" title className="dropdown">
                        <span className="menu-img">
                          <img src="images/icons/menu/02.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Mobile &amp; Tablet
                        </span>
                      </a>
                      <div className="drop-menu">
                        <div className="one-third">
                          <div className="cat-title">
                            Laptop And Computer
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Networking &amp; Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Laptops, Desktops &amp; Monitors</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Printers &amp; Ink</a>
                            </li>
                            <li>
                              <a href="#" title>Networking &amp; Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Computer Accessories</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <div className="cat-title">
                            Audio &amp; Video
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Headphones &amp; Speakers</a>
                            </li>
                            <li>
                              <a href="#" title>Home Entertainment Systems</a>
                            </li>
                            <li>
                              <a href="#" title>MP3 &amp; Media Players</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <ul className="banner">
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Headphones
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-01.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  TV &amp; Audio
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-02.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Computers
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-03.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                          </ul>	
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="#" title className="dropdown">
                        <span className="menu-img">
                          <img src="images/icons/menu/03.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Home Devices
                        </span>
                      </a>
                      <div className="drop-menu">
                        <div className="one-third">
                          <div className="cat-title">
                            Home Devices
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Desktops &amp; Monitors</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Networking</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <div className="cat-title">
                            Audio
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Home Entertainment Systems</a>
                            </li>
                            <li>
                              <a href="#" title>MP3 &amp; Media Players</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <ul className="banner">
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Headphones
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-01.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  TV &amp; Audio
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-02.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Computers
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-03.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                          </ul>	
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="#" title>
                        <span className="menu-img">
                          <img src="images/icons/menu/04.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Software
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        <span className="menu-img">
                          <img src="images/icons/menu/05.png" alt="" />
                        </span>
                        <span className="menu-title">
                          TV &amp; Audio
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" title>
                        <span className="menu-img">
                          <img src="images/icons/menu/06.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Sports &amp; Fitness
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" title className="dropdown">
                        <span className="menu-img">
                          <img src="images/icons/menu/07.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Games &amp; Toys
                        </span>
                      </a>
                      <div className="drop-menu">
                        <div className="one-third">
                          <div className="cat-title">
                            Games &amp; Toys
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Desktops &amp; Monitors</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Networking</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <div className="cat-title">
                            Audio
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Home Entertainment Systems</a>
                            </li>
                            <li>
                              <a href="#" title>MP3 &amp; Media Players</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <ul className="banner">
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Headphones
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-01.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  TV &amp; Audio
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-02.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Computers
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-03.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                          </ul>	
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="#" title>
                        <span className="menu-img">
                          <img src="images/icons/menu/08.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Video Cameras
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" title className="dropdown">
                        <span className="menu-img">
                          <img src="images/icons/menu/09.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Accessories
                        </span>
                      </a>
                      <div className="drop-menu">
                        <div className="one-third">
                          <div className="cat-title">
                            Accessories
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Desktops &amp; Monitors</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Networking</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <div className="cat-title">
                            Audio
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Home Entertainment Systems</a>
                            </li>
                            <li>
                              <a href="#" title>MP3 &amp; Media Players</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <ul className="banner">
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Headphones
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-01.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  TV &amp; Audio
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-02.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Computers
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-03.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                          </ul>	
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="#" title className="dropdown">
                        <span className="menu-img">
                          <img src="images/icons/menu/10.png" alt="" />
                        </span>
                        <span className="menu-title">
                          Security
                        </span>
                      </a>
                      <div className="drop-menu">
                        <div className="one-third">
                          <div className="cat-title">
                            Security
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Internet Devices</a>
                            </li>
                            <li>
                              <a href="#" title>Desktops &amp; Monitors</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Networking</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <div className="cat-title">
                            Audio
                          </div>
                          <ul>
                            <li>
                              <a href="#" title>Home Entertainment Systems</a>
                            </li>
                            <li>
                              <a href="#" title>MP3 &amp; Media Players</a>
                            </li>
                            <li>
                              <a href="#" title>Software</a>
                            </li>
                            <li>
                              <a href="#" title>Hard Drives &amp; Memory Cards</a>
                            </li>
                            <li>
                              <a href="#" title>Networking</a>
                            </li>
                          </ul>
                          <div className="show">
                            <a href="#" title>Shop All</a>
                          </div>
                        </div>
                        <div className="one-third">
                          <ul className="banner">
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Headphones
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-01.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  TV &amp; Audio
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-02.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                            <li>
                              <div className="banner-text">
                                <div className="banner-title">
                                  Computers
                                </div>
                                <div className="more-link">
                                  <a href="#" title>Shop Now <img src="images/icons/right-2.png" alt="" /></a>
                                </div>
                              </div>
                              <div className="banner-img">
                                <img src="images/banner_boxes/menu-03.png" alt="" />
                              </div>
                              <div className="clearfix" />
                            </li>
                          </ul>	
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>{/* /.col-md-3 col-2 */}
              <div className="col-md-9 col-10">
                <div className="nav-wrap">
                  <div id="mainnav" className="mainnav">
                    <ul className="menu">
                      <li className="column-1">
                        <a href="index.html" title>Home</a>
                        <ul className="submenu">
                          <li>
                            <a href="index.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 01</a>
                          </li>
                          <li>
                            <a href="index-v2.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 02</a>
                          </li>
                          <li>
                            <a href="index-v3.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 03</a>
                          </li>
                          <li>
                            <a href="index-v4.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 04</a>
                          </li>
                          <li>
                            <a href="index-v5.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 05</a>
                          </li>
                          <li>
                            <a href="index-v6.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 06</a>
                          </li>
                          <li>
                            <a href="index-v7.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 07</a>
                          </li>
                          <li>
                            <a href="index-v8.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 08</a>
                          </li>
                          <li>
                            <a href="index-v9.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 09</a>
                          </li>
                          <li>
                            <a href="index-v10.html" title><i className="fa fa-angle-right" aria-hidden="true" />Home Layout 10</a>
                          </li>
                        </ul>{/* /.submenu */}
                      </li>{/* /.column-1 */}
                      <li className="column-1">
                        <a href="shop.html" title>Shop</a>
                        <ul className="submenu">
                          <li>
                            <a href="shop.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop left sidebar</a>
                          </li>
                          <li>
                            <a href="shop-v2.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop right sidebar</a>
                          </li>
                          <li>
                            <a href="shop-v3.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop list view</a>
                          </li>
                          <li>
                            <a href="shop-v4.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop full width</a>
                          </li>
                          <li>
                            <a href="shop-v5.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop 03 column</a>
                          </li>
                          <li>
                            <a href="shop-cart.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop cart</a>
                          </li>
                          <li>
                            <a href="shop-checkout.html" title><i className="fa fa-angle-right" aria-hidden="true" />Shop checkout</a>
                          </li>
                        </ul>{/* /.submenu */}
                      </li>{/* /.column-1 */}
                      <li className="column-1">
                        <a href="#" title>Features</a>
                        <ul className="submenu">
                          <li>
                            <a href="#" title><i className="fa fa-angle-right" aria-hidden="true" />Home Theater Systems</a>
                          </li>
                          <li>
                            <a href="#" title><i className="fa fa-angle-right" aria-hidden="true" />Receivers &amp; Amplifiers</a>
                          </li>
                          <li>
                            <a href="#" title><i className="fa fa-angle-right" aria-hidden="true" />Speakers</a>
                          </li>
                          <li>
                            <a href="#" title><i className="fa fa-angle-right" aria-hidden="true" />CD Players &amp; Turntables</a>
                          </li>
                          <li>
                            <a href="#" title><i className="fa fa-angle-right" aria-hidden="true" />High-Resolution Audio</a>
                          </li>
                          <li>
                            <a href="#" title><i className="fa fa-angle-right" aria-hidden="true" />4K Ultra HD TVs</a>
                          </li>
                        </ul>{/* /.submenu */}
                      </li>{/* /.column-1 */}
                      <li className="has-mega-menu">
                        <a href="#" title>Electronic</a>
                        <div className="submenu">
                          <div className="row">
                            <div className="col-lg-3 col-md-12">
                              <h3 className="cat-title">Accessories</h3>
                              <ul className="submenu-child">
                                <li>
                                  <a href="#" title>Electronics</a>
                                </li>
                                <li>
                                  <a href="#" title>Furniture</a>
                                </li>
                                <li>
                                  <a href="#" title>Accessories</a>
                                </li>
                                <li>
                                  <a href="#" title>Divided</a>
                                </li>
                                <li>
                                  <a href="#" title>Everyday Fashion</a>
                                </li>
                                <li>
                                  <a href="#" title>Modern Classic</a>
                                </li>
                                <li>
                                  <a href="#" title>Party</a>
                                </li>
                              </ul>
                              <div className="show">
                                <a href="#" title>Shop All</a>
                              </div>
                            </div>{/* /.col-lg-3 col-md-12 */}
                            <div className="col-lg-3 col-md-12">
                              <h3 className="cat-title">Laptop And Computer</h3>
                              <ul className="submenu-child">
                                <li>
                                  <a href="#" title>Networking &amp; Internet Devices</a>
                                </li>
                                <li>
                                  <a href="#" title>Laptops, Desktops &amp; Monitors</a>
                                </li>
                                <li>
                                  <a href="#" title>Hard Drives &amp; Memory Cards</a>
                                </li>
                                <li>
                                  <a href="#" title>Printers &amp; Ink</a>
                                </li>
                                <li>
                                  <a href="#" title>Networking &amp; Internet Devices</a>
                                </li>
                                <li>
                                  <a href="#" title>Computer Accessories</a>
                                </li>
                                <li>
                                  <a href="#" title>Software</a>
                                </li>
                              </ul>
                              <div className="show">
                                <a href="#" title>Shop All</a>
                              </div>
                            </div>{/* /.col-lg-3 col-md-12 */}
                            <div className="col-lg-4 col-md-12">
                              <h3 className="cat-title">Audio &amp; Video</h3>
                              <ul className="submenu-child">
                                <li>
                                  <a href="#" title>Headphones &amp; Speakers</a>
                                </li>
                                <li>
                                  <a href="#" title>Home Entertainment Systems</a>
                                </li>
                                <li>
                                  <a href="#" title>MP3 &amp; Media Players</a>
                                </li>
                              </ul>
                              <div className="show">
                                <a href="#" title>Shop All</a>
                              </div>
                            </div>{/* /.col-lg-4 col-md-12 */}
                            <div className="col-lg-2 col-md-12">
                              <h3 className="cat-title">Home Audio</h3>
                              <ul className="submenu-child">
                                <li>
                                  <a href="#" title>Home Theater Systems</a>
                                </li>
                                <li>
                                  <a href="#" title>Receivers &amp; Amplifiers</a>
                                </li>
                                <li>
                                  <a href="#" title>Speakers</a>
                                </li>
                                <li>
                                  <a href="#" title>CD Players &amp; Turntables</a>
                                </li>
                                <li>
                                  <a href="#" title>High-Resolution Audio</a>
                                </li>
                                <li>
                                  <a href="#" title>4K Ultra HD TVs</a>
                                </li>
                              </ul>
                              <div className="show">
                                <a href="#" title>Shop All</a>
                              </div>
                            </div>{/* /.col-lg-2 col-md-12 */}
                          </div>{/* /.row */}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="banner-box">
                                <div className="inner-box">
                                  <a href="#" title>
                                    <img src="images/banner_boxes/submenu-01.png" alt="" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="banner-box">
                                <div className="inner-box">
                                  <a href="#" title>
                                    <img src="images/banner_boxes/submenu-02.png" alt="" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>{/* /.row */}
                        </div>{/* /.submenu */}
                      </li>{/* /.has-mega-menu */}
                      <li className="column-1">
                        <a href="#" title>Pages</a>
                        <ul className="submenu">
                          <li>
                            <a href="about.html" title><i className="fa fa-angle-right" aria-hidden="true" />About</a>
                          </li>
                          <li>
                            <a href="404.html" title><i className="fa fa-angle-right" aria-hidden="true" />404 Page</a>
                          </li>
                          <li>
                            <a href="brands.html" title><i className="fa fa-angle-right" aria-hidden="true" />Brands Page</a>
                          </li>
                          <li>
                            <a href="categories.html" title><i className="fa fa-angle-right" aria-hidden="true" />Categories 01</a>
                          </li>
                          <li>
                            <a href="categories-v2.html" title><i className="fa fa-angle-right" aria-hidden="true" />Categories 02</a>
                          </li>
                          <li>
                            <a href="element.html" title><i className="fa fa-angle-right" aria-hidden="true" />Element</a>
                          </li>
                          <li>
                            <a href="faq.html" title><i className="fa fa-angle-right" aria-hidden="true" />FAQ</a>
                          </li>
                          <li>
                            <a href="order-tracking.html" title><i className="fa fa-angle-right" aria-hidden="true" />Order Tracking</a>
                          </li>
                          <li>
                            <a href="term-condition.html" title><i className="fa fa-angle-right" aria-hidden="true" />Terms &amp; Conditions</a>
                          </li>
                          <li>
                            <a href="single-product.html" title><i className="fa fa-angle-right" aria-hidden="true" />Single Product 01</a>
                          </li>
                          <li>
                            <a href="single-product-v2.html" title><i className="fa fa-angle-right" aria-hidden="true" />Single Product 02</a>
                          </li>
                          <li>
                            <a href="single-product-v3.html" title><i className="fa fa-angle-right" aria-hidden="true" />Single Product 03</a>
                          </li>
                          <li>
                            <a href="single-product-v4.html" title><i className="fa fa-angle-right" aria-hidden="true" />Single Product 04</a>
                          </li>
                          <li>
                            <a href="single-product-v5.html" title><i className="fa fa-angle-right" aria-hidden="true" />Single Product 05</a>
                          </li>
                        </ul>{/* /.submenu */}
                      </li>{/* /.column-1 */}
                      <li className="column-1">
                        <a href="blog.html" title>Blog</a>
                        <ul className="submenu">
                          <li>
                            <a href="blog.html" title><i className="fa fa-angle-right" aria-hidden="true" />Blog left sidebar</a>
                          </li>
                          <li>
                            <a href="blog-v2.html" title><i className="fa fa-angle-right" aria-hidden="true" />Blog right sidebar</a>
                          </li>
                          <li>
                            <a href="blog-v3.html" title><i className="fa fa-angle-right" aria-hidden="true" />Blog list</a>
                          </li>
                          <li>
                            <a href="blog-v4.html" title><i className="fa fa-angle-right" aria-hidden="true" />Blog 02 column</a>
                          </li>
                          <li>
                            <a href="blog-v5.html" title><i className="fa fa-angle-right" aria-hidden="true" />Blog full width</a>
                          </li>
                          <li>
                            <a href="blog-single.html" title><i className="fa fa-angle-right" aria-hidden="true" />Blog single</a>
                          </li>
                        </ul>{/* /.submenu */}
                      </li>{/* /.column-1 */}
                      <li className="column-1">
                        <a href="contact.html" title>Contact</a>
                        <ul className="submenu">
                          <li>
                            <a href="contact.html" title><i className="fa fa-angle-right" aria-hidden="true" />Contact 01</a>
                          </li>
                          <li>
                            <a href="contact-v2.html" title><i className="fa fa-angle-right" aria-hidden="true" />Contact 02</a>
                          </li>
                        </ul>{/* /.submenu */}
                      </li>{/* /.column-1 */}
                    </ul>{/* /.menu */}
                  </div>{/* /.mainnav */}
                </div>{/* /.nav-wrap */}
                <div className="today-deal">
                  <a href="#" title>TODAY DEALS</a>
                </div>{/* /.today-deal */}
                <div className="btn-menu">
                  <span />
                </div>{/* //mobile menu button */}
              </div>{/* /.col-md-9 */}
            </div>{/* /.row */}
          </div>{/* /.container */}
        </div>{/* /.header-bottom */}
      </section>{/* /#header */}
      <section className="flat-breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li className="trail-item">
                  <a href="#" title>Home</a>
                  <span><img src="images/icons/arrow-right.png" alt="" /></span>
                </li>
                <li className="trail-item">
                  <a href="#" title>Shop</a>
                  <span><img src="images/icons/arrow-right.png" alt="" /></span>
                </li>
                <li className="trail-end">
                  <a href="#" title>Smartphones</a>
                </li>
              </ul>{/* /.breacrumbs */}
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </section>{/* /.flat-breadcrumb */}
      <main id="single-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="sidebar ">
                <div className="widget widget-categories">
                  <div className="widget-title">
                    <h3>Categories<span /></h3>
                  </div>
                  <ul className="cat-list style1 widget-content">
                    <li>
                      <span>Accessories<i>(03)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>TV</a>
                        </li>
                        <li>
                          <a href="#" title>Monitors</a>
                        </li>
                        <li>
                          <a href="#" title>Software</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Cameras<i>(19)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Go Pro</a>
                        </li>
                        <li>
                          <a href="#" title>Video</a>
                        </li>
                        <li>
                          <a href="#" title>Software</a>
                        </li>
                      </ul>
                    </li>
                    <li className>
                      <span>Computers<i>(56)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Desktop</a>
                        </li>
                        <li>
                          <a href="#" title>Monitors</a>
                        </li>
                        <li>
                          <a href="#" title>Software</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Laptops<i>(03)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Desktop</a>
                        </li>
                        <li>
                          <a href="#" title>Monitors</a>
                        </li>
                        <li>
                          <a href="#" title>Software</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Networking<i>(03)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Monitors</a>
                        </li>
                        <li>
                          <a href="#" title>Software</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Old Products<i>(89)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Monitors</a>
                        </li>
                        <li>
                          <a href="#" title>Software</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Smartphones<i>(90)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Apple</a>
                        </li>
                        <li>
                          <a href="#" title>HTC</a>
                        </li>
                        <li>
                          <a href="#" title>Sony</a>
                        </li>
                        <li>
                          <a href="#" title>Samsung</a>
                        </li>
                        <li>
                          <a href="#" title>LG</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>Software<i>(23)</i></span>
                      <ul className="cat-child">
                        <li>
                          <a href="#" title>Desktop</a>
                        </li>
                        <li>
                          <a href="#" title>Monitors</a>
                        </li>
                        <li>
                          <a href="#" title>BKAV</a>
                        </li>
                      </ul>
                    </li>
                  </ul>{/* /.cat-list */}
                </div>{/* /.widget-categories */}
                <div className="widget widget-products">
                  <div className="widget-title">
                    <h3>Lastest Products<span /></h3>
                  </div>
                  <ul className="product-list widget-content">
                    <li>
                      <div className="img-product">
                        <a href="#" title>
                          <img src="images/blog/14.jpg" alt="" />
                        </a>
                      </div>
                      <div className="info-product">
                        <div className="name">
                          <a href="#" title>Razer RZ02-01071 <br />500-R3M1</a>
                        </div>
                        <div className="queue">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                        </div>
                        <div className="price">
                          <span className="sale">$50.00</span>
                          <span className="regular">$2,999.00</span>
                        </div>
                      </div>
                    </li>	
                    <li>
                      <div className="img-product">
                        <a href="#" title>
                          <img src="images/blog/13.jpg" alt="" />
                        </a>
                      </div>
                      <div className="info-product">
                        <div className="name">
                          <a href="#" title>Notebook Black Spire <br />V Nitro VN7-591G</a>
                        </div>
                        <div className="queue">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                        </div>
                        <div className="price">
                          <span className="sale">$24.00</span>
                          <span className="regular">$2,999.00</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="img-product">
                        <a href="#" title>
                          <img src="images/blog/12.jpg" alt="" />
                        </a>
                      </div>
                      <div className="info-product">
                        <div className="name">
                          <a href="#" title>Apple iPad Mini <br />G2356</a>
                        </div>
                        <div className="queue">
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                          <i className="fa fa-star" aria-hidden="true" />
                        </div>
                        <div className="price">
                          <span className="sale">$90.00</span>
                          <span className="regular">$2,999.00</span>
                        </div>
                      </div>
                    </li>	
                  </ul>
                </div>{/* /.widget widget-products */}
                <div className="widget widget-banner">
                  <div className="banner-box">
                    <div className="inner-box">
                      <a href="#" title>
                        <img src="images/banner_boxes/06.png" alt="" />
                      </a>
                    </div>
                  </div>
                </div>{/* /.widget widget-banner */}
              </div>{/* /.sidebar */}
            </div>{/* /.col-lg-3 col-md-4 */}
            <div className="col-lg-9 col-md-8">
              <div className="flat-product-detail">
                <div className="row">
                  <div className="box-flexslider">
                    <div className="flexslider">
                      <ul className="slides">
                        <li data-thumb="images/product/flexslider/thumb/2.jpg">
                          <a href="#" id="zoom" className="zoom"><img src="images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
                          <span>NEW</span>
                        </li>
                        <li data-thumb="images/product/flexslider/thumb/3.jpg">
                          <a href="#" id="zoom1" className="zoom"><img src="images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
                        </li>
                        <li data-thumb="images/product/flexslider/thumb/4.jpg">
                          <a href="#" id="zoom2" className="zoom"><img src="images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
                          <span>NEW</span>
                        </li>
                        <li data-thumb="images/product/flexslider/thumb/5.jpg">
                          <a href="#" id="zoom3" className="zoom"><img src="images/product/flexslider/big-size.jpg" alt="" width={400} height={300} /></a>
                        </li>
                      </ul>{/* /.slides */}
                    </div>{/* /.flexslider */}
                  </div>{/* /.box-flexslider */}
                  <div className="product-detail style5">
                    <div className="header-detail">
                      <h4 className="name">Warch 42 mm Smart Watches</h4>
                      <div className="category">
                        Smart Watches
                      </div>
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
                      </div>
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
                        Vivamus in tempor eros. Phasellus rhoncus in nunc sit amet ipsum vestibulum, molestie arcu ac, efficitur tellus. Phasellus id 
                      </div>
                      <div className="product-id">
                        SKU: <span className="id">FW511948218</span>
                      </div>
                    </div>{/* /.content-detail */}
                    <div className="footer-detail">
                      <div className="quanlity-box">
                        <div className="colors">
                          <select name="Quanlity">
                            <option value>Select Color</option>
                            <option value>Black</option>
                            <option value>Red</option>
                            <option value>White</option>
                          </select>
                        </div>
                        <div className="quanlity">
                          <span className="btn-down" />
                          <input type="number" name="number" defaultValue min={1} max={100} placeholder="Quanlity" />
                          <span className="btn-up" />
                        </div>
                      </div>
                      <div className="box-cart style2">
                        <div className="btn-add-cart">
                          <a href="#" title><img src="images/icons/add-cart.png" alt="" />Add to Cart</a>
                        </div>
                        <div className="compare-wishlist">
                          <a href="compare.html" className="compare" title><img src="images/icons/compare.png" alt="" />Compare</a>
                          <a href="compare.html" className="wishlist" title><img src="images/icons/wishlist.png" alt="" />Wishlist</a>
                        </div>
                      </div>
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
                      </div>
                    </div>{/* /.footer-detail */}
                  </div>{/* /.product-detail style5 */}
                  <div className="clearfix" />
                </div>{/* /.row */}
              </div>{/* /.flat-product-detail */}
              <div className="flat-product-content style2">
                <div className="row">
                  <ul className="product-detail-bar">
                    <li className="active">Description</li>
                    <li>Tecnical Specs</li>
                    <li>Reviews</li>
                  </ul>{/* /.product-detail-bar */}
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="description-text style1">
                          <div className="box-text">
                            <h4>Nuqqam Et Massa</h4>
                            <p>Sed sodales sed orci molestie tristique. Nunc dictum, erat id molestie vestibulum, ex leo vestibulum justo, luctus tempor erat sem quis diam. Lorem ipsum dolor sit amet.</p>
                          </div>
                          <div className="box-text">
                            <h4>Wireless</h4>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece <br />of classical Latin literature from 45 BC, making it over <br />2000 years old.</p>
                          </div>
                          <div className="box-text">
                            <h4>Fresh Design</h4>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using</p>
                          </div>
                          <div className="box-text">
                            <h4>Fabolous Sound</h4>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                          </div>
                        </div>{/* /.description-text style1 */}
                      </div>{/* /.col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="description-image style1">
                          <div className="box-image">
                            <img src="images/product/single/01.png" alt="" />
                          </div>
                        </div>{/* /.description-image style1 */}
                      </div>{/* /.col-lg-6 */}
                      <div className="col-lg-12">
                        <div className="different-color style1">
                          <div className="title">
                            Different Colors
                          </div>
                          <p>
                            Sed sodales sed orci<br />molestie
                          </p>
                        </div>{/* /.defferent-color style1 */}
                      </div>{/* /.col-lg-12 */}
                      <div className="col-lg-5">
                        <div className="box-left style1">
                          <div className="img-product">
                            <img src="images/product/single/06.png" alt="" />
                          </div>
                        </div>{/* /.box-left style1 */}
                      </div>{/* /.col-lg-5 */}
                      <div className="col-lg-7">
                        <div className="box-right style1">
                          <div className="img-line">
                            <img src="images/product/single/line-2.png" alt="" />
                            <img src="images/product/single/04.png" alt="" />
                          </div>
                          <div className="img-product">
                          </div>
                          <div className="box-text">
                            <h4>Nuqqam Et Massa</h4>
                            <p>Sed sodales sed orci molestie tristique. Nunc dictum, erat id molestie vestibulum, ex leo vestibulum justo, luctus tempor erat sem quis diam. Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>{/* /.box-right style1 */}
                      </div>{/* /.col-lg-7 */}
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
                      <div className="col-lg-6">
                        <div className="rating style1">
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
                        </div>{/* /.rating style1 */}
                      </div>{/* /.col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="form-review style2">
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
                        </div>{/* /.form-review style2 */}
                      </div>{/* /.col-lg-6 */}
                      <div className="col-lg-12">
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
                      </div>{/* /.col-lg-12 */}
                    </div>{/* /.row */}
                  </div>{/* /.col-md-12 */}
                </div>{/* /.row */}
              </div>{/* /.flat-product-content style2 */}
            </div>{/* /.col-lg-9 col-md-8 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </main>{/* /#single-product */}
      <section className="flat-imagebox style4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="flat-row-title">
                <h3>Recent Products</h3>
              </div>
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
          <div className="row">
            <div className="col-md-12">
              <div className="owl-carousel-3">
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/09.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$50.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/10.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$600.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/11.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats Pill+ Portable<br />Speaker - (PRODUCT)RED</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,023.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/12.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,489.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/13.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats EP On-Ear<br />Headphones - Blue</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,749.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/09.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$50.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/10.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$600.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/11.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats Pill+ Portable<br />Speaker - (PRODUCT)RED</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,023.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/12.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,489.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/13.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats EP On-Ear<br />Headphones - Blue</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,749.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/09.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$50.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/10.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$600.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/11.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats Pill+ Portable<br />Speaker - (PRODUCT)RED</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,023.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/12.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,489.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/13.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats EP On-Ear<br />Headphones - Blue</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,749.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/09.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$50.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/10.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$600.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/11.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats Pill+ Portable<br />Speaker - (PRODUCT)RED</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,023.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/12.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,489.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/13.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats EP On-Ear<br />Headphones - Blue</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,749.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/09.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$50.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/10.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$600.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/11.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats Pill+ Portable<br />Speaker - (PRODUCT)RED</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,023.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/12.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,489.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/13.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats EP On-Ear<br />Headphones - Blue</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,749.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/09.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$50.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/10.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$600.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/11.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats Pill+ Portable<br />Speaker - (PRODUCT)RED</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,023.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/12.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Apple iPad Mini<br />G2356</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,489.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
                <div className="imagebox style4">
                  <div className="box-image">
                    <a href="#" title>
                      <img src="images/product/other/13.jpg" alt="" />
                    </a>
                  </div>{/* /.box-image */}
                  <div className="box-content">
                    <div className="cat-name">
                      <a href="#" title>Laptops</a>
                    </div>
                    <div className="product-name">
                      <a href="#" title>Beats EP On-Ear<br />Headphones - Blue</a>
                    </div>
                    <div className="price">
                      <span className="sale">$1,749.00</span>
                      <span className="regular">$2,999.00</span>
                    </div>
                  </div>{/* /.box-content */}
                </div>{/* /.imagebox style4 */}
              </div>{/* /.owl-carousel-3 */}
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </section>{/* /.flat-imagebox style4 */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="widget-ft widget-about">
                <div className="logo logo-ft">
                  <a href="index.html" title>
                    <img src="images/logos/logo-ft.png" alt="" />
                  </a>
                </div>{/* /.logo-ft */}
                <div className="widget-content">
                  <div className="icon">
                    <img src="images/icons/call.png" alt="" />
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
                    <input type="text" name="email" className="subscribe-email" placeholder="Your E-Mail" />
                    <button type="submit"><img src="images/icons/right-2.png" alt="" /></button>
                  </div>
                </form>{/* /.subscribe-form */}
                <ul className="pay-list">
                  <li>
                    <a href="#" title>
                      <img src="images/logos/ft-01.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="images/logos/ft-02.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="images/logos/ft-03.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="images/logos/ft-04.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title>
                      <img src="images/logos/ft-05.png" alt="" />
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
                        <img src="images/icons/app-store.png" alt="" />
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
                        <img src="images/icons/google-play.png" alt="" />
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
      <section className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="copyright"> All Rights Reserved © Techno Store 2017</p>
              <p className="btn-scroll">
                <a href="#" title>
                  <img src="images/icons/top.png" alt="" />
                </a>
              </p>
            </div>{/* /.col-md-12 */}
          </div>{/* /.row */}
        </div>{/* /.container */}
      </section>{/* /.footer-bottom */}
    </div>{/* /.boxed */}
    {/* Javascript */}
  </div>
  )
}

export default Test