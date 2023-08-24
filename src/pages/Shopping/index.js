import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from "../../auth/firebase"
import ReactPaginate from "react-paginate";
import Slider1 from '../../sub-components/Slider1';
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import Header from '../../components1/Header';
import Footer from '../../examples/Footer';
import { FormControl, MenuItem, Pagination, Select, Stack } from '@mui/material';

function Shopping() {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sort, setSort] = useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };


  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  
  useEffect(() => {
    db.collection('electronics').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        // console.log("sth is in: ",res.menuName.toLowerCase())
      })

      setFilteredPosts(finalPosts)
    }else {
      return <div>No results3</div>
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
  }

  const totalRatings = (posts.reduce((a,v) =>  a = a + v.post.rating , 0 ))
  const numberOfRatings = posts.length
  const rating = totalRatings / numberOfRatings
  var a = Math.round(rating * 10) / 10

   useEffect(() => {
       db.collection('electronics').onSnapshot(snapshot => {
           setPosts(snapshot.docs.map(doc => ({
               id: doc.id,
               post: doc.data(),
           })));
       })
   }, []);
   const menusPerPage = 12;
   const pagesVisited = pageNumber * menusPerPage;



   const count = Math.ceil(posts.length / 5)

   const displayMenus = 
   <div>

        {/* <div><MenuCategory /></div> */}
       <section className="section pt-5 pb-5 products-listing">
         <div className="container">
             <div style={{padding:15}}>
             <Slider1/>
             <hr />
             <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:10}}>
               <div><h4>Available</h4></div> 
               <div>
               <FormControl fullWidth size="small">
               <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={sort}
                 label="YOS"
                 onChange={handleChangeSort}
                 displayEmpty
               renderValue={sort !== "" ? undefined : () => <span style={{color:'#9E9E9E'}}>Sort by:</span>}
               >
               <MenuItem value="Sort all">Sort all</MenuItem>
                 <MenuItem value="Newly added">Newly added</MenuItem>
                 <MenuItem value="A-Z">A-Z</MenuItem>
               </Select>
             </FormControl>
               </div> 
             </div>
           <form className="explore-outlets-search mb-4 rounded overflow-hidden border">
       <div className="input-group">
         <input type="text" onChange={updateSearchResults} placeholder="Search electronic by name..." className="form-control border-0" />
       </div>
     </form>
             <div className="product-list-view">
   
           <div className="row">

           {searchTerm === "" ?(
            <>
                       {
       // hakuna > || iko < 
       posts.length > 0 ?(
         <>
         {
                        posts.map(({id, post}) => (
                           <Post
                           key={id} 
                           category={post.category}
                           description={post.description}
                           electronicID={id}
                           images={post.images}
                           title={post.title}
                           initialPrice={post.initialPrice}
                           finalPrice={post.finalPrice}
                           timestamp={post?.timestamp}
                           posts={posts}
                           />
                         ))
         }
         </>
       ) : (<>  <center><i style={{fontSize:18,fontWeight:'bold',color:'#2152ff'}}>Loading...</i></center>
       </>)  
} 
            </>
       ):(
         <>
                      <div className="product-list-view">
<div className="row">
      {
        filteredPosts.length > 0 ?(
          <>
          {
            filteredPosts.map((posts2) => (

<Post 
category={posts2.category}
description={posts2.description}
electronicID={posts2.electronicID}
images={posts2.images}
title={posts2.title}
initialPrice={posts2.initialPrice}
finalPrice={posts2.finalPrice}
timestamp={posts2?.timestamp}
posts={posts}
/>
))
                          }
          </>
        ):(
          <><center style={{fontWeight:'bold',color:'#2152ff'}}><h4>No results...</h4></center></>
        )

        
      
      }
    </div>
    </div>
         </>
       )}
     </div>
   
              
   
             </div>
           </div>
         </div>
       </section>
   
   
   
   
   </div>

 const pageCount = Math.ceil(posts.length / menusPerPage);
 const changePage = ({ selected }) => {
   setPageNumber(selected);
 };


  return (
    
    <div>
 <DashboardNavbar />

    <div id="offcanvas-mobile-menu" className="offcanvas offcanvas-mobile-menu">
      <div className="inner customScroll">



        <div className="offcanvas-buttons mt-30px">
          <div className="header-tools d-flex">
            <div className="cart-info d-flex align-self-center">
              <a href="my-account.html" className="user"><i className="icon-user" /></a>
              <a href="wishlist.html" data-number={3}><i className="icon-heart" /></a>
              <a href="cart.html" data-number={3}><i className="icon-bag" /></a>
            </div>
          </div>
        </div>
        <div className="offcanvas-social mt-30px">
          <ul>
            <li>
              <a href="#"><i className="icon-social-facebook" /></a>
            </li>
            <li>
              <a href="#"><i className="icon-social-twitter" /></a>
            </li>
            <li>
              <a href="#"><i className="icon-social-instagram" /></a>
            </li>
            <li>
              <a href="#"><i className="icon-social-google" /></a>
            </li>
            <li>
              <a href="#"><i className="icon-social-instagram" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div> 


    
    <div className="shop-category-area mt-30px">
      <div className="container">
      <section
      style={{  
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(" + "https://cdn.eraspace.com/pub/media/mageplaza/blog/post/6/x/6xwkh7nfmxvqot8ymtlgb3.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
        className=" mt-20 bg-dark text-center">
        <h1 style={{marginTop:30}} className="text-white">Electrika Computers</h1>
        <h6 className="text-white-50">The Tech Hub</h6>
      </section>
        <div className="row">
        <Slider1/>

          <div className="">
            {/* Shop Top Area Start */}
            <div className="shop-top-bar d-flex" style={{diaplay:'flex',alignItems:'center',justifyContent:'space-between'}}>
              {/* Left Side start */}
              <div>

                <p style={{fontSize:15,color:'#88888888'}}>There Are {posts.length} Products.</p>
              </div>
              <div>

              <FormControl size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="YOS"
                onChange={handleChangeSort}
                displayEmpty
              renderValue={sort !== "" ? undefined : () => <span style={{color:'#9E9E9E'}}>Sort by:</span>}
              >
              <MenuItem value="Sort all">Sort all</MenuItem>
                <MenuItem value="Newly added">Newly added</MenuItem>
                <MenuItem value="A-Z">A-Z</MenuItem>
              </Select>
            </FormControl>
              </div>
              {/* Right Side End */}
            </div>
            {/* Shop Top Area End */}
            {/* Shop Bottom Area Start */}


            <form className="explore-outlets-search mb-4 rounded overflow-hidden border">
            <div className="input-group">
              <input type="text" onChange={updateSearchResults} placeholder="Search electronic by name..." className="form-control border-0" />
            </div>
          </form>

            <div className="shop-bottom-area mt-35">
              {/* Shop Tab Content Start */}
              <div className="tab-content jump">
                {/* Tab One Start */}
                <div id="shop-1" className="tab-pane active">
                  <div className="row responsive-md-class responsive-xl-class responsive-lg-class">
                  <div className="product-list-view">
   
                  <div className="row">
       
                  {searchTerm === "" ?(
                   <>
                              {
              // hakuna > || iko < 
              posts.length > 0 ?(
                <>
                {
                               posts.map(({id, post}) => (
                                  <Post
                                  key={id} 
                                  category={post.category}
                                  description={post.description}
                                  electronicID={id}
                                  images={post.images}
                                  title={post.title}
                                  initialPrice={post.initialPrice}
                                  finalPrice={post.finalPrice}
                                  timestamp={post?.timestamp}
                                  posts={posts}
                                  />
                                ))
                }
                </>
              ) : (<>  <center><i style={{fontSize:18,fontWeight:'bold',color:'#2152ff'}}>Loading...</i></center>
              </>)  
       } 
                   </>
              ):(
                <>
                             <div className="product-list-view">
       <div className="row">
             {
               filteredPosts.length > 0 ?(
                 <>
                 {
                   filteredPosts.map((posts2) => (
       
       <Post 
       category={posts2.category}
       description={posts2.description}
       electronicID={posts2.electronicID}
       images={posts2.images}
       title={posts2.title}
       initialPrice={posts2.initialPrice}
       finalPrice={posts2.finalPrice}
       timestamp={posts2?.timestamp}
       posts={posts}
       />
       ))
                                 }
                 </>
               ):(
                 <><center style={{fontWeight:'bold',color:'#2152ff'}}><h4>No results...</h4></center></>
               )
       
               
             
             }
           </div>
           </div>
                </>
              )}
            </div>
          
                     
          
                    </div>

                  </div>
                </div>
                {/* Tab One End */}

              </div>

            </div>
            {/* Shop Bottom Area End */}
          </div>

        </div>
        <Footer />

      </div>

    </div>

    {/* Modal */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-5 col-sm-12 col-xs-12 mb-lm-100px mb-sm-30px">
                {/* Swiper */}
                <div className="swiper-container gallery-top">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/11.jpg" alt="" />
                    </div>
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/12.jpg" alt="" />
                    </div>
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/13.jpg" alt="" />
                    </div>
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/14.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="swiper-container gallery-thumbs">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/11.jpg" alt="" />
                    </div>
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/12.jpg" alt="" />
                    </div>
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/13.jpg" alt="" />
                    </div>
                    <div className="swiper-slide"> 
                      <img className="img-responsive m-auto" src="assets/images/product-image/14.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-sm-12 col-xs-12">
                <div className="product-details-content quickview-content">
                  <h2>Originals Kaval Windbr</h2>
                  <p className="reference">Reference:<span> demo_17</span></p>
                  <div className="pro-details-rating-wrap">
                    <div className="rating-product">
                      <i className="ion-android-star" />
                      <i className="ion-android-star" />
                      <i className="ion-android-star" />
                      <i className="ion-android-star" />
                      <i className="ion-android-star" />
                    </div>
                    <span className="read-review"><a className="reviews" href="#">Read reviews (1)</a></span>
                  </div>
                  <div className="pricing-meta">
                    <ul>
                      <li className="old-price not-cut">€18.90</li>
                    </ul>
                  </div>
                  <p className="quickview-para">Lorem ipsum dolor sit amet, consectetur adipisic elit eiusm tempor incidid ut labore et dolore magna aliqua. Ut enim ad minim venialo quis nostrud exercitation ullamco</p>
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <span>Color</span>
                      <div className="pro-details-color-content">
                        <ul>
                          <li className="blue" />
                          <li className="maroon active" />
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                      <input className="cart-plus-minus-box" type="text" name="qtybutton" defaultValue={1} />
                    </div>
                    <div className="pro-details-cart btn-hover">
                      <a href="#"> + Add To Cart</a>
                    </div>
                  </div>
                  <div className="pro-details-wish-com">
                    <div className="pro-details-wishlist">
                      <a href="wishlist.html"><i className="ion-android-favorite-outline" />Add to wishlist</a>
                    </div>
                    <div className="pro-details-compare">
                      <a href="compare.html"><i className="ion-ios-shuffle-strong" />Add to compare</a>
                    </div>
                  </div>
                  <div className="pro-details-social-info">
                    <span>Share</span>
                    <div className="social-info">
                      <ul>
                        <li>
                          <a href="#"><i className="ion-social-facebook" /></a>
                        </li>
                        <li>
                          <a href="#"><i className="ion-social-twitter" /></a>
                        </li>
                        <li>
                          <a href="#"><i className="ion-social-google" /></a>
                        </li>
                        <li>
                          <a href="#"><i className="ion-social-instagram" /></a>
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

  </div>
  )
}

export default Shopping




