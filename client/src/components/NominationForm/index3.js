import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../AdminMenu/AdminMenu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import CandidateForm from './CandidateForm';
// import DivisionConfig from './DivisionConfig';
// import ElectionConfig from './ElectionConfig';

import NominationStep1 from '../NominationStep1/NominationStep1';
import NominationStep2 from '../NominationStep2';
import NominationStep3 from '../NominationStep3/NominationStep3';
import { postNominationPayments } from '../../modules/nomination/state/NominationAction';


const styles = theme => ({
    root: {
        padding: 24,
        paddingLeft: 26,
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
    paperContent:{
        padding: 24,
    }
});

function getSteps() {
  return ['Candidate Details', 'Payment Details', 'Review'];
}



class NominationForm extends React.Component {
    // state = {
    //     activeStep: 0,
    //     skipped: new Set(),
    // };
    constructor(props) {
      super(props)
  
      this.state = {
        activeStep: 0,
        completed: {},
        props:'',
        language:'',
          depositor:'',
          depositAmount:'',
          depositeDate:'12345',
          filePath:'upload',
          status:'PENDING',
          skipped: new Set(),
          nominationId:this.props.customProps,
      
      }
    }

    handleChange = (name) => event => {
        this.setState({
                [name]:event.target.value,
        });   
      };

    getStepContent(step){
        const { nominationPayments, customProps } = this.props;
      
          switch (step) {
              case 0:
                  return <NominationStep1 customProps={customProps}/>;
              case 1:
                  return <NominationStep2 nominationPayments={nominationPayments} handleChange={this.handleChange} />;
              case 2:
                  return <NominationStep3 />;
              default:
                  return 'Unknown step';
          }
      }

    isStepOptional = step => step === 1;

    handleNext = () => {
      const {postNominationPayments}=this.props;
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
        if (activeStep === 2){
          postNominationPayments(this.state);   
      }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3">
                            -- Election Configuration Wizard
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {activeStep === steps.length ? (
                                <Redirect to="/admin/home" />
                            ) : (
                                    <Paper className={classes.pageContent} elevation={1}>
                                        <Stepper activeStep={activeStep}>
                                            {steps.map((label, index) => {
                                                const props = {};
                                                const labelProps = {};
                                                if (this.isStepSkipped(index)) {
                                                    props.completed = false;
                                                }
                                                return (
                                                    <Step key={label} {...props}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                        <Grid className={classes.paperContent} container spacing={24}>
                                            <Grid item xs={12}>
                                            {this.getStepContent(activeStep,this.props)}
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
                                            <Button
                                                variant="contained"
                                                color="default"
                                                onClick={this.handleSave}
                                                className={classes.button}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                            </Button>
                                        </div>
                                    </Paper>
                                )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

NominationForm.propTypes = {
  classes: PropTypes.object,
};


const mapStateToProps = ({Nomination}) => {
  const {nominationPayments} = Nomination;
  return {nominationPayments};
};

const mapActionsToProps = {
  postNominationPayments 
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationForm));