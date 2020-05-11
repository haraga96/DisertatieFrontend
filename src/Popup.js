import React from "react";
import "./Popup.css";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup" style={{ visibility: this.props.isVisible }}>
        <div className="content">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>
            {this.props.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default Popup;
