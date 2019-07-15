import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";

const styles = {
    container:{
        position:'absolute',
        left:'20%',
        right:'20%',
        top:'20%',
    },
    listitem:{
        marginBottom:30,
        width:800,
        minHeight:300
    }
}

class Alist extends Component{
    constructor(props){
        super(props)
    }


    render() {
        const results = this.props.results;
        return(
            <List dense style={styles.container} disablePadding={true}>
                {results.map((value) => (
                    <Card style={styles.listitem}>
                        <ListItem key={value} button >

                            <ListItemText primary={<b>{(value.tags[0])}</b>  }  secondary={
                                <React.Fragment>
                                    <Typography component="span" color="textPrimary">
                                        {value.owner.user_id}
                                    </Typography>
                                </React.Fragment>
                            }/>

                        </ListItem>
                    </Card>

                ))}
            </List>
        )
    }
}

export default Alist;