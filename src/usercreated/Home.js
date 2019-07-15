import AppBar from '@material-ui/core/AppBar';
import React ,{ Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

        };
        const inputProps = {
            step: 300,
        };
        return(
            <div>
                <AppBar position="static" style = {appBarChildStyle}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className="grow" >
                            StackOverFlow Search
                        </Typography>
                        <TextField id="time" type="text" inputProps={inputProps} value={this.state.textInput} onChange={this.onTextChange} />
                        <Button color="inherit" onClick={this.handleSubmit}>Search</Button>
                    </Toolbar>
                </AppBar>
            </div>
            
        )
    }

}

export default Home;