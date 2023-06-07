/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { deleteIdUser, getAllUser } from "./actions"

interface UsersState {
  loading: "idle" | "pending" | "succeeded" | "failed"
  allUser: any
  deleteUser: any
}

const initialState = {
  loading: "idle",
  allUser: null,
  deleteUser: null,
} as UsersState

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.allUser = action.payload
      state.loading = "succeeded"
    })
    builder.addCase(deleteIdUser.fulfilled, (state, action) => {
      state.deleteUser = action.payload
      state.loading = "succeeded"
    })
  },
})

export default userSlice.reducer
