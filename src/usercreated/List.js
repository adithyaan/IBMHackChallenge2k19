import React ,{ Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapsible from 'react-collapsible';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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

class ListView extends Component{

    constructor(props) {
        super(props);
        this.createAnswerListItem = this.createAnswerListItem.bind(this); 
        // console.log(props.results);
         
    }

    createListItem(items) {
        // console.log(JSON.stringify(items));
        
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

export default ListView;