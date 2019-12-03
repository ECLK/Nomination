import React from "react";
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import { withStyles } from "@material-ui/core/styles";


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class CustomModal extends React.Component {
  // state = {
  //   open: false
  // };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <h2>react-responsive-modal</h2>
        {/* <button onClick={this.onOpenModal}>Open modal</button> */}
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Simple centered modal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles, { name: "CustomModal" })(CustomModal);

// render(<App />, document.getElementById("root"));
