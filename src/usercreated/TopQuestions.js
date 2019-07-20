import React ,{ Component } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import QuestionComponent from "./QuestionComponent";

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
        this.createListItem = this.createListItem.bind(this);
    }

    createListItem(items){
        return items.map((question)=>(
                <QuestionComponent question = {question}/>
            )
        )
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