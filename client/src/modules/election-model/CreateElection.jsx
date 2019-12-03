import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import Spinner from '../../components/Spinner';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import CandidateForm from './CandidateForm';
import DivisionConfig from './DivisionConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import ElectionConfig from './ElectionConfig';
import Dialog from '@material-ui/core/Dialog';
import IconButton from "@material-ui/core/IconButton";
import Slide from '@material-ui/core/Slide';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import { createElection, updateElection, submitElection, editElection, getFieldOptions, getElectionTemplateData, deleteElectionModule } from './state/ElectionAction';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        padding: 24,
        paddingLeft: 264,
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    pageContent: {
        padding: 24,
    },
    paperContent: {
        padding: 24,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,

    },
    warningIcon: {
        width: '10vw',
        height: '5vh',
    }

});

function getSteps() {
    return ['Candidate Form Configuration', 'Division Configuration', 'Election Configuration'];
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

const authorities = [{
    "authority_id": "1",
    "name": "-- Select Authority--",
}, {
    "authority_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "Officer Incharge of Create Election",
}, {
    "authority_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "Officer Incharge of Calling Election",
}];
class CreateElection extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
        goToHome: false,
        candidateConfigs: [],
        candidateSupportingDocs: [],
        nominationSupportingDocs: [],
        objectionSupportingDocs: [],
        paymentSupportingDocs: [],
        divisions: [],
        errorTextCandidateConfig: '',
        errorTextDivisionCommonName: '',
        errorTextDivisionConfig: '',
        loading: true,
        formStatus: {
            errorTextCalType: '',
            errorTextSecurityDepositeRpp: '',
            errorTextSecurityDepositeAmountRpp: '',
            errorTextSecurityDepositeIg: '',
            errorTextSecurityDepositeAmountIg: '',
            errorTextNominationSubmision: '',
            errorTextObjection: '',
            errorTextAlliance: '',
            errorTextEligibility: '',
        }
    };

    constructor() {
        super();
        this.handleElectionChange = this.handleElectionChange.bind(this);
    }

    getStepContent(step) {
        const errorTextItems = { ...this.state.formStatus }
        switch (step) {
            case 0:
                return <CandidateForm
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                    candidateConfigs={this.state.candidateConfigs}
                    candidateSupportingDocs={this.state.candidateSupportingDocs}
                    nominationSupportingDocs={this.state.nominationSupportingDocs}
                    objectionSupportingDocs={this.state.objectionSupportingDocs}
                    paymentSupportingDocs={this.state.paymentSupportingDocs}
                    errorTextCandidateConfig={this.state.errorTextCandidateConfig}
                />;
            case 1:
                return <DivisionConfig
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                    errorTextDivisionCommonName={this.state.errorTextDivisionCommonName}
                    errorTextDivisionConfig={this.state.errorTextDivisionConfig}
                />;
            case 2:
                return <ElectionConfig
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                    authorities={authorities}
                    errorTextItems={errorTextItems}
                />;
            default:
                return 'Unknown step';
        }
    }

    handleElectionChange(electionModule) {
        const { formStatus } = this.state;
        for (let i = 0; i < electionModule.electionConfig.length; i++) {
            switch (electionModule.electionConfig[i].electionModuleConfigId) {
                case 'fe2c2d7e-66de-406a-b887-1143023f8e72'://Security Deposit RPP
                    formStatus.errorTextSecurityDepositeRpp = '';
                    break;
                case '123213'://Security Deposit Amount RPP
                    formStatus.errorTextSecurityDepositeAmountRpp = '';
                    break;
                case 'fe2c2d7e-66de-406a-b887-1143023f8e54'://Security Deposit IG
                    formStatus.errorTextSecurityDepositeIg = '';
                    break;
                case '1232132'://Security Deposit Amount IG
                    formStatus.errorTextSecurityDepositeAmountIg = '';
                    break;
                case '1243123'://Nomination Submission
                    formStatus.errorTextNominationSubmision = '';
                    break;
                case '253454355'://Objections
                    formStatus.errorTextObjection = '';
                    break;
                case '142343242343'://Allience
                    formStatus.errorTextAlliance = '';
                    break;
                case '15990459-2ea4-413f-b1f7-29a138fd7a97'://Calculation type
                    formStatus.errorTextCalType = '';
                    break;
            }
            if (this.props.new_election_module.eligibilityCheckList.length > 0) {
                formStatus.errorTextEligibility = '';
            } else {
                formStatus.errorTextEligibility = 'emptyField';
            }
        }
        this.setState({ formStatus });
        const { updateElection } = this.props;
        this.setState({ errorTextCandidateConfig: '' });
        this.setState({ errorTextDivisionCommonName: '' });
        this.setState({ errorTextDivisionConfig: '' });
        updateElection(electionModule);
    }

    handleDelete = (electionModule, event) => {
        const { deleteElectionModule } = this.props;
        deleteElectionModule(electionModule.currentTarget.id);
        this.onCloseModal();
        this.setState({
            goToHome: true
        });
    }

    componentDidMount() {
        const { createElection, getElectionTemplateData } = this.props;
        this.setState({loading: false})
        createElection(this.props.location.state.name);
        if (this.props.location.state.id) {
            getElectionTemplateData(this.props.location.state.id);
        }
        this.setState({
            moduleId: this.props.location.state.id
        });
        // fetch required data
        getFieldOptions().then((data) => {
            this.setState(data);
        })
    }

    isStepOptional = step => step === 1;

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;

        var goNext = true;
        if (this.props.new_election_module.candidateFormConfiguration.length === 0) {
            this.setState({ errorTextCandidateConfig: 'emptyField' });
            goNext = false;
        }
        if (activeStep === 1) {
            if (this.props.new_election_module.divisionCommonName === undefined || this.props.new_election_module.divisionCommonName === '') {
                this.setState({ errorTextDivisionCommonName: 'emptyField' });
                goNext = false;
            }
            if (this.props.new_election_module.divisionConfig.length === 0 && this.props.new_election_module.divisionCommonName !== undefined) {
                this.setState({ errorTextDivisionConfig: 'emptyField' });
                goNext = false;
            }
        }
        if (activeStep === 2) {
            if (this.props.new_election_module.electionConfig.length > 0 && this.props.new_election_module.electionConfig.length !== undefined) {

                var formStatus = {
                    errorTextCalType: 'emptyField',
                    errorTextSecurityDepositeRpp: 'emptyField',
                    errorTextSecurityDepositeAmountRpp: 'emptyField',
                    errorTextSecurityDepositeIg: 'emptyField',
                    errorTextSecurityDepositeAmountIg: 'emptyField',
                    errorTextNominationSubmision: 'emptyField',
                    errorTextObjection: 'emptyField',
                    errorTextAlliance: 'emptyField',
                    errorTextEligibility: 'emptyField',
                }

                for (let i = 0; i < this.props.new_election_module.electionConfig.length; i++) {
                    switch (this.props.new_election_module.electionConfig[i].electionModuleConfigId) {
                        case 'fe2c2d7e-66de-406a-b887-1143023f8e72'://Security Deposit RPP
                            for (let i = 0; i < this.props.new_election_module.electionConfig.length; i++) {
                                if (this.props.new_election_module.electionConfig[i].electionModuleConfigId === 'fe2c2d7e-66de-406a-b887-1143023f8e72' && this.props.new_election_module.electionConfig[i].value === 'No') {
                                    formStatus.errorTextSecurityDepositeAmountRpp = '';
                                }
                            }
                            formStatus.errorTextSecurityDepositeRpp = '';
                            break;
                        case '123213'://Security Deposit Amount RPP
                            formStatus.errorTextSecurityDepositeAmountRpp = '';
                            break;
                        case 'fe2c2d7e-66de-406a-b887-1143023f8e54'://Security Deposit IG
                            for (let i = 0; i < this.props.new_election_module.electionConfig.length; i++) {
                                if (this.props.new_election_module.electionConfig[i].electionModuleConfigId === 'fe2c2d7e-66de-406a-b887-1143023f8e54' && this.props.new_election_module.electionConfig[i].value === 'No') {
                                    formStatus.errorTextSecurityDepositeAmountIg = '';
                                }
                            }
                            formStatus.errorTextSecurityDepositeIg = '';
                            break;
                        case '1232132'://Security Deposit Amount IG
                            formStatus.errorTextSecurityDepositeAmountIg = '';
                            break;
                        case '1243123'://Nomination Submission
                            formStatus.errorTextNominationSubmision = '';
                            break;
                        case '253454355'://Objections
                            formStatus.errorTextObjection = '';
                            break;
                        case '142343242343'://Allience
                            formStatus.errorTextAlliance = '';
                            break;
                        case '15990459-2ea4-413f-b1f7-29a138fd7a97'://Calculation type
                            formStatus.errorTextCalType = '';
                            break;
                    }
                    if (this.props.new_election_module.eligibilityCheckList.length > 0) {
                        formStatus.errorTextEligibility = '';
                    } else {
                        formStatus.errorTextEligibility = 'emptyField';
                    }
                }
                this.setState({ formStatus });

                Object.values(formStatus).map((item) => {
                    console.log(item)
                    if (item === 'emptyField') {
                        goNext = false;
                    }
                }
                )

                if (goNext) {
                    this.state.moduleId ? this.props.editElection(this.state.moduleId, this.props.new_election_module) : this.props.submitElection(this.props.new_election_module);
                    this.setState({
                        goToHome: true
                    });
                    return;
                }

            } else {
                var formStatus = {
                    errorTextCalType: 'emptyField',
                    errorTextSecurityDepositeRpp: 'emptyField',
                    errorTextSecurityDepositeAmountRpp: 'emptyField',
                    errorTextSecurityDepositeIg: 'emptyField',
                    errorTextSecurityDepositeAmountIg: 'emptyField',
                    errorTextNominationSubmision: 'emptyField',
                    errorTextObjection: 'emptyField',
                    errorTextAlliance: 'emptyField',
                    errorTextEligibility: 'emptyField',
                }
                this.setState({ formStatus });
                goNext = false;
            }

        }
        if (goNext) {
            this.setState({
                activeStep: activeStep + 1,
                skipped,
            });
        }
    };
    onOpenModal = () => {
        this.setState({ open: true });

    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    handleDone = () => {
        this.setState({
            goToHome: true
        });
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const electionModule = this.props.new_election_module;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3">
                            {electionModule.name} Election Configuration Wizard
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {this.state.goToHome ? (
                                <Redirect to="/admin/create-election-home" />
                            ) : 
                            this.state.loading ? <Spinner /> :
                            (
                                    <Paper className={classes.pageContent} elevation={1}>
                                        <Stepper activeStep={activeStep}>
                                            {steps.map((label, index) => {
                                                const props = {};
                                                const labelProps = {};
                                                return (
                                                    <Step key={label} {...props}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                        <Grid className={classes.paperContent} container spacing={24}>
                                            <Grid item xs={12}>
                                                {this.getStepContent(activeStep, electionModule)}
                                            </Grid>
                                        </Grid>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                onClick={this.handleCancel}
                                                className={classes.button}
                                            >
                                                Cancel
                                            </Button>
                                            {/* {((this.props.electionId) && this.props.check !== 'approve' && this.props.check !== 'reject') ? */}

                                            {(this.state.moduleId && activeStep === 2 && this.props.location.state.check !== 'approve' && this.props.location.state.check !== 'reject') ?
                                                <Button
                                                    variant="contained"
                                                    color="default"
                                                    // onClick={this.handleDelete}
                                                    onClick={this.onOpenModal}
                                                    className={classes.button}
                                                >
                                                    Delete
                                                <DeleteIcon className={classes.rightIcon} />
                                                </Button> : ''

                                            }
                                            {(this.state.moduleId && this.props.location.state.check !== 'approve' && this.props.location.state.check !== 'reject') ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Update' : 'Next'}
                                                </Button>
                                                : (this.props.location.state.check === 'approve' && activeStep === steps.length - 1) ?
                                                    <Grid item xs="1">
                                                        <Button style={{ marginLeft: 150, marginTop: -56 }} color="primary" onClick={this.handleDone} className={classes.button}>
                                                            Done
                                                    </Button>
                                                    </Grid>
                                                    : (this.props.location.state.check === 'reject') ?
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === steps.length - 1 ? 'Update' : 'Next'}
                                                        </Button>
                                                        :
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                                        </Button>
                                            }
                                        </div>
                                        <Dialog
                                            open={this.state.open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={this.handleClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">
                                            </DialogTitle>
                                            <DialogContent>

                                                <DialogContentText id="alert-dialog-slide-description">
                                                    {/* <WarningIcon className={classes.warningIcon} /> */}
                                                    Are You Sure You Want to Delete This Election Template?
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button id={this.state.moduleId} value="OK" onClick={this.handleDelete} color="primary">
                                                    OK
                                            </Button>
                                                <Button onClick={this.onCloseModal} color="primary">
                                                    Cancel
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Paper>
                                )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

CreateElection.propTypes = {
    classes: PropTypes.object,
};


const mapStateToProps = ({ ElectionModel, Election }) => {
    const { new_election_module, deleteElectionModule } = ElectionModel;
    return { new_election_module, deleteElectionModule };
};

const mapActionsToProps = {
    createElection,
    updateElection,
    submitElection,
    editElection,
    getElectionTemplateData,
    deleteElectionModule
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateElection));
