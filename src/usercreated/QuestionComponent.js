import React,{Component} from 'react';
import ReactHtmlParser from "react-html-parser";
import Chip from "@material-ui/core/Chip";
import Collapsible from "react-collapsible";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import AnswerComponent from "./AnswerComponent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import InfoComponent from "./InfoComponent";

const styles = makeStyles((theme)=>({
    chip: {
        margin: theme.spacing(0.5),
    },
}));

class QuestionComponent extends Component{

    constructor(props){
        super(props)
        this.renderAnswers = this.renderAnswers.bind(this);
        this.state = {openAnswers:false};
    }

    renderAnswers= (answers)=>{

        if(answers === undefined){
            answers = [];
        }

        return answers.map((answer)=>(
                <AnswerComponent answer = {answer}/>
        ));
    }

    render(){
        
        const question = this.props.question;
        
        return(
            <div style={{margin:10,padding:10,boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <div style={{display: 'flex', height:20 }}>
                    <div style={{width:850,fontSize:15}}>
                        <b style={{color:'#EF5350'}}> { ReactHtmlParser(question.title) } </b>
                    </div>
                    <div style={{fontSize: 15}}>
                        <InfoComponent data={question}/>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'flex-start',marginTop:10}}>
                    {question.tags.map(data => {
                        return (
                            <Chip
                                key={data.key}
                                label={data}
                                className={styles.chip}
                            />
                        );
                    })}
                </div>
                <div>
                    <Collapsible trigger={
                        <Button variant="extended" color={"inherit"} onClick={()=>this.setState({openAnswers: !this.state.openAnswers})}>
                            Answers
                            {this.state.openAnswers ? <ArrowDropUp/> : <ArrowDropDown/>}
                        </Button>
                    } alignItems="flex-start">
                        <div style={{margin:10,color:'#000',width:'100%'}}>
                            {
                                this.renderAnswers(question.answers)
                            }
                        </div>
                    </Collapsible>
                </div>
                {/*<Divider variant="middle" component="li" />*/}
            </div>
        )
    }
}

export default QuestionComponent;