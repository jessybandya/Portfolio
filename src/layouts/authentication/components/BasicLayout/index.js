import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "../../../../examples/Navbars/DefaultNavbar";
import PageLayout from "../../../../examples/LayoutContainers/PageLayout";
import Footer from "../../../../examples/Footer";

// Authentication layout components

function BasicLayout({ title, description, image, children }) {
  return (
    <PageLayout>

      <SoftBox
        width="100%"
        minHeight="35vh"
        style={{
          marginTop:100,
        }}
      >

      </SoftBox>
      <SoftBox mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid  container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={5}>
            {children}
          </Grid>
        </Grid>
      </SoftBox>
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
