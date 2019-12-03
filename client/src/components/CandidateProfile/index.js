import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import Notifier, { openSnackbar } from '../Notifier';
import { getNominationCandidates } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';


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
        marginLeft: theme.spacing.unit*15,
    },
    label: {
        marginLeft: theme.spacing.unit*30,
        padingTop:theme.spacing.unit*30
    },
    submit: {
        marginLeft: theme.spacing.unit
    },

});

const gender = [
    {
        value: '',
        label: '-- Select --',
    },
    {
        value: 'MALE',
        label: 'MALE',
    },
    {
        value: 'FEMALE',
        label: 'FEMALE',
    },

];
const electoralDivisionNames = [
    {
        value: '',
        label: '-- Select --',
    },
    {
        value: 'Kaluthara',
        label: 'Kaluthara',
    },
    {
        value: 'Colombo',
        label: 'Colombo',
    },
    {
        value: 'Gampaha',
        label: 'Gampaha',
    },
    {
        value: 'Kagalla',
        label: 'Kagalla',
    },

];
const electoralDivisionCodes = [
    {
        value: '',
        label: '-- Select --',
    },
    {
        value: 'K001',
        label: 'K001',
    },
    {
        value: 'C002',
        label: 'C002',
    },
    {
        value: 'G003',
        label: 'G003',
    },
    {
        value: 'K002',
        label: 'K002',
    },

];
class TextFields extends React.Component {


    state = {
        nic: '',
        fullName: '',
        preferredName: '',
        nominationId: '',
        dateOfBirth: 876768,
        gender: 'Select',
        occupation:'',
        address:'',
        electoralDivisionName: 'Select',
        electoralDivisionCode: 'Select',
        counsilName: 'cb',

    };

    componentDidMount() {

    }
    


    handleChange = name => event => {
        const { customProps } = this.props;
        this.setState({
            nominationId: customProps
        });
        this.setState({
            [name]: event.target.value,
        });
    };
    
    handleChangeButton = (e) => {
        const { onCloseModal } = this.props;
        if(e.currentTarget.value==="Submit&Clouse"){
            onCloseModal();
            

        }
        }


    handleSubmit = (e) => {
        // console.log(e.currentTarget.value);
        // debugger;
        // this.refs.btn.setAttribute("disabled", "disabled");
        const { customProps,getNominationCandidates } = this.props;
        var postData = {
            nic: this.state.nic,
            fullName: this.state.fullName,
            preferredName: this.state.preferredName,
            dateOfBirth:  Date.parse(this.state.dateOfBirth),
            gender: this.state.gender,
            occupation:this.state.occupation,
            address:this.state.address,
            electoralDivisionName: 'kalutara',
            electoralDivisionCode: 'K01',
            // electoralDivisionName: this.state.electoralDivisionName,
            // electoralDivisionCode: this.state.electoralDivisionCode,
            nominationId: this.state.nominationId,
            counsilName: 'council',
    }
        e.preventDefault();
       
        axios({
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: 'nominations/candidates',
            data: postData
        })
        .then(function (response) {
            // return response.json();
            // console.log("ffff",response.json());
            // openSnackbar({ message: 'Candidate Added Sccessfully...' });
            setTimeout(() => {
                openSnackbar({ message: 'Candidate Added Sccessfully...' });
            }, 1000);
            getNominationCandidates(customProps);
            // resultElement.innerHTML = generateSuccessHTMLOutput(response);
            // alert("sucsess",response);
            // this.onCloseModal();
          })
          .catch(function (error) {
              alert("error",error);
            // resultElement.innerHTML = generateErrorHTMLOutput(error);
          });
    };

