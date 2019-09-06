import React, {PureComponent} from 'react';
import CircularProgress from "components/CircularProgress/index";
import {message} from 'antd';
import Auxiliary from "util/Auxiliary";
import {connect} from "react-redux";
import {hideMessage} from "appRedux/actions/Common";

class InfoView extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error || nextProps.message || nextProps.displayMessage) {
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
    const {error, loading, displayMessage} = this.props;

    return (
      <Auxiliary>
        {loading && <div className="gx-loader-view gx-loader-pos">
          <CircularProgress className=""/>
        </div>}

        {displayMessage && this.showMessage(displayMessage)}
        {error && this.showError(error)}

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
