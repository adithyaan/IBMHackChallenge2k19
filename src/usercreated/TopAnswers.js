import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import ListItem from '@material-ui/core/ListItem';
import Collapsible from "react-collapsible";

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

                    <Collapsible trigger={
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
                    } alignItems="flex-start">
                        <div>
                            <List className={useStyles.root}>
                                {this.createComment(element)}
                            </List>
                        </div>
                    </Collapsible>

                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
        ));
    };


    createComment(element) {

        let comments = [];
        if (element.hasOwnProperty("comments")){
            comments = element.comments;
        }

        return comments.map((element)=>
            (<div>
                    <ListItem>

                        <ListItemText
                            primary={element.creation_date}
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
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ));
    }

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