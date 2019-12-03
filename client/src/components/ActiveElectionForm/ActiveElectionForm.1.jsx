import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ElectionTimeLine from '../ElectionTimeLine/ElectionTimeLine';
import ElectionPayment from '../ElectionPayment/ElectionPayment';
import ElectionWeightage from '../ElectionWeightage/ElectionWeightage';



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Time Line" />
            <Tab label="Payment" />
            <Tab label="Weightage" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ElectionTimeLine/></TabContainer>}
        {value === 1 && <TabContainer><ElectionPayment/></TabContainer>}
        {value === 2 && <TabContainer><ElectionWeightage/></TabContainer>}

      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
