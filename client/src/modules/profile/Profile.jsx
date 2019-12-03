import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import UserTable from './UserTable';


const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 35,
        overflowX: 'auto',
    },
});

class Home extends React.Component {
    state = {
        open: true,

    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <UserTable></UserTable>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
