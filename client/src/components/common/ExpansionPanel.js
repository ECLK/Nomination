import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class ExpansionPanelComponent extends React.Component {
  renderExpansionPanel = ({ summary, details, disabled }) => {
    const { classes } = this.props;
    return (
      <ExpansionPanel disabled={disabled}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{summary}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{details}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div className={classes.root}>{data.map(this.renderExpansionPanel)}</div>
    );
  }
}

ExpansionPanelComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

ExpansionPanelComponent.defaultProps = {
  data: []
};

export default withStyles(styles)(ExpansionPanelComponent);
