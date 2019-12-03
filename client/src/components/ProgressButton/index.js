import React from 'react';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
	  root: {
		display: 'flex',
		alignItems: 'center',
	  },
	  wrapper: {
		margin: theme.spacing.unit,
		position: 'relative',
	  },
	  buttonSuccess: {
		backgroundColor: '#5a0eab',
		'&:hover': {
		  backgroundColor: '#5a0eab',
		},
	  },
	  fabProgress: {
		color: '#5a0eab',
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	  },
	  buttonProgress: {
		color: '#5a0eab',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	  },
});


const ProgressButton = (props) => {
  const classes = props.classes;
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
  if (!loading) {
	setSuccess(false);
	setLoading(true);
	timer.current = setTimeout(() => {
	  setSuccess(true);
	  setLoading(false);
	}, 2000);
  }
};


  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={props.handleButtonClick}
        >
          {props.success ? <CheckIcon /> : <DownloadIcon />}
        </Fab>
        {props.loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={props.loading}
          onClick={props.handleButtonClick}
        >
          {props.buttonName}
        </Button>
        {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

ProgressButton.propTypes = {
	classes: PropTypes.object.isRequired,
	buttonName: PropTypes.string.isRequired,
	handleButtonClick: PropTypes.object.isRequired,
};

export default (withStyles(styles)(ProgressButton));
