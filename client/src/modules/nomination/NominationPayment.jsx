import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import InfoBanner from '../../components/InfoBanner/InfoBanner';
import NominationPanel from '../../components/Nomination/NominationList';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ObjectionPanel from '../../components/Objection/SubmittedObjectionList';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import NominationStep2 from '../../components/NominationStep2';
import NominationPaymentList from './NominationPaymentList';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from "@material-ui/core/IconButton";
import {getNominationPaymentSerialNumber,getApproveElections,getNominationData } from './state/NominationAction';
import { connect } from 'react-redux';


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
    // root: {
    //     paddingLeft: 6,
    //     paddingRight:10
    // }
    root: {
        width: '90%',
        padding: 24,
        paddingLeft: 26,
      },
      button: {
        margin: 1,
      },
});


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
  
class Home extends React.Component {

    state = {
        open: false,
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
        this.props.getApproveElections();
    }

    onOpenModal = () => {
        this.props.getNominationPaymentSerialNumber();
        this.props.getNominationData('','');
        this.setState({ open: true });
      
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };
    render() {
        const { classes,serialNo,approveElections } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka" ></AdminMenu>

                <div className={classes.content}>
                    {/* all the content should go here.. */}

                    {/* <InfoBanner election={this.state.election}></InfoBanner> */}
                    {/* <div className={classes.root}> */}
                        <Grid  container spacing={24}>
                            <Typography component="h2" variant="headline" gutterBottom style={{marginLeft:5}}>
                                 Nomination Security Deposit
                            </Typography>
                            <Divider variant="middle" className={classes.topBottomSpace} />

                        </Grid>
                        <Grid container spacing={24}>
                            <Button style={{margin:30,marginLeft:13}}  onClick={this.onOpenModal} variant="outlined" color="primary" className={classes.button}>
                                Add New Security Deposit
                            </Button>                               
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid container item xs={12}  direction="column">  
                                <NominationPaymentList></NominationPaymentList>
                            </Grid>
                        </Grid>
                    {/* </div> */}
                    <Grid  container spacing={24}>
                    
                    <Dialog
                        onClose={this.onCloseModal}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.open}
                        fullWidth={true}
                        maxWidth="lg"
                    >
                    <DialogTitle id="customized-dialog-title" onClose={this.onCloseModal}>
                        Add Payment
                    </DialogTitle>
                    <Grid container item xs={12} direction="column">
                    <DialogContent>
                        <NominationStep2 approveElections={approveElections} serialNo={serialNo} onCloseModal={this.onCloseModal} />
                    </DialogContent>
                    </Grid>
                    {/* <DialogActions>
                    
                        <Button onClick={this.onCloseModal} color="primary">
                        Cancel
                        </Button>
                        <Button variant="contained" type="submit" value="Submit&New" color="primary" className={classes.submit}>
                        Save & New
                        </Button>
                        <Button  variant="contained" onClick={this.onCloseModal} type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                        Save & Close
                        </Button>
                    </DialogActions> */}
                    </Dialog>
                    </Grid>
                </div>


            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(Home);


const mapStateToProps = ({  Nomination }) => {
    const serialNo = Nomination.nominationPaymentSerial;
    const approveElections = Nomination.approveElections;
    return { serialNo,approveElections };
};

const mapActionsToProps = {
    getNominationPaymentSerialNumber,
    getApproveElections,
    getNominationData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));
