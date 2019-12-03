import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import {loadPayments, togglePayment,SavePaymentNote,onChangePaymentNotes} from './state/PaymentAction'
import {loadElections} from '../election/state/ElectionAction'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import MultiPerson from '@material-ui/icons/SupervisedUserCircle';
import MoneyIcon from '@material-ui/icons/Payment';
import CloudIcon from '@material-ui/icons/CloudDownload';
import Security from '@material-ui/icons/Security';
import {REQUEST_STATE} from "../../lib/request_redux_state";
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        padding: 24,
        paddingLeft: 264,
    },
    heading: {
        padding: 18,
    },
    dropDown: {
        paddingBottom: 10,
        paddingTop: 24,
        width: 250
    },
    container: {
        // padding: 10
    },
    loadingPanel: {
        height: 94,
        paddingTop: 28
    },
    panel_wrapper: {
        "min-width": 100,
      },
    notes: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
      },
    green_button: {
        color: "darkgreen",
      },
});

class PaymentReview extends React.Component {
    state = {
        open: true,
        expandedPanelIndex: -1,
        note:'',
        payment_id:'',
        payments:[]
    };


    componentDidMount() {
        const {loadElections} = this.props;
        loadElections();
    }

    togglePanel = panelIndex => (event, didExpand) => {
        this.setState({
            expandedPanelIndex: didExpand ? panelIndex : -1,
        });
    };

    findIndex = (payments, id) => {
        return payments.findIndex(x => x.id === id);
      };
      
    findApprovalIndex(id) {
        const {payments} = this.props;
        return payments.findIndex(x => x.payment_id === id);
      }

    handlePaymentToggle = paymentId => event => {
        const {togglePayment,payments} = this.props;
        const index = this.findApprovalIndex(paymentId);
        if(index!==-1){
        var team_name=payments[index].team_name;
        var division_name=payments[index].division_name;
        var payment_status=payments[index].payment_status;
        }
        togglePayment(payment_status,team_name,division_name,(payments[index].payment_status==="PENDING") ? 'APPROVE' : 'PENDING', paymentId);
    };

    handleChangeElection = event => {
        this.selectElection(event.target.value);
    };

    selectElection = (selectedElection) => {
        this.setState({selectedElection});
        const {loadPayments,payments} = this.props;
        loadPayments(selectedElection);
        this.setState(payments);
    };

    componentWillReceiveProps(nextProps) {
        const elections = nextProps.elections;
        if (this.props.elections !== elections) {
            if (!this.state.selectedElection && elections.length > 0) { // TODO : add || find(selected, elections) < 0
                this.selectElection(elections[0].id);
            }
        }
    }

    handleNoteChange = (id, event) => {
        this.setState({
            note:event.target.value,
            payment_id:id
        });
        const {onChangePaymentNotes} = this.props;
        onChangePaymentNotes(id, event.target.value);
      };
     

    saveNote = () => {
        const {SavePaymentNote,payments} = this.props;
        const index = this.findApprovalIndex(this.state.payment_id);
       
        if(index!==-1){
        var team_name=payments[index].team_name;
        var division_name=payments[index].division_name;
        }
        SavePaymentNote(team_name,division_name,this.state.payment_id, this.state.note);

        this.setState({
            note:payments.note
        });
      };

    static blockPropagation(event) {
        event.stopPropagation();
    };


