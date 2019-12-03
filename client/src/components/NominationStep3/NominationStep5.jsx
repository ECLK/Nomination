import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import {DropzoneArea} from 'material-ui-dropzone'
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '../ReviewPaper';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
    label: {
        marginLeft: theme.spacing.unit,
    },
    fileUpload: {
        marginLeft: theme.spacing.unit*115,
        width: 200,
        marginTop: -5,

    },
    customlable: {
        width: 1500,
        marginTop: 15,
    

    },
    formControl: {
        margin: theme.spacing.unit * 10,
    },
    FormGroup: {
        margin: theme.spacing.unit,
        width: theme.spacing.unit * 150,
        // height: theme.spacing.unit,

    },
   
});


class TextFields extends React.Component {

    constructor(props){
        super(props);
        this.state={
                //    filesToBeSent:[],
                   files: []
          }
      }
      
    //   onDrop(acceptedFiles, rejectedFiles) {
    //       console.log('Accepted files: ', acceptedFiles);
    //       var filesToBeSent=this.state.filesToBeSent;
    //       filesToBeSent.push({acceptedFiles});
    //       this.setState(acceptedFiles); 
    //       console.log('filesToBeSent : ', this.state);

    //   }
      handleChange(files){
        this.setState({
          files: files
        });
        console.log("==========",this.state)
      }

//       handleClick(event){
//   // console.log("handleClick",event);
//   var self = this;
//   if(this.state.filesToBeSent.length>0){
//     var filesArray = this.state.filesToBeSent;
//     var req = request.post('upload'+'fileupload');
    
//     axios({
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         url: 'nominations/candidates',
//         data: this.state
//     })
//         req.attach(filesArray[0].name,filesArray[0])
    
//     req.end(function(err,res){
//       if(err){
//         console.log("error ocurred");
//       }
//       console.log("res",res);
//       alert("File printing completed")
//     });
//   }
//   else{
//     alert("Please upload some files first");
//   }
// }



handleUpload = (event) => {
    const data = new FormData()
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    var filesArray = this.state.files;
    
    console.log("======sddd========",filesArray[0].name);
    // console.log(data);

    data.append('file', filesArray[0],filesArray[0].name);
    // console.log("==============", data.get('File'));    
    axios
      .post('upload', data, config, {
        // onUploadProgress: ProgressEvent => {
        //   this.setState({
        //     loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        //   })
        // },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }

    render() {
        const {classes} = this.props;
        var names = ['Jake', 'Jon', 'Thruster'];
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                <Grid container spacing={8}>
                    <Paper></Paper>
                    </Grid>
                </Grid>

                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                    <FormControl component="fieldset" className={classes.formControl}>

                                    {  names.map((name) => (
                                             <div>
                                            <form onSubmit={this.handleUpload}>
                                             <Grid container spacing={8}>
                                                <FormGroup className={classes.FormGroup} row>
                                                    <FormLabel component="legend">Upload {name} Down Below :</FormLabel>
                                                    <DropzoneArea  onChange={this.handleChange.bind(this)}  ></DropzoneArea>
                                                    {/* <input type="hidden" onChange={ this.fileSelectHandler } name="supportDocConfDataId" value={name} 
                                                     ref={(input) => { this.actionInput = input }} /> */}
                                                </FormGroup>
                                             </Grid>
                                             <Grid container spacing={8}>
                                                <Grid className={classes.label}  item lg={3}>
                                                    <Button onClick={this.handleUpload}  variant="contained"  value="Submit" color="secondary" className={classes.submit}>
                                                        Upload
                                                    </Button>
                                                </Grid>
                                             </Grid>
                                             </form>
                                            </div>
                            ))}
                            {/* <input type="hidden" onChange={ this.fileSelectHandler } name="nominationId" value="1"
                                                     ref={(input) => { this.actionInput = input }} /> */}
                    </FormControl>
                </Grid>
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
