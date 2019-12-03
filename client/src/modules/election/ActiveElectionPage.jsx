import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import ActiveElectionForm from './ActiveElectionForm';
import { handleChangeElectionData, getFieldOptions,getCallElectionData } from './state/ElectionAction';
import { connect } from 'react-redux';

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
    electionForm: {
        paddingLeft: 24,
    }
});

class Dashboard extends React.Component {
    state = {
        open: true,
        nominations: [],
        electionId: '',
    };

    componentDidMount() {
        const { handleChangeElectionData,getCallElectionData } = this.props;
        if(this.props.location.state){
            getCallElectionData(this.props.location.state.id,this.props.location.state.name,this.props.location.state.moduleId);
        }

        const newElectionModule = { ...this.props.CallElectionData };
        if (this.props.location.state) {
            newElectionModule["name"] = this.props.location.state.name;
            newElectionModule["module_id"] = this.props.location.state.moduleId;
        }
        handleChangeElectionData(newElectionModule);
        this.props.getFieldOptions(this.props.location.state.moduleId);
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <ActiveElectionForm check={(this.props.location.state && this.props.location.state.check) ? this.props.location.state.check : ''} moduleId={(this.props.location.state) ? this.props.location.state.moduleId : ''} electionId={(this.props.location.state) ? this.props.location.state.id : ''} check={(this.props.location.state) ? this.props.location.state.check : ''} className={classes.electionForm} title="Election Commission of Sri Lanka"></ActiveElectionForm>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const CallElectionData = Election.CallElectionData;
    return { CallElectionData }
};

const mapActionsToProps = {
    handleChangeElectionData,
    getFieldOptions,
    getCallElectionData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));




