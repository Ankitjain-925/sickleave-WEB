import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { authy } from "Screens/Login/authy.js";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OptionList } from "Screens/Login/metadataaction";
import Loader from "Screens/Components/Loader/index";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { getLanguage } from "translations/index";
import { handleOpenDetail } from "../SickLeaveForm/api";
import sitedata from "sitedata";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { getDate, getTime } from "Screens/Components/BasicMethod/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllDataPart: [],
      tabvalue2: this.props.tabvalue2 || 0,
    };
  }

  handleChangeTab2 = (e, tabvalue2) => {
    this.setState({ tabvalue2 });
  };

  componentDidMount() {
    this.allgetDataPart(this.props.stateLoginValueAim.user._id);
  }

  allgetDataPart = (patient_id) => {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Something_went_wrong } = translate;
    axios
      .get(
        sitedata.data.path + "/vactive/Task/" + patient_id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          let data = responce.data;
          this.setState({ AllDataPart: data.data });
        } else {
          this.setState({
            errorMsg: Something_went_wrong,
          });
        }
      });
  };

  render() {
    const { AllDataPart, tabvalue2 } = this.state;
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      added_on,
      Headache,
      stomach_problems,
      Diarrhea,
      Fever,
      back_pain,
      cough_and_snees,
      feel_depressed,
      cardiac_problems,
      no,
      yes,
    } = translate;
    return (
      <Grid>
        <Grid
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
              ? "homeBg homeBgDrk"
              : "homeBg"
          }
        >
          {this.state.loaderImage && <Loader />}
          <Grid className="homeBgIner">
            <Grid container direction="row" justify="center">
              <Grid item xs={12} md={12}>
                <Grid container direction="row">
                  <LeftMenu isNotShow={true} currentPage="archivelink" />
                  <LeftMenuMobile isNotShow={true} currentPage="archivelink" />
                  <Grid item xs={12} md={11} lg={10}>
                    <Grid className="docsOpinion docsAllOption">
                      <Grid container direction="row" className="docsOpinLbl">
                        <Grid item xs={12} md={6}>
                          <label>Archived Request</label>
                        </Grid>
                      </Grid>

                      <Grid className="taskCntntMng">
                        <Grid container direction="row" alignItems="center">
                          <Grid item xs={12} sm={6} md={7}>
                            <AppBar position="static" className="billTabs">
                              <Tabs
                                value={tabvalue2}
                                onChange={this.handleChangeTab2}
                              >
                                <Tab label="All" className="billtabIner" />
                                <Tab
                                  label="Not Attented"
                                  className="billtabIner"
                                />
                                <Tab
                                  label="Pending payment"
                                  className="billtabIner"
                                />
                              </Tabs>
                            </AppBar>
                          </Grid>
                          <Grid item xs={12} sm={6} md={5}>
                            {/* <Grid className="taskSort">
                              {this.state.showinput && (
                                <input
                                  className="TaskSearch"
                                  type="text"
                                  name="search"
                                  placeholder="Search"
                                  value={this.state.text}
                                  onChange={this.FilterText}
                                />
                              )}
                              <a>
                                {!this.state.showinput ? (
                                  <img
                                    src={require("assets/virtual_images/search-entries.svg")}
                                    alt=""
                                    title=""
                                    onClick={() => {
                                      this.setState({
                                        showinput: !this.state.showinput,
                                      });
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={require("assets/images/close-search.svg")}
                                    alt=""
                                    title=""
                                    onClick={() => {
                                      this.setState({
                                        showinput: !this.state.showinput,
                                        text: "",
                                      });
                                      this.clearFilter();
                                    }}
                                  />
                                )}
                              </a>
                            </Grid> */}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid className="presPkgIner2">
                        <Grid className="presOpinionIner">
                          <Table>
                            <Thead>
                              <Tr>
                                <Th>{added_on}</Th>
                                <Th>{Headache}</Th>
                                <Th>{stomach_problems}</Th>
                                <Th>{Diarrhea}</Th>
                                <Th>{Fever}</Th>
                                <Th>{back_pain}</Th>
                                <Th>{cough_and_snees}</Th>
                                <Th>{feel_depressed}</Th>
                                <Th>{cardiac_problems}</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {AllDataPart &&
                                AllDataPart?.length > 0 &&
                                AllDataPart.map((item, index) => (
                                  <Tr
                                    className={
                                      item && item?.is_decline
                                        ? "declineListCol"
                                        : ""
                                    }
                                  >
                                    <Td>
                                      <p>
                                        {item && !item?.due_on?.date ? (
                                          "-"
                                        ) : (
                                          <>
                                            {getDate(
                                              item?.due_on?.date,
                                              this.props.settings &&
                                                this.props.settings?.setting &&
                                                this.props.settings?.setting
                                                  ?.date_format
                                            )}
                                          </>
                                        )}
                                      </p>
                                      <p>
                                        {item?.due_on?.time &&
                                          getTime(
                                            new Date(item?.due_on?.time),
                                            this.props.settings &&
                                              this.props.settings?.setting &&
                                              this.props.settings?.setting
                                                ?.time_format
                                          )}
                                      </p>
                                    </Td>
                                    <Td>
                                        {item && item.headache && item.headache === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.stomach_problems && item.stomach_problems === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.diarrhea && item.diarrhea === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.have_fever && item.have_fever === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.back_pain && item.back_pain === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.cough_and_snees && item.cough_and_snees === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.feel_depressed && item.feel_depressed === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>
                                    <Td>
                                        {item && item.cardiac_problems && item.cardiac_problems === 'yes' ? (
                                            <>{yes}</>
                                        ) : (
                                            <>{no}</>
                                        )}
                                    </Td>

                                    <Td className="presEditDot scndOptionIner">
                                      <a className="openScndhrf">
                                        <img
                                          src={require("assets/images/three_dots_t.png")}
                                          alt=""
                                          title=""
                                          className="openScnd"
                                        />
                                        <ul>
                                          <li>
                                            <a
                                              onClick={() => {
                                                handleOpenDetail(item, this);
                                              }}
                                            >
                                              <img
                                                src={require("assets/images/details.svg")}
                                                alt=""
                                                title=""
                                              />
                                              see details
                                            </a>
                                          </li>

                                          {/* {item.meetingjoined &&
                                            item.meetingjoined === true && ( */}
                                              <li>
                                                <a
                                                // onClick={() => {
                                                //   DownloadBill(
                                                //     this,
                                                //     item?.payment_data?.id,
                                                //     item?.created_at
                                                //   );
                                                // }}
                                                >
                                                  <img
                                                    src={require("assets/images/download.svg")}
                                                    alt=""
                                                    title=""
                                                  />
                                                  Download Bill
                                                </a>
                                              </li>
                                            {/* )} */}
                                        </ul>
                                      </a>
                                    </Td>
                                  </Tr>
                                ))}
                            </Tbody>
                          </Table>
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
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    OptionList,
  })(Index)
);
