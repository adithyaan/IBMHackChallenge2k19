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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
class Home extends Component{



    constructor(props){
        super(props)
        this.state = {textInput:"",search_results:[],show:false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onTextChange = (event) =>{
        this.setState({textInput: event.target.value});
    };

    handleSubmit(event) {
        var url1="https://api.stackexchange.com//2.2/search/advanced?order=desc&sort=activity&";
        var url2=this.state.textInput+"&";
        var url3="site=stackoverflow";
        var finalurl=url1+url2+url3;

        // alert(finalurl);
        var promise=fetch(finalurl)
        var result=promise.then((response)=>response.json());
        const st = this;
        result.then((response)=>{
              st.setState({search_results:response.items,show:true});
              alert(this.state.search_results);

          });

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
                            <img src={require("./stackoverflowicon.PNG")} alt="SO Search"></img>
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
                <div>
              {this.state.show &&
                 <List dense style={styles.container} disablePadding={true}>
          {this.state.search_results.map((value) => (

              <Card style={styles.listitem}>
            <ListItem key={value} button >

          <ListItemText primary={<b>{(value.tags[0])}</b>  }  secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                      {value.owner.user_id}
              </Typography>
            </React.Fragment>
          }/>

            </ListItem>
            </Card>

          ))}
        </List>
              }
            </div>
            </div>

        )
    }

}

const styles = {
    container:{
        position:'absolute',
        left:'20%',
        right:'20%',
        top:'20%',
          },
    listitem:{
        marginBottom:30,
        width:800,
        minHeight:300
    }
  }
export default Home;