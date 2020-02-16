import React from 'react';
import PropTypes, { array } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NominationStep1 from '../NominationStep1/NominationStep1';
import NominationStep3 from '../NominationStep3/NominationStep3';
import NominationStep5 from '../NominationStep5/NominationStep2';
import { postNominationSupportDocs,updateNominationStatus,getTeams,getUploadPath } from '../../modules/nomination/state/NominationAction';
import { openSnackbar } from '../../modules/election/state/ElectionAction';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DoneOutline from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Cancel';
import { Redirect } from 'react-router-dom';
import {API_BASE_URL} from "../../config.js";
import axios from "axios";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop:10,
    padding: 24,
    paddingLeft: 0,
    paddingRight: 0,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
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
  paddingLeft: 0,
  paddingRight: 0,
},
done: {
  textAlign: 'right',
  paddingRight: 8,
},
});




class NominationForm extends React.Component {
 
  constructor(props) {
    super(props)
    const { allowedTypes, allowedSize, multiple } = props;

    this.state = {
      activeStep: 0,
      completed: {},
      saveDraft:false,
      props:'',
      language:'',
      depositor:'',
      depositAmount:'',
      amount:'',
      depositeDate:'',  
      filePath:'upload',
      status:'PENDING',
      nominationId:this.props.customProps,
      payments:[],
      allowedTypes,
      allowedSize,
      multiple,
      status: "ready",
      filename:'',
      supportDocId:'3',
      supportdoc:[],
      currentSdocId:'',
      goToHome: false,
      election:{},
      errorTextDepositor:'',
      errorTextDepositedDate:'',
    }    
  }

   getSteps() {
      return ['Candidate Details', 'Nomination Supporting Documents', 'Review'];
  }

  componentDidMount(){
    
    axios.get(`elections/${sessionStorage.getItem('election_id')}`)
    .then(res => {
        const election = res.data;
        this.setState({ election });
    });
  
  }

