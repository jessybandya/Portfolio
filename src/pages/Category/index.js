import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import datas from '../../assets/data/categories/data'
import { db } from '../../auth/firebase'
import Footer from '../../examples/Footer'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import DefaultNavbar from '../../examples/Navbars/DefaultNavbar'
import Post from './Post'

function Category() {
  const { id } = useParams()
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
    db.collection('electronics').where("category","==",`${id}`).onSnapshot((snapshot) => {
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

  const categoryFun = (name) => {
    db.collection('electronics').where("category","==", name).onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
 }

   useEffect(() => {
    categoryFun(id)
   }, [categoryFun]);


   const menusPerPage = 12;
   const pagesVisited = pageNumber * menusPerPage;

  return (
    <>
    <DashboardNavbar />
    <div className="shop-category-area mt-30px">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 order-lg-last col-md-12 order-md-first">
          {/* Shop Top Area Start */}
          <div className="shop-top-bar d-flex">
            {/* Left Side start */}
            <div className="shop-tab nav d-flex">
              <a className="active" data-bs-toggle="tab">
                <i className="fa fa-th" />
              </a>
              <p ><span style={{fontWeight:'bold'}}>Category-</span>{id}-({posts.length} products)</p>
            </div>
            {/* Left Side End */}

          </div>
          {/* Shop Top Area End */}
          {/* Shop Bottom Area Start */}
          <div className="shop-bottom-area mt-35">
            {/* Shop Tab Content Start */}
            <div className="tab-content jump">
              {/* Tab One Start */}
              <div id="shop-1" className="tab-pane active">
                <div className="row responsive-md-class responsive-xl-class responsive-lg-class">
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
                                 categoryName={id}
                                 />
                               ))
               }
               </>
             ) : (<>  <center><i style={{fontSize:18,fontWeight:'bold',color:'#2152ff'}}>{id} category is empty!</i></center>
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
      categoryName={id}
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

              {/* Tab Two End */}
            </div>

            {/*  Pagination Area End */}
          </div>
          {/* Shop Bottom Area End */}
        </div>
        {/* Sidebar Area Start */}
        <div className="col-lg-3 order-lg-first col-md-12 order-md-last mb-md-60px mb-lm-60px">
          <div className="shop-sidebar-wrap">
            <div className="sidebar-widget padding-30px bg-light-gray-2 mb-30px">
              <h3 className="sidebar-title">Electronics</h3>
              <div className="accordion" id="accordionExample">
              {datas.map((data, index) => {
                return (
                  <div className="card">
                  <div className="card-header" id="headingOne">
                  {data.name === id ?(
                    <Link style={{fontWeight:'bold'}} to={`/category/${data.id}`} onClick={()=> categoryFun(data.id)} >{data.name}</Link>
                  ):(
                    <Link to={`/category/${data.id}`} onClick={()=> categoryFun(data.id)} >{data.name}</Link>
                  )}
                  </div>
                </div>
                )
              })}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
  </>
  )
}

export default Category