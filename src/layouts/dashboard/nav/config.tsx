import { Icbar, Icsignout, Icsupport, Ictable } from "../../../assets/svg"

export interface PropsNavConfig {
  title: string
  path: string
  icon: string | undefined
  righ?: string | undefined
}

export const navTop = [
  {
    title: "Sample",
    path: "/sample",
    icon: Ictable,
    righ: Icbar,
  },
  {
    title: "Data Table",
    path: "/data-table",
    icon: Ictable,
    righ: Icbar,
  },
]

export const navBottom = [
  {
    title: "Support",
    path: "/data-table",
    icon: Icsupport,
  },
  {
    title: "Sign Out",
    path: "/data-table",
    icon: Icsignout,
  },
]
