export interface propsOpen {
  delete: boolean
  update?: boolean
  modal: boolean
  detail?: {
    id?: number
    email?: string
    gender?: string
    phone?: string
    username?: string
  }
}
