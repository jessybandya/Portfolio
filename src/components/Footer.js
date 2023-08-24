import { Typography } from "@mui/material";
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import SoftBox from "../components/SoftBox"
import SoftTypography from "../components/SoftTypography"

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import typography from "../assets/theme/base/typography";

function Footer({ company, links }) {
    const { href, name } = company;
    const { size } = typography;
  
    return (
      <SoftBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
        px={1.5}
        className='w-full flex justify-between items-center max-w-7xl mx-auto'
      >
        <SoftBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="text"
          fontSize={size.sm}
          px={1.5}
        >
          &copy; {new Date().getFullYear()}, made with
          <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
            <Icon style={{color:'#fff'}} fontSize="inherit">
              favorite
            </Icon>
          </SoftBox>
          by
          <Link style={{textDecoration:'none'}} href={href} target="_blank">
            <SoftTypography style={{fontWeight:'bold',color:'#1976d2'}} variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
            </SoftTypography>
          </Link>
          for a better future.
        </SoftBox>
        <SoftBox
          component="ul"
          sx={({ breakpoints }) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,
  
            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        >
        <SoftBox style={{color:'#1976d2',fontWeight:'bold'}}>
          Dedicated to my lovely siblings: <i>Tony, Gregy & Alexia</i>
  </SoftBox>
        </SoftBox>
      </SoftBox>
    );
  }
  
  // Setting default values for the props of Footer
  Footer.defaultProps = {
    company: { href: "https://laughing-darwin-c668f3.netlify.app/", name: "Jessy Bandya" },
  };
  
  // Typechecking props for the Footer
  Footer.propTypes = {
    company: PropTypes.objectOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.object),
  };
  
  export default Footer;