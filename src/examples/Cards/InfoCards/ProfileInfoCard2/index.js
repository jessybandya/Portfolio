/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";
import React from 'react'
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";
import { useSelector } from "react-redux";
import Orders from "./Orders";


function ProfileInfoCard2({ title }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setName] = React.useState('');
    const authId = useSelector(state => state.authId);

    const openModal = (name) => {
      setModalShow(true);
      setName(name)
    }
 
  return (
    <Card 
    sx={{
      backdropFilter: `saturate(200%) blur(30px)`,
      backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
      border:'1px solid #D1D1D1'
    }}
    style={{background:"transparent",height:'50vh',overflowY:'auto'}}
    >
       <SoftBox p={1}>
         <Orders />
       </SoftBox>
      
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard2.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileInfoCard2;
