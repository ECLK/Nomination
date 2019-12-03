import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
// import { handleChange } from '../../modules/election/state/ElectionAction';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
  },
  Typography: {
    margin: theme.spacing.unit * 1.5,
  },
  legend: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit * 1,
  },
  textField: {
    marginLeft: -theme.spacing.unit * 15,
    textAlign: 'left',
    width: 250,
  },
});

class CheckboxesGroup extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: false,
  };

  render() {
    const { classes, values, handleChange, CallElectionData, errorTextItems } = this.props;
    const { gilad, jason, antoine } = this.state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;
    let today = new Date();
    var TodayFormated = moment(today).format("YYYY-MM-DDTHH:mm");

    return (
      <div className={classes.root}>
        <FormControl  component="fieldset" className={classes.formControl}>
          <FormGroup>
            <form className={classes.container} noValidate>
            <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
            <FormLabel className={classes.legend} component="legend">Nomination Period</FormLabel>
            </Grid>
              <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={4}>
                <Grid item lg={3}>
                  <Typography className={classes.Typography} variant="subtitle1" gutterBottom>Nomination Start</Typography>
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    id="nominationStart"
                    type="datetime-local"
                    defaultValue={values.nominationStart}
                    className={classes.textField}
                    name="nominationStart"
                    value={moment(new Date((CallElectionData.timeLineData) ? CallElectionData.timeLineData.nominationStart : '')).format("YYYY-MM-DDTHH:mm")}
                    onChange={handleChange('nominationStart')}
                    helperText={errorTextItems.errorTextNominationStart === "emptyField" ? 'This field is required!' : errorTextItems.errorTextNominationStart === "emptyField2" ? 'This is not a valid date!' : ''}
                    error={errorTextItems.errorTextNominationStart}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: TodayFormated
                    }}
                  />
                </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                <Grid item lg={3}>
                  <Typography className={classes.Typography} variant="subtitle1" gutterBottom>Nomination End</Typography>
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue={values.nominationEnd}
                    className={classes.textField}
                    name="nominationEnd"
                    value={moment(new Date((CallElectionData.timeLineData) ? CallElectionData.timeLineData.nominationEnd : '')).format("YYYY-MM-DDTHH:mm")}
                    onChange={handleChange('nominationEnd')}
                    helperText={errorTextItems.errorTextNominationEnd === "emptyField" ? 'This field is required!' : errorTextItems.errorTextNominationEnd === "emptyField2" ? 'This is not a valid date!' : ''}
                    error={errorTextItems.errorTextNominationEnd}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: TodayFormated
                    }}
                  />
                </Grid>
                </Grid>
              <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
            <FormLabel className={classes.legend} component="legend">Objection Period</FormLabel>
            </Grid>
              <Grid  container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
              <Grid item lg={3}>
                  <Typography className={classes.Typography} variant="subtitle1" gutterBottom>Objection Start</Typography>
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue={values.objectionStart}
                    className={classes.textField}
                    name="objectionStart"
                    value={moment(new Date((CallElectionData.timeLineData) ? CallElectionData.timeLineData.objectionStart : '')).format("YYYY-MM-DDTHH:mm")}
                    onChange={handleChange('objectionStart')}
                    helperText={errorTextItems.errorTextObjectionStart === "emptyField" ? 'This field is required!' : errorTextItems.errorTextObjectionStart === "emptyField2" ? 'This is not a valid date!' : ''}
                    error={errorTextItems.errorTextObjectionStart}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: TodayFormated
                    }}
                  />
                  </Grid>
                  </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                  <Grid item lg={3}>
                  <Typography className={classes.Typography} variant="subtitle1" gutterBottom>Objection End</Typography>
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue={values.objectionEnd}
                    className={classes.textField}
                    name="objectionEnd"
                    value={moment(new Date((CallElectionData.timeLineData) ? CallElectionData.timeLineData.objectionEnd : '')).format("YYYY-MM-DDTHH:mm")}
                    onChange={handleChange('objectionEnd')}
                    helperText={errorTextItems.errorTextObjectionEnd === "emptyField" ? 'This field is required!' : errorTextItems.errorTextObjectionEnd === "emptyField2" ? 'This is not a valid date!' : ''}
                    error={errorTextItems.errorTextObjectionEnd}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: TodayFormated
                    }}
                  />
                  </Grid>
                  </Grid>
            </form>
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {

};

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CheckboxesGroup));