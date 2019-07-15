import AppBar from '@material-ui/core/AppBar';
import React ,{ Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
class Home extends Component{



    constructor(props){
        super(props)
        this.state = {textInput:"",search_results:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onTextChange = (event) =>{
        this.setState({textInput: event.target.value});
    };

    handleSubmit(event) {
        var url1="https://api.stackexchange.com//2.2/search/advanced?order=desc&sort=activity&";
        var url2=this.state.textInput+"&";
        var url3="site=stackoverflow";
        var finalurl=url1+url2+url3;

        // alert(finalurl);
        var promise=fetch(finalurl)
        var result=promise.then((response)=>response.json());
        result.then((response)=>{
              this.setState({search_results:response,show:true});
              alert(this.state.search_results);

          });

    }

    render(){
        const appBarChildStyle = {

        };
        const inputProps = {
            step: 300,
        };
        return(
            <div>
                <AppBar position="static" style = {appBarChildStyle}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className="grow" >
                            StackOverFlow Search
                        </Typography>
                        <TextField id="time" type="text" inputProps={inputProps} value={this.state.textInput} onChange={this.onTextChange} />
                        <Button color="inherit" onClick={this.handleSubmit}>Search</Button>
                    </Toolbar>
                </AppBar>
                <div>
              {this.state.show && 
                 <List dense style={styles.container} disablePadding={true}>
          {this.state.search_results.map((value) => (
           
              <Card style={styles.listitem}>
            <ListItem key={value} button > 
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value}`}
                  src="https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/38-512.png"
                  
                />
              </ListItemAvatar>
          <ListItemText primary={<b>{(value.name).toUpperCase()}</b>  }  secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                      {value.description}
              </Typography>
            </React.Fragment>
          }/>
              
            </ListItem>
            <ListItem key={value} button > 
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value}`}
                  src="https://cdn4.iconfinder.com/data/icons/rcons-user/32/secret_agent_man-512.png"
                  
                />
              </ListItemAvatar>
          <ListItemText primary={<b>{(value.casts).toUpperCase()}</b>  }  secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                      {value.releasedon}
              </Typography>
            </React.Fragment>
          }/>
              
            </ListItem>
{/* 
            <ListItem key={value} button > 
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value}`}
                  src="https://cdn3.iconfinder.com/data/icons/main-ui-elements-with-color-bg-vol-2/512/heart-512.png"
                />
              </ListItemAvatar>
          <ListItemText primary={<b>{(value.casts).toUpperCase()}</b>  }  secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                      {value.releasedon}
              </Typography>
            </React.Fragment>
          }/>
            </ListItem> */}
            <ListItem style={{display: 'flex',flex: 1,alignItems:'flex-end'}}>
            <Avatar 
                              alt={`Avatar n°${value}`}

            src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/heart-love-like-likes-loved-favorite-512.png"/>
            
            </ListItem>
            </Card>

          ))}
        </List>
              }
            </div>
            </div>
            
        )
    }

}

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
export default Home;