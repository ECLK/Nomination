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
        createAndDownloadPdf,
        getUploadPath } from '../../modules/nomination/state/NominationAction';
import {getElectionTimeLine} from '../../modules/election/state/ElectionAction';
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
import DoneOutline from '@material-ui/icons/DoneOutline';
import AttachFile from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Cancel';
import FileUpload from "../common/FileUpload";
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {API_BASE_URL} from "../../config.js";
import {saveAs} from 'file-saver';
import SummeryView from '../SummeryView';
import download from 'downloadjs';


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
            partyType:'',
            currentSdocId:'',
            filename:''
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
        this.props.getElectionTimeLine(event.value);
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
          this.setState({currentSdocId:NominationPayments.originalName});   
          this.setState({filename:NominationPayments.fileName});   
          this.setState({paymentSdocId:NominationPayments.paymentSdocId});   
          if(NominationPayments.originalName){
            this.setState({status:'uploaded'});   
          }
          this.setState({depositeDate:NominationPayments.depositeDate});
    
        }
      }

      handleSubmit = (e) => {
        const { updateNominationPayments,onCloseModal,nominationListForPayment,partyList,nominationPaymentValidation } = this.props;
        var goNext = true;
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
                updateNominationPayments(this.state.paymentId,this.state,partyName,nominationName);
                onCloseModal();
        }
    };
    
    handleUploadView = sid => () => {
        axios.get(`${API_BASE_URL}/payments/${this.state.paymentId}/download`, {responseType: 'blob'}, {
            }).then((response) => {
            download(new Blob([response.data]), this.state.currentSdocId, response.headers['content-type']);
        }).catch(err => {
            console.log(err)
        });
    };
    
  
  showFlagToStyle = (flag) => (
  {display: flag ? "" : "none"}
  );

    onSelectFiles = evt => {
           evt.preventDefault();
           evt.stopPropagation();
       
           this.setState({
             status: evt.type,
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
  
         
        
          const obj = {'filename':response.data.filename, 'originalname':response.data.originalname};
          
          this.setState(
            {
              status: "uploaded",
              currentSdocId: response.data.originalname,
              filename:response.data.filename
            }
          );
        });
      }
    };

    render() {
        const {classes, depositor,NominationPayments,onCloseModal,partyList,serialNo,approveElections,nominationListForPayment,nominationData,electionTimeline} = this.props;
        const {  numberformat } = this.state;
        // const {errorTextItems} = this.props;
        const payPerCandidate = (nominationData.length) ? nominationData[0].payPerCandidate :  '';
        const candidateCount = (nominationData.length) ? nominationData[0].noOfCandidates :  '';
        let today = new Date();
        var TodayFormatedWithTime = moment(today).format("YYYY-MM-DDTHH:mm");
        var paymentStart = moment(electionTimeline.paymentStart).format("YYYY-MM-DDTHH:mm");
        var paymentEnd = moment(electionTimeline.paymentEnd).format("YYYY-MM-DDTHH:mm");

        
        var errorMessage = "Security deposit time should be within " + moment(electionTimeline.paymentStart).format("DD MMM YYYY hh:mm a")  + " and " + moment(electionTimeline.paymentEnd).format("DD MMM YYYY hh:mm a");
        var errorTextPayment = false;
        if (moment(paymentStart).isBefore(TodayFormatedWithTime)) {
            errorTextPayment = true;
          }
        if (moment(TodayFormatedWithTime).isBefore(paymentEnd)) {
            errorTextPayment = true;
          }

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

        const doneElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploading")}>
        <DoneOutline  color="secondary"/>
        {/* <a download={"filename"} href={"ok"}>filename</a> */}
        </div>);
        const closeElement = (<div  className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
        <CloseIcon ref={this.state.currentSdocId}  color="red"/>
        {/* <a download={"filename"} href={"ok"}>filename</a> */}
        </div>);
        
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
                    id="datetime-local"
                    type="datetime-local"
                    label="Deposited Date"
                    className={classes.textField}
                    // name="nominationEnd"
                    value={this.state.depositeDate}
                    onChange={this.handleChange('depositeDate')}
                    helperText={this.state.errorTextDepositedDate === "emptyField" ? 'This field is required!' : ''}
                    error={this.state.errorTextDepositedDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: TodayFormatedWithTime
                    }}
                    margin="normal"
                  />
                    </Grid>
                    <Grid container item lg={3}>
                        
                   
                    <Grid container item lg={6}>
                    {
            
            this.state.status === "uploaded" ? <div className={classes.done} >
            <DoneOutline style={{marginTop:30,marginLeft:-20}} color="secondary"/>
            {/* <img src={`http://localhost:9001/src/uploads/${sdoc.filename}`} style={{maxWidth: 60,margin:25}} className="img-fluid" alt="logo" /> */}
            </div> : ' '
    
        }
                    <span>
                    <Typography style={{color:"rgba(0, 0, 0, 0.54)",fontSize:12}} variant="subtitle1" >Attach Pay Slip</Typography>
                    <span ><FileUpload  value={this.state.paySlip} doneElement={doneElement} onSelectFiles={this.onSelectFiles} /></span>
                    </span>
                    </Grid>
                    <Grid style={{marginTop:30,marginLeft:-10}}container item lg={4}>
                    {
                        this.state.status === "uploaded"  ? 
                        <Typography style={{cursor: 'pointer'}} onClick={this.handleUploadView()} variant="caption" gutterBottom>
                        {this.state.currentSdocId}<div  className={classes.done}>
                        <AttachFile  onClick={this.handleUploadView(this.state.filename)} color="red"/>
                        </div>
                    </Typography>
                        : 'No file attached'
                    } 
                    </Grid>
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
                    <Grid style={{ textAlign: 'right', marginRight: '25px' }} className={classes.label} item lg={12}>
                        { errorTextPayment ? <SummeryView
                        variant={"warning"}
                        className={classes.margin}
                        message={errorMessage}
                        style={{marginBottom:'10px'}}
                        /> : " "}
                        </Grid>
                        <Button style={{marginRight:'15px'}} variant="contained"  onClick={onCloseModal} value="Submit&New" color="primary" className={classes.submit}>
                            Cancel
                        </Button>
                        <Button disabled={errorTextPayment} style={{marginRight:'15px'}} variant="contained"  type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
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

const mapStateToProps = ({Nomination,Election}) => {
    const nominationData = Nomination.nominationData;
    const NominationPayments = Nomination.getNominationPayments;
    const nominationListForPayment = Nomination.nominationListForPayment;
    const partyList = Nomination.partyList;
    const approveElections = Nomination.approveElections;
    const electionTimeline = Election.ElectionTimeLineData;

    const nominationPaymentValidation = Nomination.nominationPaymentValidation;


    return {nominationListForPayment,nominationData,NominationPayments,partyList,approveElections,nominationPaymentValidation,electionTimeline};
  };

  const mapActionsToProps = {
    getNominationListForPayment,
    getNominationData,
    postNominationPayments,
    getNominationPayments,
    getTeams,
    getApproveElections,
    updateNominationPayments,
    validateNominationPayment,
    getUploadPath,
    getElectionTimeLine
  };
  
 
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationPayments));


