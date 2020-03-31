import React from "react";
import {
  HomeOutlined,
  ShopOutlined,
  GithubOutlined,
  FormOutlined,
} from "@ant-design/icons";

export const menu = [
  {
    path: "/",
    title: "Home",
    icon: <HomeOutlined />,
  },
  /* template-example-start */
  {
    path: "/pet-store",
    title: "Pet-store",
    icon: <ShopOutlined />,
  },
  {
    path: "/github",
    title: "Github",
    icon: <GithubOutlined />,
  },
  {
    title: "UI-Example",
    path: "/redux-ui",
    icon: <FormOutlined />,
  },
  /* template-example-end */
];
