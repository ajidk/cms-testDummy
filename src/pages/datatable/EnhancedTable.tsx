import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Input,
  InputAdornment,
  Modal,
  Pagination,
  PaginationItem,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { MouseEvent, useEffect, useMemo, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Icdelete, Icedit, Icsearch, Ictrash } from "../../assets/svg"
import {
  Data,
  EnhancedTableHead,
  EnhancedTableToolbar,
  Order,
  getComparator,
  stableSort,
} from "../../components/DataTable/DataTables"
import { deleteIdUser, getAllUser } from "../../features/users/actions"

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

interface propsOpen {
  delete: boolean
  modal: boolean
  detail?: { email: string; gender: string; phone: string; username: string }
}

const EnhancedTable = () => {
  const dispatch = useAppDispatch()
  const { allUser, loading, deleteUser } = useAppSelector(
    (state) => state.users,
  )

  const [open, setOpen] = useState<propsOpen>({
    delete: false,
    modal: false,
  })
  const [gender, setGender] = useState(true)

  console.log(open?.detail?.gender)

  useEffect(() => {
    open?.detail?.gender === "male" ? setGender(true) : setGender(false)
  }, [open?.detail?.gender])

  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<keyof Data>("action")

  const rowsPerPage = 10

  useEffect(() => {
    dispatch(getAllUser({ limit: rowsPerPage, skip: 0 }))
  }, [dispatch, rowsPerPage])

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleDelete = (row: any) => {
    dispatch(deleteIdUser({ id: row.id })).then((item) => {
      dispatch(getAllUser({ limit: rowsPerPage, skip: 0 }))
      setOpen({ ...open, delete: true })
    })
  }

  const handleChangePagination = (e: unknown, b: number) => {
    const pindah = b === 1 ? 0 : b * rowsPerPage - (rowsPerPage - 1)

    // console.log(pindah)
    dispatch(getAllUser({ limit: rowsPerPage, skip: pindah }))
  }

  //   const emptyRows =
  //     Number(allUser?.limit) !== undefined
  //       ? Math.max(0, (1 + ) * rowsPerPage - allUser?.total)
  //       : 0

  const [search, setSearch] = useState("")

  const filterUser = allUser?.users?.filter((item: any) =>
    item.firstName.toLocaleLowerCase().includes(search),
  )

  // console.log("filter usr", deleteUser)

  const visibleRows = useMemo(
    () => stableSort(filterUser, getComparator(order, orderBy)),
    [filterUser, order, orderBy],
  )

  //   console.log(allUser?.limit)

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        flex={1}
        width={"full"}
        my={4}
      >
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <img src={Icsearch} alt="search" className="!w-6 !h-6" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {search !== "" && (
                  <img
                    src={Icdelete}
                    alt="search"
                    className="!w-6 !h-6 cursor-pointer"
                    onClick={() => setSearch("")}
                  />
                )}
              </InputAdornment>
            }
          />
          <Button variant="contained" className="!py-[10px]">
            Search
          </Button>
        </Stack>
      </Stack>
      {loading === "succeeded" ? (
        <Paper sx={{ width: "100%", p: 3 }}>
          <EnhancedTableToolbar />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={allUser?.total}
              />
              <TableBody>
                {visibleRows?.map((row: any, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={labelId}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.firstName} {row.lastName}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          columnGap={3}
                        >
                          <img
                            alt="edit"
                            src={Icedit}
                            onClick={() => {
                              setOpen({ ...open, modal: true, detail: row })
                            }}
                          />
                          <img
                            alt="delete"
                            src={Ictrash}
                            onClick={() => handleDelete(row)}
                            // onClick={() => setOpen(true)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {/* {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack spacing={1} mt={3}>
            <Pagination
              count={allUser?.limit - 1}
              className="flex justify-center items-center"
              variant="outlined"
              shape="rounded"
              onChange={handleChangePagination}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Paper>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          //   onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Snackbar
        open={open.delete}
        autoHideDuration={6000}
        onClose={() => setOpen({ delete: false, modal: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={() => setOpen({ delete: false, modal: false })}
          severity="error"
          sx={{ width: "100%" }}
        >
          {deleteUser?.firstName} belum berhasil di hapus
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open?.modal}
        onClose={() => setOpen({ delete: false, modal: false })}
        // sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={style}>
          <Box className="flex flex-col gap-y-5">
            <Typography id="alert-dialog-modal-title" component="h2">
              Confirmation
            </Typography>
            <TextField
              label="Nama"
              type="text"
              variant="standard"
              value={open.detail?.username}
            />
            <TextField
              label="Email"
              type="text"
              variant="standard"
              value={open.detail?.email}
            />
            <TextField
              label="Phone"
              type="text"
              variant="standard"
              value={open.detail?.phone}
            />
            {/* <TextField label="password" type="text" variant="standard" /> */}
            <FormControlLabel
              value={gender ? "Male" : "Female"}
              checked={gender}
              control={<Switch color="primary" />}
              label={gender ? "Male" : "Female"}
              onChange={() => setGender(!gender)}
              labelPlacement="end"
            />
            <Box mt={3}>
              <Button
                variant="outlined"
                className=""
                startIcon={<CircularProgress value={10} />}
              >
                masak ga m
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default EnhancedTable
