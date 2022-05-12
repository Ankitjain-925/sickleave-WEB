import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Settings } from 'Screens/Login/setting';
import Loader from 'Screens/Components/Loader/index';
import { LanguageFetchReducer } from 'Screens/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authy } from 'Screens/Login/authy.js';
import { LoginReducerAim } from 'Screens/Login/actions';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import { OptionList } from 'Screens/Login/metadataaction';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import HeadacheSection from './headacheSection';
import BackPainSection from './BackPainSection';
import StomachSection from './StomacheSection';
import FeverSection from './FeverSection';
import DiarheaaSection from './DiarheaaSection';
import SneezSection from './SneezSection';
import CPSection from './CPSection';
import DepressedSection from './DepressedSection';
import Calendar2 from 'react-calendar';
import {
  GetLanguageMetadata,
  onChange,
  Isintime,
  ExitinHoliday,
  Availabledays,
  getCalendarData,
  updateAllEntrySec,
  handleEvalSubmit,
  updateAllEntrySec1,
  updateAllEntrySec2,
} from './api';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateQues: {},
      Allsituation: [],
      allMetadata: [],
      DataprotectionRules: false,
      error_section: 0,
      errorChrMsg: '',
      loaderImage: false,
      openCalendar: false,
      date: new Date(),
      appointmentData: [],
      appointDate: [],
    };
  }

  updateAllEntrySec = (value, name) => {
    var state = this.state.updateQues;
    state[name] = value;
    this.setState({ updateQues: state });
  };

  componentDidMount = () => {
    this.getMetadata();
    getCalendarData(this);
  };

  getMetadata = () => {
    this.setState({ allMetadata: this.props.metadata }, () => {
      GetLanguageMetadata(this);
    });
  };

  render() {
    const {
      updateQues,
      error_section,
      errorChrMsg,
      DataprotectionRules,
      openCalendar,
    } = this.state;
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
        {console.log('this.state.appointDate', this.state.appointDate)}
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="picture" />
                <LeftMenuMobile isNotShow={true} currentPage="picture" />
                <Grid item xs={12} md={11} lg={10}>
                  <Grid className="docsOpinion">
                    <Grid container direction="row" className="docsOpinLbl">
                      <Grid item xs={12} md={6}>
                        <label>Sick Leave Certificate</label>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid className="cnfrmDiaMain2">
                      {!openCalendar === true && (
                        <Grid>
                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'headache', this)
                                }
                                label="You have a headache?"
                                value={updateQues.headache}
                              />
                            </Grid>
                            {error_section == 48 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>
                          {updateQues && updateQues?.headache === 'yes' && (
                            <HeadacheSection
                              updateAllEntrySec2={(e) => {
                                updateAllEntrySec2(e, this);
                              }}
                              updateAllEntrySec={(e, name) =>
                                updateAllEntrySec(e, name, this)
                              }
                              updateAllEntrySec1={(e) =>
                                updateAllEntrySec1(e, this)
                              }
                              updateQues={this.state.updateQues}
                              error_section={this.state.error_section}
                              Allsituation={this.state.Allsituation}
                              errorChrMsg={this.state.errorChrMsg}
                            />
                          )}

                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'stomach_problems', this)
                                }
                                label="You have Stomach Problems?"
                                value={updateQues?.stomach_problems}
                              />
                            </Grid>
                            {error_section == 49 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>
                          {updateQues &&
                            updateQues?.stomach_problems === 'yes' && (
                              <StomachSection
                                updateAllEntrySec2={(e) => {
                                  updateAllEntrySec2(e, this);
                                }}
                                updateAllEntrySec={(e, name) =>
                                  updateAllEntrySec(e, name, this)
                                }
                                updateAllEntrySec1={(e) =>
                                  updateAllEntrySec1(e, this)
                                }
                                updateQues={this.state.updateQues}
                                error_section={this.state.error_section}
                                Allsituation={this.state.Allsituation}
                                errorChrMsg={this.state.errorChrMsg}
                                user={this.props.stateLoginValueAim?.user}
                              />
                            )}

                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'diarrhea', this)
                                }
                                label="You have Diarrhea?"
                                value={updateQues?.diarrhea}
                              />
                            </Grid>
                            {error_section == 50 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>

                          {updateQues && updateQues?.diarrhea === 'yes' && (
                            <DiarheaaSection
                              updateAllEntrySec2={(e) => {
                                updateAllEntrySec2(e, this);
                              }}
                              updateAllEntrySec={(e, name) =>
                                updateAllEntrySec(e, name, this)
                              }
                              updateAllEntrySec1={(e) =>
                                updateAllEntrySec1(e, this)
                              }
                              updateQues={this.state.updateQues}
                              error_section={this.state.error_section}
                              Allsituation={this.state.Allsituation}
                              errorChrMsg={this.state.errorChrMsg}
                            />
                          )}

                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'have_fever', this)
                                }
                                label="You have Fever?"
                                value={updateQues?.have_fever}
                              />
                            </Grid>
                            {error_section == 51 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>

                          {updateQues && updateQues?.have_fever === 'yes' && (
                            <FeverSection
                              updateAllEntrySec2={(e) => {
                                updateAllEntrySec2(e, this);
                              }}
                              updateAllEntrySec={(e, name) =>
                                updateAllEntrySec(e, name, this)
                              }
                              updateAllEntrySec1={(e) =>
                                updateAllEntrySec1(e, this)
                              }
                              updateQues={this.state.updateQues}
                              error_section={this.state.error_section}
                              Allsituation={this.state.Allsituation}
                              errorChrMsg={this.state.errorChrMsg}
                            />
                          )}

                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'back_pain', this)
                                }
                                label="You have Back pain?"
                                value={updateQues?.back_pain}
                              />
                            </Grid>
                            {error_section == 52 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>

                          {updateQues && updateQues?.back_pain === 'yes' && (
                            <BackPainSection
                              updateAllEntrySec2={(e) => {
                                updateAllEntrySec2(e, this);
                              }}
                              updateAllEntrySec={(e, name) =>
                                updateAllEntrySec(e, name, this)
                              }
                              updateAllEntrySec1={(e) =>
                                updateAllEntrySec1(e, this)
                              }
                              updateQues={this.state.updateQues}
                              error_section={this.state.error_section}
                              Allsituation={this.state.Allsituation}
                              errorChrMsg={this.state.errorChrMsg}
                              DateFormat={
                                this.props.Settings?.setting?.date_format
                              }
                            />
                          )}

                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'cough_and_snees', this)
                                }
                                label="You have Cough and Snees?"
                                value={updateQues?.cough_and_snees}
                              />
                            </Grid>
                            {error_section == 53 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>

                          {updateQues && updateQues?.cough_and_snees === 'yes' && (
                            <SneezSection
                              updateAllEntrySec2={(e) => {
                                updateAllEntrySec2(e, this);
                              }}
                              updateAllEntrySec={(e, name) =>
                                updateAllEntrySec(e, name, this)
                              }
                              updateAllEntrySec1={(e) =>
                                updateAllEntrySec1(e, this)
                              }
                              updateQues={this.state.updateQues}
                              error_section={this.state.error_section}
                              Allsituation={this.state.Allsituation}
                              errorChrMsg={this.state.errorChrMsg}
                            />
                          )}
                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'feel_depressed', this)
                                }
                                label="You feel Depressed?"
                                value={updateQues?.feel_depressed}
                              />
                            </Grid>
                            {error_section == 54 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>

                          {updateQues && updateQues?.feel_depressed === 'yes' && (
                            <DepressedSection
                              updateAllEntrySec2={(e) => {
                                updateAllEntrySec2(e, this);
                              }}
                              updateAllEntrySec={(e, name) =>
                                updateAllEntrySec(e, name, this)
                              }
                              updateAllEntrySec1={(e) =>
                                updateAllEntrySec1(e, this)
                              }
                              updateQues={this.state.updateQues}
                              error_section={this.state.error_section}
                              Allsituation={this.state.Allsituation}
                              errorChrMsg={this.state.errorChrMsg}
                            />
                          )}
                          <Grid className="sickQuesSec">
                            <Grid className="fatiqueQues fatiqueQuess1">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'cardiac_problems', this)
                                }
                                label="you have Cardiac Problems?"
                                value={updateQues?.cardiac_problems}
                              />
                            </Grid>
                            {error_section == 55 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>

                          {updateQues &&
                            updateQues?.cardiac_problems === 'yes' && (
                              <CPSection
                                updateAllEntrySec2={(e) => {
                                  updateAllEntrySec2(e, this);
                                }}
                                updateAllEntrySec={(e, name) =>
                                  updateAllEntrySec(e, name, this)
                                }
                                updateAllEntrySec1={(e) =>
                                  updateAllEntrySec1(e, this)
                                }
                                updateQues={this.state.updateQues}
                                error_section={this.state.error_section}
                                Allsituation={this.state.Allsituation}
                                errorChrMsg={this.state.errorChrMsg}
                              />
                            )}

                          <Grid>
                            <Grid className="sickCheckSec">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="DataprotectionRules"
                                    value={
                                      DataprotectionRules &&
                                      DataprotectionRules == true
                                        ? false
                                        : true
                                    }
                                    color="#00ABAF"
                                    checked={DataprotectionRules}
                                    onChange={(e) => {
                                      updateAllEntrySec2(e, this);
                                    }}
                                    className="PIC_Condition"
                                  />
                                }
                                label="I have react and understood the Data protection rules and Regulations of Aimedis."
                              />
                            </Grid>
                            {error_section == 45 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>
                          <Grid className="infoShwSave3">
                            <input
                              type="submit"
                              value="Submit"
                              onClick={() => handleEvalSubmit(this)}
                            ></input>
                          </Grid>
                        </Grid>
                      )}
                      {openCalendar === true && (
                        <Grid>
                          <Grid className="selCalenderUpr">
                            <Grid className="selCalender">
                              <Calendar2
                                onChange={(e) => onChange(e, this)}
                                value={this.state.date}
                              />
                            </Grid>
                            <Grid className="selTimeSlot">
                              <Grid>
                                <label>Select time slot</label>
                              </Grid>
                              {console.log(
                                'this.state.appointDate',
                                this.state.appointDate
                              )}
                              <Grid className="selTimeAM">
                                {this.state.appointDate &&
                                this.state.appointDate.length > 0 ? (
                                  Availabledays(
                                    this.state.selectedDate,
                                    this.state.appointmentData.appointment_days
                                  ) ? (
                                    <Grid>
                                      <span>NotAvailable !</span>
                                    </Grid>
                                  ) : ExitinHoliday(
                                      this.state.selectedDate,
                                      this.state.appointmentData.holidays_start,
                                      this.state.appointmentData.holidays_end
                                    ) ? (
                                    <Grid>
                                      <span>holiday !</span>
                                    </Grid>
                                  ) : (
                                    this.state.appointDate.map((data, iA) => {
                                      if (
                                        Isintime(
                                          this.state.appointDate[iA],
                                          this.state.appointmentData
                                            .breakslot_start,
                                          this.state.appointmentData
                                            .breakslot_end,
                                          this.state.appointmentData
                                            .holidays_start,
                                          this.state.appointmentData
                                            .holidays_end
                                        )
                                      )
                                        return;

                                      return (
                                        <Grid>
                                          {this.state.appointDate[iA + 1] &&
                                          this.state.appointDate[iA + 1] !==
                                            'undefined' &&
                                          iA === 0 ? (
                                            <a
                                            // className={
                                            //   this.state.currentSelected ===
                                            //     0 && 'current_selected'
                                            // }
                                            // onClick={() => {
                                            //   this.findAppointment(
                                            //     'tab3',
                                            //     this.state.doc_select,
                                            //     this.stateappointType,
                                            //     this.state.apointDay,
                                            //     iA
                                            //   );
                                            // }}
                                            >
                                              {this.state.appointDate[iA] +
                                                ' - ' +
                                                this.state.appointDate[iA + 1]}
                                            </a>
                                          ) : (
                                            this.state.appointDate[iA + 1] &&
                                            this.state.appointDate[iA + 1] !==
                                              'undefined' && (
                                              <a
                                              // className={
                                              //   this.state.currentSelected &&
                                              //   this.state.currentSelected ===
                                              //     iA
                                              //     ? 'current_selected'
                                              //     : ''
                                              // }
                                              // onClick={() => {
                                              //   this.findAppointment(
                                              //     'tab3',
                                              //     doc_select,
                                              //     appointType,
                                              //     apointDay,
                                              //     iA
                                              //   );
                                              // }}
                                              >
                                                {this.state.appointDate[iA] +
                                                  ' - ' +
                                                  this.state.appointDate[
                                                    iA + 1
                                                  ]}
                                              </a>
                                            )
                                          )}
                                        </Grid>
                                      );
                                    })
                                  )
                                ) : this.state.appointDate !== undefined ? (
                                  <Grid>
                                    <span>NotAvailable !</span>
                                  </Grid>
                                ) : (
                                  <Grid>
                                    <span>NotAvailable !</span>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  {/* <Grid className="stripePromiseClss"> */}

                  {/* </Grid> */}
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
    OptionList,
    authy,
  })(Index)
);
