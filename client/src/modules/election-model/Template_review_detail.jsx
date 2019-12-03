import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import {APPROVAL_STATE} from  './state/ElectionTypes';
import { getElectionTemplateData,  onChangeApproval,getFieldOptions} from "./state/ElectionAction.js";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';//--
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Done from '@material-ui/icons/Done';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Remark from '@material-ui/icons/Create';
import IconButton from "@material-ui/core/IconButton";
import Slide from '@material-ui/core/Slide';
import classNames from 'classnames';
import CommentIcon from '@material-ui/icons/InsertComment';
import Block from '@material-ui/icons/Block';
import CandidateFormApproval from './CandidateFormApproval';
import DivisionConfigForApproval from './DivisionConfigForApproval';
import ElectionConfigApproval from './ElectionConfigApproval';
import { Redirect } from 'react-router-dom'


const drawerWidth = 240;



const styles = theme => ({
    root: {
        display: 'flex',
        margin: 20
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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
    left_icon: {
        marginLeft: theme.spacing.unit,
      },
      button: {
        margin: theme.spacing.unit,
      },
      green_button: {
        color: "darkgreen",
      },
      red_button: {
        color: "firebrick",
      },
});

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
class Dashboard extends React.Component {
    state = {
        open: false,
        open2: false,
        nominations: [],
        activeElections:[],
        goToConfig: false,
        moduleId:'',
        status:'',
        reviewNote:'',
        candidateConfigs:[],
        candidateSupportingDocs:[],
        nominationSupportingDocs: [],
        objectionSupportingDocs: [],
        paymentSupportingDocs: []
    };


    componentDidMount(){
        getFieldOptions().then((data) => {
            this.setState(data);
        })
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    changeElectionStatus = () => {
        const {onChangeApproval,ElectionTemplateReviewData} = this.props;
        onChangeApproval(this.state.moduleId, this.state.status, this.state.reviewNote,ElectionTemplateReviewData.name);
        this.setState({goToConfig:true});
      };

    onOpenModal = (moduleId, status) => {
        
        this.setState({
          open: true,
          moduleId: moduleId,
          status: status,
          reviewNote:''
        });
      };

      onCloseModal = () => {
        this.setState({ open: false });
      };

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      onOpenModal2 = (moduleId, status) => {
        const {ElectionTemplateReviewData} = this.props;
        
        this.setState({
          open2: true,
          moduleId: moduleId,
          status: status,
          reviewNote: ElectionTemplateReviewData.reviewNote
        });
      };
      onCloseModal2 = () => {
        this.setState({ open2: false });
      };
    render() {
        const { classes,ElectionTemplateReviewData } = this.props;
        debugger;
        var Authjority = ' ';
        var CalculationType = ' ';
        var WeightageVote = ' ';
        var WeightagePref = ' ';
        var NominationSubmissionBy = '';
        var CandidatePayment = '';

        (ElectionTemplateReviewData.electionConfig ? ElectionTemplateReviewData.electionConfig.map((record) => {
        if(record.key=="2353453"){
            Authjority = record.value
        }
        if(record.key=="15990459-2ea4-413f-b1f7-29a138fd7a97"){
            CalculationType = record.value
        }
        if(record.key=="324324"){
            WeightageVote = record.value
        }
        if(record.key=="234433"){
            WeightagePref = record.value
        }
        if(record.key=="1243123"){
            NominationSubmissionBy = record.value
        }
        if(record.key=="123213"){
            CandidatePayment = record.value
        }
        
        
         
           
    }): 
        setEmpty()
    );
    function setEmpty(string) {
            return {};
          }

            const formConfigElement = (  <div>
                <CandidateFormApproval
                    electionModule={ElectionTemplateReviewData}
                    // candidateConfigs={ElectionTemplateReviewData.candidateFormConfiguration}
                    // candidateSupportingDocs={ElectionTemplateReviewData.supportingDocuments}
                    candidateConfigs={this.state.candidateConfigs}
                    candidateSupportingDocs={this.state.candidateSupportingDocs}
                    nominationSupportingDocs={this.state.nominationSupportingDocs}
                    objectionSupportingDocs={this.state.objectionSupportingDocs}
                    paymentSupportingDocs={this.state.paymentSupportingDocs}
                /></div>);

            const divisionConfigElement = (  <div>
                <DivisionConfigForApproval
                electionModule={ElectionTemplateReviewData}
                // electionChanged={this.handleElectionChange}
                errorTextDivisionCommonName={this.state.errorTextDivisionCommonName}
                errorTextDivisionConfig={this.state.errorTextDivisionConfig}
            /></div>);

            const ElectionConfigElement = (  <div>
                <ElectionConfigApproval
                electionModule={ElectionTemplateReviewData}
                // electionChanged={this.handleElectionChange}
                errorTextDivisionCommonName={this.state.errorTextDivisionCommonName}
                errorTextDivisionConfig={this.state.errorTextDivisionConfig}
            /></div>);
               

            var check = this.props.location.state.check;
            if (this.state.goToConfig) return <Redirect
            to={{
            pathname: '/admin/template-review'
            }}
            />;
        
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <div style={{ width: '100%' }}>
                    <Typography variant="h5" component="h2">{ElectionTemplateReviewData.name}</Typography>
                    <br />
                    <div className={classes.container}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={3}>
                                        {/* <Typography className={classes.text_a} component="p">Election Type: {ElectionTemplateReviewData.moduleName}</Typography> */}
                                    </Grid>
                                </Grid>
                                 {formConfigElement}
                                
                                
                                <br />
                                <hr />
                                <br />
                                <Typography variant="h6">
                                    Division Configuration
                                </Typography>
                                <br />
                                {divisionConfigElement}
                                
                                <br />
                                <br />
                                <hr />
                                <Typography variant="h6">
                                    Electioin Configuration
                                </Typography>
                                <br />
                                <br />
                                <br />
                                <Grid container spacing={24}>
                                    {ElectionConfigElement}
                                </Grid>
                                <br />
                                    
                                    {(check==='test') ? 
                                    <Grid item xs={4} sm={1}>
                                    <Link to="/admin/template-review" >
                                        <Button size="medium">Back</Button>
                                    </Link>
                                </Grid>
                                    : (
                                        <div>
                                <Grid container spacing={24}>
                                             <Grid item xs={4} sm={1}>
                                    <Link to="/admin/template-review" >
                                        <Button size="medium">Back</Button>
                                    </Link>
                                </Grid>
                                    <Grid style={{marginRight:15}} item xs={4} sm={1}>
                                    <Button 
                                        variant={ ElectionTemplateReviewData.approval_status==="APPROVE" ? "contained" : "outlined" }
                                        disabled={ ElectionTemplateReviewData.approval_status==="APPROVE" }
                                        // onClick={ () => { this.changeElectionStatus(ElectionTemplateReviewData.id, APPROVAL_STATE.APPROVE ) }}
                                        onClick={() => { this.onOpenModal(ElectionTemplateReviewData.id, APPROVAL_STATE.APPROVE) }}
                                        className={classNames(classes.button, classes.green_button)}>
                                        {ElectionTemplateReviewData.approval_status==="APPROVE" ? "Approved" : "Approve"}
                                        <Done className={classes.left_icon} />
                                    </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={1}>
                                    <Button
                                        variant={ ElectionTemplateReviewData.approval_status==="REJECT" ? "contained" : "outlined" }
                                        disabled={ ElectionTemplateReviewData.approval_status==="REJECT" }
                                        // onClick={ () => { this.changeElectionStatus(ElectionTemplateReviewData.id, APPROVAL_STATE.REJECT ) }}
                                        onClick={() => { this.onOpenModal(ElectionTemplateReviewData.id, APPROVAL_STATE.REJECT) }}
                                        className={classNames(classes.button, classes.red_button)}>
                                        {ElectionTemplateReviewData.approval_status==="REJECT" ? "Rejected" : "Reject"}
                                        <Block className={classes.left_icon} />
                                    </Button>
                                    </Grid>
                                    <Grid item xs="3">
                                    <CommentIcon style={{marginRight:10,marginTop:8,marginLeft:30}} onClick={() => { this.onOpenModal2(ElectionTemplateReviewData.id, APPROVAL_STATE.APPROVED) }} className={classes.left_icon} />
                                </Grid>
                                </Grid>
                                   </div> )}
                            </CardContent>
                        </Card>

                    </div>
                </div>
                <div>
            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
             
              <DialogTitle id="alert-dialog-slide-title">
              <Remark style={{marginBottom:-4,marginRight:5}} /> {"Remarks"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <TextField
                    style={{ width: 400 }}
                    id="outlined-multiline-flexible"
                    label="Please enter your remarks here"
                    multiline
                    rowsMax="4"
                    value={this.state.reviewNote}
                    onChange={this.handleChange('reviewNote')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button value="OK" onClick={this.changeElectionStatus} color="primary">
                  Save
            </Button>
                <Button onClick={this.onCloseModal} color="primary">
                  Cancel
            </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.open2}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
             
              <DialogTitle id="alert-dialog-slide-title">
              <Remark style={{marginBottom:-4,marginRight:5}} /> {"Remarks"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <TextField
                    style={{ width: 400 }}
                    id="outlined-multiline-flexible"
                    label=""
                    multiline
                    rowsMax="4"
                    value={this.state.reviewNote}
                    // onChange={this.handleChange('reviewNote')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* <Button value="OK" onClick={this.changeNominationStatus} color="primary">
                  Save
            </Button> */}
                <Button onClick={this.onCloseModal2} color="primary">
                  Cancel
            </Button>
              </DialogActions>
            </Dialog>
          </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ ElectionModel }) => {
    const { getElectionTemplateData } = ElectionModel;
    const  ElectionTemplateReviewData  = ElectionModel.new_election_module;
    return { getElectionTemplateData ,ElectionTemplateReviewData}
};

const mapActionsToProps = {
    getElectionTemplateData,
    onChangeApproval,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));




