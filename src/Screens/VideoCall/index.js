import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Loader from 'Screens/Components/Loader/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from 'Screens/Login/setting';
import { update_CometUser } from 'Screens/Components/CommonApi/index';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../Components//CometChat/consts';
import sitedata from 'sitedata.js';
import axios from 'axios';
import { commonHeader } from 'component/CommonHeader/index';
import {
  // CometChatIncomingCall,
  // CometChatIncomingDirectCall,
  CometChatOutgoingDirectCall,
} from './Calls/index.js';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: '', setCss: '', loaderImage: false, startCall: false };
  }

  componentDidMount = () => {
    this.logOutClick();
  };

  getSessionId = () => {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(
        sitedata.data.path + '/vactive/Linktime/abc_123',
        commonHeader(user_token)
      )
      .then((response) => {
        console.log('response', response);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  logOutClick = async () => {
    var profile_id = this.props.stateLoginValueAim?.user?.profile_id;
    this.setState({ loaderImage: true });
    var data = await update_CometUser(
      this.props?.stateLoginValueAim?.user?.profile_id.toLowerCase(),
      { lastActiveAt: Date.now() }
    );
    if (data.data.hassuccessed) {
      this.setState({
        setCss: 'setColorOfMsg',
        msg: 'User is successfully logout',
        loaderImage: false,
      });
    }
    CometChat.login(profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
      .then((resp) => {
        this.updateCometUser(profile_id);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  updateCometUser = async (data) => {
    axios
      .post(sitedata.data.path + '/cometUserList', {
        profile_id: data,
      })
      .then((response) => {
        this.setState({
          setCss: 'setColorOfMsg1',
          msg: 'User is successfully login',
          loaderImage: false,
        });
        this.getSessionId();
      })
      .catch((err) => {});
  };

  startOnClick = () => {
    this.setState({ startCall: true });
  };

  render() {
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === 'dark'
            ? 'homeBg darkTheme homeBgDrk'
            : 'homeBg'
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="profile" />
                <LeftMenuMobile isNotShow={true} currentPage="profile" />
                {/* End of Menu */}
                <Grid item xs={12} md={11} lg={10}>
                  <Grid className="docsOpinion">
                    <Grid container direction="row" className="docsOpinLbl">
                      <Grid item xs={12} md={6}>
                        <label>Video call</label>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid className="cnfrmDiaMain2">
                      {console.log('this.state.msg', this.state.msg)}
                      <Grid className={this.state.setCss}>
                        {this.state.msg}
                      </Grid>
                      <button onClick={this.startOnClick}>start call</button>
                      {this.state.startCall &&
                        (console.log('check'),
                        (
                          <CometChatOutgoingDirectCall
                            open
                            //   close={() => this.actionHandler(actions.DIRECT_CALL_ENDED)}
                            theme={this.props.theme}
                            item={this.state.item}
                            type={this.state.type}
                            lang={this.state.lang}
                            callType={CometChat.CALL_TYPE.VIDEO}
                            joinDirectCall={this.state.joinDirectCall}
                            loggedInUser={this.loggedInUser}
                            actionGenerated={this.actionHandler}
                          />
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
  })(Index)
);
