import  React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Post from './Post';
import { Pagination } from '@mui/material';
import { auth, db } from '../../../../firebase';
import { useSelector } from 'react-redux';


export default function Allpendings({ filteredPosts, searchTerm }) {
    const [posts, setPosts] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const authId = useSelector(state => state.authId);
    const pageSize = 6; // Number of posts per page

     React.useEffect(() => {
         db.collection('orders').where("projectStatus", "==", `Completed`).where("cancel","==", false).orderBy("timestamp","desc").onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

  // Calculate the total number of pages based on the posts array length and page size
  const totalPages = Math.ceil(posts.length / pageSize);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Get the posts for the current page
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return posts.slice(startIndex, endIndex);
  };

  useEffect(() => {
    // Save the current page before updating the data
    setPrevPage(currentPage);
  }, [posts]);

  useEffect(() => {
    // Set the current page back to its previous value after data update
    setCurrentPage(prevPage);
  }, [prevPage]);

  return (
    <Paper 
    sx={{
      width: '100%', overflow: 'hidden',
      backdropFilter: `saturate(200%) blur(30px)`,
    }}
    style={{background:"transparent"}}
  >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group",backdropFilter: `saturate(200%) blur(30px)`, }}
          style={{background:"transparent"}}
          >
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:12,backdropFilter: `saturate(200%) blur(30px)`,background:'transparent',fontWeight:"900",borderBottom: "1px solid #BABABA",color:"#BABABA"}}>ORDER ID</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backdropFilter: `saturate(200%) blur(30px)`,background:'transparent',fontWeight:"900",borderBottom: "1px solid #BABABA",color:"#BABABA"}} align="right">STATUS</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backdropFilter: `saturate(200%) blur(30px)`,background:'transparent',fontWeight:"900",borderBottom: "1px solid #BABABA",color:"#BABABA"}} align="right">DETAILS</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backdropFilter: `saturate(200%) blur(30px)`,background:'transparent',fontWeight:"900",borderBottom: "1px solid #BABABA",color:"#BABABA"}} align="right">ORDER DATE</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backdropFilter: `saturate(200%) blur(30px)`,background:'transparent',fontWeight:"900",borderBottom: "1px solid #BABABA",color:"#BABABA"}} align="right">CANCEL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchTerm === '' ? (
            posts?.length > 0 ? (
              getCurrentPosts().map(({id, post}) => (
                <Post
                key={id} 
                name={post?.name}
                postID={id}
                descriptions={post?.descriptions}              
                cancel={post?.cancel}
                category={post?.category}
                clientID={post?.clientID}
                dueDate={post?.dueDate}
                features={post?.features}
                images={post?.images}
                orderID={post?.orderID}
                paidAmount={post?.paidAmount}
                paidStatus={post?.paidStatus}
                progress={post?.progress}
                projectLinks={post?.projectLinks}
                projectStatus={post?.projectStatus}
                webLinks={post?.webLinks}
                subCategory={post?.subCategory}
                subList={post?.subList}
                techies={post?.techies}
                timestamp={post?.timestamp}
                totalAmount={post?.totalAmount}  
                />
              ))
            ) : (
              <div style={{color:'#BABABA',fontSize:16}}>No Orders</div>
            )
          ) : (
            <>
              {filteredPosts?.length > 0 ? (
                filteredPosts.map((posts2) => (   
                  <Post 
                  name={posts2?.name}
                  postID={posts2?.id}
                  descriptions={posts2?.descriptions}              
                  cancel={posts2?.cancel}
                  category={posts2?.category}
                  clientID={posts2?.clientID}
                  dueDate={posts2?.dueDate}
                  features={posts2?.features}
                  images={posts2?.images}
                  orderID={posts2?.orderID}
                  paidAmount={posts2?.paidAmount}
                  paidStatus={posts2?.paidStatus}
                  progress={posts2?.progress}
                  projectLinks={posts2?.projectLinks}
                  projectStatus={posts2?.projectStatus}
                  webLinks={posts2?.webLinks}
                  subCategory={posts2?.subCategory}
                  subList={posts2?.subList}
                  techies={posts2?.techies}
                  timestamp={posts2?.timestamp}
                  totalAmount={posts2?.totalAmount} 
                  />
                  ))
              ) : (
                <div style={{color:'#BABABA',fontSize:16}}>No Results</div>
              )}
            </>
          )}
        </TableBody>
        </Table>
      </TableContainer>

      {posts.length > pageSize && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Pagination
            style={{color:'#fff'}}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      )}
    </Paper>
  );
}
