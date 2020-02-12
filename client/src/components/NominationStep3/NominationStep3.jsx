import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FileUpload from "../common/FileUpload";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { createAndDownloadPdfNominationForm, createAndDownloadPdfFormUsingTemplate } from '../../modules/nomination/state/NominationAction';
import ProgressButton from "../ProgressButton";
import DoneOutline from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    divider: {
      marginBottom:30
    },
    card: {
      minWidth: 275,
      marginBottom: 30,
      backgroundColor:'#ebf5fa'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    button: {
      margin: theme.spacing.unit,
      padding:7
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
},
done: {
  textAlign: 'right',
  paddingRight: 8,
},
});


class TextFields extends React.Component {

  constructor(props) {
        super(props);
       const {status} = this.props;
    this.state = {
      status: status,
      errorTextNominationFormCategory:'',
      nominationFormCategory:'',
      loading:false,
      success:false
    }
 }

  handleChange(files) {
        this.setState({
          files: files
        });
  }

  handleChangeElection = name => event => {
    if (name === 'nominationFormCategory') {
        this.setState({ errorTextNominationFormCategory: '' });
    }
    this.setState({
        [name]: event.target.value,
    });
};
  

  handleUpload = (event) => {
    const data = new FormData();
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    var filesArray = this.state.files;
  };

 

  handlePdfGenarationButton = (e) => {
        const { nominationListForPayment,NominationCandidates,partyList } = this.props;

        var goNext = true;
        if (this.state.nominationFormCategory === null || this.state.nominationFormCategory === "") {
            this.setState({ errorTextNominationFormCategory: 'emptyField' });
            goNext = false;
        }
        if(
          this.state.nominationFormCategory === 'presidential' ||
          this.state.nominationFormCategory === 'parliamentary_nomination'
        ) {
            this.setState({
              success: false,
              loading:true
            });
        }
        if (goNext) {
          if(this.state.nominationFormCategory==='presidential'){
            createAndDownloadPdfNominationForm(this.state.nominationFormCategory,NominationCandidates,partyList);
            setTimeout(() => {
              this.setState({
                success: true,
                loading:false
            });
            }, 4000);
          } else if (this.state.nominationFormCategory === 'parliamentary_nomination') {
            createAndDownloadPdfFormUsingTemplate(this.state.nominationFormCategory, NominationCandidates, partyList);
              setTimeout(() => {
                this.setState({
                  success: true,
                  loading:false
              });
            }, 4000);
          }
        }
      }
    render() {
        const {classes,onSelectFiles,doneElement,supportdoc,closeElement,supportingDocs,handleUploadView} = this.props;
        

        const supportingDocItems = supportingDocs.map(docs => (
          <div>
          <Grid container spacing={12}>
          <Grid item lg={1}>

          {
             supportdoc.map(sdoc => (
              sdoc.id === docs.id ? <div className={classes.done} >
              <DoneOutline onClick={handleUploadView(sdoc.filename)}  color="secondary"/>
              {/* <img src={`http://localhost:9001/src/uploads/${sdoc.filename}`} style={{maxWidth: 60,margin:25}} className="img-fluid" alt="logo" /> */}
              </div> : ' '
            ))
          }           
          
            </Grid>
            <Grid item lg={3}>
              <span>
              <Typography variant="subtitle1" >{docs.doc}</Typography>
            </span>
            </Grid>
            <Grid item lg={2}>
              <span ><FileUpload  value={docs.id} doneElement={doneElement} onSelectFiles={onSelectFiles} /></span>
              
            </Grid>
            <Grid style={{marginLeft:-44}} item lg={1}>
            {
             supportdoc.map(sdoc => (
              sdoc.id === docs.id ? 
              <Typography variant="caption" gutterBottom>
            {sdoc.originalname}<div  className={classes.done}>
            <CloseIcon   color="red"/>
            </div>
           </Typography>
               : ' '
            ))
          } 
            </Grid>
            {/* {docs.id === 'b20dd58c-e5bb-469d-98c9-8711d6da1879' ?
            <Grid item lg={5}>
              <span><FileUpload   style={{textAlign: 'right'}} value={docs.id} doneElement={doneElement} onSelectFiles={onSelectFiles} /></span>
            </Grid> : ' ' } */}
          </Grid>
          <Divider className={classes.divider} variant="middle"/>
          </div>
          ));

      return (
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Download content
              </Typography>
              {/* <Typography variant="h5" component="h2">
                be
                {bull}
                nev
                {bull}o{bull}
                lent
              </Typography> */}
              {/* <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography> */}
              <Typography variant="body2" component="p">
                Please download the appropriate form of nomination for your election.
                <br />
                {'You can upload compleated and signed nomination form down below'}
              </Typography>
            </CardContent>
            <CardActions>
            <Grid container classname={classes.panel_wrapper} spacing={1}>
                    <Grid item xs="3">
                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election"

                            className={classes.textField}
                            onChange={this.handleChangeElection('nominationFormCategory')}
                            error={this.state.errorTextNominationFormCategory === "emptyField"}
                            helperText={this.state.errorTextNominationFormCategory === "emptyField" ? 'Please select your election' : 'Please select your election'}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}

                            margin="normal"
                            variant="filled"
                        >
                            <option >
                                -- Select Election --
                            </option>
                            <option  value='presidential'>
                                    Presidential Election
                            </option>
                            <option  value='parliamentary_nomination'>
                                    Parliamentary Nomination
                            </option>
                        </TextField>
                        </Grid>
                        <Grid style={{marginTop:'7.5px',marginLeft:'-4%'}} item xs="3">
                        {/* <Button variant="contained" onClick = { this.handlePdfGenarationButton }  size="small"  value="Submit&DownloadPdf" color="secondary" className={classes.button}>
                          <DownloadIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                          Download PDF
                        </Button> */}
                        <ProgressButton success={this.state.success} loading={this.state.loading} handleButtonClick={(e) => this.handlePdfGenarationButton(e)} buttonName="Download PDF" />
                        </Grid>
                    </Grid>
            </CardActions>
          </Card>
        {supportingDocItems}
        </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
