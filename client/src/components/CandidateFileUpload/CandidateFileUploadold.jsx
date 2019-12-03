import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


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
        marginLeft: theme.spacing.unit*25,
    },
    fileUpload: {
        marginLeft: theme.spacing.unit*115,
        width: 200,
        marginTop: -5,

    },

});

const gender = [
    {
        value: 'MALE',
        label: 'MALE',
    },
    {
        value: 'FEMALE',
        label: 'FEMALE',
    },

];
class TextFields extends React.Component {


    state = {
        nic: '',
        name_sinhala: '',
        name_tamil: '',
        name_english: '',
        date_of_birth: '',
        gender: '',
        occupation:'',
        address:'',
        selectedFile: null, loaded: 0,
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleselectedFile = event => {
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }


    send = (e) => {
        e.preventDefault();
        console.log('send data');
        axios({
            method: 'post',
            url: '',
            data: this.state
        });


    };

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                <Grid container spacing={8}>
                    <Grid item lg={4}>
                            <label
                            >NIC</label>
                    </Grid>

                    <Grid item lg={4}>
                        <div className={classes.fileUpload}>
                            <input type="file" name="" id="" onChange={this.handleselectedFile} />
                            {/* <button onClick={this.handleUpload}>Upload</button> */}
                            {/* <div> {Math.round(this.state.loaded,2) } %</div> */}
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={8}>
                    <Grid item lg={4}>
                        <TextField

                            id="standard-name"
                            label="Name in Tamil"
                            className={classes.textField}
                            value={this.state.name_tamil}
                            onChange={this.handleChange('name_tamil')}
                            margin="normal"
                        />
                    </Grid>

                   <Grid item lg={4}>
                        <div className="App">
                            <input type="file" name="" id="" onChange={this.handleselectedFile} />
                            {/* <button onClick={this.handleUpload}>Upload</button> */}
                            {/* <div> {Math.round(this.state.loaded,2) } %</div> */}
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={8}>
                    <Grid item lg={4}>
                        <TextField
                            id="date"
                            label="Date of Birth"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            onChange={this.handleChange('date_of_birth')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />


                    </Grid>

                    <Grid item lg={4}>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Gender"
                            className={classes.textField}

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

                <Grid container spacing={8}>
                    <Grid item lg={4}>
                        <TextField

                            id="standard-name"
                            label="Occupation"
                            className={classes.textField}
                            value={this.state.occupation}
                            onChange={this.handleChange('occupation')}
                            margin="normal"
                        />
                    </Grid>

                    <Grid item lg={4}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Address  "
                            multiline
                            rowsMax="4"
                            value={this.state.address}
                            onChange={this.handleChange('address')}
                            className={classes.textField}
                            margin="normal"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={8}>
                    <Grid className={classes.label}  item lg={3}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Cancel
                        </Button>
                        <Button onClick={this.send} variant="contained" color="secondary" className={classes.submit}>
                            Save
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

export default withStyles(styles)(TextFields);
