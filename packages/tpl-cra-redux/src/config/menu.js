export const menu = [
  {
    path: "/",
    title: "Home",
    icon: "home",
  },
  // template-example-start
  {
    path: "/pet-store",
    title: "Pet-store",
    icon: "shop",
  },
  {
    path: "/github",
    title: "Github",
    icon: "github",
  },
  {
    title: "UI-Example",
    icon: "form",
    children: [
      {
        path: "/redux-ui",
        title: "Redux-UI",
      },
      {
        path: "/redux-form",
        title: "Redux-Form",
      },
    ],
  },
  // template-example-end
];
