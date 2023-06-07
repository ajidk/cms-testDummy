import { styled } from "@mui/system"
import Nav from "./nav"
import { navBottom, navTop } from "./nav/config"

import { Outlet } from "react-router"
import Header from "./header"

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
})

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  // paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    // paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

function LDashboard() {
  return (
    <StyledRoot>
      {/* <Header /> */}
      <Nav top={navTop} bottom={navBottom} />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  )
}

export default LDashboard
