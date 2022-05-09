import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { getLanguage } from "translations/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Loader from "Screens/Components/Loader/index";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import { getDate, getTime } from "Screens/Components/BasicMethod/index";
import Pagination from "Screens/Components/Pagination/index";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Modal from "@material-ui/core/Modal";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import FileViews from "Screens/Components/TimelineComponent/FileViews/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllDataSec: [],
      // AllData1: [],

      openDetail: false,

      newTask: {},
    };
  }

  componentDidMount() {
    this.allgetData(this.props.stateLoginValueAim.user._id);
    // console.log("hgfhfhfh", this.props.stateLoginValueAim.user._id);
  }

  allgetData = (patient_id) => {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Something_went_wrong } = translate;
    axios
      .get(
        sitedata.data.path + "/vactive/GetAllPatientData/" + patient_id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          let data = responce.data;
          this.setState({ AllDataSec: data.data });
        } else {
          this.setState({
            errorMsg: Something_went_wrong,
          });
        }
      });
  };

  handleCloseDetail = () => {
    this.setState({ openDetail: false });
  };

  handleOpenDetail = () => {
    this.setState({ openDetail: true });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      added_on,
      Headache,
      Stomach_Problems,
      diarrhea,
      fever,
      back_pain,
      cough_and_snees,
      feel_depressed,
      cardiac_problems,
      see_details,
      edit_request,
      cancel_request,
      Download_Bill,
      give_feedback,

      
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
                  {/* Website Menu */}
                  <LeftMenu isNotShow={true} currentPage="feedback" />
                  <LeftMenuMobile isNotShow={true} currentPage="feedback" />
                  <Grid item xs={12} md={11} lg={10}>
                    <Grid className="docsOpinion docsAllOption">
                      <Grid container direction="row" className="docsOpinLbl">
                        <Grid item xs={12} md={6}>
                          <label>Request List</label>
                        </Grid>
                        {/* <Grid item xs={12} md={6} className="docsOpinRght">
                          <a onClick={this.handlePicEval}>+ {New} {"Picture Evaluation"}</a>
                      </Grid> */}
                      </Grid>
                      <Grid className="presPkgIner2">
                        <Grid className="presOpinionIner">
                          <Table>
                            <Thead>
                              <Tr>
                                <Th>{added_on}</Th>
                                <Th>{Headache}</Th>
                                <Th>{Stomach_Problems}</Th>
                                <Th>{diarrhea}</Th>
                                <Th>{fever}</Th>
                                <Th>{back_pain}</Th>
                                <Th>{cough_and_snees}</Th>
                                <Th>{feel_depressed}</Th>
                                <Th>{cardiac_problems}</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {this.state.AllDataSec?.length > 0 &&
                                this.state.AllDataSec.map((item, index) => (
                                  <Tr>
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
                                      {/* {getDate(
                                      item && item?.created_at,
                                      this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting
                                        ?.date_format
                                    )} */}
                                    </Td>
                                    {/* <Td>{item.task_name}</Td> */}

                                    <Td>{item.headache ? "Yes" : "No"}</Td>

                                    <Td>
                                      {item.stomach_problems ? "Yes" : "No"}
                                    </Td>

                                    <Td>{item.diarrhea ? "Yes" : "No"}</Td>

                                    <Td>{item.have_fever ? "Yes" : "No"}</Td>

                                    <Td>{item.back_pain ? "Yes" : "No"}</Td>

                                    <Td>
                                      {item.cough_and_snees ? "Yes" : "No"}
                                    </Td>

                                    <Td>
                                      {item.feel_depressed ? "Yes" : "No"}
                                    </Td>

                                    <Td>
                                      {item.cardiac_problems ? "Yes" : "No"}
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
                                            <a onClick={this.handleOpenDetail}>
                                              <img
                                                src={require("assets/images/details.svg")}
                                                alt=""
                                                title=""
                                              />
                                              {see_details}
                                            </a>
                                          </li>
                                          {(!item.is_payment ||
                                            item.is_decline) && (
                                            <li>
                                              <a
                                              // onClick={() => {
                                              //   updateRequestBeforePayment(
                                              //     this,
                                              //     item
                                              //   );
                                              // }}
                                              >
                                                <img
                                                  src={require("assets/virtual_images/pencil-1.svg")}
                                                  alt=""
                                                  title=""
                                                />
                                                {edit_request}
                                              </a>
                                            </li>
                                          )}
                                          {!item.is_payment && (
                                            <li>
                                              <a
                                                onClick={() => {
                                                  this.deleteRequest(item._id);
                                                }}
                                              >
                                                <img
                                                  src={require("assets/images/cancel-request.svg")}
                                                  alt=""
                                                  title=""
                                                />
                                                {cancel_request}
                                              </a>
                                            </li>
                                          )}

                                          {item.is_payment && (
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
                                                {Download_Bill}
                                              </a>
                                            </li>
                                          )}

                                          {(item.status === "done" ||
                                            item?.comments?.length > 0 ||
                                            item?.attachments?.length > 0) && (
                                            <>
                                              <li>
                                                <a
                                                // onClick={() =>
                                                //   handleOpFeedback(this, item)
                                                // }
                                                >
                                                  <img
                                                    src={require("assets/images/details.svg")}
                                                    alt=""
                                                    title=""
                                                  />
                                                  {give_feedback}
                                                </a>
                                              </li>
                                            </>
                                          )}
                                        </ul>
                                      </a>
                                    </Td>
                                  </Tr>
                                ))}
                            </Tbody>
                          </Table>
                          <Grid className="tablePagNum">
                            <Grid container direction="row">
                              <Grid item xs={12} md={6}>
                                <Grid className="totalOutOff">
                                  <a>
                                    {this.state.currentPage} of{" "}
                                    {this.state.totalPage}
                                  </a>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                {this.state.totalPage > 1 && (
                                  <Grid className="prevNxtpag">
                                    <Pagination
                                      totalPage={this.state.totalPage}
                                      currentPage={this.state.currentPage}
                                      pages={this.state.pages}
                                      onChangePage={(page) => {
                                        this.onChangePage(page);
                                      }}
                                    />
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Model setup */}
              <Modal
                open={this.state.openDetail}
                onClose={this.handleCloseDetail}
                className={
                  this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark"
                    ? "darkTheme"
                    : ""
                }
              >
                <Grid className="creatTaskModel">
                  <Grid className="creatTaskCntnt">
                    <Grid>
                      <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                          <Grid className="creatLbl">
                            <Grid className="creatLblClose createLSet">
                              <a onClick={this.handleCloseDetail}>
                                <img
                                  src={require("assets/images/close-search.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                            </Grid>
                            <label>Details</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        className="setDetail-eval"
                      >
                        <Grid item xs={12} md={12} className="taskDescp">
                          <Grid className="stndQues stndQues1">
                            <Grid class="addStnd">
                              {this.state.newTask.headache === "yes" && (
                                <Grid>
                                  <Grid>
                                    <h2>{Headache}</h2>
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Modal>

              {/* End of Model setup */}
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
  })(Index)
);
