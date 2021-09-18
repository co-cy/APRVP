import Search from "./Search"
import { Container, ThemeProvider, createTheme } from "@material-ui/core"



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
    <div className="App">
      <ThemeProvider theme={theme}>
        <Search />
      </ThemeProvider>
    </div>
  );
}

export default App;
