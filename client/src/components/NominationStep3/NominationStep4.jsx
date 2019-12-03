import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

    state = {
        selectedFile: null,
        files: [],
        arrayvar: [],
        nominationId:'',
        filePath:'',
        supportDocConfDataId:'',

    };

      handleUpload(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        const test = this.state;


        data.append('file', this.state);
    
        axios.post('upload', data)
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
      }

     fileSelectHandler = event => {
        let nominationId = event[0];
        let file = event[0];

        // let fileprops = {
        //     "supportDocConfDataId":supportDocConfDataId,
		// 	"filePath":filePath,
		// 	"nominationId":nominationId
        // }

        // this.setState(prevState => ({
        //     files: [...prevState.files, file]
        //   }))
        // this.state.arrayvar = [...this.state.arrayvar, fileprops];
        this.state.selectedFile = event[0].name;

        // this.setState({
        //     selectedFile: event[0].name,
        //     loaded: 0,
        //   })

        }

    //    async fileChangedHandler = (event) => {
    //         this.setState({selectedFile: event[0].name})
    //         console.log("uuuuuuuuuuu",this.state)
    //       }

           fileChangedHandler = (event) => {
            //  this.setState({ selectedFile: event[0].name });
            // console.log("//////////////",this.state.selectedFile);

            this.setState(
                { selectedFile: event[0].name },
                  () => {
                    console.log(this.state.selectedFile) // Mustkeom
                  }
            );

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
                                                    <DropzoneArea  onChange={ this.fileChangedHandler } ></DropzoneArea>
                                                    <input type="hidden" onChange={ this.fileSelectHandler } name="supportDocConfDataId" value={name} 
                                                     ref={(input) => { this.actionInput = input }} />
                                                </FormGroup>
                                             </Grid>
                                             <Grid container spacing={8}>
                                                <Grid className={classes.label}  item lg={3}>
                                                    <Button  variant="contained" type="submit" value="Submit" color="secondary" className={classes.submit}>
                                                        Upload
                                                    </Button>
                                                </Grid>
                                             </Grid>
                                             </form>
                                            </div>
                            ))}
                            <input type="hidden" onChange={ this.fileSelectHandler } name="nominationId" value="1"
                                                     ref={(input) => { this.actionInput = input }} />
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
