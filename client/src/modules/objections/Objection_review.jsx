import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import ListIcon from  '@material-ui/icons/List';
import Block from '@material-ui/icons/Block';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import AttachIcon from '@material-ui/icons/AttachFile';
import CriteriaIcon from '@material-ui/icons/Toc';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import {APPROVAL_STATE} from  './state/ObjectionTypes';
import { getObjections, onChangeApproval, onChangeObjectionNotes } from './state/ObjectionAction';

const styles = theme => ({
  root: {
    padding: 24,
    paddingLeft: 264,
  },
  heading: {
    padding: 24,
  },
  dropDown: {
    paddingBottom: 10,
    paddingTop: 24,
  },
  green_icon: {
    color: "green",
  },
  orange_icon: {
    color: "orange",
  },
  capitalize_text: {
    "text-transform": "capitalize",
  },
  panel_wrapper: {
    "min-width": 800,
  },
  left_icon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  green_button: {
    color: "darkgreen",
  },
  red_button: {
    color: "firebrick",
  },
  notes: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  view_nomination_btn: {
    "text-transform": "none",
    "margin": 0,
    "padding": 0,
    "text-align": "left",
  },
  objection_notes_btn: {
    marginRight: '10%',
  },
  buttonGroup: {
    marginLeft: '35%',
  },
  iconButton: {
    marginRight: '60%',
  }
  
  
});

