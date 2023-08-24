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

import React, { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";

// Soft UI Dashboard React examples
import BarReportsChartItem from "./ReportsBarChartItem";

// ReportsBarChart configurations
import configs from "./configs";
import { db } from "../../../../firebase";

function ReportsBarChart({ color, title, description, chart, items }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});
  const [users, setUsers] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [cancelledOrders, setCancelledOrders] = React.useState([])

  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('orders').onSnapshot((snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('orders').where("cancel","==", true).onSnapshot((snapshot) => {
      setCancelledOrders(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])


  return (
    <Card         
    sx={{
      backdropFilter: `saturate(200%) blur(30px)`,
      backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
      position: "relative",
      width: '100%',
    }}
    style={{background:"transparent"}}>
    <SoftBox px={1}>

    <SoftBox py={1} px={0.5}>
      <Grid container spacing={2}>
      <Grid item xs={6} sm={3}>
      <BarReportsChartItem
        color={color}
        icon={{ color: "primary", component: "library_books" }}
        label="Total Users"
        progress={{ content: users?.length, percentage: "100" }}
      />
    </Grid>

    <Grid item xs={6} sm={3}>
    <BarReportsChartItem
      color={color}
      icon={{ color: "info", component: "touch_app" }}
      label="Total Orders"
      progress={{ content: orders?.length, percentage: "100" }}
    />
  </Grid>

  <Grid item xs={6} sm={3}>
  <BarReportsChartItem
    color={color}
    icon={{ color: "warning", component: "payment" }}
    label="Total Sales"
    progress={{ content: "Ksh0", percentage: "100" }}
  />
</Grid>

<Grid item xs={6} sm={3}>
<BarReportsChartItem
  color={color}
  icon={{ color: "error", component: "extension" }}
  label="Invoices"
  progress={{ content: "0", percentage: "100" }}
/>
</Grid>
      </Grid>
    </SoftBox>
  </SoftBox>
      <SoftBox padding="1rem">
        {useMemo(
          () => (
            <SoftBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              py={2}
              pr={0.5}
              mb={3}
              height="12.5rem"
            >
              <Bar data={data} options={options} />
            </SoftBox>
          ),
          [chart, color]
        )}
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: "dark",
  description: "",
  items: [],
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default ReportsBarChart;
