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
import PainPoint from "Screens/Components/PointPain/index";
import { GetLanguageDropdown } from 'Screens/Components/GetMetaData/index.js';
import { OptionList } from "Screens/Login/metadataaction";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllDataSec: [],
      // AllData1: [],

      openDetail: false,
      gender: "female",
      newTask: {},
      Allsituation: [],
      // allMetadata: [],
    };
  }

  componentDidMount() {
    this.allgetData(this.props.stateLoginValueAim.user._id);
    // console.log("hgfhfhfh", this.props.stateLoginValueAim.user._id);
    this.getMetadata();
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      this.GetLanguageMetadata();
    }
  };


  GetLanguageMetadata = () => {
    if (this.state.allMetadata) {
      var Allsituation = GetLanguageDropdown(
        this.state.allMetadata &&
        this.state.allMetadata.situation &&
        this.state.allMetadata.situation,
        this.props.stateLanguageType
      );
      var Allsmoking_status = GetLanguageDropdown(
        this.state.allMetadata &&
        this.state.allMetadata.smoking_status &&
        this.state.allMetadata.smoking_status,
        this.props.stateLanguageType
      );
      this.setState({
        Allsituation: Allsituation,
        Allsmoking_status: Allsmoking_status,
      });
    }
  };

  //Get All information Related to Metadata
  getMetadata() {
    this.setState({ allMetadata: this.props.metadata }, () => {
      this.GetLanguageMetadata();
    });
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

  handleOpenDetail = (item) => {
    this.setState({ openDetail: true, newTask: item });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      added_on,
      Headache,
      stomach_problems,
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
      headache_undergoing_treatment,
      no,
      yes,
      headache_need_to_vomit,
      quality_of_pain,
      headache_onset_of_pain,
      headache_take_painkillers,
      pain_levelsss,
      diabetes,
      blood_sugar,
      Hba1c,
      situation,
      rr_systolic,
      RR_diastolic,
      body_temp,
      headache_body_temp,
      headache_hurtnow_left,
      headache_hurtnow_right,
      headache_hurtnow_top,
      blood_pressure,
      headache_painbegin_top,
      hurtnow,
      headache_hurtnow_back,
      headache_hurtnow_front,
      headache_painbegin_back,
      headache_painbegin_front,
      headache_painbegin_left,
      headache_painbegin_right,
      Pain_begin,

      stomach_temp,
      stomach_take_painkillers,
      stomach_intensity,
      stomach_undergoing_treatment,
      stomach_sternum,
      stomach_attack,
      stomach_failure,
      stomach_periodically,
      // PainPoint,

      diarrhea_vomiting,
      diarrhea_body_temp,
      diarrhea_suffer_symtoms,
      diarrhea_liquids,
      diarrhea_symptoms_begin,

      cough,
      fever_cold,
      fever_hoarseness,
      fever_sputum,
      fever_symptoms_begin,
      fever_top_body_temp,
      fever_low_body_temp,
      fever_pain_intensity,

      back_strained,
      back_depression,
      back_attack,
      back_failure,
      back_symptoms_begin,
      back_injured,

      cough_symptoms_begin,
      cough_suffer_symtoms,
      cough_allergies,

      pain_level,
      depressed_do_you_sleep,
      depressed_suicidal_thoughts,
      depressed_hurt_yourself,
      depressed_symptoms_begin,

      cardiac_heart_attack,
      cardiac_heart_failure,
      cardiac_dizziness,
      cardiac_shoulder_pain,
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
                        <Grid className="presOpinionIner ">
                          <Table>
                            <Thead>
                              <Tr>
                                <Th>{added_on}</Th>
                                <Th>{Headache}</Th>
                                <Th>{stomach_problems}</Th>
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

                                    <Td>{item.headache === 'yes' ? "Yes" : "No"}</Td>

                                    <Td>
                                      {item.stomach_problems === 'yes' ? "Yes" : "No"}
                                    </Td>

                                    <Td>{item.diarrhea === 'yes' ? "Yes" : "No"}</Td>

                                    <Td>{item.have_fever === 'yes' ? "Yes" : "No"}</Td>

                                    <Td>{item.back_pain === 'yes' ? "Yes" : "No"}</Td>

                                    <Td>
                                      {item.cough_and_snees === 'yes' ? "Yes" : "No"}
                                    </Td>

                                    <Td>
                                      {item.feel_depressed === 'yes' ? "Yes" : "No"}
                                    </Td>

                                    <Td>
                                      {item.cardiac_problems === 'yes' ? "Yes" : "No"}
                                    </Td>
                                    <Td >
                                      <a className="academy_ul">
                                        <InfoOutlinedIcon className='InfoOutLine' />
                                        <ul >
                                          <li>
                                            <h6 className="assignHos">Your payment process is pending</h6>

                                          </li>
                                        </ul>
                                      </a>
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
                                                this.handleOpenDetail(item);
                                              }}
                                            >
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
                {/* {this.state.newTask?.approved == true && (!this.state.newTask.is_payment || this.state.newTask.is_payment == false) && (
                  <div><p>Your request is accepted by the doctor but your payment is 
                    pending, Please do your payment otherwise the the
                     request will cancel automatically</p></div>
                )} */}
                {/* {this.state.newTask?.approved?.length > 0 ? (
                  <div><p>hello</p></div>
                ) : null} */}

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
                        {(!this.state.newTask?.approved || this.state.newTask?.approved == true) && (!this.state.newTask.is_payment || this.state.newTask.is_payment == false) && (
                          <div className="approvedPayment"><p>Your request is accepted by the doctor but your payment is
                            pending, Please do your payment otherwise the 
                            request will cancel automatically</p></div>
                        )}
                        <Grid item xs={12} md={12} className="taskDescp">
                          <Grid className="stndQues stndQues1">
                            {this.state.newTask.headache === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{Headache}</h3>
                                </Grid>
                                <Grid>
                                  <h1>{Pain_begin}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={3} md={3}>
                                    <label>{headache_painbegin_back}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_painbegin_back === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{headache_painbegin_front}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_painbegin_front === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{headache_painbegin_left}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_painbegin_left === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{headache_painbegin_right}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_painbegin_right === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{headache_painbegin_top}</label>
                                    {this.state.newTask &&
                                      this.state.newTask?.headache_painbegin_top ===
                                      true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{hurtnow}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={3} md={3}>
                                      <label>{headache_hurtnow_back}</label>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.headache_hurtnow_back === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid xs={3} md={3}>
                                      <label>{headache_hurtnow_front}</label>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.headache_hurtnow_front === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid xs={3} md={3}>
                                      <label>{headache_hurtnow_left}</label>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.headache_hurtnow_left === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid xs={3} md={3}>
                                      <label>{headache_hurtnow_right}</label>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.headache_hurtnow_right === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid xs={3} md={3}>
                                      <label>{headache_hurtnow_top}</label>
                                      {this.state.newTask &&
                                        this.state.newTask?.headache_hurtnow_top ===
                                        true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{blood_pressure}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={6} md={6}>
                                      <label>{rr_systolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask.headache_rr_systolic}
                                      </p>
                                    </Grid>
                                    <Grid xs={6} md={6}>
                                      <label>{RR_diastolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            .headache_rr_diastolic}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{body_temp}</h1>
                                  </Grid>
                                  <Grid>
                                    <label>{headache_body_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.headache_body_temp}
                                  </p>
                                </Grid>
                                {this.state.newTask.headache_have_diabetes ===
                                  "yes" &&
                                  <Grid>
                                    <Grid>
                                      <h1>{diabetes}</h1>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={4} md={4}>
                                        <label>{blood_sugar}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.headache_blood_sugar}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{Hba1c}</label>
                                        {console.log("ffsfsd", GetShowLabel1(
                                          this.state.Allsituation,
                                          this.state.newTask?.headache_situation
                                            ?.value,
                                          this.props.stateLanguageType,
                                          true,
                                          "anamnesis"
                                        ))}
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask?.headache_Hba1c}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{situation}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.headache_situation &&
                                            this.state.newTask?.headache_situation
                                              ?.value &&
                                            GetShowLabel1(
                                              this.state.Allsituation,
                                              this.state.newTask?.headache_situation
                                                ?.value,
                                              this.props.stateLanguageType,
                                              true,
                                              "anamnesis"
                                            )}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>}
                                <Grid className="sickAllMngSec">
                                  <label>{quality_of_pain}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_quality_of_pain}
                                </p>
                                <Grid className="sickAllMngSec">
                                  <label>{headache_need_to_vomit}</label>
                                  {this.state.newTask &&
                                    this.state.newTask?.headache_need_to_vomit ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{headache_onset_of_pain}</label>
                                  {this.state.newTask &&
                                    this.state.newTask?.headache_onset_of_pain ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>

                                <Grid className="sickAllMngSec">
                                  <label>{headache_take_painkillers}</label>
                                </Grid>
                                {this.state.newTask &&
                                  this.state.newTask?.take_painkillers ===
                                  "yes" ? (
                                  <p>{yes}</p>
                                ) : (
                                  <p>{no}</p>
                                )}

                                <Grid className="sickAllMngSec">
                                  <label>{headache_undergoing_treatment}</label>
                                </Grid>
                                {this.state.newTask &&
                                  this.state.newTask?.undergoing_treatment ===
                                  "yes" ? (
                                  <p>{yes}</p>
                                ) : (
                                  <p>{no}</p>
                                )}

                                <Grid className="sickAllMngSec">
                                  <label>{pain_levelsss}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.headache_pain_intensity}
                                </p>
                              </Grid>}
                            {this.state.newTask.stomach_problems === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{stomach_problems}</h3>
                                </Grid>
                                <Grid>
                                  <h1>{Pain_begin}</h1>
                                  <PainPoint
                                    gender={this.state.gender}
                                    painPoint={
                                      this.state.newTask
                                        .stomach_painbegin_painPoint
                                    }
                                    isView={true}
                                  />
                                </Grid>
                                <Grid>
                                  <h1>{hurtnow}</h1>
                                  <PainPoint
                                    gender={this.state.gender}
                                    painPoint={
                                      this.state.newTask
                                        .stomach_hurtnow_painPoint
                                    }
                                    isView={true}
                                  />
                                </Grid>

                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{stomach_sternum}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.stomach_behind_the_sternum === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{stomach_attack}</label>
                                    {this.state.newTask &&
                                      this.state.newTask?.stomach_heart_attack ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{stomach_failure}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.stomach_heart_failure === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{blood_pressure}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={6} md={6}>
                                      <label>{rr_systolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            ?.stomach_rr_systolic}
                                      </p>
                                    </Grid>
                                    <Grid xs={6} md={6}>
                                      <label>{RR_diastolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            ?.stomach_rr_diastolic}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                {this.state.newTask.stomach_have_diabetes === 'yes' &&
                                  <Grid>
                                    <Grid>
                                      <h1>{diabetes}</h1>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={4} md={4}>
                                        <label>{blood_sugar}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.stomach_blood_sugar}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{Hba1c}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask?.stomach_Hba1c}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{situation}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.stomach_situation &&
                                            this.state.newTask?.stomach_situation
                                              ?.value &&
                                            GetShowLabel1(
                                              this.state.Allsituation,
                                              this.state.newTask
                                                ?.stomach_situation?.value,
                                              this.props.stateLanguageType,
                                              true,
                                              "anamnesis"
                                            )}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>}

                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{stomach_periodically}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.stomach_continuously_or_periodically ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid>
                                    <h1>{body_temp}</h1>
                                  </Grid>
                                  <Grid>
                                    <label>{stomach_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.stomach_body_temp}
                                  </p>
                                  <Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>{stomach_take_painkillers}</label>
                                    </Grid>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.stomach_take_painkillers === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{stomach_intensity}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.stomach_pain_intensity}
                                    </p>
                                  </Grid>
                                  <Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>
                                        {stomach_undergoing_treatment}
                                      </label>
                                    </Grid>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.stomach_undergoing_treatment ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>}
                            {this.state.newTask.diarrhea === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{diarrhea}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{diarrhea_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                      this.state.newTask
                                        ?.diarrhea_symptoms_begin,
                                      this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting
                                        ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{diarrhea_vomiting}</label>

                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.diarrhea_suffer_from_vomiting ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <h1>{body_temp}</h1>
                                  </Grid>
                                  <Grid>
                                    <label>{diarrhea_body_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.diarrhea_body_temp}
                                  </p>
                                  <Grid className="sickAllMngSec">
                                    <label>{diarrhea_suffer_symtoms}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.diarrhea_envi_suffer_symtoms ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{diarrhea_liquids}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.diarrhea_liquids_with_you === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>}
                            {this.state.newTask.have_fever === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{fever}</h3>
                                </Grid>

                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{fever_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                      this.state.newTask
                                        ?.fever_symptoms_begin,
                                      this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting
                                        ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <h1>{body_temp}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={6} md={6} >
                                    <label>{fever_top_body_temp}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.fever_top_body_temp}
                                    </p>
                                  </Grid>
                                  <Grid xs={6} md={6}>
                                    <label>{fever_low_body_temp}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.fever_low_body_temp}
                                    </p>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{fever_pain_intensity}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.fever_pain_intensity}
                                  </p>
                                </Grid>
                                {this.state.newTask.fever_have_a_cough === 'yes' &&
                                  <Grid>
                                    <Grid>
                                      <h1>{cough}</h1>
                                    </Grid>

                                    <Grid container xs={12} md={12}>
                                      <Grid xs={6} md={6}>
                                        <label>{fever_cold}</label>
                                        {this.state.newTask &&
                                          this.state.newTask?.fever_cold === true ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid xs={6} md={6}>
                                        <label>{fever_hoarseness}</label>

                                        {this.state.newTask &&
                                          this.state.newTask?.fever_hoarseness ===
                                          true ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>}
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{fever_sputum}</label>
                                  </Grid>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        this.state.newTask &&
                                        this.state.newTask?.fever_sputum,
                                    }}
                                  />
                                </Grid>
                              </Grid>}
                            {this.state.newTask.back_pain === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{back_pain}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{back_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                      this.state.newTask
                                        ?.back_pain_symptoms_begin,
                                      this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting
                                        ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{back_injured}</label>
                                  </Grid>
                                  {this.state.newTask &&
                                    this.state.newTask?.back_pain_been_injured ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{back_strained}</label>

                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.back_pain_physically_strained ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{back_depression}</label>

                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.back_pain_stress_depression === "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                {this.state.newTask.back_pain_have_diabetes ===
                                  "yes" &&
                                  <Grid>
                                    <Grid>
                                      <h1>{diabetes} </h1>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={4} md={4}>
                                        <label>{blood_sugar}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.back_pain_blood_sugar}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{Hba1c}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask?.back_pain_Hba1c}
                                        </p>
                                      </Grid>

                                      <Grid xs={4} md={4}>
                                        <label>{situation}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.back_pain_situation &&
                                            this.state.newTask
                                              ?.back_pain_situation?.value &&
                                            GetShowLabel1(
                                              this.state.Allsituation,
                                              this.state.newTask
                                                ?.back_pain_situation?.value,
                                              this.props.stateLanguageType,
                                              true,
                                              "anamnesis"
                                            )}
                                        </p>
                                      </Grid>
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>{back_attack}</label>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.back_pain_heart_attack === "yes" ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>{back_failure}</label>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.back_pain_heart_failure === "yes" ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid>
                                      <Grid>
                                        <h1>{blood_pressure}</h1>
                                      </Grid>
                                      <Grid container xs={12} md={12}>
                                        <Grid xs={6} md={6}>
                                          <label>{rr_systolic}</label>
                                          <p>
                                            {this.state.newTask &&
                                              this.state.newTask
                                                ?.back_pain_rr_systolic}
                                          </p>
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                          <label>{RR_diastolic}</label>
                                          <p>
                                            {this.state.newTask &&
                                              this.state.newTask
                                                ?.back_pain_rr_diastolic}
                                          </p>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>}
                              </Grid>}
                            {this.state.newTask.cough_and_snees === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{cough_and_snees}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{cough_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                      this.state.newTask
                                        ?.cough_symptoms_begin,
                                      this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting
                                        ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <h1>{body_temp}</h1>
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <label>{body_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.cough_body_temp}
                                  </p>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{cough_suffer_symtoms}</label>
                                  </Grid>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.cough_envi_suffer_symtoms === "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{cough_allergies}</label>
                                  </Grid>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        this.state.newTask &&
                                        this.state.newTask
                                          ?.cough_suffer_from_allergies,
                                    }}
                                  />
                                </Grid>
                              </Grid>}
                            {this.state.newTask.feel_depressed === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{feel_depressed}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{depressed_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                      this.state.newTask
                                        ?.depressed_symptoms_begin,
                                      this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting
                                        ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{pain_level}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.depressed_pain_intensity}
                                  </p>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4} className="sickAllMngSec">
                                    <label>{depressed_do_you_sleep}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.depressed_do_you_sleep === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4} className="sickAllMngSec">
                                    <label>{depressed_suicidal_thoughts}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.depressed_suicidal_thoughts ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4} className="sickAllMngSec">
                                    <label>{depressed_hurt_yourself}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.depressed_hurt_yourself === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>}
                            {this.state.newTask.cardiac_problems === 'yes' &&
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{cardiac_problems}</h3>
                                </Grid>
                                <Grid>
                                  <h1>{blood_pressure}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={6} md={6}>
                                    <label>{rr_systolic}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.cardiac_rr_systolic}
                                    </p>
                                    {/* {console.log("abc", this.state.newTask)} */}
                                  </Grid>
                                  <Grid xs={6} md={6}>
                                    <label>{RR_diastolic}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.cardiac_rr_diastolic}
                                    </p>
                                  </Grid>
                                </Grid>

                                <Grid container xs={12} md={12}>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_heart_attack}</label>

                                    {this.state.newTask &&
                                      this.state.newTask?.cardiac_heart_attack ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_heart_failure}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.cardiac_heart_failure === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_dizziness}</label>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.cardiac_have_dizziness === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_shoulder_pain}</label>

                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.cardiac_have_shoulder_pain === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>}
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
