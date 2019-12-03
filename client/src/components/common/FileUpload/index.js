import React, {Component} from "react";
import PropTypes from "prop-types";
import DefaultUI from "./DefaultUI";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    const { allowedTypes, allowedSize, multiple } = props;

    this.state = {
      status: "ready",
      progress: 0,
      allowedTypes,
      allowedSize,
      multiple
    };
  }

  onDragEnter = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });
  };

  onDragOver = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });
  };

  onDrop = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });

    // Fetch files
    const { files } = evt.dataTransfer;
    this.uploadFiles(files);
  };

  onClickFileInput = () => {
    this.fileUploadInput.value = null;
  };

  reset = () => {
    this.setState({
      status: "ready"
    });
  };

  clickFileInput = () => {
    this.fileUploadInput.click();
  };

  render() {
    const { renderUI,onSelectFiles,value} = this.props;
    const {status, progress} = this.state;
    const props = {
      status,
      progress,
    };

    return (
      <div onClick={this.clickFileInput}>
        <div onDragEnter={this.onDragEnter}
             onDragOver={this.onDragOver}
             onDrop={this.onDrop}
             style={{position: "relative"}}>
          {renderUI && typeof renderUI === "function" ? (renderUI(props)) : (<DefaultUI {...props} />)}

          <input
            ref={fpi => (this.fileUploadInput = fpi)}
            type="file"
            onClick={this.onClickFileInput}
            id={value}
            onChange={onSelectFiles}
            multiple={this.state.multiple}
            style={{
              position: "absolute",
              left: "45%",
              top: "45%",
              visibility: "hidden"
            }}
          />
        </div>
      </div>
    );
  }
}

FileUpload.propTypes = {
  allowedTypes: PropTypes.array,
  allowedSize: PropTypes.number,
  multiple: PropTypes.bool,
  renderUI: PropTypes.func
};

FileUpload.defaultProps = {
  allowedTypes: [],
  allowedSize: null,
  multiple: false,
  renderUI: null
};

export default FileUpload;
