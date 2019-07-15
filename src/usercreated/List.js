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
        return items.map(x=>
            (<div>
                <ListItem alignItems="flex-start">
                    {/*<ListItemAvatar>*/}
                    {/*    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />*/}
                    {/*</ListItemAvatar>*/}
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={useStyles.inline}
                                    color="textPrimary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>
            ));
    }

    render() {

        const items = [ "x", "y", "8"];

        return (
            <List className={useStyles.root}>
                {this.createListItem(items)}
            </List>
        );
    }

}

export default ListView;