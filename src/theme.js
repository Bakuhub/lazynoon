import {createMuiTheme} from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
      'open sans'
        ].join(','),
        fontSize: 14,

    },
    palette: {
        primary: {
            main: '#0C1631',


        },
        secondary: {
            main: '#949494',

        },
        text: {
            inputBorder: '#D9D8D7',
            inputBackground: '#F9F9F9',

        },
        background: {

            default: "#fafafa",
            paper: "#f7f7f7",
        },
        success: {
            main: '#43a047',

        },
        error: {
            main: '#d34a34',

        },
        info: {

            main: '#2979ff'
        },

        warning: {
            main: '#ffa000',
        },
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,

    },
})

export default theme