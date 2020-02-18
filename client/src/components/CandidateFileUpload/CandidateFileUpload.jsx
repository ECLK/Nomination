import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileUpload from "../common/FileUpload";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {postCandidateSupportDocs} from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import DoneOutline from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Cancel';
import { API_BASE_URL } from "../../config.js";
import axios from "axios";
import download from 'downloadjs';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    divider: {
      marginBottom:30
    },
    label: {
      marginLeft: '50%',
  },
});


class CandidateFileUpload extends React.Component {

  constructor(props) {
        super(props);
    this.state = {
        status: "ready",
        filename:'',
        supportDocId:'3',
        supportdoc:[],
        currentSdocId:''
    }
 }

  handleChange(files) {
        this.setState({
          files: files
        });
  }

  handleSubmit = (e) => {
    var candidateSuppertDocs = {
      candidateSupportDocs:this.state.supportdoc,
      nominationId:this.props.customProps,
      candidateId:this.props.index
    }
        e.preventDefault();
        this.props.postCandidateSupportDocs(candidateSuppertDocs);
};

componentDidMount() {
  this.setState({
    supportdoc: this.props.supportingDocsData
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
    if(evt.target.id==='fe2c2d7e-66de-406a-b887-1143023f8e72'){
      array.map(item =>(
        item.id==='fe2c2d7e-66de-406a-b887-1143023f8e72' ? count++ : count
      )
      )
    }
    if(evt.target.id==='fe2c2d7e-66de-406a-b887-1143023f8e72'){
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

    handleFileDownload = (doc) => {
        axios.get(`${API_BASE_URL}/nominations/candidates/${this.props.index}/support-docs/${doc.id}/download`, {responseType: 'blob'}, {
        }).then((response) => {
            download(new Blob([response.data]), doc.originalname, response.headers['content-type']);
        }).catch(err => {
            console.log(err)
        });
    };

  handleChangeButton = (e) => {
    const { onCloseModal } = this.props;
    if(e.currentTarget.value==="Submit&Clouse"){
        onCloseModal();
    }
    }

  handleUpload = (event) => {
    const data = new FormData();
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    var filesArray = this.state.files;
  };
  showFlagToStyle = (flag) => (
    {display: flag ? "" : "none"}
  );

    render() {
        const {classes} = this.props;
        var names = ['Jake', 'Jon', 'Thruster'];
        const supportingDocs = [{
          "id": "ff4c6768-bdbe-4a16-b680-5fecb6b1f747",
          "doc": "Birth Certificate",
        }, {
          "id": "fe2c2d7e-66de-406a-b887-1143023f8e72",
          "doc": "National Identity Card (NIC)",
        }, {
          "id": "32423",
          "doc": "Declaration of Assets and Liabilities Form",
        }, {
            "id": "15990459-2ea4-413f-b1f7-29a138fd7a97",
            "doc": "Affidavit",
          }
      ];

    const doneElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
    <DoneOutline  color="secondary"/>
    {/* <a download={"filename"} href={"ok"}>filename</a> */}
    </div>);
      const closeElement = (<div  className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
      <CloseIcon ref={this.state.currentSdocId} onClick={this.handleRese} color="red"/>
      {/* <a download={"filename"} href={"ok"}>filename</a> */}
      </div>);

        const supportingDocItems = supportingDocs.map(docs => (
            <Grid style={{width: '100%'}} container spacing={24}>
              <Grid item lg={2}>
                {
                  this.state.supportdoc.map(sdoc => (
                    sdoc.id === docs.id ? <div className={classes.done}>
                    <DoneOutline  color="secondary"/>
                    </div> : ' '
                  ))
                }   
              </Grid>
              <Grid item lg={6}>
                {docs.doc}
              </Grid>
                <Grid item lg={4}>
                    <FileUpload value={docs.id} doneElement={doneElement} onSelectFiles={this.onSelectFiles} />
                    {
                        this.state.supportdoc.map(sdoc => (
                            sdoc.id === docs.id ?
                                <Typography variant="caption" gutterBottom style={{cursor: 'pointer'}} onClick={() => { this.handleFileDownload(sdoc) }}>
                                    {sdoc.originalname}<div  className={classes.done}>
                                    <CloseIcon ref={this.state.currentSdocId} onClick={this.handleRese} color="red"/>
                                </div>
                                </Typography>
                                : ' '
                        ))
                    }
                </Grid>

              <Grid item lg={12}>
                <Divider className={classes.divider} variant="middle"/>
              </Grid>
            </Grid>
            
          ));

      return (
        <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
        {supportingDocItems}
        <Grid container spacing={12}>
                    <Grid className={classes.label}  item lg={12}>
                    <br /><br />
                        <Button variant="contained" type="submit" value="Submit&New" color="primary" className={classes.submit}>
                            Save & New
                        </Button>
                        <Button style={{marginLeft:'5px'}} variant="contained" onClick = { this.handleChangeButton }  type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                            Save & Close
                        </Button>
                    </Grid>
                </Grid>
         </form>
        );
    }
}

CandidateFileUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
    const {postCandidateSupportDocs} = Nomination;
    const supportingDocsData = Nomination.candidateSupportdocLoaded;
    return {postCandidateSupportDocs,supportingDocsData};
  };
  
  const mapActionsToProps = {
    postCandidateSupportDocs,
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateFileUpload));