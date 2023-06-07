import { createAsyncThunk } from "@reduxjs/toolkit"
import connection from "../../config/connection"

export const getAllUser = createAsyncThunk<
  any,
  { limit?: number; skip?: number }
>("users/get-all", async ({ limit, skip }, { rejectWithValue }) => {
  try {
    const res = await connection.get(
      `users?limit=${limit ? limit : 30}&skip=${skip ? skip : 0}`,
    )

    const messages = "something went wrong"
    if (res.status !== 200) {
      throw new Error(messages)
    }

    return res.data
    //   return data;
  } catch (e: any) {
    console.log("Error", e)
    return rejectWithValue(e.res.data)
  }
})

export const deleteIdUser = createAsyncThunk<any, { id: number }>(
  "users/delet-user-id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await connection.delete(`users/${id}`)

      const messages = "something went wrong"
      if (res.status !== 200) {
        throw new Error(messages)
      }

      return res.data
    } catch (e: any) {
      console.log("Error", e)
      return rejectWithValue(e.res.data)
    }
  },
)

export const updateIdUser = createAsyncThunk<any, { id: number; body: any }>(
  "users/delet-user-id",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const res = await connection.put(`users/${id}`, body)

      const messages = "something went wrong"
      if (res.status !== 200) {
        throw new Error(messages)
      }

      return res.data
    } catch (e: any) {
      console.log("Error", e)
      return rejectWithValue(e.res.data)
    }
  },
)
