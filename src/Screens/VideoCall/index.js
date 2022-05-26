import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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
import { newdate } from 'Screens/Components/BasicMethod/index';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderImage: false,
      sectionValue: 0,
    };
  }

  componentDidMount = () => {
    const { profile_id, sesion_id } = this.props.match.params;
    this.setState({ sessionID: sesion_id });
    this.getSessionId(sesion_id);
    CometChat.login(profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
      .then((resp) => {
        this.updateCometUser(profile_id);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  getSessionId = (sesion_id) => {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(
        sitedata.data.path + '/vactive/Linktime/' + sesion_id,
        commonHeader(user_token)
      )
      .then((response) => {
        console.log('response', response);
        if (response.data.hassuccessed) {
          if (response.data.message === 'link active') {
            this.setState({ sectionValue: 1 });
          }
        } else {
          if (response.data.message === 'link start soon') {
            this.setState({ sectionValue: 2 });
          } else if (response.data.message === 'Link Expire') {
            this.setState({ sectionValue: 3 });
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  updateCometUser = async (data) => {
    // this.setState({ loaderImage: true });
    axios
      .post(sitedata.data.path + '/cometUserList', {
        profile_id: data,
      })
      .then((response) => {
        // this.setState({ loaderImage: false });
      })
      .catch((err) => {});
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
              {this.state.sectionValue == 1 && (
                <Grid container direction="row">
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid container direction="row">
                      <Grid item xs={8} md={8} lg={8}>
                        <Grid className="manageVideoCall">
                          <CometChatOutgoingDirectCall
                            open
                            sessionID={this.state.sessionID}
                            theme={this.props.theme}
                            item={this.state.item}
                            type={this.state.type}
                            lang={this.state.lang}
                            callType={CometChat.CALL_TYPE.VIDEO}
                            joinDirectCall={this.state.joinDirectCall}
                            loggedInUser={this.loggedInUser}
                            actionGenerated={this.actionHandler}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={4} md={4} lg={4}>
                        <Grid>
                          <Grid className="allWebVideoSec ">
                            <Grid className="allSickVideoSec">
                              <Grid className="topSickVideoSec">
                                <Grid className="sickImageVideoSec">
                                  <img src="" alt="" />
                                </Grid>
                                <Grid className="topTxtVideoSec">
                                  <p>Naveen kumar</p>
                                  <label>profile_id</label>
                                </Grid>
                              </Grid>
                              <Grid>
                                <h3>Headache</h3>
                              </Grid>
                              <Grid className="allHeadSection">
                                <Grid>
                                  <Grid>
                                    <h3>Pain begin</h3>
                                  </Grid>
                                  <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                  >
                                    <Grid item xs={12} md={12}>
                                      <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                      >
                                        <Grid item xs={3} md={3} lg={3}>
                                          <label>Back</label>
                                          <p>Yes</p>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                          <label>Back</label>
                                          <p>Yes</p>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                          <label>Back</label>
                                          <p>Yes</p>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                          <label>Back</label>
                                          <p>Yes</p>
                                        </Grid>
                                        <Grid item xs={3} md={3} lg={3}>
                                          <label>Back</label>
                                          <p>Yes</p>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <h3>Hurt now</h3>
                                  </Grid>
                                  <Grid>
                                    <Grid
                                      container
                                      direction="row"
                                      justify="center"
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Grid
                                          container
                                          direction="row"
                                          justify="center"
                                        >
                                          <Grid item xs={3} md={3} lg={3}>
                                            <label>Back</label>
                                            <p>Yes</p>
                                          </Grid>
                                          <Grid item xs={3} md={3} lg={3}>
                                            <label>Back</label>
                                            <p>Yes</p>
                                          </Grid>
                                          <Grid item xs={3} md={3} lg={3}>
                                            <label>Back</label>
                                            <p>Yes</p>
                                          </Grid>
                                          <Grid item xs={3} md={3} lg={3}>
                                            <label>Back</label>
                                            <p>Yes</p>
                                          </Grid>
                                          <Grid item xs={3} md={3} lg={3}>
                                            <label>Back</label>
                                            <p>Yes</p>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <h3>Blood Pressure</h3>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={6} md={6}>
                                      <label>Systolic</label>
                                    </Grid>
                                    <Grid xs={6} md={6}>
                                      <label>Diastolic</label>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h3>Body Temperature</h3>
                                  </Grid>
                                  <Grid>
                                    <label>Body temperature</label>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h3>Diabetes</h3>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={4} md={4}>
                                      <label>Blood Sugar</label>
                                    </Grid>
                                    <Grid xs={4} md={4}>
                                      <label>Hba1c</label>
                                    </Grid>
                                    <Grid xs={4} md={4}>
                                      <label>situation</label>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h3>Quality Pain</h3>
                                  </Grid>
                                  <Grid>
                                    <h3>Headache need to vomit</h3>
                                  </Grid>
                                  <Grid>
                                    <h3>Headache onset of pain</h3>
                                  </Grid>
                                  <Grid>
                                    <h3>Painkillers</h3>
                                  </Grid>
                                  <Grid>
                                    <h3>Headache treatment</h3>
                                  </Grid>
                                  <Grid>
                                    <h3>Pain intensity</h3>
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid>
                                <Grid className="stomachVideoSec">
                                  <h3>Stomach</h3>
                                </Grid>

                                <Grid className="allHeadSection">
                                  <Grid>
                                    <h3>Pain begin</h3>
                                  </Grid>

                                  <Grid>
                                    <h3>Hurt now</h3>
                                  </Grid>

                                  <Grid container xs={12} md={12}>
                                    <Grid xs={4} md={4}>
                                      <label>Stomach sternum</label>
                                    </Grid>
                                    <Grid xs={4} md={4}>
                                      <label>Stomach attack</label>
                                    </Grid>
                                    <Grid xs={4} md={4}>
                                      <label>Stomach failure</label>
                                    </Grid>
                                  </Grid>

                                  <Grid>
                                    <Grid>
                                      <h3>Blood Pressure</h3>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={6} md={6}>
                                        <label>Systolic</label>
                                      </Grid>
                                      <Grid xs={6} md={6}>
                                        <label>Diastolic</label>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {this.state.sectionValue == 2 && (
                <Grid className="msgSectionCss">
                  <label>Welcome</label>
                  <p>The link will be activate very soon</p>
                </Grid>
              )}
              {this.state.sectionValue == 3 && (
                <Grid className="msgSectionCss">
                  <label>Oops!</label>
                  <p>Link has been expired, Please book time slot again</p>
                </Grid>
              )}
              {this.state.sectionValue == 4 && (
                <Grid className="msgSectionCss">
                  <p>
                    The link is not activated due to the payment process is not
                    completed by patient
                  </p>
                </Grid>
              )}
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
