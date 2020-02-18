import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getNominationList } from '../../modules/nomination/state/NominationAction';
import SummeryView from '../SummeryView';


const styles = theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	listItem: {
        padding: 0,
        flexWrap: 'wrap'
	},
	button: {
		margin: theme.spacing.unit,
        width: '100%',
        marginLeft: 0
    },
    listItemText: {
        width: '50%'
    },
    list: {
        width: '100%'
    },
    rightText: {
        width: '50%',
        textAlign: 'right'
	},
	expansion: {
        backgroundColor: '#c4e200',
        width: "100%"
	},
	margin: {
		marginTop: theme.spacing.unit * 2,
	  },
	});

	class ControlledExpansionPanels extends React.Component {
		state = {
			expanded: null,
			division: [//TODO : remove this dummy array after demo period
				{
				code: "14",
				electionId: "43680f3e-97ac-4257-b27a-5f3b452da2e6",
				id: "1a29913e-3bc4-4a48-a35e-88f8a874e623",
				name: "Trincomalee",
				noOfCandidates: 7,
				nomination : [
						{
							id: "07d4d5d9-fd83-473f-836c-a5a565d75ed1",
							status: "DRAFT"
						}
				]					
			},
			{
				code: "1",
				electionId: "43680f3e-97ac-4257-b27a-5f3b452da2e6",
				id: "65fa860e-2928-4602-9b1e-2a7cb09ea83e",
				name: "Colombo",
				noOfCandidates: 22,
				nomination : [
					{
						id: "135183e2-a0ca-44a0-9577-0d2b16c3217f",
						status: "DRAFT"
					}
			]
			}
			],
			nominationId:'dummyId'
		};

		handleChange = panel => (event, expanded) => {
			this.setState({
				expanded: expanded ? panel : false,
			});
		};

		componentWillMount() {
			const {getNominationList} = this.props;
			getNominationList();
	}

	redirectToTarget = (id) => {
		this.setState({ nominationId: id });
	}

	render() {
		const { classes,division } = this.props;
		const {props} = this;
		const { expanded } = this.state;
debugger;

		return (
			<div className={classes.root}>
				{
					division.map((division, index) =>
						<ExpansionPanel key={index} expanded={expanded === 'panel' + division.code} onChange={this.handleChange('panel' + division.code)}>
							{division.nomination.map((nomination) => (
							<ExpansionPanelSummary style={nomination.status === 'SUBMIT' ? {backgroundColor: '#b368c9'} : nomination.status === 'NEW' ? {backgroundColor: '#e9dced'} : {backgroundColor: '#e1b3ef'}} expandIcon={<ExpandMoreIcon />}>
								<Typography  className={classes.heading}>{division.name}</Typography>
								{/* <Typography style={{textAlign: "right"}} className={classes.secondaryHeading}>Division Code : {division.code}</Typography> */}
							</ExpansionPanelSummary>
							))}
							<ExpansionPanelDetails>

								{/* details in a list format */}
								<List className={classes.list}>
									<ListItem className={classes.listItem} key={index}>
										<ListItemText className={classes.listItemText} primary="No of Candidates" />
										<Typography className={classes.rightText}>
										<Chip style={{paddingLeft: 5,paddingRight:5,fontSize:20}}
											label={division.currentCandidateCount+ " / " + division.noOfCandidates} 
										/> 
										</Typography>
									</ListItem>
									{
										division.nomination.map((nomination, index) =>
											<ListItem className={classes.listItem} key={index}>
												<ListItemText className={classes.listItemText} primary="Status" />
												<Typography className={classes.rightText}>
												<Chip style={{marginTop: 5,paddingLeft: 5,paddingRight:5,fontSize:15}}
													label={nomination.status === 'SUBMIT' ? 'SUBMITTED' : nomination.status === 'NEW' ? 'NEW' : 'DRAFT'}
												/>
												</Typography>
												{ !nomination.paymentStatus ?
												<ListItem className={classes.listItem} key={index}>
													<Typography style={{color:'red',marginTop:20}}>Security deposit hasn't been paid,Please make the payment to proceed!</Typography>
										{/* <SummeryView
										variant={"info"}
										className={classes.margin}
										message={"Please make the payment to proceed!"}
										style={{marginBottom:'10px'}}
										/> */}
										</ListItem> : ' '
											}
												<div>
												{
													
										division.nomination.length < 1 &&
										<Button variant="contained" color="primary" onClick={() => this.redirectToTarget(nomination.id)} className={classes.button} >Create</Button>
									}
									{
										
										division.nomination.length > 0 &&
										<div>
										{nomination.paymentStatus ? 
										<Link style={{ textDecoration: 'none' }} to={{ pathname: "nomination", state: { id: nomination.id,status: nomination.status,divisionId: division.id,division: division.name,candidateCount:division.noOfCandidates }}}  >
										<Button  variant="contained" color="primary"  className={classes.button} >{nomination.status === 'SUBMIT' ? 'VIEW' : nomination.status === 'NEW' ? 'CREATE' : 'EDIT'}</Button>
										</Link> : 
										<Button disabled={true} variant="contained" color="primary"  className={classes.button} >{nomination.status === 'SUBMIT' ? 'VIEW' : nomination.status === 'NEW' ? 'CREATE' : 'EDIT'}</Button>
										}
										</div>
									}
									</div>
											</ListItem>
										)
									}
									
								</List>
								
							</ExpansionPanelDetails>
						</ExpansionPanel>
					)
				}
			</div>
		);
	}
};

ControlledExpansionPanels.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
	const {getNominationList} = Nomination;
	const division = Nomination.nominationList;
	const nominationPaymentValidation = Nomination.nominationPaymentValidation;
	
	return {division,getNominationList,nominationPaymentValidation};
  };
  
  const mapActionsToProps = {
	getNominationList
  };

  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ControlledExpansionPanels));
