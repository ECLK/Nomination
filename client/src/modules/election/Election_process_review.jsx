import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import CallElectionList from '../../components/CallElectionList';
import CallElection from './CallElection';
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
import { getAllElections ,getElectionReviewData,getFieldOptions } from '../election/state/ElectionAction';
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
    getElectionTemplateData = (id,moduleId) => {
        const { getElectionReviewData,getFieldOptions } = this.props;
        getElectionReviewData(id);
        getFieldOptions(moduleId);
    };
    
    componentWillMount() {
        const { getAllElections  } = this.props;
        getAllElections();
    }


    render() {
        const { classes, AllElectionTemplates } = this.props;
        const { expanded, expandedPanelIndexApp, expandedPanelIndexPen, expandedPanelIndexRej } = this.state;
        const callElectionApproveElements = AllElectionTemplates.map((election, i) => (
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
                                        <Button 
                                            onClick={() => {
                                                this.getElectionTemplateData.bind(this, election.id, election.moduleId)
                                                this.props.history.push(`admin/election-process-review-detail/${election.id}/${election.moduleId}/approve`);
                                            }}
                                            style={{ marginTop: 30 }} variant="contained" color="primary" size="small">View</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                </ExpansionPanelDetails>
            </ExpansionPanel> : '' 
        ));
        const callElectionPendingElements = AllElectionTemplates.map((election, i) => (
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
                                        <Button 
                                        onClick={() => {
                                            this.getElectionTemplateData.bind(this, election.id, election.moduleId)
                                            this.props.history.push(`admin/election-process-review-detail/${election.id}/${election.moduleId}/pending`);
                                        }}
                                            style={{ marginTop: 30 }} variant="contained" color="primary" size="small">Edit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                </ExpansionPanelDetails>
            </ExpansionPanel> : ''
        ));
        const callElectionRejectedElements = AllElectionTemplates.map((election, i) => (
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
                                        <Button 
                                        onClick={() => {
                                            this.getElectionTemplateData.bind(this, election.id, election.moduleId)
                                            this.props.history.push(`admin/election-process-review-detail/${election.id}/${election.moduleId}/reject`);
                                        }}                                        
                                        style={{ marginTop: 30 }} variant="contained" color="primary" size="small">Edit</Button>
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
    const { getElectionReviewData } = Election;
    const AllElectionTemplates = Election.AllElections;

    return { AllElectionTemplates, getElectionReviewData };
};

const mapActionsToProps = {
    getElectionReviewData,
    getAllElections,
    getFieldOptions
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));