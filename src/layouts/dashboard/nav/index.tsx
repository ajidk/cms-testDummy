import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Icsearch } from "../../../assets/svg"
import { PropsNavConfig } from "./config"

interface PropsNav {
  top: PropsNavConfig[]
  bottom: PropsNavConfig[]
}

const NAV_WIDTH = 280

const Nav: React.FC<PropsNav> = ({ top, bottom }) => {
  const [search, setSearch] = useState<string>("")
  const theme = useTheme()

  const mediaUp = useMediaQuery(theme.breakpoints.up("lg"))
  // console.log("mediaUp", mediaUp)

  const filterData = top?.filter((item) =>
    item.title.toLocaleLowerCase().includes(search),
  )

  // console.log(filterData)

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
      bgcolor="#F1F2F6"
    >
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={mediaUp ? true : false}
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: "#F1F2F6",
            borderRightStyle: "dashed",
          },
        }}
        //   onClose={() => setOpen(false)}
      >
        <Box
          width={NAV_WIDTH}
          bgcolor={"#F1F2F6"}
          className="py-7 flex-1 flex-col"
        >
          <Box className="flex flex-row gap-x-4 px-4 mb-5 mt-4">
            <img
              src="https://mui.com/static/ads-in-house/figma.png"
              alt="profile"
              width="40px"
              className="rounded-full object-cover !h-10"
            />

            <Box>
              <Typography fontSize={12} fontWeight={300}>
                Welcome back,
              </Typography>
              <Typography fontSize={18} fontWeight={500}>
                Drax
              </Typography>
            </Box>
          </Box>
          <ListItem className="gap-x-4">
            <img src={Icsearch} alt={"sea"} width={24} height={24} />
            <ListItemText
              primary={
                <input
                  placeholder="Search"
                  className="bg-transparent outline-none flex-1"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            />
          </ListItem>
          <List dense={false} className="!p-0">
            {filterData.map((item, idx) => {
              console.log(item)

              return (
                <Link to={item.path} key={`top-${idx}`}>
                  <ListItem
                    secondaryAction={
                      <img
                        src={item.righ}
                        alt={item.title}
                        width={24}
                        height={24}
                      />
                    }
                    className="gap-x-4"
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      width={24}
                      height={24}
                    />
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              )
            })}
          </List>

          <Box className="absolute bottom-7">
            {bottom.map((item, idx) => (
              <ListItem key={`bottom-${idx}`} className="gap-x-4">
                <img src={item.icon} alt={item.title} width={24} height={24} />
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Nav
