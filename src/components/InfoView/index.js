import React, {PureComponent} from 'react';
import CircularProgress from "../CircularProgress/index";
import {message} from 'antd';
import Auxiliary from "util/Auxiliary";
import {connect} from "react-redux";
import {hideMessage} from "../../appRedux/actions";

class InfoView extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error || nextProps.message || nextProps.displayMessage) {
      if (nextProps.displayMessage) this.showMessage(nextProps.displayMessage);
      if (nextProps.error) this.showError(nextProps.error);

      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  }

  showMessage = (displayMessage) => {
    message.success(displayMessage)
  };
  showError = (error) => {
    message.error(error)
  };

  render() {
    const {loading} = this.props;

    return (
      <Auxiliary>
        {loading && <div className="gx-loader-view gx-loader-pos">
          <CircularProgress className=""/>
        </div>}
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({common}) => {
  const {error, loading} = common;
  const displayMessage = common.message;
  return {error, loading, displayMessage};
};

export default connect(mapStateToProps, {hideMessage})(InfoView);
