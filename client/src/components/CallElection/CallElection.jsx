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
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Call Election
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="filled-name"
                            label="Election Name "
                            className={classes.textField}
                            helperText="Please type your Election Name"
                            value={this.state.electionName}
                            onChange={this.handleChange('electionName')}
                            margin="normal"
                            variant="filled"
                        />

                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election Module"

                            className={classes.textField}
                            value={this.state.currency}
                            onChange={this.handleChange('ElectionModule')}
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
                    <Typography className={classes.textCallElection} component="p">
                        Election ID :EL2018111112

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Next</Button>
                </CardActions>
            </Card>
        );
    }
}

FilledTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);
