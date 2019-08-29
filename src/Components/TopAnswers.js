import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import AnswerComponent from "./AnswerComponent";
import FilterList from "@material-ui/icons/FilterList"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    }
}));


class TopAnswers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        };
        this.renderAnswers = this.renderAnswers.bind(this);
        this.filterAnswers = this.filterAnswers.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.state = {k:[],txt:0,filterInput:0,test:this.props.results,filterApplied:false,filter_arr:[],sorted_arr:[]}
    }

    
    componentWillReceiveProps(nextProps){
        this.setState({k:this.props.results})
    }

    filterAnswers(){

        this.setState({filterApplied:true})
        var filterInput = this.state.filterInput;
        var ans = this.state.test;
        ans = ans.slice(0,filterInput);
        this.setState({filter_arr:ans})

        console.log("resuts")
        console.log(this.state.test)



    }

    renderAnswers = (answers,k) =>{

        let ans = [];

        for (let i in answers){
            if(answers[i].answers !== undefined){
                ans = ans.concat(answers[i].answers);
            }
        }

        ans = ans.sort(function(a, b) {
            return b.score - a.score;
        });

        if(this.state.filterApplied){
            ans = ans.slice(0,this.state.filterInput);
            return ans.map(element=>(
                <AnswerComponent answer = {element}/>
            ));
        }
        else{
        return ans.map(element=>(
            <AnswerComponent answer = {element}/>
        ));
        }
    };

    onTextChange = (event) =>{
        this.setState({filterInput: event.target.value});
    };

    removeFilter() {
        this.setState({filterApplied:false})
    }

    render() {
        const answers = this.props.results;
        return (
            <div style={{flex:1,flexDirection:'column'}}>
                <div style={{margin:10}}>
                    <TextField color={'#000000'} style={{width:70,height:10}} variant="outlined" onChange={this.onTextChange} type={'number'}/>
                    <Button variant="contained" color="primary" style={{margin:10}} onClick={this.filterAnswers}>
                        <FilterList/> Filter
                    </Button>
                    <Button variant="contained" color="secondary" style={{margin:10}} onClick={this.removeFilter}>
                        Remove Filter
                    </Button>
                </div>
                <List className={useStyles.root}>
                    {this.state.filterApplied &&
                         this.renderAnswers(this.state.test,this.state.filterInput)
                    }
                    {!this.state.filterApplied &&
                        this.renderAnswers(this.state.test,this.state.k)
                    }
                </List>
            </div>
        );
    }

}

export default  TopAnswers;