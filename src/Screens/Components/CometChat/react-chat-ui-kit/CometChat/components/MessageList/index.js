import React from "react";

import "./style.scss";

import { CometChat } from "@cometchat-pro/chat";

import { CometChatManager } from "../../util/controller";
import { MessageListManager } from "./controller";

import * as enums from '../../util/enums.js';

import SenderMessageBubble from "../SenderMessageBubble";
import ReceiverMessageBubble from "../ReceiverMessageBubble";
import SenderImageBubble from "../SenderImageBubble";
import ReceiverImageBubble from "../ReceiverImageBubble";
import SenderFileBubble from "../SenderFileBubble";
import ReceiverFileBubble from "../ReceiverFileBubble";
import SenderAudioBubble from "../SenderAudioBubble";
import ReceiverAudioBubble from "../ReceiverAudioBubble";
import SenderVideoBubble from "../SenderVideoBubble";
import ReceiverVideoBubble from "../ReceiverVideoBubble";

import CallMessage from "../CallMessage";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from './../../../../../../actions';
import { getLanguage } from "translations/index"
class MessageList extends React.PureComponent {
  loggedInUser = null;
  lastScrollTop = 0;

  constructor(props) {

   super(props);
    this.state = {
      onItemClick: null,
      loading: false,
      counter: 0,
    }

    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.MessageListManager = new MessageListManager(this.props.item, this.props.type,this.props.parentMessageId);
    this.getMessages();
    this.MessageListManager.attachListeners(this.messageUpdated);
  }

  componentDidUpdate(prevProps, prevState) {
    const previousMessageStr = JSON.stringify(prevProps.messages);
    const currentMessageStr = JSON.stringify(this.props.messages);

    if(!this.props.item.uid)
    return;

    if (this.props.type === 'user' && prevProps.item.uid !== this.props.item.uid) {
      this.MessageListManager.removeListeners();
      this.MessageListManager = new MessageListManager(this.props.item, this.props.type);
      this.getMessages();
      this.MessageListManager.attachListeners(this.messageUpdated);

    } else if (this.props.type === 'group' && prevProps.item.guid !== this.props.item.guid){
      this.MessageListManager.removeListeners();
      this.MessageListManager = new MessageListManager(this.props.item, this.props.type);
      this.getMessages();
      this.MessageListManager.attachListeners(this.messageUpdated);

    } else if(prevProps.parentMessageId !== this.props.parentMessageId) {
      this.MessageListManager.removeListeners();
      this.MessageListManager = new MessageListManager(this.props.item, this.props.type, this.props.parentMessageId);
      this.getMessages();
      this.MessageListManager.attachListeners(this.messageUpdated);

    } else if (previousMessageStr !== currentMessageStr) {
      if(this.props.scrollToBottom) {
        this.scrollToBottom();
      } else {
        this.scrollToBottom(this.lastScrollTop);
      }
      
    }
  }

  scrollToBottom = (scrollHeight = 0) => {
    
    if (this.messagesEnd) {
      this.messagesEnd.scrollTop = (this.messagesEnd.scrollHeight - scrollHeight);
    }
  }

  getMessages = () => {

    this.setState({loading: true});
    new CometChatManager().getLoggedInUser().then((user) => {
      
      this.loggedInUser = user;
      this.MessageListManager.fetchPreviousMessages().then((messageList) => {
        if(messageList && messageList.length==0 && this.state.counter<2)
        {
          this.getMessages();
          this.setState({counter : this.state.counter+1})
        }
        messageList.forEach((message) => {

          //if the sender of the message is not the loggedin user, mark it as read.
          if (message.getSender().getUid() !== user.getUid() && !message.getReadAt()) {
            
            if(message.getReceiverType() === "user") {
              CometChat.markAsRead(message.getId().toString(), message.getSender().getUid(), message.getReceiverType());
            } else if(message.getReceiverType() === "group") {
              CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
            }
          }

        });
        
        this.lastScrollTop = this.messagesEnd.scrollHeight;
        this.props.actionGenerated("messageFetched", messageList);
        this.setState({loading: false});
          
      }).catch((error) => {
        //TODO Handle the erros in contact list.
        console.error("[MessageList] getMessages fetchPrevious error", error);
        this.setState({loading: false});
      });

    }).catch((error) => {
      // console.log("[MessageList] getMessages getLoggedInUser error", error);
      this.setState({loading: false});
    });

  }

  //callback for listener functions
  messageUpdated = (key, message, ...otherProps) => {

    switch(key) {

      case enums.MESSAGE_DELETED:
        this.messageDeleted(message);
        break;
      case enums.MESSAGE_DELIVERED:
      case enums.MESSAGE_READ:
        this.messageReadAndDelivered(message);
        break;
      case enums.TEXT_MESSAGE_RECEIVED:
      case enums.MEDIA_MESSAGE_RECEIVED:
      case enums.CUSTOM_MESSAGE_RECEIVED:
        this.messageReceived(message);
        break;
      case enums.GROUP_MEMBER_SCOPE_CHANGED:
      case enums.GROUP_MEMBER_JOINED:
      case enums.GROUP_MEMBER_LEFT:
      case enums.GROUP_MEMBER_ADDED:
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_UNBANNED:
        this.groupMemberUpdated(key, message, ...otherProps);
        break;
      default:
        break;
    }
  }

  messageDeleted = (message) => {

    if (this.props.type === 'group' 
    && message.getReceiverType() === 'group'
    && message.getReceiver().guid === this.props.item.guid) {

      this.props.actionGenerated("messageDeleted", [message]);
        
    } else if (this.props.type === 'user' 
    && message.getReceiverType() === 'user'
    && message.getSender().getUid() === this.props.item.uid) {
      this.props.actionGenerated("messageDeleted", [message]);
    }
  }

