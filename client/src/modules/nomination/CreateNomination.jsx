import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from '../../components/MainMenu/MainMenu';
import InfoBanner from '../../components/InfoBanner/InfoBanner';
import NominationPanel from '../../components/Nomination/NominationList';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ObjectionPanel from '../../components/Objection/SubmittedObjectionList';

//import ObjectionPanel from '../../../components/Objection/ObjectionList';




const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.drawer.width,
            flexShrink: 0,
        },
    },
    topBottomSpace: {
        marginBottom: 15
    },
    root: {
        paddingLeft: 6,
        paddingRight:10
    }
});

class Home extends React.Component {

    state = {
        open: true,
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
        Axios.get(`elections/${sessionStorage.getItem('election_id')}`)
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
                <MainMenu title="Election Commission of Sri Lanka" ></MainMenu>

                <div className={classes.content}>
                    {/* all the content should go here.. */}

                    <InfoBanner election={this.state.election}></InfoBanner>
                    <div className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid style={{marginTop:35}} item xs={12} sm={6}>
                            <Typography component="h2" variant="headline" gutterBottom style={{marginLeft:5}}>
                                Create Nomination For {this.state.election.name}
                            </Typography>
                            {/* <Typography  variant="caption" gutterBottom style={{marginBottom:25,marginLeft:5}}>
                            {this.state.election.name}
                            </Typography>                                 */}
                            <Divider variant="middle" className={classes.topBottomSpace} />
                                <NominationPanel></NominationPanel>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <Typography variant="h4" gutterBottom>Objections</Typography>
                                <Divider variant="middle" className={classes.topBottomSpace} />
                                <ObjectionPanel></ObjectionPanel> */}
                            </Grid>
                        </Grid>
                    </div>
                </div>


            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
