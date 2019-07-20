import React ,{ Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapsible from 'react-collapsible';
import ReactHtmlParser from 'react-html-parser';
import Icon from "@material-ui/core/Icon";
import ThumbUp from "@material-ui/core/SvgIcon/SvgIcon";
import {lightBlue} from "@material-ui/core/colors";
import AnswerComponent from "./AnswerComponent";

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

class TopQuestions extends Component{

    constructor(props) {
        super(props);
        this.createAnswerListItem = this.createAnswerListItem.bind(this); 
        // console.log(props.results);
         
    }

    createListItemx(items) {

        return items.map((element)=>

            (<div>
              <ListItem>
                <Collapsible trigger={element.title} alignItems="flex-start">
                    <div>
                    <List className={useStyles.root}>
                        {this.createAnswerListItem(element.answers)}
                    </List>
                    </div>
                </Collapsible>
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
            ));
    }

    createListItemy(items) {

        return items.map((element)=>

            (
                <div style={{border:'2px solid green',margin:10}}>
                        <div style={{display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{width:70,fontSize:15,padding:20}}>
                                <Icon color="primary">
                                    <ThumbUp/>{element.score+","+element.up_vote_count}
                                </Icon>
                            </div>
                            <div style={{width:900,fontSize:15}}>
                                { ReactHtmlParser(element.title) }
                            </div>
                            <div style={{width:100, padding:20, fontSize: 15}}>
                                {element.owner.display_name}
                            </div>
                        </div>

                    <div style={{marginLeft:130}}>
                        <Collapsible trigger={
                            <p style={{color:'blue'}}>Answers</p>
                        } alignItems="flex-start">
                            <div style={{margin:10,backgroundColor:'#42A5F5',color:'#fff',width:'70%'}}>
                                <List>
                                    {this.createAnswerListItem(element.answers)}
                                </List>
                            </div>
                        </Collapsible>
                    </div>
                    <Divider variant="middle" component="li" />
                </div>
            ));
    }

    createListItem(items){
        return items.map((element)=>(
            <div style={{margin:10,padding:10,boxShadow: '2px 5px 2px 2px #888888'}}>
                <div style={{display: 'flex', height:20 }}>
                    <div style={{width:900,fontSize:15}}>
                        <b style={{color:'#EF5350'}}> { ReactHtmlParser(element.title) } </b>
                    </div>
                    <div style={{fontSize: 15}}>
                        {"Score:"+element.score}
                        {"Upvote:"+element.up_vote_count}
                        {"Asked By: "+element.owner.display_name}
                    </div>
                </div>

                <div>
                    <Collapsible trigger={
                        <p style={{color:'#607D8B'}}>Answers</p>
                    } alignItems="flex-start">
                        <div style={{margin:10,color:'#000',width:'100%'}}>
                            <AnswerComponent answers = {element.answers}/>
                        </div>
                    </Collapsible>
                </div>
                {/*<Divider variant="middle" component="li" />*/}
            </div>
            )
        )
    }

    createAnswerListItem(answers) {
        
        if (answers === undefined){
            answers = [];
        }

        return answers.map((element)=>
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

        const items = this.props.results;

        return (
            <List className={useStyles.root}>
                {this.createListItem(items)}
            </List>
        );
    }

}

export default TopQuestions;