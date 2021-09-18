import Search from "./Search"
import Registration from "./Registration"
import Login from "./Login"


import { ThemeProvider, createTheme } from "@material-ui/core"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



function App() {
  const theme = createTheme({
    background: {
      default: "#e9eaed"
    },
    typography: {
      fontFamily: '\'MyFont\''
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#E21A1A'
      },
      success: {
        main: '#E21A1A'
      },
      secondary: {
        main: '#767d89'
      }
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
