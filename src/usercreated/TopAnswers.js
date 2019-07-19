import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';
import ListItem from '@material-ui/core/ListItem';
import Collapsible from "react-collapsible";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    }
}));


const gridStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
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
                    {/*<Collapsible trigger={

                    } alignItems="flex-start">
                        <div>
                            <List className={useStyles.root}>
                                {this.createComment(element)}
                            </List>
                        </div>
                    </Collapsible>*/}

                    <div className={gridStyle.root}>
                        <Grid container spacing={2}>
                            {/*<Grid item xs={1}>*/}

                            {/*</Grid>*/}
                            <Grid item xs={10}>
                                <React.Fragment>
                                    <Typography variant="body2" color="textSecondary" className={useStyles.answerText} component="p">
                                        { ReactHtmlParser(element.body) }
                                    </Typography>
                                </React.Fragment>
                            </Grid>
                            <Grid item xs={2}>
                                <div>
                                    {
                                        "Score: "+element.score +"\n"+"IsAccepted: "+ element.is_accepted
                                    }
                                    {element.owner.display_name}
                                </div>
                            </Grid>
                        </Grid>
                    </div>

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