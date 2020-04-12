import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#19bf89',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#222',
      paper: '#222',
    },
  },
  overrides: {
    MuiDialog: {
      root: {
        background: '#222',
      }
    },
    MuiFab: {
      root: {
        width: 40,
        height: 40,
        margin: 4,
      }
    }
  }
});

export default theme;
