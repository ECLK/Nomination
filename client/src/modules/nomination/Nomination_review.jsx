import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { APPROVAL_STATE } from './state/NominationTypes';
import { getNominations, onChangeApproval, getApproveElections, getTeams } from './state/NominationAction';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Alarm from '@material-ui/icons/Alarm';
import Done from '@material-ui/icons/Done';
import Block from '@material-ui/icons/Block';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Remark from '@material-ui/icons/Create';
import CommentIcon from '@material-ui/icons/InsertComment';
import IconButton from "@material-ui/core/IconButton";
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 240;


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
  container: {
    // padding: 10
  },
  candidates_table: {
    width: "97%",
    "min-width": 600,
  },
  candidate_table_cell: {

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

});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);
class NominationReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      expandedPanelIndex: -1,
      nominations: [],
      selectedElection: '',
      open: false,
      reviewNote: '',
      nominationId: '',
      status: '',
      selectedParty: 'All',
      open:false
    }
  }


  componentDidMount() {
    const { getNominations, getApproveElections, getTeams,nominations } = this.props;
    this.setState({
      nominations: nominations,
    });
    getApproveElections();
    getTeams();
  }

  togglePanel = panelIndex => (event, didExpand) => {
    this.setState({
      expandedPanelIndex: didExpand ? panelIndex : -1,
    });
  };

  changeNominationStatus = () => {
    const { onChangeApproval } = this.props;
    onChangeApproval(this.props.nominations,this.state.nominationId, this.state.status, this.state.reviewNote);
    this.onCloseModal();
  };

  handleChangeElection = (event) => {
    const { getNominations } = this.props;

    this.setState({ selectedElection: event.target.value, });
    getNominations(event.target.value, this.state.selectedParty);

  };
  handleChangeParty = (event) => {
    const { getNominations } = this.props;
    this.setState({ selectedParty: event.target.value, });
    getNominations(this.state.selectedElection, event.target.value);

  };
  findIndex = (nominations, id) => {
    return nominations.findIndex(x => x.id === id);
  };
  
  findApprovalIndex(id) {
    const {nominations} = this.props;
    return nominations.findIndex(x => x.id === id);
  }
  onOpenModal = (nominationId, status) => {
    const {nominations} = this.props;
    const index = this.findApprovalIndex(nominationId);
    
    this.setState({
      open: true,
      nominationId: nominationId,
      status: (nominations[index].approval_status===status) ? '2ND-APPROVE' : status,
      reviewNote: ''
    });
  };
  onOpenModal2 = (nominationId, status) => {
    const {nominations} = this.props;
    const index = this.findApprovalIndex(nominationId);
    this.setState({
      open2: true,
      nominationId: nominationId,
      status: status,
      reviewNote: (nominations[index].reviewNote) ? nominations[index].reviewNote : ''
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  onCloseModal2 = () => {
    this.setState({ open2: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes, nominations, ApproveElections, partyList } = this.props;
    const { expandedPanelIndex } = this.state;
    let selectedElection = this.state.selectedElection;
    if (!selectedElection) {
      selectedElection = ApproveElections.length > 0 && ApproveElections[0].id;
    }

    let selectedParty = this.state.selectedParty;
    if (selectedParty !== 'All') {
      selectedParty = partyList.length > 0 && partyList[0].team_id;
    }

    const nomination = nominations.map((record) => {
      partyList.map((team)=>{
        if(record.party===team.team_id){
          record.party = team.team_name;
        }
      })
      return record;
    });


    const CandidateRow = (props) => {
      const { classes, candidate } = props;
      return (
        <React.Fragment>
          <TableRow key={candidate.nic}>
            <TableCell className={classes.candidate_table_cell} align="left">
              {candidate.nic}
            </TableCell>
            <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
              {candidate.name}
            </TableCell>
            <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
              {candidate.occupation}
            </TableCell>
            <TableCell className={classes.candidate_table_cell} align="left">
              {candidate.address}
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    };

    const nominationElements = nomination.map((nomination, i) => (
      <ExpansionPanel expanded={expandedPanelIndex === i} onChange={this.togglePanel(i)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="4">
              {/* <Typography className={classes.heading}>{nomination.nomination_id}</Typography> */}
              <Typography className={classes.heading}>{nomination.party} | {nomination.division_name}</Typography>

            </Grid>
            <Grid item xs="4">
              <Typography className={classes.heading}>Total no of candidate : {nomination.candidates.length}</Typography>
            </Grid>
            <Grid item xs="4">
            
             
                <CommentIcon style={{marginRight:10,marginBottom:-2}} onClick={() => { this.onOpenModal2(nomination.id, APPROVAL_STATE.APPROVED) }} className={classes.left_icon} />
              
              <Button
                variant={nomination.approval_status === "1ST-APPROVE" ? "contained" : "outlined"}
                disabled={nomination.approval_status === "1ST-APPROVEd"}
                onClick={() => { this.onOpenModal(nomination.id, APPROVAL_STATE.APPROVED) }}
                className={classNames(classes.button, classes.green_button)}>
                {nomination.approval_status === "1ST-APPROVE" ? "Approved" : "Approve"}
                <Done className={classes.left_icon} />
              </Button>

              <Button
                variant={nomination.approval_status === "REJECT" ? "contained" : "outlined"}
                disabled={nomination.approval_status === "REJECTd"}
                onClick={() => { this.onOpenModal(nomination.id, APPROVAL_STATE.REJECTED) }}
                className={classNames(classes.button, classes.red_button)}>
                {nomination.approval_status === "REJECT" ? "Rejected" : "Reject"}
                <Block className={classes.left_icon} />
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="10">
              <Table className={classes.candidates_table}>
                <TableHead>
                  <TableCell align="left">NIC</TableCell>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="left">Occupation</TableCell>
                  <TableCell align="left">Address</TableCell>
                </TableHead>
                <TableBody>
                  {
                    nomination.candidates.map((candidate, index) =>
                      <CandidateRow candidate={candidate} classes={classes} />)
                  }
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs="2">
              <Grid container spacing={0}>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      {nomination.payment_status === "paid" ? <Done className={classes.green_icon} /> :
                        <Alarm className={classes.orange_icon} />}
                    </ListItemIcon>
                    <ListItemText className={classes.capitalize_text}
                      primary={nomination.payment_status === "paid" ? "Payment Reviewed" : "Payment Review Pending"}
                      secondary="Objection Status" />
                    {/* <ListItemText className={classes.capitalize_text}
                                  primary={nomination.payment_status}
                                  secondary="Payment Status"/> */}
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {nomination.objection_status === "APPROVED" ? <Done className={classes.green_icon} /> :
                        <Alarm className={classes.orange_icon} />}
                    </ListItemIcon>
                    <ListItemText className={classes.capitalize_text}
                      primary={nomination.objection_status === "APPROVED" ? "Objection Reviewed" : "Objection Review Pending"}
                      secondary="Objection Status" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <br />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    const menuItems = ApproveElections.map(election => (
      <MenuItem value={election.id}>{election.name}</MenuItem>
    ));
    const partyItems = partyList.map(party => (
      <MenuItem value={party.team_id}>{party.team_name}</MenuItem>
    ));

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
        <Typography variant="h5" component="h2">
          Nomination Review
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
                {menuItems}
              </Select>
            </FormControl>
            <FormControl style={{ marginLeft: 100 }} className={classes.formControl}>
              <InputLabel htmlFor="election-select">Party</InputLabel>
              <Select
                value={this.state.selectedParty}
                onChange={this.handleChangeParty}
                inputProps={{
                  name: 'party',
                  id: 'party-select',
                }}
              >
                <MenuItem value='All'> All </MenuItem>
                {partyItems}
              </Select>
            </FormControl>
          </form>
          <div>
            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
             
              <DialogTitle id="alert-dialog-slide-title">
              <Remark style={{marginBottom:-4,marginRight:5}} /> {"Remarks"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <TextField
                    style={{ width: 400 }}
                    id="outlined-multiline-flexible"
                    label="Please enter your remarks here"
                    multiline
                    rowsMax="4"
                    value={this.state.reviewNote}
                    onChange={this.handleChange('reviewNote')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button value="OK" onClick={this.changeNominationStatus} color="primary">
                  Save
            </Button>
                <Button onClick={this.onCloseModal} color="primary">
                  Cancel
            </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.open2}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
             
              <DialogTitle id="alert-dialog-slide-title">
              <Remark style={{marginBottom:-4,marginRight:5}} /> {"Remarks"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <TextField
                    style={{ width: 400 }}
                    id="outlined-multiline-flexible"
                    label="Please enter your remarks here"
                    multiline
                    rowsMax="4"
                    value={this.state.reviewNote}
                    onChange={this.handleChange('reviewNote')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* <Button value="OK" onClick={this.changeNominationStatus} color="primary">
                  Save
            </Button> */}
                <Button onClick={this.onCloseModal2} color="primary">
                  Cancel
            </Button>
              </DialogActions>
            </Dialog>
          </div>
          <br />
          <br />

          <div style={{ width: '100%' }}>
            {nominationElements}
          </div>
          <br />

        </div>
      </div>
    );
  }
}

NominationReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Nomination }) => {
  /*const {all_nominations} = Nomination;
  return {all_nominations}*/
  const { getApproveElections } = Nomination;
  const { getTeams } = Nomination;

  const ApproveElections = Nomination.approveElections;
  const partyList = Nomination.partyList;


  const nominations = Nomination.nominations;

  return { nominations, getApproveElections, ApproveElections, getTeams, partyList };
};

const mapActionsToProps = {
  getNominations,
  getApproveElections,
  onChangeApproval,
  getTeams
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationReview));
