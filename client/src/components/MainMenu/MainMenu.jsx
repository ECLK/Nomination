import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/AccountBox';
import NominationIcon from '@material-ui/icons/Description';
import ObjectionIcon from '@material-ui/icons/PanTool';
import Button from '@material-ui/core/Button';
import {withRouter, Redirect } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/PermIdentity';
import PowerSetting from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: 2000,
    display: 'flex'
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  logoutBtn: {
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    goToLogin: false,

  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLogout = () => {
    this.setState({ goToLogin: true });
  };

  render() {
    debugger;
    const { classes, theme } = this.props;
    if (this.state.goToLogin) return <Redirect to="/login" />;
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)scope\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var scopes = decodeURIComponent(cookieValue).split(/ +/g)
    var indexNomination = scopes.findIndex(x => x === 'nomination_edit');

    if(scopes.length>1){
      var tempNomination = scopes[indexNomination];
      scopes[indexNomination] = scopes[0];
      scopes[0] = tempNomination;
    }
console.log("ffffffffffffffffff",scopes);
    var user_role = sessionStorage.getItem('role');

    const list = scopes.map((scope) => {
      switch (scope) {
        case "nomination_edit":
          return <div>
            <ListItem button key="Nomination" component={Link} to='/create-nomination' selected={this.props.location.pathname === "/create-nomination"} >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Create Nomination" />
            </ListItem>
          </div>
        case "objection_edit":
          return <ListItem button key="Objection" component={Link} to='/objection' selected={this.props.location.pathname === "/objection"}>
            <ListItemIcon><ObjectionIcon /></ListItemIcon>
            <ListItemText primary="Create Objection" />
          </ListItem>
      }
    });

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <ListItem button key="Home" component={Link} to='/home' selected={this.props.location.pathname === "/home"} >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {list}
      </div >
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography  variant="h6" color="inherit" noWrap>
              {this.props.title}
            </Typography>

            <div style={{flex:1}}></div>
            
            <Button color="inherit">
              <PersonIcon style={{marginRight:5}}/>
              {(user_role==='party_user') ? 'Party User' : (user_role==='ig_user') ? 'IG user' : ''}
            </Button>
            <Button onClick={this.handleLogout} color="inherit">
              <PowerSetting style={{marginRight:5}}/>
              Logout
            </Button>

          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(ResponsiveDrawer));
