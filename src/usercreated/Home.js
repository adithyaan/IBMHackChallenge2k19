   import AppBar from '@material-ui/core/AppBar';
    import React ,{ Component } from 'react';
    import Toolbar from '@material-ui/core/Toolbar';
    import SearchIcon from '@material-ui/icons/Search';
    import TextField from '@material-ui/core/TextField';
    import { ThemeProvider } from '@material-ui/styles';
    import Fab from '@material-ui/core/Fab';
    import Box from '@material-ui/core/Box';
    import CircularProgress from '@material-ui/core/CircularProgress';
    import TopQuestions from "../Components/TopQuestions";
    import TopAnswers from "../Components/TopAnswers";
    import Icon from '@material-ui/core/Icon';
    import QuestionAnswerRounded from '@material-ui/icons/QuestionAnswerRounded';
    import Button from "@material-ui/core/Button";
    import {data} from "./TestData";
    import {config} from '../config/config';
    import {useStyles,theme} from '../styles/HomeStyle'

    const styles = {
        position:'absolute',
        left: '48%',
        top: '45%'
    };

    class Home extends Component{
        constructor(props){
            super(props)
            this.state = {answers:[],textInput:"",search_results:[],showButtons:false,
            showQuestions:false,sorted_data:[], formattedTags:"",filterInput:'',
            showProgress: false , showAnswers: false};
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.invokeAnswers = this.invokeAnswers.bind(this);
            this.invokeQuestions = this.invokeQuestions.bind(this);
        }

        invokeQuestions(){
            if(!this.state.showQuestions){
                this.setState({showAnswers:false, showQuestions:true});
            }
        }

        invokeAnswers(){
            if(!this.state.showAnswers){
                this.setState({showQuestions:false, showAnswers:true});
            }
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

        
        handleSubmitTemp(){
            this.setState({search_results:data.items,showButtons:true,showQuestions:true,showProgress:false});
        }

	    handleSubmit(){
	        this.setState({showProgress: true, showQuestions:false,showAnswers:false});
            var finalurl = config.url+this.state.textInput;
            var promise = fetch(finalurl)
            var result = promise.then((response)=>response.json());
            result.then((response)=>{
                //   alert(response.items.length);
                  this.setState({answers:response.answers,search_results:response.items,showButtons:true,showQuestions:true,showProgress:false});
                  return response.items;
            });
	    }

        render(){
            const appBarChildStyle = {
                backgroundColor: '#42A5F5',
                height: 60
            };

            return(
                <div>
                    <AppBar position="sticky" style = {appBarChildStyle}>
                        <Toolbar>
                            <Box flexGrow={1}>
                                <div style={{display: 'flex', justifyContent: 'flex-start' }}>
                                    {/*<img src={require("./stackoverflowicon.PNG")} alt="SO Search"></img>*/}
                                    <Icon>
                                        <QuestionAnswerRounded/>
                                    </Icon>
                                    <div style={{color:'white',position:'relative',paddingLeft:10}}>
                                        <b><i>Search Tool</i></b>
                                    </div>
                                    {
                                        this.state.showButtons && <div style={{marginLeft:30}}>
                                            <Button variant="outlined" color="primary" onClick={this.invokeQuestions} style={{marginLeft:10}}>Questions</Button>
                                            <Button variant="outlined" color="primary" onClick={this.invokeAnswers} style={{marginLeft:10}}>Answers</Button>
                                        </div>
                                    }

                                </div>
                            </Box>
                            <Box flexGrow={2}>
                                <ThemeProvider theme={theme}>
                                <TextField
                                    id="input"
                                    fullWidth={true}
                                    type="text"
                                    autoFocus = {true}
                                    placeholder="Enter Query"
                                    classes={useStyles.textField}
                                    variant="outlined"
                                    value={this.state.textInput}
                                    onKeyDown = {this.onKeyDown}
                                    onChange={this.onTextChange} />
                                </ThemeProvider>
                            </Box>
                            <Box>
                                <Fab color="inherit" aria-label="Add" size={"medium"} style={{marginRight:20, marginLeft:20}} onClick={this.handleSubmit} className={useStyles.fab}>
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
                            this.state.showQuestions && <TopQuestions results={this.state.search_results} />
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
