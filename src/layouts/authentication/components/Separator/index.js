// @mui material components
import Divider from "@mui/material/Divider";

// Soft UI Dashboard React components
import SoftBox from "../../../../soft-components/SoftBox";
import SoftTypography from "../../../../soft-components/SoftTypography";
import logo from '../../../../logo.svg';

function Separator() {
  return (
    <SoftBox position="relative" py={0.25}>
      <Divider />
      <SoftBox
        position="absolute"
        top="50%"
        left="50%"
        px={1.5}
        lineHeight={1}
        sx={{ transform: "translate(-50%, -60%)" }}
        style={{backgroundColor:'#100d25'}}
      >
        <SoftTypography  variant="button" fontWeight="medium" color="secondary">
        <img src={logo} className="App-logo" alt="logo" />
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export default Separator;