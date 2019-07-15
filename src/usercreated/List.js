import React ,{ Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

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
    }

    createListItem(items) {
        return items.map(element=>
            (<div>
                <ListItem alignItems="flex-start">
                    {/*<ListItemAvatar>*/}
                    {/*    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
                    {/*</ListItemAvatar>*/}
                    <ListItemText
                        primary={element.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    {element.owner.display_name}
                                </Typography>
                                {element.link}
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