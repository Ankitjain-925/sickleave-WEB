import React from "react";
import classNames from "classnames";
import "./style.scss";
import CometChatUserList from "../../CometChatUserList";
import CometChatGroupList from "../../CometChatGroupList";
import CometChatConversationList from "../../CometChatConversationList";
import CometChatUserInfoScreen from "../../CometChatUserInfoScreen";
import { getLanguage } from "translations/index"


const navbar = (props) => {
  const switchComponent = () => {
    switch (props.tab) {
      case "contacts":
        return (
          <CometChatUserList
            lan={props.lan}
            Userlist={props.Userlist}
            item={props.item}
            actionGenerated={props.actionGenerated}
            userStatusChanged={(item) =>
              props.actionGenerated("userStatusChanged", "user", item)
            }
            onItemClick={(item, type) =>
              props.actionGenerated("itemClicked", type, item)
            }
          />
        );
      case "calls":
        return "calls";
      case "conversations":
        return (
          <CometChatConversationList
            lan={props.lan}
            Userlist={props.Userlist}
            item={props.item}
            actionGenerated={props.actionGenerated}
            userStatusChanged={(item) =>
              props.actionGenerated("userStatusChanged", "user", item)
            }
            onItemClick={(item, type) =>
              props.actionGenerated("itemClicked", type, item)
            }
          />
        );
      case "groups":
        return (
          <CometChatGroupList
            item={props.item}
            groupToLeave={props.groupToLeave}
            groupToDelete={props.groupToDelete}
            groupToUpdate={props.groupToUpdate}
            actionGenerated={props.actionGenerated}
            onItemClick={(item, type) =>
              props.actionGenerated("itemClicked", type, item)
            }
          />
        );
      case "info":
        return (
          <CometChatUserInfoScreen
            onItemClick={(item, type) =>
              props.actionGenerated("itemClicked", type, item)
            }
          />
        );
      default:
        return null;
    }
  };

  const contactClassName = classNames({
    "ccl-left-panel-nav-link": true,
    people: true,
    active: props.tab === "contacts",
  });

  // const callClassName = classNames({
  //   "ccl-left-panel-nav-link": true,
  //   "call": true,
  //   "active": (props.tab === "calls")
  // });

  const convClassName = classNames({
    "ccl-left-panel-nav-link": true,
    chat: true,
    active: props.tab === "conversations",
  });

  const groupClassName = classNames({
    "ccl-left-panel-nav-link": true,
    "grp-chat": true,
    active: props.tab === "groups",
  });

  const infoClassName = classNames({
    "ccl-left-panel-nav-link": true,
    more: true,
    active: props.tab === "info",
  });
  let translate = getLanguage(props.lan)
  let {ConversationList, ContactList} = translate;
  return (
    <React.Fragment>
      {switchComponent()}
      <div className="ccl-left-panel-footer-wrap">
        <div className="ccl-left-panel-nav-list clearfix">
          {/* <div className="ccl-left-panel-nav-listitem" onClick={() => props.actionGenerated('tabChanged', 'conversations')}>
            <span className={convClassName}></span>
          </div> */}
          <div className="ccl-left-panel-nav-listitem" onClick={() => props.actionGenerated('tabChanged', 'conversations')}>
            <span className={convClassName}></span>
            <span className={props.tab === "conversations"?"viewListactive": "viewList"}>{ConversationList}</span>
          </div>
          <div
            className="ccl-left-panel-nav-listitem"
            onClick={() => props.actionGenerated("tabChanged", "contacts")}
          >
            <span className={contactClassName} />
            <span className={props.tab === "contacts"?"viewListactive": "viewList"}>{ContactList}</span>
          </div>
          
          {/* <div className="ccl-left-panel-nav-listitem" onClick={() => props.actionGenerated('tabChanged', 'calls')}>
                <span className={callClassName}></span>
              </div>  */}
             
              {/* <div className="ccl-left-panel-nav-listitem" onClick={() => props.actionGenerated('tabChanged', 'groups')}>
                <span className={groupClassName}></span>
                </div> */}
              {/* <div className="ccl-left-panel-nav-listitem" onClick={() => props.actionGenerated('tabChanged', 'info')}>
                <span className={infoClasssName}></span>
              </div>  */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(navbar);
