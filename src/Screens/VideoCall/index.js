import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import Loader from "Screens/Components/Loader/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { Settings } from "Screens/Login/setting";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../Components//CometChat/consts";
import sitedata from "sitedata.js";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
import {
  // CometChatIncomingCall,
  // CometChatIncomingDirectCall,
  CometChatOutgoingDirectCall,
} from "./Calls/index.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      setCss: "",
      loaderImage: false,
      startCall: false,

      allTasks: {},
      AllDataPart: [],
    };
  }

  componentDidMount = () => {
    this.logOutClick();
    this.allgetDataSec();
    this.allgetData(this.props.stateLoginValueAim.user._id);
  };

  // getSessionId = () => {
  //   var user_token = this.props.stateLoginValueAim.token;
  //   axios
  //     .get(
  //       sitedata.data.path + "/vactive/Linktime/abc_123",
  //       commonHeader(user_token)
  //     )
  //     .then((response) => {
  //       console.log("response", response);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  allgetData = (patient_id) => {
    // let translate = getLanguage(this.props.stateLanguageType);
    // let { Something_went_wrong } = translate;
    axios
      .get(
        sitedata.data.path + "/vactive/GetAllPatientData/" + patient_id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          let allData = responce.data;
          this.setState({ AllDataPart: allData.data });
          console.log("res", allData.data);
        } else {
          this.setState({
            // errorMsg: Something_went_wrong,
          });
          console.log("ncncnvnvnnvnv", responce);
        }
      });
  };

  allgetDataSec = () => {
    const { profile_id, sesion_id } = this.props.match.params;
    axios
      .get(
        sitedata.data.path + "/vactive/Linktime/" + sesion_id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce && responce.data && responce.data.hassuccessed) {
          if (responce.data.message === "link active") {
            this.setState({
              sectionValue: 1,
              allTasks: responce.data.data.Task,
              loaderImage: false,
            });
          }
          console.log("res", responce);
        } else {
          if (responce.data.message === "link Start soon") {
            this.setState({
              sectionValue: 2,
              loaderImage: false,
            });
          } else {
            this.setState({ sectionValue: 3, loaderImage: false });
          }
          console.log("fgh", responce);
        }
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
        setCss: "setColorOfMsg",
        msg: "User is successfully logout",
        loaderImage: false,
      });
    }
    CometChat.login(profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
      .then((resp) => {
        this.updateCometUser(profile_id);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  updateCometUser = async (data) => {
    axios
      .post(sitedata.data.path + "/cometUserList", {
        profile_id: data,
      })
      .then((response) => {
        this.setState({
          setCss: "setColorOfMsg1",
          msg: "User is successfully login",

          loaderImage: false,
        });
        this.getSessionId();
        this.startOnClick();
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
          this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme homeBgDrk"
            : "homeBg"
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row">
                    <Grid item xs={8} md={8} lg={8}>
                      <Grid className="manageVideoCall">
                        <CometChatOutgoingDirectCall
                          open
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
                        {/* {this.state.dumiData && this.state.dumiData?.length>0 && this.state.dumiData.map((item)=>
                          
                          <p>{item?.headche?.headche_painnow}</p>
                          
                          )} */}

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

                          {/* {AllDataPart && AllDataPart?.headache === "yes" && ()} */}
                            <Grid>
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

{
  /* <Grid container direction="row">
               
                <LeftMenu isNotShow={true} currentPage="profile" />
                <LeftMenuMobile isNotShow={true} currentPage="profile" />
                
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
                      {console.log("this.state.msg", this.state.msg)}
                      <Grid className={this.state.setCss}>
                        {this.state.msg}
                      </Grid>
                      <button onClick={this.startOnClick}>start call</button>
                      {this.state.startCall &&
                        (console.log("check"),
                        (
                          <Grid className="manageVideoCall">
                            <CometChatOutgoingDirectCall
                              open
                              
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
                        ))}
                        
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */
}
