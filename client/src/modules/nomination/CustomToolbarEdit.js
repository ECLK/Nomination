import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Modal from "react-responsive-modal";
import UserProfileUpdate from '../../components/UserProfileUpdate';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import { getUserInfo } from './state/ProfileAction';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { de } from "date-fns/esm/locale";
import Grid from '@material-ui/core/Grid';
import NominationStep2Update from "../../components/NominationPaymentUpdate";


const defaultToolbarStyles = {
  iconButton: {
  },
  editIcon: {
    marginLeft: 3
  }
};
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


class CustomToolbar extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

 

  render() {
  
    const { classes, customProps ,index,modalType } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Tooltip title={"Edit"}>
          <IconButton className={classes.iconButton} onClick={this.onOpenModal} >
            <EditIcon className={classes.editIcon} />
          </IconButton>
        </Tooltip>
      <div>
      <Dialog
                        onClose={this.onCloseModal}
                        aria-labelledby="customized-dialog-title"
                        open={this.state.open}
                        fullWidth={true}
                        maxWidth="lg"
                    >
                    <DialogTitle id="customized-dialog-title" onClose={this.onCloseModal}>
                        Update Payment
                    </DialogTitle>
                    <Grid container item xs={12} direction="column">
                    <DialogContent>
                        <NominationStep2Update index={index}  onCloseModal={this.onCloseModal} />
                    </DialogContent>
                    </Grid>
                    {/* <DialogActions>
                    
                        <Button onClick={this.onCloseModal} color="primary">
                        Cancel
                        </Button>
                        <Button variant="contained" type="submit" value="Submit&New" color="primary" className={classes.submit}>
                        Save & New
                        </Button>
                        <Button  variant="contained" onClick={this.onCloseModal} type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                        Save & Close
                        </Button>
                    </DialogActions> */}
                    </Dialog>
      </div>
      </React.Fragment>
      
    );
    

  }

}

// export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);

const mapStateToProps = ({Nomination}) => {
};

const mapActionsToProps = {
  // getUserInfo
  // getTeams
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar));