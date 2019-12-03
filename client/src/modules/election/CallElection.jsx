import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';//--
import CardActions from '@material-ui/core/CardActions';//--
import CardContent from '@material-ui/core/CardContent';//--
import Button from '@material-ui/core/Button';//--
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';//--
import { setCallElectionData, handleChangeElectionData, asyncValidateElection } from './state/ElectionAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const styles = theme => ({
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
    textCallElection: {
        marginLeft: '10px',
    }
});
class CallElection extends React.Component {
    state = {
        electionName: '',
        electionModule: '',
        goToConfig: false,
        errorTextElection: '',
        errorTextModule: '',
        exist: false
    };

    constructor(props) {
        super(props);
    }

    async handleSubmit(e) {

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


    handleChange = name => event => {
        if (name === 'electionName') {
            this.setState({ errorTextElection: '' });
        }
        if (name === 'electionModule') {
            this.setState({ errorTextModule: '' });
        }
        this.setState({
            [name]: event.target.value,
        });
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
        const { classes, electionModules } = this.props;
        if (this.state.goToConfig) return <Redirect
            to={{
                pathname: '/admin/active-election',
                state: { name: this.state.electionName, moduleId: this.state.electionModule }
            }} />;
        return (
            <form className={classes.container} onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Call Election
                    </Typography>
                    <Grid container classname={classes.panel_wrapper} spacing={16}>
                    <Grid item xs="6">
                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election Template"

                            className={classes.textField}
                            value={this.state.currency}
                            onChange={this.handleChange('electionModule')}
                            error={this.state.errorTextModule === "emptyField"}
                            helperText={this.state.errorTextModule === "asyncValidate" ? 'Please select your election template!' : 'Please select your election template'}
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
                                -- Select Template --
                                </option>
                            {electionModules.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xs="6">
                        <TextField
                            id="filled-name"
                            label="Election Name "
                            className={classes.textField}
                            value={this.state.electionName}
                            error={this.state.errorTextElection}
                            helperText={this.state.errorTextElection === "emptyField2" ? 'This election name already used!' : 'Please type your Election Name '}
                            onChange={(evt) => {
                                this.handleChange('electionName')(evt)
                                this.asyncValidation('electionName')(evt)
                            }}
                            // onBlur={this.asyncValidation('electionName')}
                            margin="normal"
                            variant="filled"
                        />
                        </Grid>
                    </Grid>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' size="small">Next</Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

CallElection.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const { setCallElectionData } = Election;
    const CallElectionData = Election.CallElectionData;
    return { setCallElectionData, CallElectionData };
};

const mapActionsToProps = {
    setCallElectionData,
    handleChangeElectionData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CallElection));