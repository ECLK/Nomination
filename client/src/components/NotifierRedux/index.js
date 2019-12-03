import React from 'react';
// import Snackbar from 'material-ui/Snackbar';
import Snackbar from '@material-ui/core/Snackbar';
import { handleSnackbarClose, openSnackbar  } from '../../modules/election/state/ElectionAction';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

let openSnackbarFn;

class Notifier extends React.Component {
  state = {
    open: false,
    message: '',
  };

  componentDidMount() {
   const {openSnackbar} = this.props;
  //  openSnackbar();

    // openSnackbarFn = this.openSnackbar;
  }

  // openSnackbar = ({ message }) => {
  //   this.setState({
  //     open: true,
  //     message,
  //   });
  // };

  // handleSnackbarClose = () => {
  //   this.setState({
  //     open: false,
  //     message: '',
  //   });
  // };

  render() {
    const {snackMessage,handleSnackbarClose} = this.props;

    const message = (
      <span
        id="snackbar-message-id"
        dangerouslySetInnerHTML={{ __html: snackMessage.message }}
      />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={snackMessage.message}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        open={snackMessage.open}
        SnackbarContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
    );
  }
}

// export function openSnackbar({ message }) {
//   openSnackbarFn({ message });
// }

// export default Notifier;


const mapStateToProps = ({ Election }) => {

  const { handleSnackbarClose, openSnackbar } = Election;
  const snackMessage  = Election.snackBarMsg;

  
  return { handleSnackbarClose, openSnackbar ,snackMessage}
};

const mapActionsToProps = {
  openSnackbar,
  handleSnackbarClose
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles()(Notifier));