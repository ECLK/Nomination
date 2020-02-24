import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ElectionTimeLine from '../../components/ElectionTimeLine/ElectionTimeLine';
import AllowNomination from './AllowNomination';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import { setCallElectionData, postCallElectionData, openSnackbar, getFieldOptions, getCallElectionData, handleChangeElectionData, editCallElectionData, deleteCallElectionData } from './state/ElectionAction';
import { getTeams } from '../nomination/state/NominationAction';
import { connect } from 'react-redux';
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '90%',
    paddingLeft: 24
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  panel_wrapper: {
    "min-width": 800,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,

  },
});

function getSteps() {
  return ['TIMELINE', 'SELECT ELECTORATES'];
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

class ActiveElectionForm extends React.Component {

  constructor(props) {
    super(props);
    const { CallElectionData } = this.props;
    let newDate = new Date();
    this.state = {
      activeStep: 0,
      nominationStart: Date.parse(newDate),
      nominationEnd: Date.parse(newDate),
      objectionStart: Date.parse(newDate),
      objectionEnd: Date.parse(newDate),
      paymentStart: Date.parse(newDate),
      paymentEnd: Date.parse(newDate),
      approvalStart: Date.parse(newDate),
      approvalEnd: Date.parse(newDate),
      electionName: CallElectionData.electionName,
      electionModule: CallElectionData.electionModule,
      values: '',
      rowData: '',
      goToHome: false,
      columnHeaders: { name: '', id: '' },
      errorTextNominationStart: '',
      errorTextNominationEnd: '',
      errorTextObjectionStart: '',
      errorTextObjectionEnd: '',
      errorTextPaymentStart: '',
      errorTextPaymentEnd: '',
      errorTextApprovalStart: '',
      errorTextApprovalEnd: '',
      goNext: false,
      errorTextElectorates: ''
    };
  }
  componentWillMount(){
    const {getTeams} = this.props;
    getTeams();
}

  handleNext = () => {
    let activeStep;
    const { setElectionTimeLine, CallElectionData } = this.props;

    var goNext = true;

    if (CallElectionData.timeLineData.nominationStart === '' || isNaN(CallElectionData.timeLineData.nominationStart)) {
      this.setState({ errorTextNominationStart: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.nominationEnd === '' || isNaN(CallElectionData.timeLineData.nominationEnd)) {
      this.setState({ errorTextNominationEnd: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.objectionStart === '' || isNaN(CallElectionData.timeLineData.objectionStart)) {
      this.setState({ errorTextObjectionStart: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.objectionEnd === '' || isNaN(CallElectionData.timeLineData.objectionEnd)) {
      this.setState({ errorTextObjectionEnd: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.paymentStart === '' || isNaN(CallElectionData.timeLineData.paymentStart)) {
      this.setState({ errorTextPaymentStart: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.paymentEnd === '' || isNaN(CallElectionData.timeLineData.paymentEnd)) {
      this.setState({ errorTextPaymentEnd: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.approvalStart === '' || isNaN(CallElectionData.timeLineData.approvalStart)) {
      this.setState({ errorTextApprovalStart: 'emptyField' });
      goNext = false;
    }
    if (CallElectionData.timeLineData.approvalEnd === '' || isNaN(CallElectionData.timeLineData.approvalEnd)) {
      this.setState({ errorTextApprovalEnd: 'emptyField' });
      goNext = false;
    }

    var nominationStart = moment(CallElectionData.timeLineData.nominationStart).format("YYYY-MM-DDTHH:mm");
    var nominationEnd = moment(CallElectionData.timeLineData.nominationEnd).format("YYYY-MM-DDTHH:mm");
    var objectionStart = moment(CallElectionData.timeLineData.objectionStart).format("YYYY-MM-DDTHH:mm");
    var objectionEnd = moment(CallElectionData.timeLineData.objectionEnd).format("YYYY-MM-DDTHH:mm");
    var paymentStart = moment(CallElectionData.timeLineData.paymentStart).format("YYYY-MM-DDTHH:mm");
    var paymentEnd = moment(CallElectionData.timeLineData.paymentEnd).format("YYYY-MM-DDTHH:mm");
    var approvalStart = moment(CallElectionData.timeLineData.approvalStart).format("YYYY-MM-DDTHH:mm");
    var approvalEnd = moment(CallElectionData.timeLineData.approvalEnd).format("YYYY-MM-DDTHH:mm");

    //payment start should be before payment end
    if (moment(paymentEnd).isBefore(paymentStart)) {
      this.setState({ errorTextPaymentEnd: 'emptyField2' });
      goNext = false;
    }
    //nomination start should be before nomination end
    if (moment(nominationEnd).isBefore(nominationStart)) {
      this.setState({ errorTextNominationEnd: 'emptyField2' });
      goNext = false;
    }
    //objection start should be before objection end
    if (moment(objectionEnd).isBefore(objectionStart)) {
      this.setState({ errorTextObjectionEnd: 'emptyField2' });
      goNext = false;
    }
    //approve start should be bofore approve end 
    if (moment(approvalEnd).isBefore(approvalStart)) {
      this.setState({ errorTextApprovalEnd: 'emptyField2' });
      goNext = false;
    }
    //payment start should be before nomination start 
    if (moment(nominationStart).isBefore(paymentStart)) {
      this.setState({ errorTextNominationStart: 'emptyField2' });
      goNext = false;
    }
    //payment end should be before nomination end 
    if (moment(nominationEnd).isBefore(paymentEnd)) {
      this.setState({ errorTextNominationEnd: 'emptyField2' });
      goNext = false;
    }
    //nomination end should be before objection start
    if (moment(objectionStart).isBefore(nominationEnd)) {
      this.setState({ errorTextObjectionStart: 'emptyField2' });
      goNext = false;
    }
    //payment end should be before objection start
    if (moment(objectionStart).isBefore(paymentEnd)) {
      this.setState({ errorTextObjectionStart: 'emptyField2' });
      goNext = false;
    }
    //objection end should be before approve start
    if (moment(approvalStart).isBefore(objectionEnd)) {
      this.setState({ errorTextApprovalStart: 'emptyField2' });
      goNext = false;
    }
debugger;
    let today = new Date();
    var TodayFormated = moment(today).format("YYYY-MM-DDTHH:mm");

    if (moment(nominationStart).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextNominationStart: 'emptyField2' });
      goNext = false;
    }
    if (moment(nominationEnd).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextNominationEnd: 'emptyField2' });
      goNext = false;
    }
    if (moment(objectionStart).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextObjectionStart: 'emptyField2' });
      goNext = false;
    }
    if (moment(objectionEnd).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextObjectionEnd: 'emptyField2' });
      goNext = false;
    }
    if (moment(paymentStart).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextPaymentStart: 'emptyField2' });
      goNext = false;
    }
    if (moment(paymentEnd).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextPaymentEnd: 'emptyField2' });
      goNext = false;
    }
    if (moment(approvalStart).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextApprovalStart: 'emptyField2' });
      goNext = false;
    }
    if (moment(approvalEnd).isBefore(TodayFormated) && CallElectionData.status !== 'APPROVE') {
      this.setState({ errorTextApprovalEnd: 'emptyField2' });
      goNext = false;
    }

    if (this.state.activeStep === 1) {
      if (CallElectionData.rowData.length === 0) {
        this.setState({ errorTextElectorates: 'emptyField' });
        goNext = false;
      }
    }

    if (goNext) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }

    if (activeStep === 1) {
      setElectionTimeLine(this.state);
    }
    if (this.state.activeStep === 0) {

    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleSubmit = () => {
    const { postCallElectionData, CallElectionData, electionData, openSnackbar } = this.props;
    postCallElectionData(CallElectionData, electionData);
    this.setState({
      goToHome: true
    });
  };
  handleDone = () => {
    this.setState({
      goToHome: true
    });
  };
  handleUpdate = () => {
    const { editCallElectionData, CallElectionData, electionData, openSnackbar, electionId } = this.props;
    editCallElectionData(CallElectionData, electionId);
    this.setState({
      goToHome: true
    });
  };
  handleDelete = () => {
    const { deleteCallElectionData, CallElectionData, openSnackbar, electionId } = this.props;
    deleteCallElectionData(electionId, CallElectionData.name);
    this.setState({
      goToHome: true
    });
  };

  handleChange = (input) => e => {
    const { handleChangeElectionData } = this.props;
    const newElectionModule = { ...this.props.CallElectionData };
    const name = input;
    const value = e.target.value;
    if ("nominationStart" == name) {
      newElectionModule.timeLineData["nominationStart"] = Date.parse(value)
      this.setState({ errorTextNominationStart: '' });
    }
    if ("nominationEnd" == name) {
      newElectionModule.timeLineData["nominationEnd"] = Date.parse(value)
      this.setState({ errorTextNominationEnd: '' });
    }
    if ("objectionStart" == name) {
      newElectionModule.timeLineData["objectionStart"] = Date.parse(value)
      this.setState({ errorTextObjectionStart: '' });
    }
    if ("objectionEnd" == name) {
      newElectionModule.timeLineData["objectionEnd"] = Date.parse(value)
      this.setState({ errorTextObjectionEnd: '' });
    }
    if ("paymentStart" == name) {
      newElectionModule.timeLineData["paymentStart"] = Date.parse(value)
      this.setState({ errorTextPaymentStart: '' });
    }
    if ("paymentEnd" == name) {
      newElectionModule.timeLineData["paymentEnd"] = Date.parse(value)
      this.setState({ errorTextPaymentEnd: '' });
    }
    if ("approvalStart" == name) {
      newElectionModule.timeLineData["approvalStart"] = Date.parse(value)
      this.setState({ errorTextApprovalStart: '' });
    }
    if ("approvalEnd" == name) {
      newElectionModule.timeLineData["approvalEnd"] = Date.parse(value)
      this.setState({ errorTextApprovalEnd: '' });
    }
    this.setState({ errorTextElectorates: '' });
    handleChangeElectionData(newElectionModule)
  };
  onOpenModal = () => {
    this.setState({ open: true });

  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getStepContent(step, values) {
    const { CallElectionData } = this.props;
    const { errorTextNominationStart, errorTextNominationEnd, errorTextObjectionStart, errorTextObjectionEnd, errorTextPaymentStart, errorTextPaymentEnd, errorTextApprovalStart, errorTextApprovalEnd } = this.state;
    const errorTextItems = { errorTextNominationStart, errorTextNominationEnd, errorTextObjectionStart, errorTextObjectionEnd, errorTextPaymentStart, errorTextPaymentEnd, errorTextApprovalStart, errorTextApprovalEnd }

    switch (step) {
      case 0:
        return <ElectionTimeLine
          handleChange={this.handleChange}
          values={values}
          CallElectionData={CallElectionData}
          errorTextItems={errorTextItems}
        />;
      case 1:
        return <AllowNomination
          handleChange={this.handleChange}
          values={values}
          CallElectionData={CallElectionData}
          errorTextElectorates={this.state.errorTextElectorates}
        />;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { nominationStart, nominationEnd, objectionStart, objectionEnd, paymentStart, paymentEnd, approvalStart, approvalEnd, depositAmount, WeightageVote, WeightagePrefarence, columnHeaders } = this.state;
    const values = { nominationStart, nominationEnd, objectionStart, objectionEnd, paymentStart, paymentEnd, approvalStart, approvalEnd, depositAmount, WeightageVote, WeightagePrefarence, columnHeaders }

    return (
      <div className={classes.root}>
        {this.state.goToHome ? (
          <Redirect to="/admin/call-election" />
        ) : (
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{this.getStepContent(activeStep, values)}</Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                      </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          )}
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps have been completed</Typography>
            <Grid container classname={classes.panel_wrapper} spacing={16}>
              <Grid item xs="1">
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
            </Button>
              </Grid>
              {((this.props.electionId) && this.props.check !== 'approve' && this.props.check !== 'reject') ?
                <Grid item xs="2">
                  <Button color="primary" onClick={this.handleUpdate} className={classes.button}>
                    Update
            </Button>
                  <Button color="secondary" onClick={this.onOpenModal} className={classes.button}>
                    Delete
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                </Grid>
                : (this.props.check === 'approve') ?
                  <Grid item xs="1">
                    <Button style={{ marginLeft: -50 }} color="primary" onClick={this.handleDone} className={classes.button}>
                      Done
            </Button>
                  </Grid>
                  : (this.props.check === 'reject') ?
                    <Grid item xs="1">
                      <Button style={{ marginLeft: -50 }} color="primary" onClick={this.handleUpdate} className={classes.button}>
                        Update
            </Button>
                    </Grid>
                    :
                    <Grid item xs="2">
                      <Button color="primary" onClick={this.handleSubmit} className={classes.button}>
                        Submit for approval
            </Button>
                    </Grid>
              }
            </Grid>
          </Paper>
        )}
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
              Are You Sure You Want to Delete This Election ?
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
      </div>

    );
  }
}

ActiveElectionForm.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = ({ Election }) => {

  const { setCallElectionData, postCallElectionData, openSnackbar } = Election;
  const CallElectionData = Election.CallElectionData;
  const electionData = Election.electionData;
  const getCallElectionData = Election.getCallElectionData;

  return { setCallElectionData, CallElectionData, electionData, postCallElectionData, openSnackbar, getCallElectionData }
};

const mapActionsToProps = {
  setCallElectionData,
  postCallElectionData,
  openSnackbar,
  getCallElectionData,
  handleChangeElectionData,
  editCallElectionData,
  deleteCallElectionData,
  getFieldOptions,
  getTeams
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ActiveElectionForm));

