import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

            const useStyles = makeStyles(theme => ({

                textField: {
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                },
                input:{
                    color: 'white'
                },
                fab: {
                    margin: theme.spacing(1),
                    padding: 10,
                },
                progress: {
                    margin: theme.spacing(2),
                },
            }));
            const theme = createMuiTheme({
                
                overrides: {
                    MuiInputBase: {
                        input: {
                            color: 'white',
                            height: 7,
                            fontSize: 16,
                        },
                    },
                },
            });

    export {useStyles,theme}