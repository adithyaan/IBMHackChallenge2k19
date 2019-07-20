import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import ThumbUp from "@material-ui/core/SvgIcon/SvgIcon";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import ReactHtmlParser from "react-html-parser";
import Collapsible from "react-collapsible";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

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
            <div style={{border:'2px solid green',margin:10}}>
                <ListItem>
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{width:70,fontSize:15,padding:20}}>
                            <Icon color="primary">
                                <ThumbUp/>{answer.score}
                            </Icon>
                        </div>
                        <div style={{width:900,fontSize:15}}>
                            { ReactHtmlParser(answer.body) }
                        </div>
                        <div style={{width:100, padding:20, fontSize: 15}}>
                            {answer.owner.display_name}
                        </div>
                    </div>
                </ListItem>
                <div style={{marginLeft:130}}>
                    <Collapsible trigger={
                        <Button variant="extended" color={"inherit"} onClick={()=>this.setState({openComments: !this.state.openComments})}>
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
                <Divider variant="middle" component="li" />
            </div>
        )
    }
}

export default AnswerComponent;