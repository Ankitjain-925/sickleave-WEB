import React from "react";
import "./style.scss";

import { CometChat } from "@cometchat-pro/chat";

import { CometChatManager } from "../../util/controller";
import { ConversationListManager } from "./controller";
import { SvgAvatar } from '../../util/svgavatar';

import ConversationView from "../ConversationView";
import { connect } from "react-redux";

import * as actions from '../../../../store/action';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from './../../../../../../actions';
import { getLanguage } from "translations/index"
class CometChatConversationList extends React.Component {

  constructor(props) {

   super(props);
    this.state = {
      conversationlist: [],
      onItemClick: null,
      selectedConversation: undefined,
      loading: false
    }
  }

  componentDidMount() {
    this.ConversationListManager = new ConversationListManager();
    this.getConversations();
    this.ConversationListManager.attachListeners(this.conversationUpdated);
  }

  componentWillUnmount() {
    this.ConversationListManager.removeListeners();
    this.ConversationListManager = null;
  }

  conversationUpdated = (message) => {

    CometChat.CometChatHelper.getConversationFromMessage(message).then((conversation) => {

      let conversationlist = [...this.state.conversationlist];
      let conversationKey = conversationlist.findIndex((c, k) => c.getConversationId() === conversation.getConversationId());
      let conversationObj = conversationlist.find((c, k) => c.getConversationId() === conversation.getConversationId());
      
      if(conversationObj) {

        conversation.setConversationWith(conversationObj.getConversationWith());
        conversationObj.lastMessage = message;

        //if the conversation is selected
        if(this.state.selectedConversation && this.state.selectedConversation.getConversationId() === conversation.getConversationId()) {
          conversationObj.setUnreadMessageCount(0);
        } else {
          conversationObj.setUnreadMessageCount(parseInt(conversationObj.getUnreadMessageCount()) + 1);
        }

        const removedConversation = conversationlist.splice(conversationKey, 1);
        conversationlist.unshift(removedConversation[0]);
        this.setState({ conversationlist:  conversationlist});

      } else {

        // this.setAvatar(conversation);
        conversation.lastMessage = message;
        conversation.setUnreadMessageCount(1);
        conversationlist.unshift(conversation);
        this.setState({ conversationlist:  conversationlist});

      }

    }, error => {
      // // console.log('This is an error in converting message to conversation', { error })
    });

  }
  
  handleScroll = (e) => {

    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) === Math.round(e.currentTarget.clientHeight);
    if (bottom) this.getConversations();
  }

  //updating unread message count to zero
  handleClick = (conversation) => {
    
    if(!this.props.onItemClick)
      return;

    this.props.onItemClick(conversation.conversationWith, conversation.conversationType);

    // const conversationList = [...this.state.conversationlist];
    // const conversationFound = conversationList.find(c => c.conversationWith.uid === item.conversationWith.uid);
    // if(conversationFound) {// console.log("[conversationFound]", conversationFound)
    
    // }
    conversation.setUnreadMessageCount(0);
    this.setState({ selectedConversation: conversation });
  }

  handleMenuClose = () => {

    if(!this.props.actionGenerated) {
      return false;
    }

    this.props.actionGenerated("closeMenuClicked")
  }

  getConversations = () => {

    this.setState({loading: true});
    new CometChatManager().getLoggedInUser().then(conversation => {

        this.ConversationListManager.fetchNextConversation().then(conversationList => {

          // conversationList.forEach(conv => conv = this.setAvatar(conv));
          this.setState({ conversationlist: [...this.state.conversationlist, ...conversationList], loading: false });

        }).catch(error => {
          console.error("[CometChatConversationList] getConversations fetchNext error", error);
          this.setState({loading: false});
        });

      }).catch(error => {
        // // console.log("[CometChatConversationList] getConversations getLoggedInUser error", error);
        this.setState({loading: false});
    });
  }

  setAvatar(conversation) {

    if(conversation.getConversationType() === "user" && !conversation.getConversationWith().getAvatar()) {
      
        const uid = conversation.getConversationWith().getUid();
        const char = conversation.getConversationWith().getName().charAt(0).toUpperCase();

        // conversation.getConversationWith().setAvatar(SvgAvatar.getAvatar(uid, char));

    } else if(conversation.getConversationType() === "group" && !conversation.getConversationWith().getIcon()) {

        const guid = conversation.getConversationWith().getGuid();
        const char = conversation.getConversationWith().getName().charAt(0).toUpperCase();

        conversation.getConversationWith().setIcon(SvgAvatar.getAvatar(guid, char))
    }
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
        let {Loading}= translate

    let loading = null;
    if(this.state.loading) {
      loading = (
        <div className="loading-text">{Loading}14521</div>
      );
    }

    const conversationList = this.state.conversationlist.map((conversation, key) => {
      return (
        <div id={key} onClick={() => this.handleClick(conversation)} key={key} className="clearfix">
          
          <ConversationView
            lan={this.props.lan}
            Userlist={this.props.Userlist}
            item={this.props.item}
            actionGenerated={this.props.actionGenerated} 
            config={this.props.config}
            key={conversation.conversationId} 
            conversation={conversation} />
        </div>
      );

    });

    return (
      <React.Fragment>
        <div className="ccl-left-panel-head-wrap newheadheight">
          <h4 className="ccl-left-panel-head-ttl"></h4>
          <div className="cc1-left-panel-close" onClick={this.handleMenuClose}></div>
        </div>
        <div className="chat-ppl-list-ext-wrap" onScroll={this.handleScroll}>
          {conversationList}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
      stateLanguageType
  }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(CometChatConversationList));
// export default CometChatConversationList;
