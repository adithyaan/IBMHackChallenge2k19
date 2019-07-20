import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Score from '@material-ui/icons/Score';
import RemoveRedEyeSharp from '@material-ui/icons/RemoveRedEyeSharp';
import CalendarToday from '@material-ui/icons/CalendarToday';

class InfoComponent extends Component{
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log(nextProps);
    }

    render() {
        const userData = this.props.data.owner;
        const data = this.props.data;

        const styles = {
          container:{
              display:'flex',
              justifyContent:'center'
          },
            subContainer:{
                display:'flex',
                justifyContent:'space-between',
                fontSize:12,
            },
            elem:{
              padding:10
            }
        };

        return (
            <div>
                <div style={styles.container}>
                    <Avatar src={userData.profile_image}/>
                    {userData.display_name}
                </div>

                <div style={styles.subContainer}>

                    <div style={styles.elem}>
                        <Icon>
                            <ThumbUp/>
                        </Icon>
                        <center>{data.up_vote_count}</center>
                    </div>

                    <div style={styles.elem}>
                        <Icon>
                            <ThumbDown/>
                        </Icon>
                        <center>{data.down_vote_count}</center>
                    </div>

                    <div style={styles.elem}>
                        <Icon>
                            <Score/>
                        </Icon>
                        <center>{data.score}</center>
                    </div>

                    <div style={styles.elem}>
                        <Icon>
                            <RemoveRedEyeSharp/>
                        </Icon>
                        <center>{data.view_count}</center>
                    </div>
                </div>
            </div>
        );
    }

}

export default InfoComponent;