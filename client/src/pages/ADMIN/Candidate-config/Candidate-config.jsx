import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../../components/AdminMenu/AdminMenu';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.drawer.width+20,
            flexShrink: 0,
        },
       
    },
    topBottomSpace: {
        marginBottom: 15
    }
});

class ElectionHome extends React.Component {

    state = {
        open: true,
        election_id: '43680f3e-97ac-4257-b27a-5f3b452da2e6',
        election: {
            electionTimeLine: new Array(4).fill(0),
        },
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {

        // get election details
        Axios.get(`${process.env.REACT_APP_API_DOMAIN}/ec-election/elections/${this.state.election_id}`)
            .then(res => {
                const election = res.data;
                this.setState({ election });
            });

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Candidate Configurations" ></AdminMenu>
                <div className={classes.content}>
                <Grid container spacing={12} >
                    <Grid item xs={8}>
                        <Typography component="h5" variant="h5" align='left' >
                            Election Configuration Wizard 
                        </Typography> 
                    </Grid>
                    <Grid item xs={3}> 
                        <Typography variant="subtitle1" gutterBottom>Model ID : </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                

                
                
                


                
                </div>

            </div>
        );
    }
}

ElectionHome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ElectionHome);