  onSelectFiles = evt => {
   
    evt.preventDefault();
    evt.stopPropagation();

    var array = [...this.state.supportdoc];
    var index = array.map(
      function(item){
        return item.id
      }
    ).indexOf(evt.target.id);
    var count=2;
    if(evt.target.id==='b20dd58c-e5bb-469d-98c9-8711d6da1879'){
      array.map(item =>(
        item.id==='b20dd58c-e5bb-469d-98c9-8711d6da1879' ? count++ : count
      )
      )
    }
    if(evt.target.id==='b20dd58c-e5bb-469d-98c9-8711d6da1879'){
      if(index !== -1 && count=== 4){
        array.splice(index,1)
      }
    }else{
      if(index !== -1){
        array.splice(index,1)
      }
    }
    

    this.setState({
      status: evt.type,
      supportdoc:array,
      supportDocId: evt.target.id
    });

    // Fetch files
    const { files } = evt.target;
    this.uploadFiles(files);
  };
  uploadFiles = files => {
    let error = false;
    const errorMessages = [];

    const data = {
      error: null,
      files
    }; 

    const { allowedTypes, allowedSize } = this.state;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        // Validate file type
        if (allowedTypes && allowedTypes.length > 0) {
          if (!allowedTypes.includes(file.type)) {
            error = true;
            errorMessages.push("Invalid file type(s)");
          }
        }

        // Validate fileSize
        if (allowedSize && allowedSize > 0) {
          if (file.size / 1048576 > allowedSize) {
            error = true;
            errorMessages.push("Invalid file size(s)");
          }
        }
      }
    }

    if (error) {
      data.error = errorMessages;
      data.files = null;
      this.reset();
    } else {
      const formData = new FormData();
      this.setState({status: "uploading", progress: 0});
      formData.append("file", data.files[0]);
      axios.post(`${API_BASE_URL}/file-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },

        onUploadProgress: (progressEvent) => {
          let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
          this.setState(
            {progress: percentCompleted}
          );
          console.log(percentCompleted);
        }


      }).then((response) => {

       
      
        const obj = {'id':this.state.supportDocId, 'filename':response.data.filename, 'originalname':response.data.originalname};
        
        const newArray = this.state.supportdoc.slice(); // Create a copy
        newArray.push(obj); // Push the object
        this.setState(
          {
            status: "uploaded",
            currentSdocId: response.data.originalname,
            supportdoc: newArray
          }
        );
      });
    }
  };

  componentDidMount (){
      const { customProps } = this.props;
      axios.get(`${API_BASE_URL}/nominations/${customProps}/support-docs`)
        .then(res => {
          const supportdocs = res.data;
          const supportdoc = supportdocs.map(sdoc => {
            return{
            id : sdoc.supportDocConfId,
            filename : sdoc.filePath,
            originalname : sdoc.originalName
           } });
          this.setState({ supportdoc:supportdoc });
        })
        
  }
  componentWillMount(){
    const {getTeams} = this.props;
    getTeams();
  }
 
   showFlagToStyle = (flag) => (
    {display: flag ? "" : "none"}
  );

  getStepContent(step,props) {
    const { classes } = this.props;

    const doneElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
    <DoneOutline  color="secondary"/>
    {/* <a download={"filename"} href={"ok"}>filename</a> */}
    </div>);
      const closeElement = (<div  className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
      <CloseIcon ref={this.state.currentSdocId}  color="red"/>
      {/* <a download={"filename"} href={"ok"}>filename</a> */}
      </div>);
    const supportingDocs = [{
      "id": "31232",
      "doc": "Scan of Security Deposit Payment Slip",
    }, {
      "id": "b20dd58c-e5bb-469d-98c9-8711d6da1879",
      "doc": "Completed & Signed Nomination Form",
    }, {
      "id": "3fac66f2-302c-4d27-b9ae-1d004037a9ba",
      "doc": "Declaration of Female Representation",
    }
  ];
    const { customProps,division,candidateCount,NominationCandidates,partyList } = this.props;

      switch (step) {
        case 0:
          return <NominationStep1 customProps={customProps}/>;
        case 1:
          return <NominationStep3 handleUploadView={this.handleUploadView} partyList={partyList} NominationCandidates={NominationCandidates} supportingDocs={supportingDocs} customProps={customProps} supportdoc={this.state.supportdoc} closeElement={closeElement} doneElement={doneElement} onSelectFiles={this.onSelectFiles}  />;
        case 2:
        return <NominationStep5 supportingDocs={supportingDocs} supportdoc={this.state.supportdoc} division={division} candidateCount={candidateCount} NominationPayments={this.state} />;
        default:
          return 'Unknown step';
      }   
  }

  
  totalSteps = () => {
    return this.getSteps().length;
  };
  

  handleNext = () => {
    const {divisionId,openSnackbar,postNominationSupportDocs,candidateCount,NominationCandidates,updateNominationStatus}=this.props;
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
    if (activeStep === 2){
      postNominationSupportDocs(this.state,divisionId,"next");   
    }
    if (activeStep === 0 ){
       if(candidateCount>NominationCandidates.length){
         openSnackbar({ message: 'Please complete the nomination form for all candidates before submission' });
        }else if(candidateCount<NominationCandidates.length){
          openSnackbar({ message: 'You have been exceeded the maximum no of candidates for this nomination. Plese recheck candidate list' });
        }
        else{
            updateNominationStatus(this.state,divisionId);
            this.setState({
              goToHome: true
          });
       }
  }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  handleUploadView = sid => () => {
    this.props.getUploadPath(sid);
  };


  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleSaveDraft = () => {
    const {divisionId,openSnackbar,postNominationSupportDocs}=this.props;
    postNominationSupportDocs(this.state,divisionId,"draft");   
  };
  
  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes,division } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div className={classes.root}>
      {this.state.goToHome ? (
                                <Redirect to="/create-nomination" />
                            ) : (
       <div>
         <Typography component="h2" variant="headline" gutterBottom style={{marginLeft:5}}>
             {/* {this.state.election.name} */}
        </Typography>
        {/* <Typography  variant="subheading" gutterBottom style={{marginBottom:25,marginLeft:5}}>
          {division+" Unit"}
        </Typography> */}
      <Paper className={classes.pageContent} elevation={1}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Grid className={classes.paperContent} container spacing={24}>
                                            <Grid item xs={12}>
                                                {/* {getStepContent(activeStep)} */}
                                                {this.getStepContent(activeStep,this.props)}
                                            </Grid>
                                        </Grid>
              {/* <Typography className={classes.instructions}>{this.getStepContent(activeStep,this.props)}</Typography> */}
              
              
                
                <Grid className={classes.paperContent} container spacing={24}>
                {(activeStep === 0) ?
                <Grid item xs={12}>
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
                  Next
                </Button></Grid> : (activeStep === 1) ?
                
                  <Grid item xs={12}>
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
                  onClick={this.handleSaveDraft}
                  className={classes.button}
                >
                  Save Draft
                  </Button>
                  {/* </Grid>
                  <Grid item xs={12}> */}
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button></Grid>: ''
                }
              
                    {activeStep === 2 ? 
                    <Grid item xs={12}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      Submit For Approval
                    </Button></Grid> : ' '
                    }
                  
                   {/* {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))} */}
              </Grid>
            </div>
          )}
        </div>
        </Paper>
        </div>
         )}
      </div>
    );
  }
}

NominationForm.propTypes = {
  classes: PropTypes.object,
};


const mapStateToProps = ({Nomination,Election}) => {
  const NominationCandidates = Nomination.getNominationCandidates;
  const partyList = Nomination.partyList;
  const {postNominationSupportDocs} = Nomination;
  const {openSnackbar} = Election;

  
  
  return {postNominationSupportDocs,NominationCandidates,openSnackbar,partyList};
};

const mapActionsToProps = {
  postNominationSupportDocs,
  openSnackbar,
  updateNominationStatus,
  getTeams,
  getUploadPath
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationForm));


