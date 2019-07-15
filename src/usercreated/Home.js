import AppBar from '@material-ui/core/AppBar';
import React ,{ Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import {Typography} from "@material-ui/core";

class Home extends Component{



    constructor(props){
        super(props)
        this.state = {textInput:""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onTextChange = (event) =>{
        this.setState({textInput: event.target.value});
    };

    handleSubmit(event) {
        alert(this.state.textInput);
    }

    render(){
        const appBarChildStyle = {
            backgroundColor: '#fafafb'
        };

        const useStyles = makeStyles(theme => ({

            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            },
            input:{
                color: 'white',
            },
            fab: {
                margin: theme.spacing(1),
                padding: 20,
            },

        }));
        const theme = createMuiTheme({
            palette: {
                primary: green,
            },
            overrides: {
                //MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline MuiOutlinedInput-inputMultiline
                MuiInputBase: {
                    input: {
                        color: 'green',
                    },
                },
            },
        });
        return(
            <div>
                <AppBar position="static" style = {appBarChildStyle}>
                    <Toolbar>
                        <Box flexGrow={1}>
                            <img src={require("./stackoverflowicon.PNG")} alt="SO Search    "></img>
                            <Typography style={{color:'green'}}>
                                Search Tool
                            </Typography>
                        </Box>
                        <Box flexGrow={2}>
                            <ThemeProvider theme={theme}>
                            <TextField
                                id="input"
                                fullWidth={true}
                                type="text"
                                autoFocus = {true}
                                label = "Enter Query"
                                margin="normal"
                                multiline
                                classes={useStyles.textField}
                                variant="outlined"
                                value={this.state.textInput}
                                onChange={this.onTextChange} />
                            </ThemeProvider>
                        </Box>
                        <Box>
                            <Fab color="primary" aria-label="Add" style={{marginRight:20, marginLeft:20}} onClick={this.handleSubmit} className={useStyles.fab}>
                                <SearchIcon />
                            </Fab>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }

}

export default Home;