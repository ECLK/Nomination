import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { API_BASE_URL } from "../../config.js";
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
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});



class CustomizedTable extends React.Component {
  state = {
      open: true,
      nominations: [],
      candidateCount:'0'

  };
  
  
    componentDidMount() {
      console.log(this)
      axios.get(`${API_BASE_URL}/nominations/1/candidates`)
        .then(res => {
          const nominations = res.data;
          const candidateCount = res.data.length;
          localStorage.setItem('candidate',res.data.length)
          this.setState({ nominations });
          this.setState({ candidateCount });
        })
    }



  handleDrawerOpen = () => {
      this.setState({ open: true });
  };

  handleDrawerClose = () => {
      this.setState({ open: false });
  };

  render() {
      const { classes } = this.props;
      const rows = this.state.nominations;
      
      
      return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>NIC</CustomTableCell>
              <CustomTableCell align="right">Full Name</CustomTableCell>
              <CustomTableCell align="right">Preferred Name</CustomTableCell>
              <CustomTableCell align="right">Date of Birth</CustomTableCell>
              <CustomTableCell align="right">Gender</CustomTableCell>
              <CustomTableCell align="right">Occupation</CustomTableCell>
              <CustomTableCell align="right">Address</CustomTableCell>
              <CustomTableCell align="right">Electoral Division</CustomTableCell>
              <CustomTableCell align="right">Electoral Division Code</CustomTableCell>


  
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell align="right">{row.nic}</CustomTableCell>
                  <CustomTableCell align="right">{row.fullName}</CustomTableCell>
                  <CustomTableCell align="right">{row.preferredName}</CustomTableCell>
                  <CustomTableCell align="right">{row.dateOfBirth}</CustomTableCell>
                  <CustomTableCell align="right">{row.gender}</CustomTableCell>
                  <CustomTableCell align="right">{row.occupation}</CustomTableCell>
                  <CustomTableCell align="right">{row.address}</CustomTableCell>
                  <CustomTableCell align="right">{row.electoralDivisionName}</CustomTableCell>
                  <CustomTableCell align="right">{row.electoralDivisionCode}</CustomTableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
