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
    import CircularProgress from '@material-ui/core/CircularProgress';
    import ListView from "./List";
    import TopAnswers from "./TopAnswers";


    const styles = {
        position:'absolute',
        left: '48%',
        top: '45%'
    };

    class Home extends Component{

        constructor(props){
            super(props)
            this.state = {textInput:"",search_results:[],show:false,sorted_data:[], showProgress: false , showAnswers: false};
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.filterData = this.filterData.bind(this);
        }

        onTextChange = (event) =>{
            this.setState({textInput: event.target.value});
        };

        onKeyDown = (event: React.KeyboardEvent<>): void => {

            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
                this.handleSubmit();
            }
        }

        handleSubmit() {

            this.setState({showProgress: true, show:false,showAnswers:false});
            var url1="https://api.stackexchange.com//2.2/search/advanced?order=desc&sort=relevance&q=";
            var url2=this.state.textInput+"&";
            var url3="site=stackoverflow&filter=!0V-ZwUEu0wMbto7XPem1M8Bnq";
            var finalurl=url1+url2+url3;

            // alert(finalurl);
            var promise=fetch(finalurl)
            var result=promise.then((response)=>response.json());
            result.then((response)=>{
                  this.setState({search_results:response.items,show:false ,showAnswers: true,showProgress:false});
                  console.log(response);
            });

        }

        filterData(){
            var data=this.state.search_results;
            for(var i=0;i<data.length;i++){
                this.state.sorted_data[i]=data[i];
            }

            alert(JSON.stringify(data));
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
                progress: {
                    margin: theme.spacing(2),

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
                                    classes={useStyles.textField}
                                    variant="outlined"
                                    value={this.state.textInput}
                                    onKeyDown = {this.onKeyDown}
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
                        {
                            this.state.showProgress && <center><CircularProgress className={useStyles.progress} style={styles}disableShrink /></center>
                        }
                        {/*Displays list of responses from stack overflow*/}
                        {
                            this.state.show && <ListView results={this.state.search_results} />
                        }

                        {
                            this.state.showAnswers && <TopAnswers results={this.state.search_results} />
                        }

                    </div>
                </div>

            )
        }

    }

    export default Home;