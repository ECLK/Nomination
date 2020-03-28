import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import { updateParty,getPartyDetails,getPartyLogo} from '../../modules/party/state/PartyAction';
import { getUploadPath} from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DoneOutline from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Cancel';
import AttachFile from '@material-ui/icons/AttachFile';
import FileUpload from "../common/FileUpload";
import Typography from '@material-ui/core/Typography';
import {API_BASE_URL} from "../../config.js";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import SummeryView from '../SummeryView';


const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // paddingLeft: 25
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 240,
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
        marginTop: 5,
        marginBottom: 20,
        marginTop: 50
    },
    logocontainer: {
      height: '100%',
      marginTop:-55
    },
});

class PartyRegistration extends React.Component {

    constructor(props) {
        super(props)
        const { allowedTypes, allowedSize, multiple } = props;

        this.state = {
            open: true,
            partyName: '',
            partyType: '',
            address: '',
            title: '',
            abbreviation: '',
            errorTextPartyName: '',
            errorTextPartyType: '',
            secretaryName: '',
            errorTextAbbreviation:'',
            errorTextSecretaryName:'',
            errorTextTitle: '',
            errorTextAddress:'',
            errorTextApprovedSymbol: '',
            errorTextPartyType: '',
            errorTextPartyType: '',
            approvedSymbol:'',
            filename:'',
            allowedTypes,
            allowedSize,
            multiple,
            currentSdocId:'',
            phoneList:[],
            phone:'',
            faxList:[],
            fax:'',
            status:'',
            errorTextFileUpload:'',
            allowedTypes:['image/jpeg','image/png'],
            allowedSize:2
        }
    }

    componentWillMount(){
      const {getPartyDetails,index} = this.props;
      getPartyDetails(index);
    }


    handleChange = (name) => event => {
        if (name === 'phone') {
            this.setState({ errorTextPhone: '' });
        }
        if (name === 'fax') {
            this.setState({ errorTextFax: '' });
        }
        if (name === 'address') {
            this.setState({ errorTextAddress: '' });
        }
        if (name === 'title') {
            this.setState({ errorTextTitle: '' });
        }
        if (name === 'partyName') {
            this.setState({ errorTextPartyName: '' });
        }
        if (name === 'partyType') {
            this.setState({ errorTextPartyType: '' });
        }
        if (name === 'abbreviation') {
            this.setState({ errorTextAbbreviation: '' });
        }
        if (name === 'approvedSymbol') {
            this.setState({ errorTextApprovedSymbol: '' });
        }
        if (name === 'secretaryName') {
            this.setState({ errorTextSecretaryName: '' });
        }

        if(name === 'address'){
            this.setState({
                [name]: event.target.value.replace(/[^a-zA-Z0-9,/ ]/g, ''),
            });
        }else{
            this.setState({
                [name]: event.target.value.replace(/[^a-zA-Z0-9 ]/g, ''),
            });
        }
    };

    handleSubmit = (e) => {
        const { updateParty, onCloseModal} = this.props;
        var goNext = true;
        e.preventDefault();


        if (this.state.partyName === '' || this.state.partyName === null) {
            this.setState({ errorTextPartyName: 'emptyField' });
            goNext = false;
        }

        if (this.state.partyType === '' || this.state.partyType === null) {
            this.setState({ errorTextPartyType: 'emptyField' });
            goNext = false;
        }

        if (this.state.abbreviation === '' || this.state.abbreviation === null) {
            this.setState({ errorTextAbbreviation: 'emptyField' });
            goNext = false;
        }

        if (this.state.title === '' || this.state.title === null) {
            this.setState({ errorTextTitle: 'emptyField' });
            goNext = false;
        }

        if (this.state.address === '' || this.state.address === null) {
            this.setState({ errorTextAddress: 'emptyField' });
            goNext = false;
        }

        if (this.state.approvedSymbol === '' || this.state.approvedSymbol === null) {
            this.setState({ errorTextApprovedSymbol: 'emptyField' });
            goNext = false;
        }

        if (this.state.secretaryName === '' || this.state.secretaryName === null) {
            this.setState({ errorTextSecretaryName: 'emptyField' });
            goNext = false;
        }

        if (this.state.phoneList.length === 0 || this.state.phoneList.length === null) {
            this.setState({ errorTextPhone: 'emptyField' });
            goNext = false;
        }

        if (this.state.faxList.length === 0 || this.state.faxList.length === null) {
            this.setState({ errorTextFax: 'emptyField' });
            goNext = false;
        }
        if (goNext) {
            updateParty(this.state.partyId,this.state);
            onCloseModal();
        }
    };

