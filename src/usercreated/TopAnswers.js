import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import AnswerComponent from "./AnswerComponent";


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
    }

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
            <div>
                <div style={{position:'absolute',right:2, margin:10}}>
                    <TextField color={'#000000'} style={{width:50}} type={'number'} InputLabelProps={{ shrink: true }}/>
                    <Button>Filter</Button>
                </div>
                <br/>
                <br/>
                <List className={useStyles.root}>
                    {this.renderAnswers(answers)}
                </List>
            </div>
        );
    }

}

export default  TopAnswers;