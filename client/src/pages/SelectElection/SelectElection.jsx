import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import {getActiveElections} from '../../modules/election/state/ElectionAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});



class SelectElection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            username: '',
            password: '',
            validate: false,
            errorTextElection : '',
            goToConfig:false
        };
    }

    componentDidMount(){
        this.props.getActiveElections();
    }


    handleSubmit = (e) => {
        if(this.state.election==='' || this.state.election==='-- Select Election --' || this.state.election===undefined){
            this.setState({errorTextElection:'emptyField'});
        }else{
            this.setState({goToConfig:true});
        }
        e.preventDefault();
    };

    handleChange = name => event => {
        if(name==='election'){
            this.setState({errorTextElection:''});
        }
        this.setState({
            [name]: event.target.value,
        });
       sessionStorage.setItem("election_id", event.target.value);
    };

    render() {

            const { classes,ActiveElections } = this.props;
            if (this.state.goToConfig) return <Redirect to="/home" />;
            return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="filled-select-currency-native"
                                select
                                label="Election"

                                className={classes.textField}
                                value={this.state.currency}
                                onChange={this.handleChange('election')}
                                error={this.state.errorTextElection === "emptyField"}
                                helperText={this.state.errorTextElection === "asyncValidate" ? 'Please select your election!' : 'Please select your election!'}
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
                                {ActiveElections.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                        </FormControl>
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Next
                        </Button>
                    </form>
                </Paper>
                
            </main>
        );
    }
}

const mapStateToProps = ({ Election }) => {
    const ActiveElections = Election.allActiveElections;
    return { ActiveElections };
};

const mapActionsToProps = {
    getActiveElections
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SelectElection));