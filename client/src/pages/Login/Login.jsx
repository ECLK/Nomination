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
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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



class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            username: '',
            password: '',
            validate: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ validate: true });
        const { username, password } = this.state;


        // following is written to manage dummy login for usernames with 'user' or 'admin'
        if (username.length > 0){
            if (username.includes("ig_user")) {
                sessionStorage.setItem('role', 'ig_user');
                this.props.history.push('/home');

            } else if (username.includes("party_user")) {
                sessionStorage.setItem('role', 'party_user');
                this.props.history.push('/home');
            }
            else if (username.includes("users")) {
                sessionStorage.setItem('role', 'user');
                this.props.history.push('/home');
            }
            else if (username.includes("admin")) {
                sessionStorage.setItem('role', 'admin');
                this.props.history.push('/admin');
            }
            else if (username.includes("cg_user")) {
                sessionStorage.setItem('role', 'cg_user');
                this.props.history.push('/admin');
            }
            else if (username.includes("ac_user")) {
                sessionStorage.setItem('role', 'ac_user');
                this.props.history.push('/admin');
            }
        }

        // realod to get proper view of the url
        window.location.reload(); 
    };


    handleInputChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value,
        });
    };

    render() {

            const { classes } = this.props;

            return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Email Address</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                        {/*<Paper className={classes.paper}>
                        <pre><b>Default Login Credentials </b></pre>
                        <pre>admin username : admin</pre>
                        <pre>user username  : user</pre>
                        <pre>password       : pass</pre>
                        </Paper>*/}
                    </form>
                </Paper>
                
            </main>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
