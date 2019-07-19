import React, {Component} from 'react';
import ListView from './List';
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapsible from 'react-collapsible';
import ReactHtmlParser from 'react-html-parser';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

class TopAnswers extends Component{
    constructor(props) {
        super(props);
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

        console.log(ans);

        return ans.map(element=>(
            <div>
                <ListItem>
                    <ListItemText
                        primary={element.owner.display_name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    { ReactHtmlParser(element.body) }
                                </Typography>

                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    {
                                        "Score: "+element.score +"\n"+"IsAccepted: "+ element.is_accepted
                                    }
                                </Typography>

                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        ));
    };

    render() {
        const answers = this.props.results;
        return (
            <div>
                <List className={useStyles.root}>
                    {this.renderAnswers(answers)}
                </List>
            </div>
        );
    }

}

export default  TopAnswers;