import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { API_BASE_URL } from "../../config.js";
import Axios from 'axios';

const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
});

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

class SimpleList extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			objection: [],
		}

		Axios.get(`${API_BASE_URL}/elections/${sessionStorage.getItem('election_id')}/teams/62fcdfa7-3c5a-405f-b344-79089131dd8e/objections`)
		.then(res => {
			const objection = res.data;
			this.setState({ objection });
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<List component="nav">
				{
					this.state.objection.map((objection, index) => 
						<ListItemLink>
							<ListItemText primary={objection.description.substring(0,30)+'...'}/>
						</ListItemLink>
					)
				}
				</List>
			</div>
		);
	}
}

SimpleList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