  messageReadAndDelivered = (message) => {

    //read receipts
    if (message.getReceiverType() === 'user'
    && message.getSender().getUid() === this.props.item.uid
    && message.getReceiver() === this.loggedInUser.uid) {

      let messageList = [...this.props.messages];
      if (message.getReceiptType() === "delivery") {

        //search for same message
        let msg = messageList.find((m, k) => m.id === message.messageId);
        
        //if found, update state
        if(msg) {
          msg["deliveredAt"] = message.getDeliveredAt();
          this.props.actionGenerated("messageUpdated", messageList);
        }

      } else if (message.getReceiptType() === "read") {

        //search for same message
        let msg = messageList.find((m, k) => m.id === message.messageId);
        //if found, update state
        if(msg) {
          msg["readAt"] = message.getReadAt();
          this.props.actionGenerated("messageUpdated", messageList);
        }
      }

    } else if (message.getReceiverType() === 'group' 
    && message.getReceiver() === this.props.item.guid) {
      //not implemented
    }

  }

  messageReceived = (message) => {
    //new messages
    if (this.props.type === 'group' 
    && message.getReceiverType() === 'group'
    && message.getReceiver().guid === this.props.item.guid) {

      if(!message.getReadAt()) {
        CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
      }
      this.props.actionGenerated("messageReceived", [message]);
        
    } else if (this.props.type === 'user' 
    && message.getReceiverType() === 'user'
    && message.getSender().getUid() === this.props.item.uid) {

      if(!message.getReadAt()) {
        CometChat.markAsRead(message.getId().toString(), message.getSender().getUid(), message.getReceiverType());
      }

      this.props.actionGenerated("messageReceived", [message]);
    }
  }

  groupMemberUpdated = (key, message, ...otherProps) => {

    // console.log("MessageList groupMemberUpdated key", key);
    if (this.props.type === 'group' 
    && message.getReceiverType() === 'group'
    && message.getReceiver().guid === this.props.item.guid) {

      if(!message.getReadAt()) {
        CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
      }
      
      this.props.actionGenerated("groupUpdated", message, key, ...otherProps);
    }
  }

  handleScroll = (e) => {
    
    const top = Math.round(e.currentTarget.scrollTop) === 0;
    if (top && this.props.messages.length) {
      this.getMessages();
    }
  }

  handleClick = (message) => {
    this.props.onItemClick(message, 'message');
  }

  getSenderMessageComponent = (message) => {

    let component;
    switch (message.type) {
      case CometChat.MESSAGE_TYPE.TEXT:
        component =  (message.text ?  <SenderMessageBubble lan={this.props.stateLanguageType} message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        component =  (message.data.url ? <SenderImageBubble lan={this.props.stateLanguageType} message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.FILE:
        component =  (message.data.attachments ? <SenderFileBubble lan={this.props.stateLanguageType} message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        component =  (message.data.url ? <SenderVideoBubble lan={this.props.stateLanguageType} message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        component =  (message.data.url ? <SenderAudioBubble lan={this.props.stateLanguageType} message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      default:
      break;
    }

    return component;
  }

  getReceiverMessageComponent = (message) => {

    let component;
    switch (message.type) {
      case "message":
      case CometChat.MESSAGE_TYPE.TEXT:
        component = (message.text ? <ReceiverMessageBubble message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.IMAGE:
        component = (message.data.url ? <ReceiverImageBubble message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.FILE:
        component = (message.data.attachments ? <ReceiverFileBubble message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.AUDIO:
        component = (message.data.url ? <ReceiverAudioBubble message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      case CometChat.MESSAGE_TYPE.VIDEO:
        component = (message.data.url ? <ReceiverVideoBubble message={message} widgetconfig={this.props.widgetconfig} actionGenerated={this.props.actionGenerated} /> : null);
      break;
      default:
      break;
    }
    return component;
  }

  getCallMessageComponent = (message) => {
    if(message.status ==='rejected' || message.status ==='unanswered'){
      return (
        <CallMessage message={message} />
      );
    }
  }

  getActionMessageComponent = (message) => {

    let component = null;
    if(message.message) {

      component = (
        <div className="cc1-chat-win-action-msg-wrap"><p className="chat-txt-msg">{message.message}</p></div>
      );

      //if action messages are set to hide in config
      if(this.props.messageconfig) {

        const found = this.props.messageconfig.find(cfg => {
          return (cfg.action === message.action && cfg.category === message.category);
        });
  
        if(found && found.enabled === false) {
          component = null;
        }
      }
      
    }

    return component;
  }
  
  getComponent = (message) => {

    let component;

    switch(message.category) {
      case "action":
        component = this.getActionMessageComponent(message);
      break;
      case "call":
        component = this.getCallMessageComponent(message);
      break;
      case "message":
        if(this.loggedInUser.uid === message.sender.uid) {
          component = this.getSenderMessageComponent(message);
        } else {
          component = this.getReceiverMessageComponent(message);
        }
      break;
      default:
        break;
    }

    return component;
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {Loading}= translate

    let loading = null;
    if(this.state.loading) {
      loading = (
        <div className="loading-text">{Loading}</div>
      );
    }
    
    let messages;
    messages = this.props.messages.map((message, key) => {
      return (
        <div id={message.id} key={key}>
          {this.getComponent(message)}
        </div>
      );
    });

    return (
      <div ref={(el) => { this.messagesEnd = el; }} className="cc1-chat-win-conver-wrap" onScroll={this.handleScroll}>
        {loading}
        {messages}
      </div>
    );
  }

  componentWillUnmount() {
    this.MessageListManager.removeListeners();
    this.MessageListManager = null;
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
      stateLanguageType
  }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(MessageList));
// export default MessageList;