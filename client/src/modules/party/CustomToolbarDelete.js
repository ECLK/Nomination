import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TrashIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Modal from "react-responsive-modal";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { deleteParty } from '../../modules/party/state/PartyAction';
import { connect } from 'react-redux';


const defaultToolbarStyles = {
  iconButton: {
    marginLeft:-30
  },
  deleteIcon: {
    justifyContent: 'center'
  }
};
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
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
  handleRemove = () => {
    const {index,deleteParty} = this.props;
    deleteParty(index);  
    this.onCloseModal();           
  };

  render() {
    const { classes} = this.props;
    return (
      <React.Fragment>
        <Tooltip title={"Delete"}>
          <IconButton className={classes.iconButton} onClick={this.onOpenModal} >
            <TrashIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are You Sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Want To Delete This Party!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button value="OK" onClick={this.handleRemove} color="primary">
              OK
            </Button>
            <Button onClick={this.onCloseModal} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </React.Fragment>
      
    );
    

  }

}

const mapStateToProps = ({Party}) => {
};

const mapActionsToProps = {
  deleteParty,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(defaultToolbarStyles)(CustomToolbar));
