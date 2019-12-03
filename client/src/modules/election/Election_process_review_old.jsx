import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import { getAllElectionReviews, getElectionReviewData } from "./state/ElectionAction.js";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';//--
import ElectionReviewProcess from '../../components/ElectionReviewProcess/ElectionReviewProcess.jsx';
import { Link } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    card: {
        width: 300,
        margin: 5,
        cursor: 'pointer',

    },
});

class Dashboard extends React.Component {
    state = {
        open: true,
        nominations: []
    };


    componentDidMount() {
        const { allElectionModules, getAllElectionReviews } = this.props;
        getAllElectionReviews();

        console.log(allElectionModules)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    getElectionReviewData = (id) => {
        const { getElectionReviewData } = this.props;

        getElectionReviewData(id);

    };
    // getElectionReviewData(id){
    //     debugger;
    // }

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, allElectionModules } = this.props;
        const allElection = [
            { index: "0", noOfDevision: "09", election: "Provincial Council Election 2019", noOfTeams: "15" },
            { index: "1", noOfDevision: "25", election: "Local Authority Election 2019", noOfTeams: "08" },
            { index: "2", noOfDevision: "01", election: "Presidential Election 2019", noOfTeams: "10" },
            { index: "3", noOfDevision: "23", election: "Parliamentary Election 2019", noOfTeams: "07" },
        ];
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <div style={{ width: '100%' }}>
                    <Typography style={{ marginBottom: '50px', marginLeft: '20px' }} variant="h5" component="h2">
                        Election Review
                </Typography>

                    <div className={classes.container}>


                        <div style={{ width: '100%', display: 'flex' }}>
                            {/* {allElectionModules.map(row => <ElectionReviewProcess />)} */}
                            <Grid container className={classes.root} spacing={64}>
                                {
                                    allElectionModules.map(row =>
                                        <Grid item xs={3}>
                                            <Button onClick={this.getElectionReviewData(row.id)}>
                                                <Card style={{ width: 350, marginLeft: ((row.index == 0) ? '30px' : '0'), margin: ((row.index !== 0) ? '20px' : '0') }} md={3} xs={6} sm={3}>
                                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "admin/election-process-review-detail", state: { id: row.id } }} >
                                                        <CardContent >
                                                            <Grid className={classes.container} container spacing={24}>
                                                                <Grid style={{ textAlign: 'left' }} item >
                                                                    <Typography className={classes.text_a} component="p">
                                                                        <b>{row.name}</b>
                                                                    </Typography>
                                                                    <br />
                                                                    <Typography className={classes.text_a} component="p">
                                                                        No of Divisions : {7}
                                                                    </Typography>

                                                                    <Typography className={classes.text_a} component="p">
                                                                        No of Parties/IG : {4}

                                                                    </Typography>
                                                                </Grid>

                                                            </Grid>
                                                        </CardContent>
                                                    </Link>
                                                </Card >
                                            </Button>
                                        </Grid>
                                    )}
                            </Grid>
                        </div>


                        <br />

                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const { allElectionModules } = Election;
    const { getElectionReviewData } = Election;


    return { allElectionModules, getElectionReviewData }
};

const mapActionsToProps = {
    getAllElectionReviews,
    getElectionReviewData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));




