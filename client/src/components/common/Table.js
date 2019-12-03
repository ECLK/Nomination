import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const renderTableCell = ({ align, text }) => (
  <TableCell key={text} align={align}>
    {text}
  </TableCell>
);

const renderTableRow = row => <TableRow>{row.map(renderTableCell)}</TableRow>;

class TableComponent extends React.Component {
  render() {
    const { classes, headings, rows } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>{headings.map(renderTableCell)}</TableRow>
          </TableHead>
          <TableBody>{rows.map(renderTableRow)}</TableBody>
        </Table>
      </Paper>
    );
  }
}

TableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  headings: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default withStyles(styles)(TableComponent);
