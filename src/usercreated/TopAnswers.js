import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import ReactHtmlParser from 'react-html-parser';
import ListItem from '@material-ui/core/ListItem';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Icon from '@material-ui/core/Icon';
import Collapsible from 'react-collapsible';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";


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
            <div style={{border:'2px solid green',margin:10}}>
                <ListItem>
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{width:70,fontSize:15,padding:20}}>
                            <Icon color="primary">
                                <ThumbUp/>{element.score}
                            </Icon>
                        </div>
                        <div style={{width:900,fontSize:15}}>
                            { ReactHtmlParser(element.body) }
                        </div>
                        <div style={{width:100, padding:20, fontSize: 15}}>
                            {element.owner.display_name}
                        </div>
                    </div>
                </ListItem>
                <div style={{marginLeft:130}}>
                    <Collapsible trigger={
                        <p style={{color:'blue'}}>Comments</p>
                    } alignItems="flex-start">
                        <div style={{margin:10,backgroundColor:'#42A5F5',color:'#fff',width:'70%'}}>
                            <List>
                                {this.createComment(element)}
                            </List>
                        </div>
                    </Collapsible>
                </div>
                <Divider variant="middle" component="li" />
            </div>
        ));
    };


    createComment(element) {

        let comments = [];
        if (element.hasOwnProperty("comments")){
            comments = element.comments;
        }

        return comments.map((element)=>
            (   <div style={{padding:10}}>
                    <div style={{fontSize:15}}>
                        { ReactHtmlParser(element.body) }
                    </div>
                    <div style={{fontSize: 15}}>
                        {element.owner.display_name}
                    </div>
                    {/*<Divider variant="fullWidth" component="li" />*/}
                </div>
            ));
    }

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