class ObjectionReview extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      open: true,
      expandedPanelIndex: -1,
      objections: [],

    };
  }

  handleNoteChange = id => event => {
    const {onChangeObjectionNotes} = this.props;
    onChangeObjectionNotes(id, event.target.value);
  };

  componentDidMount() {
    const {getObjections} = this.props;
    getObjections();
  }

  togglePanel = panelIndex => (event, didExpand) => {
    this.setState({
      expandedPanelIndex: didExpand ? panelIndex : -1,
    });
  };

  changeObjectionStatus = (objectionId, status) => {
    const {onChangeApproval} = this.props;
    onChangeApproval(objectionId, status);
  };

  viewNomination = () => {
    //ToDo: view selected nomination. need to check how we going to display this. will this be an overlay? or route to other page?
  };

  saveNote = () => {
    //ToDo: repository call needs to be implemented to update/save note for given objection
  };

  render(){
    const {classes, objections} = this.props;
    const {expandedPanelIndex} = this.state;

    const elections = [{
      "election_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
      "election_name": "2019 Parliamentary",
    }, {
      "election_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
      "election_name": "2020 Provincial",
    }];

    let selectedElection = this.state.selectedElection;
    if (!selectedElection) {
      selectedElection = elections.length > 0 && elections[0].election_id;
    }

    const electionSelector = elections.map(election => (
      <MenuItem value={election.election_id}>{election.election_name}</MenuItem>));

    const objectionReviewElements = objections.map((objection, i) => (
      <ExpansionPanel expanded={ expandedPanelIndex === i } onChange={this.togglePanel(i)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="8">
              {/* <Typography className={classes.heading}>{objection.objection_id}</Typography> */}
              <Typography className={classes.heading}>{objection.created_date}</Typography>

            </Grid>
            <Grid item xs="4">
            <Typography className={classes.heading}>{"Objected By : "+objection.objected_by}</Typography>

              {/* <Button
                variant={ objection.status==="approved" ? "contained" : "outlined" }
                disabled={ objection.status==="approved" }
                onClick={ () => { this.changeObjectionStatus(objection.objection_id, APPROVAL_STATE.APPROVED ) }}
                className={classNames(classes.button, classes.green_button)}>
                {objection.status==="approved" ? "Approved" : "Approve"}
                <Done className={classes.left_icon} />
              </Button>

              <Button
                variant={ objection.status==="rejected" ? "contained" : "outlined" }
                disabled={ objection.status==="rejected" }
                onClick={ () => { this.changeObjectionStatus(objection.objection_id, APPROVAL_STATE.REJECTED ) }}
                className={classNames(classes.button, classes.red_button)}>
                {objection.status==="rejected" ? "Rejected" : "Reject"}
                <Block className={classes.left_icon} />
              </Button> */}
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="6">
              <List component="nav">
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon/>
                  </ListItemIcon>
                  <ListItemText primary={objection.created_date} secondary="Created Date"/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DateRangeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={objection.created_by} secondary="Created By"/>
                </ListItem>
                <ListItem>
                  <Button className={classNames(classes.button, classes.view_nomination_btn)}
                          color="primary"
                          onClick={ () => { this.viewNomination(); }}>
                  <ListItemIcon>
                    <InfoIcon/>
                  </ListItemIcon>
                  <ListItemText primary={objection.nomination} secondary="Objected Nomination"/>
                  </Button>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs="6">
              <ListItem>
                  <ListItemIcon>
                    <CriteriaIcon/>
                  </ListItemIcon>
                  <ListItemText primary={objection.objection_criteria} secondary="Objection Criteria"/>
                  <IconButton className={classes.iconButton} color="primary"  aria-label="Add to shopping cart">
                  <AttachIcon />
                </IconButton>
                </ListItem>
                
              <TextField
                id="outlined-textarea"
                label="Objection"
                rows="8"
                rowsMax="14"
                value={objection.objection}
                onChange={this.handleNoteChange(objection.objection_id)}
                placeholder="Placeholder"
                multiline
                className={classes.notes}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-textarea"
                label="Comments"
                rows="8"
                rowsMax="14"
                value={objection.notes}
                onChange={this.handleNoteChange(objection.objection_id)}
                placeholder="Placeholder"
                multiline
                className={classes.notes}
                margin="normal"
                variant="outlined"
              />
              <Typography className={classes.buttonGroup}>
                <Button className={classNames(classes.button, classes.objection_notes_btn, classes.green_button)}
                                                 onClick={ () => { this.saveNote(); }} >
                  <Done className={classes.left_icon} /> Save 
                </Button>
                <Button
                variant={ objection.status==="approved" ? "contained" : "outlined" }
                disabled={ objection.status==="approved" }
                onClick={ () => { this.changeObjectionStatus(objection.objection_id, APPROVAL_STATE.APPROVED ) }}
                className={classNames(classes.button, classes.green_button)}>
                {objection.status==="approved" ? "Approved" : "Approve"}
                <Done className={classes.left_icon} />
              </Button>
              <Button
                variant={ objection.status==="rejected" ? "contained" : "outlined" }
                disabled={ objection.status==="rejected" }
                onClick={ () => { this.changeObjectionStatus(objection.objection_id, APPROVAL_STATE.REJECTED ) }}
                className={classNames(classes.button, classes.red_button)}>
                {objection.status==="rejected" ? "Rejected" : "Reject"}
                <Block className={classes.left_icon} />
              </Button>
              </Typography>
            </Grid>
          </Grid>
          <br />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
        <Typography variant="h5" component="h2">
          Objection Review
        </Typography>
        <div className={classes.container}>

          <form className={classes.dropDown} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="election-select">Election</InputLabel>
              <Select
                value={selectedElection}
                onChange={this.handleChangeElection}
                inputProps={{
                  name: 'election',
                  id: 'election-select',
                }}
              >
                {electionSelector}

              </Select>
            </FormControl>
          </form>

          <br/>
          <br/>

          <div style={{width: '100%'}}>
            {objectionReviewElements}
          </div>
          <br/>

        </div>
      </div>
    );
    
  }

}

ObjectionReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Objection}) => {
  /*const {all_nominations} = Nomination;
   return {all_nominations}*/
  const {objections} = Objection;
  return {objections};
};

const mapActionsToProps = {
  getObjections,
  onChangeApproval,
  onChangeObjectionNotes,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ObjectionReview));