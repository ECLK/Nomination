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
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
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
    this.setState({goToLogin:true});
  };
 

  render() {
    const { classes, theme } = this.props;
    if (this.state.goToLogin) return <Redirect to="/login" />;

    var user_role = sessionStorage.getItem('role');


    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {(user_role==='cg_user') ?
          <div>
            <ListItem button key="Home" component={Link} to='/admin/home' selected={this.props.location.pathname === "/admin/home"} >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="Election_review" component={Link} to='/election-process-review'
                      selected={this.props.location.pathname === "/election-process-review"}>
                <ListItemIcon><NominationIcon/></ListItemIcon>
                <ListItemText primary="Election Review"/>
            </ListItem>
            <ListItem button key="Nomination" component={Link} to='/admin/nomination-review' selected={this.props.location.pathname === "/admin/nomination-review"}>
              <ListItemIcon><NominationIcon /></ListItemIcon>
              <ListItemText primary="Nomination Review" />
            </ListItem>
            <ListItem button key="Objection_review" component={Link} to='/admin/objection-review' selected={this.props.location.pathname === "/admin/objection-review"} >
              <ListItemIcon><ObjectionIcon /></ListItemIcon>
              <ListItemText primary="Objection Review" />
            </ListItem>
            <ListItem button key="Payment_review" component={Link} to='/admin/payment-review'
                      selected={this.props.location.pathname === "/admin/payment-review"}>
                <ListItemIcon><MoneyIcon/></ListItemIcon>
                <ListItemText primary="Payment Review"/>
            </ListItem>
            <ListItem button key="template_review" component={Link} to='/admin/template-review'
                      selected={this.props.location.pathname === "/admin/template-review"}>
                <ListItemIcon><MoneyIcon/></ListItemIcon>
                <ListItemText primary="Election Template Approval"/>
            </ListItem>
            
             </div > : (user_role==='ac_user') ?
              <div>
              <ListItem button key="Home" component={Link} to='/admin/home' selected={this.props.location.pathname === "/admin/home"} >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key="Call_election" component={Link} to='/admin/call-election' selected={this.props.location.pathname === "/admin/call-election"} >
              <ListItemIcon><NominationIcon/></ListItemIcon>
                <ListItemText primary="Call Election" />
              </ListItem>
              <ListItem button key="Nomination" component={Link} to='/admin/nomination-review' selected={this.props.location.pathname === "/admin/nomination-review"}>
                <ListItemIcon><NominationIcon /></ListItemIcon>
                <ListItemText primary="Nomination Review" />
              </ListItem>
              <ListItem button key="Objection_review" component={Link} to='/admin/objection-review' selected={this.props.location.pathname === "/admin/objection-review"} >
                <ListItemIcon><ObjectionIcon /></ListItemIcon>
                <ListItemText primary="Objection Review" />
              </ListItem>
              <ListItem button key="Payment_review" component={Link} to='/admin/payment-review'
                        selected={this.props.location.pathname === "/admin/payment-review"}>
                  <ListItemIcon><MoneyIcon/></ListItemIcon>
                  <ListItemText primary="Payment Review"/>
              </ListItem>
              </div > : ' '
            }

        </List>
       
        <Divider />
        
        <List>
        {(user_role==='ac_user') ?
          <ListItem button key="Create_election" component={Link} to='/admin/create-election-home' selected={this.props.location.pathname === "/admin/create-election-home"}>
            <ListItemIcon><NominationIcon/></ListItemIcon>
              <ListItemText primary="Create Election" />
            </ListItem> : ''}
            <ListItem button key="Profile" component={Link} to='/profile' selected={this.props.location.pathname === "/profile"}>
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          
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
            <div style={{flex:1}}></div>
            
            <Button color="inherit">
              <PersonIcon style={{marginRight:5}}/>
              {(user_role==='cg_user') ? 'EC-Chairman' : (user_role==='ac_user') ? ' Commissioner-General' : ''}
            </Button>
            <Button className={classes.logoutBtn}  onClick={this.handleLogout} color="inherit">
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
