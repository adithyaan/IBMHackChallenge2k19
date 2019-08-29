   import AppBar from '@material-ui/core/AppBar';
    import React ,{ Component } from 'react';
    import Toolbar from '@material-ui/core/Toolbar';
    import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
    import SearchIcon from '@material-ui/icons/Search';
    import TextField from '@material-ui/core/TextField';
    import { ThemeProvider } from '@material-ui/styles';
    import Fab from '@material-ui/core/Fab';
    import Box from '@material-ui/core/Box';
    import CircularProgress from '@material-ui/core/CircularProgress';
    import TopQuestions from "./TopQuestions";
    import TopAnswers from "./TopAnswers";
    import Icon from '@material-ui/core/Icon';
    import QuestionAnswerRounded from '@material-ui/icons/QuestionAnswerRounded';
    import Button from "@material-ui/core/Button";
    import {data} from "./TestData";
    import {config} from '../config/config';

    const styles = {
        position:'absolute',
        left: '48%',
        top: '45%'
    };

  
    class Home extends Component{

        constructor(props){
            super(props)
            this.state = {textInput:"",search_results:[],showButtons:false,
            showQuestions:false,sorted_data:[], formattedTags:"",filterInput:'',
            showProgress: false , showAnswers: false};


            this.handleSubmit = this.handleSubmit.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.extractTags = this.extractTags.bind(this);
            this.invokeAnswers = this.invokeAnswers.bind(this);
            this.invokeQuestions = this.invokeQuestions.bind(this);
            this.analyseSentiments = this.analyseSentiments.bind(this);
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
                this.extractTags();
            }
        }

        handleSubmitNet() {

            this.setState({showProgress: true, showQuestions:false,showAnswers:false});
            var url1 = "https://api.stackexchange.com//2.2/search/advanced?order=desc&sort=relevance&q=";
            var url2 = this.state.textInput+"&";
            var url3 = "site=stackoverflow&filter=!0V-ZwUEu0wMbto7XPem1M8Bnq";
            var tagUrl = "tagged="+this.state.formattedTags+"&";
            var finalurl=url1+url2+tagUrl+url3;

             console.log(finalurl);
            var promise=fetch(finalurl)
            var result=promise.then((response)=>response.json());
            result.then((response)=>{
                  this.setState({search_results:response.items,showButtons:true,showQuestions:true,showProgress:false});
                  return response.items;
            });

        }

        analyseSentiments(answers){
            let datasToTest =[];
            let len = 20;
            if(len>answers.length){
                len= answers.length;
            }
            for(let i=0;i<len;i++){
                let data= "";
                for(let comments in answers[i].comments){
                    data+=comments+".";
                }
                datasToTest[i]=data;
            }
        }

        sentimentRequest(data){
            fetch("https://gateway-lon.watsonplatform.net/natural-language-understanding/api", {
                body: {
                    "text": data,
                    "features": {
                      "sentiment": {
                        
                      }
                    }
                  }
                  ,
                headers: {
                  Authorization: "Basic YXBpa2V5OlJUTHVxS2VIWExwMW1BMjNGQTFMWmN5QXNjM3pxalZpTEtVQ3Q4bDE1MmQw",
                  "Content-Type": "application/json"
                },
                method: "POST"
              }).then(response=>{
                    console.log(response);
              });
        }

        handleSubmitTemp(){
            this.setState({search_results:data.items,showButtons:true,showQuestions:true,showProgress:false});
        }

	handleSubmit(){
	    this.setState({showProgress: true, showQuestions:false,showAnswers:false});
            var finalurl="http://localhost:5000/fetchdata?query="+this.state.textInput;
            var promise=fetch(finalurl)
            var result=promise.then((response)=>response.json());
            result.then((response)=>{
                  alert(response.items.length);
                  this.setState({search_results:response.items,showButtons:true,showQuestions:true,showProgress:false});
                  return response.items;
            });
	}

        filterData(){
            let data=this.state.search_results;
            for(let i=0;i<data.length;i++){
                this.state.sorted_data[i]=data[i];
            }
        }

        render(){
            const appBarChildStyle = {
                backgroundColor: '#42A5F5',
                height: 60
            };

            const useStyles = makeStyles(theme => ({

                textField: {
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                },
                input:{
                    color: 'white'
                },
                fab: {
                    margin: theme.spacing(1),
                    padding: 10,
                },
                progress: {
                    margin: theme.spacing(2),
                },
            }));
            const theme = createMuiTheme({
                // palette: {
                //     primary: {
                //         main: "#fff"
                //     },
                // },
                overrides: {
                    //MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMultiline MuiOutlinedInput-inputMultiline
                    MuiInputBase: {
                        input: {
                            color: 'white',
                            height: 7,
                            fontSize: 16,
                        },
                    },
                },
            });
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

        extractTags (){
            var headers = {'Content-Type':'Application/json'};
            var url = config.extraction.url+this.state.textInput;
            var promise = fetch(url,headers)
            console.log(url);
            var result=promise.then((response)=>response.json());
            result.then((response)=>{
                var tags = response.data;
                var formattedTags = ""
                for(let a in tags){
                    formattedTags+=tags[a]+";"
                }
                formattedTags=formattedTags.substr(0,formattedTags.length-1)
                this.setState({formattedTags:formattedTags})
                this.handleSubmitNet();
                
            }).catch(error =>{
                console.log(error);
            });
        }

    }

export default Home;
