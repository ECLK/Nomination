import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import Divider from '@material-ui/core/Divider';
import { getNominationListForPayment,
        getNominationData,
        postNominationPayments,
        getNominationPayments,
        getTeams,
        getApproveElections,
        updateNominationPayments,
        validateNominationPayment,
        createAndDownloadPdf } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import CustomAutocompleteParty from '../AutocompleteParty';
import CustomAutocompleteElection from '../AutocompleteElection';
import CustomAutocompleteNomination from '../AutocompleteNomination';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import clsx from 'clsx';
import axios from 'axios';
import moment from 'moment';
import {saveAs} from 'file-saver';


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
        marginBottom:20
    },
    notes: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
      },
    iconSmall: {
        fontSize: 20,
      },
    leftIcon: {
        marginRight: theme.spacing.unit,
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
            depositor:'',
            depositAmount:'',
            depositeDate:'',  
            errorTextDepositor:'',
            errorTextDepositedDate:'',
            candidateCount:'',
            election:'',
            nomination:'',
            serialNo:'',
            note:'',
            errorTextNote:'',
            division:'',
            partyName:'',
            errorTextNominationPaymentValidation:'',
            partyType:''
        }
      }

      componentWillMount(){
        const {getNominationPayments,index,getNominationData,getTeams,getApproveElections,NominationPayments} = this.props;
        getNominationPayments(index);
        getNominationData(index);
        getTeams();
        getApproveElections();
        
      }

      handleChange = (name) => event => {
        if(name==='depositor'){
         this.setState({errorTextDepositor:''});
        }
        if(name==='depositeDate'){
         this.setState({errorTextDepositedDate:''});
        }
        if(name==='note'){
            this.setState({errorTextNote:''});
           }
         this.setState({
                 [name]:event.target.value,
         });   
       };

       handleChangeAutocomplete = (name) => event => {
       this.setState({
               [name]:event.value,
       });   
       if (name === 'nomination') {
        this.props.validateNominationPayment(event.value);
        this.setState({ errorTextNominationPaymentValidation: '',errorTextNomination: '',division:event.label });
        }

       if(this.state.election && name==='party'){
        this.props.getNominationListForPayment(this.state.election,event.value);
       }else if(this.state.party && name==='election'){
        this.props.getNominationListForPayment(event.value,this.state.party)
       }
       if (name === 'partyType') {
        this.setState({ partyType: event.target.value,errorTextPartyType: '' });
    }
      //  if(name==='nomination' && this.state.election && this.state.party){
      //   this.props.getNominationData(event.value);
      //  }
       if (this.state.nomination && this.state.election && this.state.party && name==='partyType' || name==='party') {
        this.props.getNominationData(this.state.nomination,(event.target===undefined) ? this.state.partyType : event.target.value);
    }
    if (this.state.nomination && this.state.election && this.state.party && name==='nomination') {
      this.props.getNominationData(this.state.nomination,this.state.partyType);
  }
     };

     handlePdfGenarationButton = (e) => {
      const { onCloseModal,nominationListForPayment,partyList } = this.props;
      var goNext = true;
      debugger;
      e.preventDefault();

      if (this.state.depositor === null || this.state.depositor === "") {
          this.setState({ errorTextDepositor: 'emptyField' });
          goNext = false;
      }

      if (this.state.depositeDate === null || this.state.depositeDate === "") {
          this.setState({ errorTextDepositedDate: 'emptyField' });
          goNext = false;
      }

      if (this.state.note === null || this.state.note === "") {
          this.setState({ errorTextNote: 'emptyField' });
          goNext = false;
      }
      
      //extract party name for success message by party id
      var partyName='';
      for (var j = 0; j < partyList.length; j++) {
          if(this.state.party===partyList[j].team_id){
              partyName=partyList[j].team_name;
              break;
          }
      }

      //extract nomination name for success message by nomination id
      var nominationName='';
      for (var j = 0; j < nominationListForPayment.length; j++) {
          if(this.state.nomination===nominationListForPayment[j].nomination[0].id){
              nominationName=nominationListForPayment[j].name;
              break;
          }
      }
      if (goNext) {
              createAndDownloadPdf(this.state);
              onCloseModal();
      }
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

      componentDidUpdate (oldState){
        const {NominationPayments,partyList,getNominationData,index} = this.props;
        if(oldState.NominationPayments !== NominationPayments){
            if(NominationPayments.election && NominationPayments.team_id){
                this.props.getNominationListForPayment(NominationPayments.election,NominationPayments.team_id);
               }
               //select party type from party data
               for(var i=0;i<partyList.length;i++){
                if(NominationPayments.team_id===partyList[i].team_id){
                  var party_type = partyList[i].team_party_type;
                }
               }
               if(party_type === 'RPP'){
                 party_type='candidate payment rpp';
                this.setState({partyType:'candidate payment rpp'});
               }else if (party_type === 'IG') {
                party_type='candidate payment ig';
                this.setState({partyType:'candidate payment ig'});
               }
               getNominationData(index,party_type);
          this.setState({depositor:NominationPayments.depositor});   
          this.setState({depositAmount:NominationPayments.amount});   
          this.setState({serialNo:NominationPayments.serialNo});   
          this.setState({party:NominationPayments.team_id});   
          this.setState({paymentId:NominationPayments.id});   
          this.setState({election:NominationPayments.election});   
          this.setState({note:NominationPayments.note});   
          this.setState({nomination:NominationPayments.nominationId});   
          this.setState({depositeDate:moment(new Date(NominationPayments.depositeDate)).format('YYYY-MM-DD')});
    
        }
      }

      handleSubmit = (e) => {
        const { updateNominationPayments,onCloseModal,nominationListForPayment,partyList,nominationPaymentValidation } = this.props;
        var goNext = true;
        debugger;
        e.preventDefault();
        // var test = true;
        // for (var j = 0; j < nominationListForPayment.length; j++) {
        //     if(this.state.nomination!==nominationListForPayment[j].nomination[0].id){
        //         test = false;
        //     }
        // }
        // if (nominationPaymentValidation === false) {
        //     this.setState({ errorTextNominationPaymentValidation: 'errorPayment' });
        //     goNext = false;
        // }

        if (this.state.depositor === null || this.state.depositor === "") {
            this.setState({ errorTextDepositor: 'emptyField' });
            goNext = false;
        }

        if (this.state.depositeDate === null || this.state.depositeDate === "") {
            this.setState({ errorTextDepositedDate: 'emptyField' });
            goNext = false;
        }

        if (this.state.note === null || this.state.note === "") {
            this.setState({ errorTextNote: 'emptyField' });
            goNext = false;
        }
        
        //extract party name for success message by party id
        var partyName='';
        for (var j = 0; j < partyList.length; j++) {
            if(this.state.party===partyList[j].team_id){
                partyName=partyList[j].team_name;
                break;
            }
        }

        //extract nomination name for success message by nomination id
        var nominationName='';
        for (var j = 0; j < nominationListForPayment.length; j++) {
            if(this.state.nomination===nominationListForPayment[j].nomination[0].id){
                nominationName=nominationListForPayment[j].name;
                break;
            }
        }
        if (goNext) {
                updateNominationPayments(this.state.paymentId,this.state,partyName,nominationName);
                // createAndDownloadPdf(this.state);
                // createAndDownloadPdf = () => {
                  // axios.post('/create-pdf',this.state)
                  // .then(()=> axios.get('fetch-pdf', { responseType: 'blob'}))
                  // .then((res) => {
                  //   const pdfBlob = new Blob([res.data], { type:'application/pdf' });
                  //   saveAs(pdfBlob,'newPdf.pdf');
                  // })
                // }
                onCloseModal();
        }
    };
    
    // createAndDownloadPdf = () => {
    //   debugger;
    //   axios.post('/create-pdf', this.state)
    //     .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
    //     .then((res) => {
    //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
    //       saveAs(pdfBlob, 'newPdf.pdf');
    //     })
    // }
    

    render() {
        const {classes, depositor,NominationPayments,onCloseModal,partyList,serialNo,approveElections,nominationListForPayment,nominationData} = this.props;
        const {  numberformat } = this.state;
        debugger;
        // const {errorTextItems} = this.props;
        const payPerCandidate = (nominationData.length) ? nominationData[0].payPerCandidate :  '';
        const candidateCount = (nominationData.length) ? nominationData[0].noOfCandidates :  '';
        let today = new Date();
        var TodayFormated = moment(today).format("YYYY-MM-DD");
        const suggestions = partyList.map(suggestion => ({
            value: suggestion.team_id,
            label: suggestion.team_name+" ("+suggestion.team_abbrevation+")",
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
            <form className={classes.container} onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                <Grid container spacing={2} xs={12}>
                    <Grid container   item lg={3}>
                    <CustomAutocompleteElection className={classes.textField} approveElections={approveElections} value={this.state.election} suggestions={suggestionsElections} handleChangeAutocomplete={this.handleChangeAutocomplete} />         
                    </Grid>
                    <Grid container   item lg={3}>
                    <CustomAutocompleteParty className={classes.textField} value={this.state.party} suggestions={suggestions} handleChange={this.handleChangeAutocomplete} />         
                    </Grid>  
                    <Grid container   item lg={3}>
                    <CustomAutocompleteNomination errorTextNominationPaymentValidation={this.state.errorTextNominationPaymentValidation} className={classes.textField} nominationListForPayment={nominationListForPayment} value={this.state.nomination} suggestions={suggestionsNominations} handleChange={this.handleChangeAutocomplete} />         
                    </Grid> 
                    <Grid container item lg={3}>
                        <Select
                            value={this.state.partyType}
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
                    </Grid>                        
                </Grid>
                <Divider variant="middle" className={classes.topBottomSpace} />
                <Grid style={{marginLeft:12}} container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>                
                    <Grid container  item lg={3}>
                        <TextField
                            label="Serial No"
                            className={classes.textField}
                            value={this.state.serialNo}
                            margin="normal"
                        />  
                    </Grid>
                    <Grid container  item lg={3}>
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
                    <Grid  container  item lg={3}>
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
                <Grid style={{marginLeft:12}} container spacing={2} xs={12}>
                    <Grid container   item lg={3}>
                    <TextField
                            id="formatted-numberformat-input"
                            label="Amount Per Candidate"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={(nominationData.length) ? nominationData[0].payPerCandidate :  ''}
                            margin="normal"
                            InputProps={{
                                inputComponent: this.NumberFormatCustom,
                                readOnly: true,
                              }}
                            
                        />
                    </Grid>
                    <Grid container   item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={(nominationData.length) ? nominationData[0].noOfCandidates :  ''}
                            onChange={this.handleChange('candidateCount')}
                            margin="normal"
                        />
                    </Grid>  
                    <Grid container   item lg={3}>
                    <TextField
                            id="formatted-numberformat-input"
                            label="Total Payable Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            // value={NominationPayments.depositAmount}
                            value={payPerCandidate*candidateCount}
                            onChange={this.handleChange('depositAmount')}
                            margin="normal"
                            InputProps={{
                                inputComponent: this.NumberFormatCustom,
                              }}
                        />
                    </Grid> 
                    <Grid style={{marginTop:16}} container spacing={2} xs={12}>
                    <Grid container   item lg={6}>
                    <TextField
                        error={this.state.errorTextNote}
                        id="outlined-textarea"
                        label="Comments"
                        rows="4"
                        rowsMax="14"
                        value={this.state.note}
                        onChange={this.handleChange('note')}
                        placeholder="Add your comments here"
                        helperText={this.state.errorTextNote === "emptyField" ? 'This field is required!' : ''}
                        multiline
                        className={classes.notes}
                        margin="normal"
                        variant="outlined"
                    />
                    </Grid>
                    </Grid>
                    <Grid container spacing={12}>
                    
                    <Grid style={{textAlign:'right',marginRight:'25px'}} className={classes.label}  item lg={12}>
                    <br /><br />
                        <Button style={{marginRight:'15px'}} variant="contained"  onClick={onCloseModal} value="Submit&New" color="primary" className={classes.submit}>
                            Cancel
                        </Button>
                        <Button style={{marginRight:'15px'}} variant="contained"  type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                            Update
                        </Button>
                        <Button variant="contained" onClick = { this.handlePdfGenarationButton } style={{padding:7}} size="small"    type="submit" value="Submit&DownloadPdf" color="secondary" className={classes.button}>
                          <DownloadIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                          Download PDF
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

const mapStateToProps = ({Nomination}) => {
    const nominationData = Nomination.nominationData;
    const NominationPayments = Nomination.getNominationPayments;
    const nominationListForPayment = Nomination.nominationListForPayment;
    const partyList = Nomination.partyList;
    const approveElections = Nomination.approveElections;
    const nominationPaymentValidation = Nomination.nominationPaymentValidation;


    return {nominationListForPayment,nominationData,NominationPayments,partyList,approveElections,nominationPaymentValidation};
  };

  const mapActionsToProps = {
    getNominationListForPayment,
    getNominationData,
    postNominationPayments,
    getNominationPayments,
    getTeams,
    getApproveElections,
    updateNominationPayments,
    validateNominationPayment
  };
  
 
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationPayments));


