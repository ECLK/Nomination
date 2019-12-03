import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


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
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        backgroundColor: '#dcdfe5',
    }
});

class ScrollableTabsButtonAuto extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes , customProps ,onCloseModal,callElectionPendingElements,callElectionRejectedElements,callElectionApproveElements } = this.props;
        const { value } = this.state;

            return (
                <div className={classes.root}>
                    <AppBar style={{color:'black'}} position="static" >
                        <Tabs
                            classes={{flexContainer: classes.tabs}}
                            value={value}
                            onChange={this.handleChange}
                            // indicatorColor="primary"
                            // textColor="primary"
                            scrollable
                            scrollButtons="auto"
                        >
                            <Tab label="Pending Elections" />
                            <Tab label="Approved Elections" />
                            <Tab label="Rejected Elections" />

    
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>{callElectionPendingElements}</TabContainer>}
                    {value === 1 && <TabContainer>{callElectionApproveElements}</TabContainer>}
                    {value === 2 && <TabContainer>{callElectionRejectedElements}</TabContainer>}

    
                </div>
            );
        
    }
}

ScrollableTabsButtonAuto.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
