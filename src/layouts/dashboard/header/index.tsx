import PropTypes from "prop-types"
// @mui
import {
  AppBar,
  Box,
  Button,
  Input,
  InputAdornment,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Icdelete, Icsearch } from "../../../assets/svg"

const NAV_WIDTH = 280

const HEADER_MOBILE = 64

const HEADER_DESKTOP = 92

const StyledRoot = styled(AppBar)(({ theme }) => ({
  background: "white",
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

Header.propTypes = {
  onOpenNav: PropTypes.func,
}

export default function Header({ onOpenNav }: any) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Typography fontSize={28} fontWeight={700} color="#404D61">
          Data Table
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Input
            className="rounded-lg !border-2 px-6 py-2"
            placeholder="search"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <img src={Icsearch} alt="search" className="!w-6 !h-6" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <img src={Icdelete} alt="search" className="!w-6 !h-6" />
              </InputAdornment>
            }
          />
          <Button variant="contained" className="!py-[10px]">
            Search
          </Button>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  )
}
