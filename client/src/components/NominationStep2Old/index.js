import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import { handleChangePayment } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import moment from 'moment';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 25
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const paymentStatus = [
    {
      value: 'PENDING',
      label: 'PENDING',
    },
    {
      value: 'APPROVED',
      label: 'APPROVED',
    },
    {
      value: 'REJECTED',
      label: 'REJECTED',
    },
  ];

const designation = [
    {
      value: 'teamLeader',
      label: 'Team Leader',
    },
    {
      value: 'secretory',
      label: 'Secretory',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
class NominationPayments extends React.Component {
  
    constructor(props) {
        super(props)
        const {candidateCount} = this.props;
        this.state = {
            open: true,
            depositor:'',
            depositAmount:2000*candidateCount,
            depositeDate:'',  
        }
      }
    
    render() {
        const {classes, depositor,handleChange,NominationPayments,NumberFormatCustom,CandidateList,candidateCount} = this.props;
        const {  numberformat } = this.state;
        const {errorTextItems} = this.props;
        const payPerCandidate = 2000;
        let today = new Date();
        var TodayFormated = moment(today).format("YYYY-MM-DD");
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>                
                    <Grid item lg={3}>
                        <TextField
                            error={errorTextItems.errorTextDepositor}
                            label="Depositor Name"
                            className={classes.textField}
                            value={NominationPayments.depositor}
                            onChange={handleChange("depositor")}
                            margin="normal"
                            helperText={errorTextItems.errorTextDepositor === "emptyField" ? 'This field is required!' : ''}
                        />  
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            error={errorTextItems.errorTextDepositedDate}
                            id="date"
                            label="Deposited Date"
                            type="date"
                            value={NominationPayments.depositeDate}
                            onChange={handleChange('depositeDate')}
                            className={classes.textField}
                            helperText={errorTextItems.errorTextDepositedDate === "emptyField" ? 'This field is required!' : ''}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{ inputProps: { max: TodayFormated } }}
                            margin="normal"
                        /> 
                    </Grid>
                                     
                </Grid>
                <Grid container spacing={8}>
                    <Grid item lg={3}>
                    <TextField
                            id="formatted-numberformat-input"
                            label="Amount Per Candidate"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={payPerCandidate}
                            margin="normal"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                readOnly: true,
                              }}
                            
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={candidateCount}
                            onChange={handleChange('candidateCount')}
                            margin="normal"
                        />
                    </Grid>  
                    <Grid item lg={3}>
                    <TextField
                            id="formatted-numberformat-input"
                            label="Total Payable Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            // value={NominationPayments.depositAmount}
                            value={payPerCandidate*candidateCount}
                            onChange={handleChange('depositAmount')}
                            margin="normal"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                        />
                    </Grid> 
                                                
                </Grid>
            </form>
        );
    }
}

NominationPayments.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
    const {handleChangePayment} = Nomination;
    const CandidateList = Nomination.getNominationCandidates;

    return {handleChangePayment,CandidateList};
  };

  const mapActionsToProps = {
    handleChangePayment
  };
  
 
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationPayments));


