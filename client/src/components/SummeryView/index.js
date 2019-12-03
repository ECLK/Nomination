import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
const styles = theme => ({
	success: {
		backgroundColor: green[600],
	  },
	  error: {
		backgroundColor: theme.palette.error.dark,
	  },
	  info: {
		backgroundColor: '#4ea4e6',
	  },
	  warning: {
		backgroundColor: amber[700],
	  },
	  icon: {
		fontSize: 20,
	  },
	  iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	  },
	  message: {
		display: 'flex',
		alignItems: 'center',
	  },
});


class SummeryView extends React.Component {
	
	render() {
		const classes = this.props;
		const { className, message, onClose, variant, ...other } = this.props;
		const Icon = variantIcon[variant];
		debugger;
			return (
				<SnackbarContent
				className={clsx(classes.classes[variant], classes.classes.className)}
				// style={{backgroundColor:'red'}}
				aria-describedby="client-snackbar"
				message={
				  <span id="client-snackbar" className={classes.classes.message}>
					<Icon className={clsx(classes.classes.icon, classes.classes.iconVariant)} />
					{message}
				  </span>
				}
				action={[
				//   <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
				// 	<CloseIcon className={classes.classes.icon} />
				//   </IconButton>,
				]}
				{...other}
			  />
		);
	}
}

SummeryView.propTypes = {
     className: PropTypes.string,
	message: PropTypes.string,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export default (withStyles(styles)(SummeryView));
