import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import ThumbUp from "@material-ui/icons/ThumbUp";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import ReactHtmlParser from "react-html-parser";
import Collapsible from "react-collapsible";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

class AnswerComponent extends Component{
    constructor(props){
        super(props)
        this.createComment = this.createComment.bind(this);
        this.state = {openComments:false};
    }

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

    

    render(){

        const answer = this.props.answer;

        return (
            <div style={{margin:10,padding:10,boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <div style={{display: 'flex', flexDirection:'row',flex:1,justifyContent: 'space-between' }}>
                    <div style={{flex:0.1,fontSize:15,padding:20}}>
                        <div style={{
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                            }}>
                            <Avatar src={answer.owner.profile_image}/>
                            {answer.owner.display_name}
                        </div>
                        <center>
                        <Icon color={"primary"} style={{marginTop:10}}>
                            <ThumbUp/>{answer.score}
                        </Icon>
                        </center>
                    </div>
                    <div style={{fontSize:15,flex:0.9}}>
                        { ReactHtmlParser(answer.body) }
                        <div>
                            <Collapsible trigger={
                                <Button style={{margin:10}} variant="contained" color={"primary"} onClick={()=>this.setState({openComments: !this.state.openComments})}>
                                    Comments
                                    {this.state.openComments ? <ArrowDropUp/> : <ArrowDropDown/>}
                                </Button>
                            } alignItems="flex-start">
                                <div style={{margin:10,backgroundColor:'#42A5F5',color:'#fff',width:'70%'}}>
                                    <List>
                                        {this.createComment(answer)}
                                    </List>
                                </div>
                            </Collapsible>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerComponent;