import "../styles.css";
import "rc-tabs/assets/index.css";

import { ThemeProvider } from "styled-components";
import Theme from "../theme";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
