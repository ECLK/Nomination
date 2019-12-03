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
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ProfileIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/PermIdentity';
import PowerSetting from '@material-ui/icons/PowerSettingsNew';

import NominationIcon from '@material-ui/icons/Description';
import ObjectionIcon from '@material-ui/icons/PanTool';
import Button from '@material-ui/core/Button';
import { withRouter, Redirect } from 'react-router-dom'


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
    //flex: 1
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
    const { classes, theme } = this.props;
    if (this.state.goToLogin) return <Redirect to="/login" />;
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)scope\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var scopes = decodeURIComponent(cookieValue).split(/ +/g)
    // var indexA = scopes.findIndex(x => x === 'election_template_edit');
    // var indexCall = scopes.findIndex(x => x === 'call_election_edit');


    // if(scopes.length>1){
    //   var temp = scopes[indexA];
    //   var temp2 = scopes[0];

    //   scopes[indexA] = scopes[scopes.length - 1];
    //   scopes[scopes.length - 1] = temp;
    //   scopes[0] = scopes[indexCall];
    //   scopes[indexCall] = temp2;
    // }
    var user_role = sessionStorage.getItem('role');
console.log("scopes",scopes);
    
    //  var scopes = ['home','election_edit','nomination_approval','election_approval','objection_approval','payment_approval','template_edit','profile'];
    const list = scopes.map((scope) => {
      switch (scope) {
        case "call_election_edit":
          return <ListItem button key="Call_election" component={Link} to='/admin/call-election' selected={this.props.location.pathname === "/admin/call-election"} >
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Call Election" />
          </ListItem>
        case "election_template_edit":
          return <div><ListItem button key="Create_election" component={Link} to='/admin/create-election-home' selected={this.props.location.pathname === "/admin/create-election-home"}>
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Create Election" />
          </ListItem></div>
        case "nomination_approval_edit":
          return <ListItem button key="Nomination" component={Link} to='/admin/nomination-review' selected={this.props.location.pathname === "/admin/nomination-review"}>
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Nomination Approval" />
          </ListItem>
        case "call_election_approve_edit":
          return <ListItem button key="Election_review" component={Link} to='/election-process-review'
            selected={this.props.location.pathname === "/election-process-review"}>
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Election Approval" />
          </ListItem>
        case "objection_approve_edit":
          return <ListItem button key="Objection_review" component={Link} to='/admin/objection-review' selected={this.props.location.pathname === "/admin/objection-review"} >
            <ListItemIcon><ObjectionIcon /></ListItemIcon>
            <ListItemText primary="Objection Approval" />
          </ListItem>
        // case "payment_approve_edit":
        //   return <ListItem button key="Payment_review" component={Link} to='/admin/payment-review'
        //     selected={this.props.location.pathname === "/admin/payment-review"}>
        //     <ListItemIcon><MoneyIcon /></ListItemIcon>
        //     <ListItemText primary="Payment Approval" />
        //   </ListItem>
        case "election_template_approval":
          return <ListItem button key="template_review" component={Link} to='/admin/template-review'
              selected={this.props.location.pathname === "/admin/template-review"}>
          <ListItemIcon><MoneyIcon/></ListItemIcon>
          <ListItemText primary="Election Template Approval"/>
          </ListItem>
        case "payment_edit":
          return <ListItem button key="Payment" component={Link} to='/admin/nomination-payment-list' selected={this.props.location.pathname === "/admin/nomination-payment-list"}>
          <ListItemIcon><MoneyIcon /></ListItemIcon>
          <ListItemText primary="Nomination Payment" />
        </ListItem>
      }
    });

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
        <ListItem button key="Home" component={Link} to='/admin/home' selected={this.props.location.pathname === "/admin/home"} >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {list}
          {/* <ListItem button key="Profile" component={Link} to='/profile' selected={this.props.location.pathname === "/profile"}>
            <ListItemIcon><ProfileIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem> */}
        </List>
      </div>
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
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.title}
            </Typography>
            <div style={{ flex: 1 }}></div>

            <Button color="inherit">
              <PersonIcon style={{ marginRight: 5 }} />
              {(user_role === 'cg_user') ? 'EC-Chairman' : (user_role === 'ac_user') ? ' Commissioner-General' : ''}
            </Button>
            <Button className={classes.logoutBtn} onClick={this.handleLogout} color="inherit">
              <PowerSetting style={{ marginRight: 5 }} />
              Logout
            </Button>

          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="permanent"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                // paper: classes.drawerPaper,
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
