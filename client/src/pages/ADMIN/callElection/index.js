import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AdminMenu from '../../../components/AdminMenu/AdminMenu';
import CallElectionList from '../../../components/CallElectionList';
import CallElection from '../../../modules/election/CallElection';
import ElectionModule from '../../../components/ElectionModule/ElectionModule';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';//---
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';///-
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { getElectionModules,getAllElections , getElectionReviewData } from '../../../modules/election/state/ElectionAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment';




const styles = theme => ({
    container: {
        marginLeft: theme.spacing.unit * 35,
        paddingTop: 10,
    }, heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,

        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    xxxxx: {
        wide: 'full'
    },
    panel_wrapper: {
        "min-width": 800,
    },
    heading: {
        padding: 14,
    },
    root: {
        display: 'flex',
    },


});
const h1Style = {
    marginLeft: '-850px'
};

class Home extends React.Component {
    state = {
        open: true,
        expanded: null,
        expandedPanelIndexApp: -1,
        expandedPanelIndexPen: -1,
        expandedPanelIndexRej: -1,
        electionModules: []
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    togglePanelApp = panelIndex => (event, didExpand) => {
        this.setState({
            expandedPanelIndexApp: didExpand ? panelIndex : -1

        });
    };
    togglePanelPen = panelIndex => (event, didExpand) => {
        this.setState({
            expandedPanelIndexPen: didExpand ? panelIndex : -1

        });
    };
    togglePanelRej = panelIndex => (event, didExpand) => {
        this.setState({
            expandedPanelIndexRej: didExpand ? panelIndex : -1

        });
    };
    getElectionReviewData = (id) => {
        const { getElectionReviewData } = this.props;
        getElectionReviewData(id);

    };
    componentDidMount() {
        const { getElectionModules, getAllElections  } = this.props;
        getElectionModules();
        getAllElections();
    }

    // componentDidUpdate (oldState){
    //     const { getElectionModules, getPendingElections, getApproveElections, getRejectedElections,PendingElections } = this.props;

    //     if(oldState.PendingElections !== PendingElections){
    //         getElectionModules();
    //         getPendingElections();
    //         getApproveElections();
    //         getRejectedElections();
    //     }
    //   }


    render() {
        const { classes, electionModules, AllElections, PendingElections, RejectedElections } = this.props;
        debugger;
        const { expanded, expandedPanelIndexApp, expandedPanelIndexPen, expandedPanelIndexRej } = this.state;
        const callElectionApproveElements = AllElections.map((election, i) => (
            (election.status==='APPROVE') ? 
            <ExpansionPanel expanded={expandedPanelIndexApp === i} onChange={this.togglePanelApp(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container classname={classes.panel_wrapper} spacing={16}>
                        <Grid item xs="6">
                            <Typography className={classes.heading}>{election.name}</Typography>
                        </Grid>
                        <Grid item xs="3">
                            {/* <Typography className={classes.heading}>({election.name})</Typography> */}
                        </Grid>
                        <Grid item xs="3">

                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container classname={classes.panel_wrapper} spacing={24}>
                        <Grid item xs={12}>
                            <Grid container spacing={24}>
                                <Grid item xs={6} sm={3}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={election.createdBy} secondary="Created By" />
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <DateRangeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={moment(election.lastModified).format("DD MMM YYYY hh:mm a")} secondary="Last Modified" />
                                    </ListItem>
                                </Grid>
                                <Grid style={{ textAlign: 'right' }} item xs={6} sm={5}>
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "active-election", state: { id: election.id,check:'approve',moduleId:election.moduleId } }} >
                                        <Button onClick={this.getElectionReviewData.bind(this, election.id)} style={{ marginTop: 30 }} variant="contained" color="primary" size="small">View</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                </ExpansionPanelDetails>
            </ExpansionPanel> : '' 
        ));
        const callElectionPendingElements = AllElections.map((election, i) => (
            (election.status==='PENDING') ? 
            <ExpansionPanel expanded={expandedPanelIndexPen === i} onChange={this.togglePanelPen(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container classname={classes.panel_wrapper} spacing={16}>
                        <Grid item xs="6">
                            <Typography className={classes.heading}>{election.name}</Typography>
                        </Grid>
                        <Grid item xs="3">
                            {/* <Typography className={classes.heading}>({election.name})</Typography> */}
                        </Grid>
                        <Grid item xs="3">

                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container classname={classes.panel_wrapper} spacing={24}>
                        <Grid item xs={12}>
                            <Grid container spacing={24}>
                                <Grid item xs={6} sm={3}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={election.createdBy} secondary="Created By" />
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <DateRangeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={moment(election.lastModified).format("DD MMM YYYY hh:mm a")} secondary="Last Modified" />
                                    </ListItem>
                                </Grid>
                                <Grid style={{ textAlign: 'right' }} item xs={6} sm={5}>
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "active-election", state: { id: election.id,check:'test',moduleId:election.moduleId } }} >
                                        <Button onClick={this.getElectionReviewData.bind(this, election.id)} style={{ marginTop: 30 }} variant="contained" color="primary" size="small">Edit</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                </ExpansionPanelDetails>
            </ExpansionPanel> : ''
        ));
        const callElectionRejectedElements = AllElections.map((election, i) => (
            (election.status==='REJECT') ? 
            <ExpansionPanel expanded={expandedPanelIndexRej === i} onChange={this.togglePanelRej(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container classname={classes.panel_wrapper} spacing={16}>
                        <Grid item xs="6">
                            <Typography className={classes.heading}>{election.name}</Typography>
                        </Grid>
                        <Grid item xs="3">
                            {/* <Typography className={classes.heading}>({election.name})</Typography> */}
                        </Grid>
                        <Grid item xs="3">

                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container classname={classes.panel_wrapper} spacing={24}>
                        <Grid item xs={12}>
                            <Grid container spacing={24}>
                                <Grid item xs={6} sm={3}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={election.createdBy} secondary="Created By" />
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <DateRangeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={moment(election.lastModified).format("DD MMM YYYY hh:mm a")} secondary="Last Modified" />
                                    </ListItem>
                                </Grid>
                                <Grid style={{ textAlign: 'right' }} item xs={6} sm={5}>
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "active-election", state: { id: election.id,check:'reject',moduleId:election.moduleId } }} >
                                        <Button onClick={this.getElectionReviewData.bind(this, election.id)} style={{ marginTop: 30 }} variant="contained" color="primary" size="small">Edit</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                </ExpansionPanelDetails>
            </ExpansionPanel> : ''
        ));

        return (
            <div>
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>

                <div className={classes.container}>
                    {/* <Typography variant="h5" component="h2">
                        Election Home
                    </Typography> */}
                    <br />
                    <Grid container className={classes.root} spacing={32}>

                        <Grid item xs={5} >
                            {/* <CreateElection></CreateElection> */}
                            <CallElection electionModules={electionModules}></CallElection>

                        </Grid>
                        <Grid item xs={5} >
                            {/* <CallElection electionModules={electionModules}></CallElection> */}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.root} spacing={32}>

                        <Grid item xs={8} >
                            <div style={{ width: '100%' }}>
                                <CallElectionList callElectionApproveElements={callElectionApproveElements} callElectionPendingElements={callElectionPendingElements} callElectionRejectedElements={callElectionRejectedElements}></CallElectionList>
                            </div>
                        </Grid>
                        <Grid item xs={5} >
                            <div style={{ width: '100%' }}>
                                {/* {callElectionElements} */}
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                </div>
            </div>

        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = ({ Election }) => {
    const { getElectionModules, getElectionReviewData } = Election;
    const electionModules = Election.allElectionModules;
    const AllElections = Election.AllElections;

    return { getElectionModules, electionModules, getAllElections, AllElections, getElectionReviewData };
};

const mapActionsToProps = {
    getElectionModules,
    getElectionReviewData,
    getAllElections
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));