import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import logo from "./../logo.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import { updateAuthId } from "../redux/dataSlice";
import { MDBCardImage } from "mdb-react-ui-kit";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = React.useState(``)
  const history = useNavigate()
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });
  
    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);



const logout = () => {
  auth.signOut();
  dispatch(updateAuthId(''))
  handleCloseUserMenu()
  Swal.fire({
    icon: 'success',
    title: 'Logged out successfully',
    text: 'See you soon!',
    showConfirmButton: false,
    timer: 2000
  })
  history('/')
}

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toLogin = () => {
    history('/sign-in')
    Swal.fire({
      icon: 'info',
      title: 'Make Order',
      text: 'Please sign in to make an order',
      setTimeout: 2000,
      showConfirmButton: false
    })
  }

  return (
    <header
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 general-header ${
        scrolled ? "bg-jessy header-height" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
        <img src={logo} className="App-logo" alt="Jaby" />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            JABY &nbsp;
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              
            >
              <Link className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer" to={`${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
          {authId ?(
            <>
            {authId === 'MMbxWqSyeOPLO9OSd5RiouSDl8k2' ? (
              <Avatar style={{cursor:'pointer'}} onClick={logout}>AD</Avatar>
            ):(
              <Tooltip title="Logout">
              <MDBCardImage onClick={logout} src={currentUser?.profilePhoto}
                      alt={currentUser?.firstName} style={{ width:40, height:40, borderRadius:40/2, cursor: 'pointer', objectFit: 'cover' }} fluid />
              </Tooltip>
            )}
            </>
          ):(
          <>
          <li>
          <Link  to="/sign-in" className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">Sign In</Link>
          </li> 
          <li>
          <button onClick={toLogin} className="blinking-button">Make Order</button>
          </li>    
          </>
          )}

        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
        {!authId &&(
          <button onClick={toLogin} className="blinking-button" style={{marginRight:5}}>Make Order</button>
        )}

   {authId ?(
    <Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar src={currentUser?.profilePhoto}
        alt={currentUser?.firstName} />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
    <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
    {navLinks.map((nav) => (
      <li
        key={nav.id}
        
      >
        <Link className={`font-poppins font-medium cursor-pointer text-[16px]`} onClick={handleCloseUserMenu} to={`${nav.id}`}>{nav.title}</Link>
      </li>
    ))}
    <li    
  >
    <Link className={`font-poppins font-medium cursor-pointer text-[16px]`} onClick={logout}>Logout</Link>
  </li>
  </ul>
    </Menu>
  </Box>
   ):(
    <Box sx={{ flexGrow: 0 }}>
    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    {anchorElUser !== null ?(
      <MenuOpenIcon style={{color:'white'}} />
    ):(
      <MenuIcon style={{color:'white'}} />
    )}
    </IconButton>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
    <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
    {navLinks.map((nav) => (
      <li
        key={nav.id}
        
      >
        <Link className={`font-poppins font-medium cursor-pointer text-[16px]`} onClick={handleCloseUserMenu} to={`${nav.id}`}>{nav.title}</Link>
      </li>
    ))}
    <li>
      <Link onClick={handleCloseUserMenu} to="/sign-in" className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">Sign In</Link>
    </li>
  </ul>
    </Menu>
  </Box>
   )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
