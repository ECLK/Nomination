import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
		margin: theme.spacing.unit*2,
	  },
});
class CircularIndeterminate extends React.Component {
	render() {
		const {classes} = this.props;
		return (
			<div>
			<CircularProgress className={classes.progress} />
			</div>
		);
	}
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(CircularIndeterminate));
