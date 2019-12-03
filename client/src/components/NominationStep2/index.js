import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import Divider from '@material-ui/core/Divider';
import { handleChangePayment, 
        getNominationPayments, 
        getTeams, 
        getNominationListForPayment, 
        getNominationData, 
        postNominationPayments, 
        validateNominationPayment,
        createAndDownloadPdf } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import CustomAutocompleteParty from '../AutocompleteParty';
import CustomAutocompleteElection from '../AutocompleteElection';
import CustomAutocompleteNomination from '../AutocompleteNomination';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';


const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // paddingLeft: 25
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
    pageContent: {
        padding: 14,
    },
    topBottomSpace: {
        marginTop: 40,
        marginBottom: 20,
        marginTop: 50
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
        this.state = {
            open: true,
            depositor: '',
            depositAmount: '',
            depositeDate: '',
            errorTextDepositor: '',
            errorTextDepositedDate: '',
            candidateCount: '',
            election: '',
            nomination: '',
            party:'',
            errorTextNominationPaymentValidation: '',
            errorTextElection:'',
            errorTextParty:'',
            errorTextNomination:'',
            errorTextPartyType:'',
            division:'',
            partyName:'',
            partyType:''
        }
    }

    componentDidMount() {
        const { getNominationPayments, getTeams } = this.props;
        getNominationPayments();
        getTeams();
    }

    handleChange = (name) => event => {
        debugger;
        if (name === 'depositor') {
            this.setState({ errorTextDepositor: '' });
        }
        if (name === 'depositeDate') {
            this.setState({ errorTextDepositedDate: '' });
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeAutocomplete = (name) => event => {
        this.setState({
            [name]: event.value,
        });
        debugger;
        if (name === 'nomination') {
            debugger;
            this.props.validateNominationPayment(event.value);
            this.setState({ errorTextNominationPaymentValidation: '',errorTextNomination: '',division:event.label });
        }
        if (name === 'party') {
            this.setState({ errorTextParty: '',partyName:event.label });
        }
        if (name === 'election') {
            this.setState({ errorTextElection: '' });
        }
        if (name === 'partyType') {
            this.setState({ partyType: event.target.value,errorTextPartyType: '' });
        }

        if (this.state.election && name === 'party') {
            this.props.getNominationListForPayment(this.state.election, event.value);
        } else if (this.state.party && name === 'election') {
            this.props.getNominationListForPayment(event.value, this.state.party)
        }
debugger;
        if (this.state.nomination && this.state.election && this.state.party && name==='partyType') {
            this.props.getNominationData(this.state.nomination,event.target.value);
        }
    };

    handleChangeButton = (e) => {
        const { onCloseModal } = this.props;
        // if(e.currentTarget.value==="Submit&Clouse"){
        //     onCloseModal();           
        // }
    }

    NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;

        return (
            <NumberFormat
                {...other}
                getInputRef={inputRef}
                onValueChange={values => {
                    onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                prefix="Rs "
            />
        );
    }

    handleSubmit = (e) => {
        const { postNominationPayments, serialNo, onCloseModal, nominationPaymentValidation,nominationListForPayment } = this.props;
        var goNext = true;
        debugger;
        e.preventDefault();

        if (nominationPaymentValidation === false) {
            this.setState({ errorTextNominationPaymentValidation: 'errorPayment' });
            goNext = false;
        }

        if (this.state.depositor === '' || this.state.depositor === null) {
            this.setState({ errorTextDepositor: 'emptyField' });
            goNext = false;
        }

        if (this.state.depositeDate === '' || this.state.depositeDate === null) {
            this.setState({ errorTextDepositedDate: 'emptyField' });
            goNext = false;
        }

        if (this.state.election === '' || this.state.election === null) {
            this.setState({ errorTextElection: 'emptyField' });
            goNext = false;
        }

        if (this.state.party === '' || this.state.party === null) {
            this.setState({ errorTextParty: 'emptyField' });
            goNext = false;
        }
        
        if (this.state.partyType === '' || this.state.partyType === null) {
            this.setState({ errorTextPartyType: 'emptyField' });
            goNext = false;
        }
        
        if (this.state.nomination === '' || this.state.nomination === null) {
            this.setState({ errorTextNomination: 'emptyField' });
            goNext = false;
        }

        var division = '';
        for (var j = 0; j < nominationListForPayment.length; j++) {
            if(this.state.nomination===nominationListForPayment[j].nomination[0].id){
                 division =nominationListForPayment[j].name;
            }
        }
debugger;
        if (goNext) {
                postNominationPayments(this.state, serialNo,division,this.state.party);
                createAndDownloadPdf(this.state);
                onCloseModal();
        }
    };

    render() {
        const { classes, depositor, NominationPayments, onCloseModal, partyList, serialNo, approveElections, nominationListForPayment, nominationData } = this.props;
        const { numberformat,errorTextPartyType } = this.state;
        debugger;
        const { errorTextItems } = this.props;
        const payPerCandidate = (nominationData.length) ? nominationData[0].payPerCandidate : '';
        const candidateCount = (nominationData.length) ? nominationData[0].noOfCandidates : '';
        let today = new Date();
        var TodayFormated = moment(today).format("YYYY-MM-DD");
        const suggestions = partyList.map(suggestion => ({
            value: suggestion.team_id,
            label: suggestion.team_name + " (" + suggestion.team_abbrevation + ")",
        }));
        

        const suggestionsElections = approveElections.map(suggestion => ({
            value: suggestion.id,
            label: suggestion.name,
        }));

        const suggestionsNominations = nominationListForPayment.map(suggestion => ({
            value: suggestion.nomination[0].id,
            label: suggestion.name,
        }));

        return (
            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={1} xs={12}>
                    <Grid container item lg={3}>
                        <CustomAutocompleteElection  errorTextElection={this.state.errorTextElection} className={classes.textField} approveElections={approveElections} value={this.state.election} suggestions={suggestionsElections} handleChangeAutocomplete={this.handleChangeAutocomplete} />
                    </Grid>
                    <Grid container item lg={3}>
                        <CustomAutocompleteParty errorTextParty={this.state.errorTextParty} className={classes.textField} value={this.state.party} suggestions={suggestions} handleChange={this.handleChangeAutocomplete} />
                    </Grid>
                    <Grid container item lg={3}>
                        <CustomAutocompleteNomination 
                        errorTextNomination={this.state.errorTextNomination} 
                        errorTextNominationPaymentValidation={this.state.errorTextNominationPaymentValidation} 
                        className={classes.textField} 
                        nominationListForPayment={nominationListForPayment} 
                        value={this.state.nomination} 
                        suggestions={suggestionsNominations} 
                        handleChange={this.handleChangeAutocomplete} 
                        />
                    </Grid>
                    <Grid container item lg={3}>
                    <FormControl error={(errorTextPartyType) ? true : false} className={classes.formControl}>
                        <Select
                            value={this.state.partyType}
                            error={errorTextPartyType}
                            onChange={this.handleChangeAutocomplete("partyType")}
                            name="partyType"
                            style={{marginTop:20,marginLeft:20,width:'88%'}}
                            displayEmpty
                            className={classes.textField}
                            >
                            <MenuItem value="" disabled>
                                Slect party type
                            </MenuItem>
                            <MenuItem value={'candidate payment rpp'}>Registered Political Party ( RPP )</MenuItem>
                            <MenuItem value={'candidate payment ig'}>Indipendent Group ( IG )</MenuItem>
                        </Select>
                        <FormHelperText style={{marginLeft:18}}>{(errorTextPartyType==='emptyField') ? 'This field is required!' : ''}</FormHelperText>
                        </FormControl>
                    </Grid>
                <Grid container spacing={1} xs={12}>
                    
                </Grid>
                </Grid>
                <Divider variant="middle" className={classes.topBottomSpace} />
                <Grid style={{ marginLeft: 12 }} container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>
                    <Grid container item lg={3}>
                        <TextField
                            label="Serial No"
                            className={classes.textField}
                            value={serialNo}
                            margin="normal"
                        />
                    </Grid>
                    <Grid container item lg={3}>
                        <TextField
                            error={this.state.errorTextDepositor}
                            label="Depositor Name"
                            className={classes.textField}
                            value={this.state.depositor}
                            onChange={this.handleChange("depositor")}
                            margin="normal"
                            helperText={this.state.errorTextDepositor === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                    <Grid container item lg={3}>
                        <TextField
                            error={this.state.errorTextDepositedDate}
                            id="date"
                            label="Deposited Date"
                            type="date"
                            value={this.state.depositeDate}
                            onChange={this.handleChange('depositeDate')}
                            className={classes.textField}
                            helperText={this.state.errorTextDepositedDate === "emptyField" ? 'This field is required!' : ''}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{ inputProps: { max: TodayFormated } }}
                            margin="normal"
                        />
                    </Grid>

                </Grid>
                <Grid style={{ marginLeft: 12 }} container spacing={2} xs={12}>
                    <Grid container item lg={3}>
                        <TextField
                            id="formatted-numberformat-input"
                            label="Amount Per Candidate"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={(nominationData.length) ? nominationData[0].payPerCandidate : ''}
                            margin="normal"
                            InputProps={{
                                inputComponent: this.NumberFormatCustom,
                                readOnly: true,
                            }}

                        />
                    </Grid>
                    <Grid container item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={(nominationData.length) ? nominationData[0].noOfCandidates : ''}
                            onChange={this.handleChange('candidateCount')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid container item lg={3}>
                        <TextField
                            id="formatted-numberformat-input"
                            label="Total Payable Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            // value={NominationPayments.depositAmount}
                            value={payPerCandidate * candidateCount}
                            onChange={this.handleChange('depositAmount')}
                            margin="normal"
                            InputProps={{
                                inputComponent: this.NumberFormatCustom,
                            }}
                        />
                    </Grid>
                    <Grid container spacing={12}>
                        <Grid style={{ textAlign: 'right', marginRight: '25px' }} className={classes.label} item lg={12}>
                            <br /><br />
                            <Button style={{ marginRight: '15px' }} variant="contained" onClick={onCloseModal} value="Submit&New" color="primary" className={classes.submit}>
                                Cancel
                        </Button>
                            <Button style={{marginRight:'15px'}} variant="contained" onClick={this.handleChangeButton} type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                                Save
                        </Button>
                        <Button variant="contained"  style={{padding:7}}  size="small"    type="submit" value="Submit&DownloadPdf" color="secondary" className={classes.button}>
                          <DownloadIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                          Save & Download PDF
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

NominationPayments.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Nomination }) => {
    const { handleChangePayment } = Nomination;
    const NominationPayments = Nomination.getNominationPayments;
    const nominationData = Nomination.nominationData;
    const nominationListForPayment = Nomination.nominationListForPayment;
    const partyList = Nomination.partyList;
    const nominationPaymentValidation = Nomination.nominationPaymentValidation;

    return { handleChangePayment, NominationPayments, partyList, nominationListForPayment, nominationData, nominationPaymentValidation };
};

const mapActionsToProps = {
    handleChangePayment,
    getNominationPayments,
    getTeams,
    getNominationListForPayment,
    getNominationData,
    postNominationPayments,
    validateNominationPayment
};



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationPayments));