    render() {
        const {classes, payments, electionsLoading, elections, paymentState} = this.props;
        const {expandedPanelIndex} = this.state;
        let selectedElection = this.state.selectedElection;
        // const selectedPayment = payments[selectedElection];
        // console.log(this.state.payments);
        const selectedPayments = payments;



        const menuItems = elections.map(election => (
            <MenuItem key={election.id} value={election.id}>{election.name}</MenuItem>));

        let paymentLoadingElement = null;
        paymentLoadingElement = (<div>
            {paymentState === REQUEST_STATE.LOADING ? <LinearProgress/> : <div style={{height: 4}}></div>}
            {/* {payments.length === 0 &&
            <Paper className={classes.loadingPanel}/>
            } */}
        </div>);


        const paymentElements = (selectedPayments) ? selectedPayments.map((payment, i) => (
            <ExpansionPanel key={payment.payment_id!==undefined} expanded={expandedPanelIndex === i} onChange={this.togglePanel(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Grid container classname={classes.panel_wrapper} spacing={16}>
                    <Grid  item xs="4">
                        <Typography className={classes.heading}>{payment.team_name} - {payment.division_name} Division</Typography>
                    </Grid>
                    <Grid item xs="4">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={payment.payment_status === "APPROVE"}
                                    onChange={this.handlePaymentToggle(payment.payment_id)}
                                    color="primary"
                                />
                            }
                            label="Received"
                            onClick={PaymentReview.blockPropagation}
                        />
                    
                    </Grid>
                </Grid>
                    {/*<Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>*/}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <Grid container classname={classes.panel_wrapper} spacing={16}>
                <Grid item xs="8">    
                    <List component="nav">
                        <ListItem>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={payment.depositor} secondary="Name of Depositor"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MoneyIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Rs "+payment.candidate_payment} secondary="Security Deposit Amount Per Candidate"/>
                            <ListItemIcon>
                                <MultiPerson/>
                            </ListItemIcon>
                            <ListItemText primary={payment.no_of_candidate} secondary="No Of Candidates"/>
                            <ListItemIcon>
                                <MoneyIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Rs "+payment.deposit_amount} secondary="Security Deposit Amount"/>
                        </ListItem>
                        {/* <ListItem>
                            <ListItemIcon>
                                <Security/>
                            </ListItemIcon> */}
                            {/* <ListItemText primary={payment.deposit_id} secondary="Security Deposit ID"/> */}
                        {/* </ListItem> */}
                        <ListItem>
                            <ListItemIcon>
                                <DateRangeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={moment(payment.deposit_date).format("DD MMM YYYY hh:mm a")} secondary="Date of Deposit"/>
                            <ListItemIcon>
                            <Tooltip title="Download Attachment" aria-label="Download Attachment">
                                <CloudIcon style={{marginRight:525}}color="primary"/>
                            </Tooltip>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs="6">  
                <TextField
                id="outlined-textarea"
                label="Comments"
                rows="4"
                rowsMax="14"
                value={payment.note}
                onChange={this.handleNoteChange.bind(this, payment.payment_id)}
                placeholder="Add your comments here"
                multiline
                className={classes.notes}
                margin="normal"
                variant="outlined"
              />
              <Typography className={classes.buttonGroup}>
                <Button className={classNames(classes.button, classes.objection_notes_btn, classes.green_button)}
                                                 onClick={ () => { this.saveNote(); }} >
                  <Done className={classes.left_icon} /> Save 
                </Button>
              </Typography>
                </Grid>
                </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )):'';

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <Typography variant="h5" component="h2">
                    Payment review
                </Typography>

                <div className={classes.container}>

                    <form autoComplete="off">
                        <FormControl className={classes.dropDown}>
                            <InputLabel htmlFor="election-select">Election</InputLabel>

                            <Select
                                value={selectedElection}
                                onChange={this.handleChangeElection}
                                inputProps={{
                                    name: 'election',
                                    id: 'election-select',
                                }}
                            >
                                {menuItems}
                            </Select>
                            {electionsLoading ? <LinearProgress/> : <div style={{height: 4}}></div>}
                        </FormControl>
                    </form>

                    <br/>
                    <br/>

                    <div style={{width: '100%'}}>
                        {paymentLoadingElement}
                        {paymentElements}
                    </div>


                    <br/>

                </div>


            </div>
        );
    }
}

PaymentReview.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Payment, Election}) => {
    const {payments,SavePaymentNote,onChangePaymentNotes} = Payment;
    const {elections} = Election;
    const paymentState = Payment.requestState;
    const electionsLoading = Election.requestState === REQUEST_STATE.LOADING;
    return {payments, elections, paymentState, electionsLoading,SavePaymentNote,onChangePaymentNotes};
};

const mapActionsToProps = {
    togglePayment,
    loadElections,
    loadPayments,
    SavePaymentNote,
    onChangePaymentNotes
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PaymentReview));




