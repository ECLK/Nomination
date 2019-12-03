import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Modal from "react-responsive-modal";
import CandidateTabContainer from '../CandidateTabContainer';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const defaultToolbarStyles = {
  iconButton: {
  },
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
        <Tooltip title={"Add Candidate"}>
          <IconButton className={classes.iconButton} onClick={this.onOpenModal} >
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      <div>
        <Dialog
          onClose={this.onCloseModal}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.onCloseModal}>
            {modalType} Candidate
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
            <CandidateTabContainer onCloseModal={this.onCloseModal} customProps={customProps} index={index}/>
            </Typography>
          </DialogContent>
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

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);
