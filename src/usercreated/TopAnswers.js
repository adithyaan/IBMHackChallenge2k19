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
        this.renderAnswers = this.renderAnswers.bind(this);
        this.filterAnswers = this.filterAnswers.bind(this);
    }

    filterAnswers = (answers) => {

    };

    renderAnswers = (answers) =>{

        let ans = [];

        for (let i in answers){
            if(answers[i].answers !== undefined){
                ans = ans.concat(answers[i].answers);
            }
        }

        ans = ans.sort(function(a, b) {
            return b.score - a.score;
        });

        return ans.map(element=>(
            <AnswerComponent answer = {element}/>
        ));
    };

    render() {
        const answers = this.props.results;
        return (
            <div style={{flex:1,flexDirection:'column'}}>
                <div style={{margin:10}}>
                    <TextField color={'#000000'} style={{width:70,height:10}} variant="outlined" type={'number'}/>
                    <Button variant="contained" color="primary" style={{margin:10}} onClick={this.filterAnswers(answers)}>
                        <FilterList/> Filter
                    </Button>
                </div>
                <List className={useStyles.root}>
                    {this.renderAnswers(answers)}
                </List>
            </div>
        );
    }

}

export default  TopAnswers;