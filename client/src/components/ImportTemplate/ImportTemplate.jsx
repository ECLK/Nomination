import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';//--
import CardActions from '@material-ui/core/CardActions';//--
import CardContent from '@material-ui/core/CardContent';//--
import Button from '@material-ui/core/Button';//--
import Typography from '@material-ui/core/Typography';//--
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    textCallElection:{
        marginLeft:'10px',
    }
});

const ElectionModule = [
    {
        value: 'Parliamentary',
        label: 'Parliamentary',
    },
    {
        value: 'Provincial',
        label: 'Provincial',
    },

];

class FilledTextFields extends React.Component {
    state = {
        electionName: 'Parliamentary 2018',
        ElectionModule: 'Parliamentary',
        errorTextModule: '',
        exist: false
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    async handleSubmit(e) {
        debugger;

        if (this.state.exist === true) {
            this.setState({ errorTextElection: 'emptyField2' });
        } else if (this.state.electionName === '' && this.state.electionModule === '') {
            this.setState({ errorTextElection: 'emptyField', errorTextModule: 'emptyField' });
        } else if (this.state.electionName === '') {
            this.setState({ errorTextElection: 'emptyField' });
        } else if (this.state.electionModule === '' || this.state.electionModule === '-- Select Template --') {
            this.setState({ errorTextModule: 'emptyField' });
        } else {
            this.setState({ goToConfig: true });
        }

        const { handleChangeElectionData } = this.props;
        const newElectionModule = { ...this.props.CallElectionData };
        newElectionModule["name"] = this.state.electionName;
        newElectionModule["module_id"] = this.state.electionModule;
        handleChangeElectionData(newElectionModule);
        e.preventDefault();
    };

    asyncValidation = name => event => { 
        if (event.target.value) {
            asyncValidateElection(event.target.value).then((data) => {
                if (data.exist === true) {
                    this.setState({ exist: data.exist });
                } else {
                    this.setState({ exist: data.exist });
                }
            })
        } else {
            this.setState({ exist: false });
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Import Election Module
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                  
                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election Module"

                            className={classes.textField}
                            value={this.state.currency}
                            // onChange={this.handleChange('ElectionModule')}
                            onChange={(evt) => {
                                this.handleChange('ElectionModule')(evt)
                                this.asyncValidation('ElectionModule')(evt)
                            }}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}

                            helperText="Please select your Election Module"
                            margin="normal"
                            variant="filled"
                        >
                            {ElectionModule.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                    </form>
                    {/* <Typography className={classes.textCallElection} component="p">
                        Election ID :EL2018111112

                    </Typography> */}
                </CardContent>
                <CardActions>
                    <Button size="small">Import</Button>
                </CardActions>
            </Card>
            </form>
        );
    }
}

FilledTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);