    handleUploadView = sid => () => {
        this.props.getUploadPath(sid);
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
        this.setState({errorTextFileUpload:''});
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
          this.setState({errorTextFileUpload:errorMessages});
        //   this.reset();
        } else {
          const formData = new FormData();
          this.setState({status: "uploading", progress: 0});
          formData.append("file", data.files[0]);
          axios.post(`${API_BASE_URL}/image-upload`, formData, {
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



            const obj = {'filename':response.data.filename, 'originalname':response.data.originalname2};

            this.setState(
              {
                status: "uploaded",
                currentSdocId: response.data.originalname2,
                filename:response.data.filename,
                  file: URL.createObjectURL(files[0])
              }
            );
          });
        }
      };

      componentDidUpdate (oldState){
        const {PartyDetails,getPartyLogo} = this.props;
        if(oldState.PartyDetails!== PartyDetails){
          if(PartyDetails.phone != null){
            var phoneList = PartyDetails.phone.split(',');
            phoneList = phoneList.map(phone => ({ phone }));
          }else{
            var phoneList = [];
          }
          if(PartyDetails.fax != null){
            var faxList = PartyDetails.fax.split(',');
           faxList = faxList.map(fax => ({ fax }));
          }else{
            var faxList = [];
          }
          getPartyLogo(PartyDetails.fileName);
          this.setState({partyName:PartyDetails.partyName});
          this.setState({partyType:PartyDetails.partyType});
          this.setState({abbreviation:PartyDetails.abbreviation});
          this.setState({partyId:PartyDetails.partyId});
          this.setState({secretaryName:PartyDetails.secretaryName});
          this.setState({approvedSymbol:PartyDetails.approvedSymbol});
          this.setState({title:PartyDetails.title});
          this.setState({currentSdocId:PartyDetails.originalName});
          this.setState({filename:PartyDetails.fileName});
          this.setState({phoneList:phoneList});
          this.setState({faxList:faxList});

          this.setState({faxList:faxList});

          if(PartyDetails.originalName){
            this.setState({status:'uploaded'});
          }
          this.setState({address:PartyDetails.address});
        }
      }

      addPhone = () => {
        if(this.state.phone===undefined || this.state.phone===''){
            this.setState({errorTextPhone:'emptyField'});
        }
        const phone = {
            phone: this.state.phone
        }
            const phoneList = this.state.phoneList;
            if(this.state.phone!==undefined || this.state.phone!==''){
                    phoneList.push(phone);
                    this.setState({ phoneList });
            }
        }

        removePhone = (index) => () => {
            const phoneList = this.state.phoneList;
            phoneList.splice(index, 1);
            this.setState({...this.state, phoneList});
        }

        addFax = () => {
            if(this.state.fax===undefined || this.state.fax===''){
                this.setState({errorTextFax:'emptyField'});
            }
            const fax = {
                fax: this.state.fax
            }
                const faxList = this.state.faxList;
                if(this.state.fax!==undefined || this.state.fax!==''){
                        faxList.push(fax);
                        this.setState({ faxList });
                }
            }

            removeFax = (index) => () => {
                const faxList = this.state.faxList;
                faxList.splice(index, 1);
                this.setState({...this.state, faxList});
            }

    render() {
        const { classes, onCloseModal,PartyLogo} = this.props;
        const { errorTextPartyType,errorTextSecretaryName,errorTextAbbreviation,errorTextApprovedSymbol,errorTextAddress,errorTextTitle,errorTextPartyName,errorTextPhone,errorTextFax } = this.state;

        const doneElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploading")}>
        <DoneOutline  color="secondary"/>
        {/* <a download={"filename"} href={"ok"}>filename</a> */}
        </div>);
        const closeElement = (<div  className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
        <CloseIcon ref={this.state.currentSdocId}  color="red"/>
        {/* <a download={"filename"} href={"ok"}>filename</a> */}
        </div>);
        
        let partyLogoImgTag = <img src={PartyLogo} style={{maxWidth: 60,margin:25}} className="img-fluid" alt="logo"/>
        if (this.state.file) {
            partyLogoImgTag = <img src={this.state.file} style={{maxWidth: 60,margin:25}} className="img-fluid" alt="logo"/>
        }

        return (
            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Grid style={{ marginLeft: 12,marginBottom:15 }} container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>
                    <Grid container item lg={8}>
                        <TextField
                            error={errorTextPartyName}
                            label="Name of the party"
                            style={{width:'100%'}}
                            className={classes.textField}
                            value={this.state.partyName}
                            onChange={this.handleChange("partyName")}
                            margin="normal"
                            helperText={errorTextPartyName === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid style={{ marginLeft: 12,marginBottom:20 }} container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>

                    <Grid container item lg={4}>
                    <FormControl style={{width:'100%'}} error={(errorTextPartyType) ? true : false} >
                        <Select
                            value={this.state.partyType}
                            error={errorTextPartyType}
                            onChange={this.handleChange("partyType")}
                            name="partyType"
                            style={{marginTop:30,width:'88%'}}
                            displayEmpty
                            className={classes.textField}
                            >
                            <MenuItem value="" disabled>
                                Select party type
                            </MenuItem>
                            <MenuItem value={'RPP'}>Registered Political Party ( RPP )</MenuItem>
                            <MenuItem value={'IND'}>Indipendent Group ( IND )</MenuItem>
                            </Select>
                        <FormHelperText style={{marginLeft:18}}>{(errorTextPartyType==='emptyField') ? 'This field is required!' : ''}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item lg={3}>
                        <TextField
                            error={errorTextAbbreviation}
                            label="Party Abbreviation"
                            style={{width:'100%'}}
                            className={classes.textField}
                            value={this.state.abbreviation}
                            onChange={this.handleChange("abbreviation")}
                            margin="normal"
                            helperText={errorTextAbbreviation === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                    <Grid container item lg={3}>
                        <TextField
                            error={errorTextApprovedSymbol}
                            label="Approved symbol"
                            style={{width:'100%'}}
                            className={classes.textField}
                            value={this.state.approvedSymbol}
                            onChange={this.handleChange("approvedSymbol")}
                            margin="normal"
                            helperText={errorTextApprovedSymbol === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid style={{ marginLeft: 12,marginBottom:20 }} container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>
                <Grid container item lg={2}>
                    <FormControl style={{width:'80%'}} error={(errorTextPartyType) ? true : false} >
                        <Select
                            value={this.state.title}
                            error={errorTextTitle}
                            style={{width:'100%'}}
                            onChange={this.handleChange("title")}
                            name="title"
                            style={{marginTop:30,width:'88%'}}
                            displayEmpty
                            className={classes.textField}
                            >
                            <MenuItem value="" disabled>
                                Select Title
                            </MenuItem>
                            <MenuItem value={'Mr'}>Mr</MenuItem>
                            <MenuItem value={'Mrs'}>Mrs</MenuItem>
                            <MenuItem value={'Ms'}>Ms</MenuItem>
                            </Select>
                        <FormHelperText style={{marginLeft:18}}>{(errorTextTitle==='emptyField') ? 'This field is required!' : ''}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item lg={4}>
                        <TextField
                            error={errorTextSecretaryName}
                            label="Name of the Secretary"
                            style={{width:'100%'}}
                            className={classes.textField}
                            value={this.state.secretaryName}
                            onChange={this.handleChange("secretaryName")}
                            margin="normal"
                            helperText={errorTextSecretaryName === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                    <Grid container item lg={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Address of the Secretary"
                        style={{width:'100%'}}
                        onChange={this.handleChange("address")}
                        value={this.state.address}
                        error={errorTextAddress}
                        multiline
                        rows="3"
                        // defaultValue="Enter Address"
                        variant="outlined"
                        helperText={errorTextAddress === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                </Grid>
                <Grid direction="column" style={{ marginLeft: 12}} container spacing={2}>
                <Grid container item lg={6}>
                <Grid  item lg={4}>
                        <TextField
                            error={errorTextPhone}
                            label="Phone"
                            type="number"
                            // style={{width:'20%'}}
                            className={classes.textField}
                            value={this.state.phone}
                            onChange={this.handleChange("phone")}
                            margin="normal"
                            helperText={errorTextPhone === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <IconButton style={{marginLeft:-5,marginTop:25}}  variant="outlined" className={classes.button} aria-label="Delete" onClick={this.addPhone}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    </Grid>
                    {
                        this.state.phoneList != null ? this.state.phoneList.map((element, index) => {
                            return (<React.Fragment>
                                <Grid container item lg={6}>
                                <Grid item lg={4}>
                                    <Typography className={classes.textField} variant="body1" >{element.phone}</Typography>
                                </Grid>
                                <Grid item lg={2}>
                                    <IconButton style={{marginLeft:-5,marginTop:-15}} variant="outlined" className={classes.button} aria-label="Delete" onClick={this.removePhone(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                </Grid>
                            </React.Fragment>)
                        }) : ' '
                    }
                </Grid>
                <Grid direction="column" style={{ marginLeft: 12}} container spacing={2}>
                <Grid container item lg={6}>
                <Grid  item lg={4}>
                        <TextField
                            error={errorTextFax}
                            label="Fax"
                            type="number"
                            // style={{width:'20%'}}
                            className={classes.textField}
                            value={this.state.fax}
                            onChange={this.handleChange("fax")}
                            margin="normal"
                            helperText={errorTextFax === "emptyField" ? 'This field is required!' : ''}
                        />
                    </Grid>
                    <Grid item lg={2}>
                        <IconButton style={{marginLeft:-5,marginTop:25}}  variant="outlined" className={classes.button} aria-label="Delete" onClick={this.addFax}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    </Grid>
                    {
                        this.state.faxList != null ?  this.state.faxList.map((element, index) => {
                            return (<React.Fragment>
                                <Grid container item lg={6}>
                                <Grid item lg={4}>
                                    <Typography className={classes.textField} variant="body1" >{element.fax}</Typography>
                                </Grid>
                                <Grid item lg={2}>
                                    <IconButton style={{marginLeft:-5,marginTop:-15}} variant="outlined" className={classes.button} aria-label="Delete" onClick={this.removeFax(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                </Grid>
                            </React.Fragment>);
                        }) : ' '
                    }
                </Grid>

                <Grid style={{ marginLeft: 12,marginTop:25 }} container spacing={2} xs={12}>
                <Grid container item lg={6}>


                    <Grid container item lg={6}>
                    {

            this.state.status === "uploaded" ? <div className={classes.done} >
            <DoneOutline style={{marginTop:30,marginLeft:-20}} onClick={this.handleUploadView(this.state.filename)}  color="secondary"/>
            {/* <img src={`http://localhost:9001/src/uploads/${sdoc.filename}`} style={{maxWidth: 60,margin:25}} className="img-fluid" alt="logo" /> */}
            </div> : ' '

        }
                    <span>
                    <Typography style={{color:"rgba(0, 0, 0, 0.54)",fontSize:12}} variant="subtitle1" >Attach party symbol</Typography>
                    <span ><FileUpload  value={this.state.paySlip} doneElement={doneElement} onSelectFiles={this.onSelectFiles} /></span>
                    </span>
                    </Grid>
                    <Grid style={{marginTop:30,marginLeft:-10}}container item lg={4}>
                    {/* {
                        this.state.status === "uploaded"  ?
                        <Typography variant="caption" gutterBottom>
                        {this.state.currentSdocId}<div  className={classes.done}>
                        <AttachFile   color="red"/>
                        </div>
                    </Typography>
                        : 'No file attached'
                    }  */}
                    <div className={classes.logocontainer} >
                        {partyLogoImgTag}
                    </div>
                    </Grid>
                    </Grid>

                </Grid>
                    {
                    <Grid style={{marginLeft:10,marginTop:20}} container item lg={6}><Grid item lg={6}>
                    <SummeryView
                    variant={'info'}
                    className={classes.margin}
                    message={"Files must be less than 2 MB.\nAllowed file types: jpg jpeg png."}
                    style={{marginBottom:'10px'}}
                />{
                this.state.errorTextFileUpload  ? 
                
                    <SummeryView
                    variant={'warning'}
                    className={classes.margin}
                    message={this.state.errorTextFileUpload}
                    style={{marginBottom:'10px'}}
                    /> : ''}
                    </Grid> </Grid>
                }

                <Grid style={{ marginLeft: 12 }} container direction="row" justify="flex-start" alignItems="stretch" spacing={2}>
                <Grid container spacing={12}>
                        <Grid style={{ textAlign: 'right', marginRight: '25px' }} className={classes.label} item lg={12}>
                            <br /><br />
                            <Button style={{ marginRight: '15px' }} variant="contained" onClick={onCloseModal} value="Submit&New" color="primary" className={classes.submit}>
                                Cancel
                        </Button>
                            <Button style={{marginRight:'15px'}} variant="contained" type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                                Update
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

PartyRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Party}) => {
  const PartyDetails = Party.PartyDetails;
  const PartyLogo = Party.partyLogo

    return { PartyDetails,PartyLogo };
};

const mapActionsToProps = {
    updateParty,
    getUploadPath,
    getPartyDetails,
    getPartyLogo
};



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PartyRegistration));


