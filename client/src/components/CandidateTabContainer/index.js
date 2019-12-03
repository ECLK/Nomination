import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CandidateProfile from'../CandidateProfile';
import CandidateFileUpload from'../CandidateFileUpload/CandidateFileUpload';
import CandidateProfileUpdate from'../CandidateProfileUpdate';




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
});

class ScrollableTabsButtonAuto extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes , customProps ,onCloseModal,index } = this.props;
        const { value } = this.state;
        if(index){
            return (
                <div className={classes.root}>
                    <AppBar position="static" >
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            // indicatorColor="primary"
                            // textColor="primary"
                            scrollable
                            scrollButtons="auto"
                        >
                            <Tab label="Candidate Profile" />
                            <Tab label="Upload" />
    
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer><CandidateProfileUpdate onCloseModal={onCloseModal} customProps={customProps} index={index}></CandidateProfileUpdate></TabContainer>}
                    {value === 1 && <TabContainer><CandidateFileUpload onCloseModal={onCloseModal} customProps={customProps} index={index}></CandidateFileUpload></TabContainer>}
                    
    
                </div>
            );
        }else{
            return (
                <div className={classes.root}>
                    <AppBar position="static" >
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            // indicatorColor="primary"
                            // textColor="primary"
                            scrollable
                            scrollButtons="auto"
                        >
                            <Tab label="Candidate Profile" />
                            <Tab label="Upload" />
    
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer><CandidateProfile onCloseModal={onCloseModal} customProps={customProps}></CandidateProfile></TabContainer>}
                    {value === 1 && <TabContainer><CandidateFileUpload onCloseModal={onCloseModal} customProps={customProps}></CandidateFileUpload></TabContainer>}
                    
    
                </div>
            );
        }
        
    }
}

ScrollableTabsButtonAuto.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
