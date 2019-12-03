import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import MoneyIcon from '@material-ui/icons/Payment';
import Security from '@material-ui/icons/Security';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import SummeryView from '../SummeryView';


import axios from 'axios';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  panel_wrapper: {
    "width": '50%',
  },
  margin: {
    marginTop: theme.spacing.unit * 2,
  },
});



class CustomizedTable extends React.Component {
  state = {
      open: true,
      nominations: [],
      candidateCount:'0',

  };
  
  
    componentDidMount() {

    }



  handleDrawerOpen = () => {
      this.setState({ open: true });
  };

  handleDrawerClose = () => {
      this.setState({ open: false });
  };

  render() {
      const { classes,CandidateList,NominationPayments,division,candidateCount,supportdoc,supportingDocs} = this.props;
      const paymentStatus='';
      const rows = this.state.nominations;
      const CandidateRow = (props) => {
        const { classes, candidate } = props;
        return (
          <React.Fragment>
            <TableRow key={candidate.fullName}>
              <TableCell className={classes.candidate_table_cell} align="left">
                  {candidate.fullName}
              </TableCell>
              <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
                  {candidate.address}
              </TableCell>
              <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
                  {candidate.occupation}
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      };


      // var summeryMessage = `You have added ${CandidateList.length} candidates out of ${candidateCount}` + '\n' +`f`; 
      var summeryMessageSuppertingDocs = 'You have attached ' + supportdoc.length + ' supporting documents out of ' + supportingDocs.length + ' please add all the supporting documents before submit';
      var variantSupportindDocs = 'info';
      if(supportingDocs.length===supportdoc.length){
        variantSupportindDocs = 'success';
        summeryMessageSuppertingDocs = 'You have successfully attached all the supporting documents';
      }
      else{
        variantSupportindDocs = 'info';
      }

      var summeryMessage = 'You have added ' + CandidateList.length + ' candidates out of ' + candidateCount + ' please add all the candidates before submit';
      var variant = 'info';
      if(candidateCount===CandidateList.length){
        variant = 'success';
        summeryMessage = 'You have successfully completed the candidate list';
      }else if (candidateCount<CandidateList.length){
        variant = 'warning';
        summeryMessage = 'You have added ' + CandidateList.length + ' candidates out of ' + candidateCount + ' Please recheck candidate list again';
      }
      else{
        variant = 'info';
      }
      return (
        <div>
           <Grid container spacing={16}>
            <Grid item xs="6">
            
            <SummeryView
              variant={variant}
              className={classes.margin}
              message={summeryMessage}
              style={{marginBottom:'10px'}}
            />
            <SummeryView
              variant={variantSupportindDocs}
              className={classes.margin}
              message={summeryMessageSuppertingDocs}
              style={{marginBottom:'20px'}}
            />
            {/* <Typography  component="h2" variant="headline" gutterBottom>
             {division} Province
           </Typography> */}
           {/* <Typography  component="h2" variant="subheading" gutterBottom>
            No of Candidate Nominated :
            <Chip style={{paddingLeft: 5,paddingRight:5,fontSize:20}}
                label={CandidateList.length+ " / " +candidateCount} 
              />  
           </Typography> */}
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs="6">
            <Typography  component="h2" variant="subheading" gutterBottom>
             Candidate Details
           </Typography>
            </Grid>
          </Grid>
         <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="6">
              <Table className={classes.candidates_table}>
                <TableHead>
                  <TableCell align="left">Name of Candidate</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Occupation</TableCell>
                </TableHead>
                <TableBody>
                  {
                    CandidateList.map((candidate, index) =>
                      <CandidateRow candidate={candidate} classes={classes} />)
                  }
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          {paymentStatus === 'Ye' ? (
           <div>                
          <Grid container spacing={16}>
            <Grid item xs="6">
            <Typography style={{marginTop: 10}} component="h2" variant="subheading" gutterBottom>
             Security Deposit Details
           </Typography>
            </Grid>
          </Grid>
         <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="6">
            <List component="nav">
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary={NominationPayments.depositor} secondary="Name of Depositor"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MoneyIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Rs "+NominationPayments.amount} secondary="Security Deposit Amount"/>
                    </ListItem>
                    {/* <ListItem>
                        <ListItemIcon>
                            <Security/>
                        </ListItemIcon>
                        <ListItemText primary={payment.deposit_id} secondary="Security Deposit ID"/>
                    </ListItem> */}
                    <ListItem>
                        <ListItemIcon>
                            <DateRangeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={NominationPayments.depositeDate} secondary="Date of Deposit"/>
                    </ListItem>
                </List>
                 
            </Grid>
          </Grid>
          </div>
           ) : ' '}
     </div>
      );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Nomination }) => {
  const CandidateList = Nomination.getNominationCandidates;
  return { CandidateList };
};

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomizedTable));