    render() {
        const {classes , onCloseModal} = this.props;
        return (
            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                <Grid container spacing={12}>
                <Notifier />
                    <Grid item lg={6}>
                        <TextField

                            id="standard-name"
                            label="NIC"
                            name="nic"
                            ref={(input) => this.input = input}
                            className={classes.textField}
                            value={this.state.nic}
                            onChange={this.handleChange('nic')}
                            margin="normal"
                        />
                    </Grid>

                    <Grid item lg={6}>
                        <TextField
                            id="standard-name"
                            label="Full Name"

                            value={this.state.fullName}
                            onChange={this.handleChange('fullName')}
                            className={classes.textField}
                            margin="normal"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={12}>
                    <Grid item lg={6}>
                        <TextField

                            id="standard-name"
                            label="Preferred Name"
                            className={classes.textField}
                            value={this.state.preferredName}
                            onChange={this.handleChange('preferredName')}
                            margin="normal"
                        />
                    </Grid>
                    {/* <Hidden xsUp> */}
                    <Grid item lg={6}>
                    <TextField
                        id="standard-name"
                        label="Occupation"
                        className={classes.textField}
                        value={this.state.occupation}
                        onChange={this.handleChange('occupation')}
                        margin="normal"
                        />
                    </Grid>
                    {/* </Hidden> */}

                </Grid>
                <Grid container spacing={12}>
                    <Grid item lg={6}>
                        <TextField
                            id="date"
                            label="Date of Birth"
                            type="date"
                            defaultValue="2017-05-24"
                            value={this.state.dateOfBirth}
                            className={classes.textField}
                            onChange={this.handleChange('dateOfBirth')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />


                    </Grid>

                    <Grid item lg={6}>
                    <TextField
                            id="standard-select-currency-native"
                            select
                            label="Gender"
                            className={classes.textField}
                            value={this.state.gender}

                            onChange={this.handleChange('gender')}

                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                           // helperText="Please select your Gender"
                            margin="normal"
                        >
                            {gender.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>


                    </Grid>

                </Grid>

                <Grid container spacing={12}>
                    <Grid item lg={6}>
                    <TextField
                            id="standard-multiline-flexible"
                            label="Address"
                            multiline
                            rowsMax="4"
                            value={this.state.address}
                            onChange={this.handleChange('address')}
                            className={classes.textField}
                            margin="normal"
                        />
                    </Grid>

                    <Grid item lg={6}>
                        
                        {/* <TextField
                            id="standard-multiline-flexible"
                            label="Council Name"
                            multiline
                            rowsMax="4"
                            value={this.state.counsilName}
                            onChange={this.handleChange('counsilName')}
                            className={classes.textField}
                            margin="normal"
                        /> */}
                    </Grid>

                </Grid>
                <Grid container spacing={12}>
                    <Grid item lg={6}>
                    {/* <TextField
                            id="standard-select-currency-native"
                            select
                            label="Electoral Division"
                            className={classes.textField}
                            value={this.state.electoralDivisionName}

                            onChange={this.handleChange('electoralDivisionName')}

                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                           // helperText="Please select your Gender"
                            margin="normal"
                        >
                            {electoralDivisionNames.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField> */}
                    </Grid>

                    <Grid item lg={6}>
                    {/* <TextField
                            id="standard-select-currency-native"
                            select
                            label="Electoral Division Code"
                            className={classes.textField}
                            value={this.state.electoralDivisionCode}

                            onChange={this.handleChange('electoralDivisionCode')}

                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                           
                            margin="normal"
                        >
                            {electoralDivisionCodes.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField> */}
                    </Grid>

                </Grid>
                <Grid container spacing={12}>
                    <Grid className={classes.label}  item lg={12}>
                    <br /><br />
                        <Button variant="contained" type="submit" value="Submit&New" color="primary" className={classes.submit}>
                            Save & New
                        </Button>
                        <Button  variant="contained" onClick = { this.handleChangeButton }  type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                            Save & Close
                        </Button>
                    </Grid>
                </Grid>

            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
    const {getNominationCandidates} = Nomination;
    return {getNominationCandidates};
  };

  const mapActionsToProps = {
    getNominationCandidates
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextFields));