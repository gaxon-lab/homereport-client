import React from "react";
import moment from "moment";
import {Avatar} from "antd";
import PropTypes from "prop-types";


const ConversationCell = ({conversation}) => {
  return (
    <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap gx-pl-0">
      <div className="gx-chat-todo-avatar">
        {conversation.user.profile_pic ?
          <Avatar className="gx-rounded-circle gx-size-40"
                  src={conversation.user.profile_pic[0].src}/> :
          <Avatar className="gx-rounded-circle gx-size-40"
                  style={{backgroundColor: '#00CED1'}}>{conversation.user.first_name[0].toUpperCase()}</Avatar>}
      </div>
      <div className="gx-chat-toto-info gx-mt-2">
        <div className="gx-d-flex">
          <span className="gx-name gx-mr-2">{conversation.user.first_name + " " + conversation.user.last_name}</span>
          <span
            className="gx-time gx-text-muted">{moment(conversation.created_at).format('MMM Do YYYY, h:mm:ss a')},</span>
        </div>
        {conversation.comment ?
          <div className="gx-py-1 gx-px-2 gx-mt-1" style={{backgroundColor: "#eee"}}>
            {conversation.comment.split("\n").map((message, index) => <p
              style={{padding: 0, margin: 0, minHeight: 15}} key={index}>
              {message}
            </p>)}
          </div> : null}
      </div>
    </div>
  )
};

export default ConversationCell;

ConversationCell.defaultProps = {
  conversation: null
};

ConversationCell.propTypes = {
  conversation: PropTypes.object
};
