import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey900, white } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

export default getMuiTheme({
  palette: {
    textColor: blueGrey900,
    alternateTextColor: white,
    primary1Color: '#48C6EF',
    accent1Color: blueGrey900
  }
});
