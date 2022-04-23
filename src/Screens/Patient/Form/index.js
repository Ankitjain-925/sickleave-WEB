import React, { useEffect, useState } from 'react';
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
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from 'Screens/Components/mmHgField/index';
import NotesEditor from '../../Components/Editor/index';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';
import PainPoint from '../../Components/PointPain/index';
import SelectByTwo from 'Screens/Components/SelectbyTwo/index';
import DateFormat from 'Screens/Components/DateFormat/index';

function Index() {
  const [updateQues, setUpdateQues] = useState({});
  const [loaderImage, setloaderImage] = useState(false);
  const [bp_avail, setBp_avail] = useState(false);
  const [allCheckData, setallCheckData] = useState({ back: false });

  // useEffect(() => {
  //   GetLanguageMetadata();
  // }, []);

  // Set the state of questions
  const updateAllEntrySec = (e, name) => {
    updateQues[name] = e;
    setUpdateQues({ ...updateQues });
  };

  const updateAllEntrySec1 = (e) => {
    updateQues[e.target.name] = e.target.value;
    setUpdateQues({ ...updateQues });
  };

  // Set the checkbox state
  const updateAllEntrySec2 = (e, name) => {
    const state = updateQues;
    state[name] = e.target.value == 'true' ? true : false;
    setUpdateQues({ ...updateQues });
  };

  const handleEvalSubmit = () => {
    console.log('updateQues', updateQues);
    setUpdateQues({});
    setBp_avail(false);
  };

  // const GetLanguageMetadata = () => {
  //   if (this.state.allMetadata) {
  //     var Allsituation = GetLanguageDropdown(
  //       this.state.allMetadata &&
  //         this.state.allMetadata.situation &&
  //         this.state.allMetadata.situation,
  //       this.props.stateLanguageType
  //     );
  //     var Allsmoking_status = GetLanguageDropdown(
  //       this.state.allMetadata &&
  //         this.state.allMetadata.smoking_status &&
  //         this.state.allMetadata.smoking_status,
  //       this.props.stateLanguageType
  //     );
  //     this.setState({
  //       Allsituation: Allsituation,
  //       Allsmoking_status: Allsmoking_status,
  //     });
  //   }
  // };

  return (
    <Grid>
      {loaderImage && <Loader />}
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
                    <Grid className="fatiqueQues fatiqueQuess1">
                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'headache')
                        }
                        label="You have a headache?"
                        value={updateQues.headache}
                      />
                      {updateQues && updateQues?.headache === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>Where did the pain begin?</label>
                            <Grid container direction="row" justify="center">
                              <Grid item xs={12} md={12}>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                >
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.back === true &&
                                          allCheckData?.back
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            back: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Back</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Front</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Left</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Right</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Top</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid>
                            <label>Where does it hurt now?</label>
                            <Grid container direction="row" justify="center">
                              <Grid item xs={12} md={12}>
                                <Grid
                                  container
                                  direction="row"
                                  justify="center"
                                >
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.back === true &&
                                          allCheckData?.back
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            back: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Back</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Front</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Left</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Right</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <Grid>
                                      <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        checked={
                                          allCheckData?.front === true &&
                                          allCheckData?.front
                                        }
                                        onChange={(e) => {
                                          setallCheckData({
                                            front: e.target.checked,
                                          });
                                        }}
                                        className="PIC_Condition"
                                      />
                                      <label>Top</label>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} md={2}></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid>
                            <label>What is your Blood pressure ?</label>
                          </Grid>
                          <Grid container direction="row" spacing="1">
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_systolic"
                                  Unit="mmHg"
                                  label="RR_systolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_systolic}
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_diastolic"
                                  Unit="mmHg"
                                  label="RR_diastolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_diastolic}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid className="textFieldArea1">
                            <label>
                              If you have Temperature, please tell me in C ?
                            </label>
                            <input
                              type="number"
                              placeholder="36.6"
                              name="body_temp"
                              onChange={(e) =>
                                updateAllEntrySec1(e, 'body_temp')
                              }
                              // className={forError ? 'setRedColor' : ''}
                              value={updateQues?.body_temp}
                            ></input>
                          </Grid>

                          <Grid className="fillDiaAll">
                            {/* <label>
                              How would you describe the quality of pain?
                              (Throbbing, stinging ...)
                            </label>
                             <NotesEditor
                              name="quality_of_pain"
                              onChange={(e) =>
                                updateAllEntrySec(e, 'quality_of_pain')
                              }
                              value={updateQues?.quality_of_pain}
                            />  */}
                            <SymptomQuestions
                              updateEntryState1={(e) =>
                                updateAllEntrySec(e, 'quality_of_pain')
                              }
                              comesFrom="Feedback"
                              label="How would you describe the quality of pain?
                              (Throbbing, stinging ...)"
                              value={updateQues?.quality_of_pain}
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'need_to_vomit')
                            }
                            label="Do you need to vomit ?"
                            value={updateQues?.need_to_vomit}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'onset_of_pain')
                            }
                            label="Did you have an aura before the onset of pain? (dynamic, mostly visual or other sensory perceptual disorders)"
                            value={updateQues?.onset_of_pain}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'take_painkillers')
                            }
                            label="Do you take painkillers?"
                            value={updateQues?.take_painkillers}
                          />
                          <Grid>
                            <label>
                              On a scale of 1 - 10, how would you describe the
                              intensity of the pain?
                            </label>
                            <PainIntensity
                              name="pain_intensity"
                              onChange={(e) => updateAllEntrySec1(e)}
                              value={Math.round(updateQues?.pain_intensity)}
                              // setting={this.props.settings}
                              comesFrom="Evalute"
                            />
                          </Grid>
                        </Grid>
                      )}

                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'stomach_problems', 2)
                        }
                        label="You have Stomach Problems?"
                        value={updateQues?.stomach_problems}
                      />

                      {updateQues && updateQues?.stomach_problems === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid className="fillDia">
                            <Grid>
                              <label>Where did the pain begin?</label>
                            </Grid>
                            <PainPoint
                              id="New_id1"
                              // gender={this.state.gender}
                              painPoint={
                                updateQues && updateQues?.painPoint
                                  ? updateQues.painPoint
                                  : []
                              }
                              onChange={(e) =>
                                updateAllEntrySec(e, 'painPoint')
                              }
                            />
                          </Grid>
                          <Grid className="fillDia">
                            <Grid>
                              <label>Where does it hurt now?</label>
                            </Grid>
                            <PainPoint
                              id="New_id1"
                              // gender={this.state.gender}
                              painPoint={
                                updateQues && updateQues?.painPoint
                                  ? updateQues?.painPoint
                                  : []
                              }
                              onChange={(e) =>
                                updateAllEntrySec(e, 'painPoint')
                              }
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'behind_the_sternum', 2)
                            }
                            label="Do you have pain behind the sternum?"
                            value={updateQues?.behind_the_sternum}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'heart_attack')
                            }
                            label="Have you ever had a heart attack?"
                            value={updateQues?.heart_attack}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'heart_failure')
                            }
                            label="Do you suffer from diagnosed Heart failure?"
                            value={updateQues?.heart_failure}
                          />
                          <Grid>
                            <label>
                              Do you suffer from high or low blood pressure if
                              so can you give the values?
                            </label>
                          </Grid>
                          <Grid container direction="row" spacing="1">
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_systolic"
                                  Unit="mmHg"
                                  label="RR_systolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_systolic}
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_diastolic"
                                  Unit="mmHg"
                                  label="RR_diastolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_diastolic}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'have_diabetes')
                            }
                            label="Do you have diabetes? If so, what is your blood sugar?"
                            value={updateQues?.have_diabetes}
                          />
                          {updateQues && updateQues?.have_diabetes === 'yes' && (
                            <>
                              <Grid container direction="row" spacing="1">
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="blood_sugar"
                                      Unit="mg/dl"
                                      label="Blood sugar"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.blood_sugar}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="Hba1c"
                                      Unit="%"
                                      label="Hba1c"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.Hba1c}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid className="fillDia">
                                <SelectByTwo
                                  name="situation"
                                  label="Situation"
                                  // options={this.state.Allsituation}
                                  onChange={(e) =>
                                    updateAllEntrySec(e, 'situation')
                                  }
                                  value={updateQues?.situation}
                                />
                              </Grid>
                            </>
                          )}
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(
                                e,
                                'continuously_or_periodically'
                              )
                            }
                            label="Do the symptoms occur continuously or periodically?"
                            value={updateQues?.continuously_or_periodically}
                          />
                          <Grid className="textFieldArea1">
                            <label>
                              If you have Temperature, please tell me in C?
                            </label>
                            <input
                              type="number"
                              placeholder="36.6"
                              name="body_temp"
                              onChange={(e) => updateAllEntrySec1(e)}
                              // className={
                              //   this.state.forError ? 'setRedColor' : ''
                              // }
                              value={updateQues?.body_temp}
                            ></input>
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'take_painkillers')
                            }
                            label="Do you take painkillers ?"
                            value={updateQues?.take_painkillers}
                          />
                          <Grid>
                            <label>
                              On a scale of 1 - 10, how would you describe the
                              intensity of the pain?
                            </label>
                            <PainIntensity
                              name="pain_intensity"
                              onChange={(e) => updateAllEntrySec1(e)}
                              value={Math.round(updateQues?.pain_intensity)}
                              // setting={this.props.settings}
                              comesFrom="Evalute"
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'undergoing_treatment')
                            }
                            label="Are you already undergoing treatment for this Problem ?"
                            value={updateQues?.undergoing_treatment}
                          />
                        </Grid>
                      )}
                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'diarrhea')
                        }
                        label="You have Diarrhea?"
                        value={updateQues?.diarrhea}
                      />

                      {updateQues && updateQues?.diarrhea === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>When did the symptoms begin?</label>
                          </Grid>
                          <Grid>
                            <DateFormat
                              name="symptoms_begin"
                              value={
                                updateQues?.symptoms_begin
                                  ? new Date(updateQues?.symptoms_begin)
                                  : new Date()
                              }
                              max={new Date()}
                              onChange={(e) =>
                                updateAllEntrySec(e, 'symptoms_begin')
                              }
                              // date_format={
                              //   this.props.settings &&
                              //   this.props.settings.setting &&
                              //   this.props.settings.setting.date_format
                              // }
                              NotFutureDate={true}
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'suffer_from_vomiting')
                            }
                            label="Do you suffer from vomiting?"
                            value={updateQues?.suffer_from_vomiting}
                          />
                          <Grid className="textFieldArea1">
                            <label>
                              If you have Temperature, please tell me in C ?
                            </label>
                            <input
                              type="number"
                              placeholder="36.6"
                              name="body_temp"
                              onChange={(e) =>
                                updateAllEntrySec1(e, 'body_temp')
                              }
                              // className={forError ? 'setRedColor' : ''}
                              value={updateQues?.body_temp}
                            ></input>
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'environment_suffer_symtoms')
                            }
                            label="Does someone in your environment suffer from the same symtoms?"
                            value={updateQues?.environment_suffer_symtoms}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'liquids_with_you')
                            }
                            label="Can you keep liquids with you?"
                            value={updateQues?.liquids_with_you}
                          />
                        </Grid>
                      )}

                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'have_fever')
                        }
                        label="You have Fever?"
                        value={updateQues?.have_fever}
                      />

                      {updateQues && updateQues?.have_fever === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>When did the symptoms begin?</label>
                          </Grid>
                          <Grid>
                            <DateFormat
                              name="symptoms_begin"
                              value={
                                updateQues?.symptoms_begin
                                  ? new Date(updateQues?.symptoms_begin)
                                  : new Date()
                              }
                              max={new Date()}
                              onChange={(e) =>
                                updateAllEntrySec(e, 'symptoms_begin')
                              }
                              // date_format={
                              //   this.props.settings &&
                              //   this.props.settings.setting &&
                              //   this.props.settings.setting.date_format
                              // }
                              NotFutureDate={true}
                            />
                          </Grid>
                          <Grid className="textFieldArea1">
                            <label>
                              In which range do the temperatures move throughout
                              the day?
                            </label>
                            <Grid>
                              <label>Top Value :Number in C (35 - 43)</label>
                              <input
                                type="number"
                                placeholder="36.6"
                                name="top_body_temp"
                                onChange={(e) =>
                                  updateAllEntrySec1(e, 'top_body_temp')
                                }
                                // className={forError ? 'setRedColor' : ''}
                                value={updateQues?.top_body_temp}
                              ></input>
                            </Grid>
                            <Grid>
                              <label>Low Value : Number in C (35 - 43)</label>
                              <input
                                type="number"
                                placeholder="36.6"
                                name="low_body_temp"
                                onChange={(e) =>
                                  updateAllEntrySec1(e, 'low_body_temp')
                                }
                                // className={forError ? 'setRedColor' : ''}
                                value={updateQues?.low_body_temp}
                              ></input>
                            </Grid>
                          </Grid>
                          <Grid>
                            <label>
                              On a scale of 1 - 10, how would you describe the
                              intensity of the pain?
                            </label>
                            <PainIntensity
                              name="pain_intensity"
                              onChange={(e) => updateAllEntrySec1(e)}
                              value={Math.round(updateQues?.pain_intensity)}
                              // setting={this.props.settings}
                              comesFrom="Evalute"
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'have_a_cough')
                            }
                            label="Do you have a cough?"
                            value={updateQues?.have_a_cough}
                          />
                          <Grid container direction="row" justify="center">
                            <Grid item xs={12} md={12}>
                              <Grid container direction="row" justify="center">
                                <Grid item xs={4} md={4}>
                                  <Grid>
                                    <Checkbox
                                      value="checkedB"
                                      color="#00ABAF"
                                      checked={
                                        allCheckData?.back === true &&
                                        allCheckData?.back
                                      }
                                      onChange={(e) => {
                                        setallCheckData({
                                          back: e.target.checked,
                                        });
                                      }}
                                      className="PIC_Condition"
                                    />
                                    <label>Cold?</label>
                                  </Grid>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                  <Grid>
                                    <Checkbox
                                      value="checkedB"
                                      color="#00ABAF"
                                      checked={
                                        allCheckData?.back === true &&
                                        allCheckData?.back
                                      }
                                      onChange={(e) => {
                                        setallCheckData({
                                          back: e.target.checked,
                                        });
                                      }}
                                      className="PIC_Condition"
                                    />
                                    <label>Hoarseness?</label>
                                  </Grid>
                                </Grid>
                                <Grid item xs={4} md={4}></Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid className="fillDiaAll">
                            <label>
                              Sputum? If sputum, what consistency and color?
                            </label>
                            <NotesEditor
                              name="sputum"
                              onChange={(e) => updateAllEntrySec(e, 'sputum')}
                              value={updateQues?.sputum}
                            />
                          </Grid>
                        </Grid>
                      )}

                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'back_pain')
                        }
                        label="You have Back pain?"
                        value={updateQues?.back_pain}
                      />

                      {updateQues && updateQues?.back_pain === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>When did the symptoms begin?</label>
                          </Grid>
                          <Grid>
                            <DateFormat
                              name="symptoms_begin"
                              value={
                                updateQues?.symptoms_begin
                                  ? new Date(updateQues?.symptoms_begin)
                                  : new Date()
                              }
                              max={new Date()}
                              onChange={(e) =>
                                updateAllEntrySec(e, 'symptoms_begin')
                              }
                              // date_format={
                              //   this.props.settings &&
                              //   this.props.settings.setting &&
                              //   this.props.settings.setting.date_format
                              // }
                              NotFutureDate={true}
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'been_injured')
                            }
                            label="Have you been injured ?"
                            value={updateQues?.been_injured}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'physically_strained')
                            }
                            label="Have you been physically strained?"
                            value={updateQues?.physically_strained}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'stress_depression')
                            }
                            label="Do you suffer from stress and/or depression?"
                            value={updateQues?.stress_depression}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'have_diabetes')
                            }
                            label="Do you have diabetes? If so, what is your blood sugar?"
                            value={updateQues?.have_diabetes}
                          />
                          {updateQues && updateQues?.have_diabetes === 'yes' && (
                            <>
                              <Grid container direction="row" spacing="1">
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="blood_sugar"
                                      Unit="mg/dl"
                                      label="Blood sugar"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.blood_sugar}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="Hba1c"
                                      Unit="%"
                                      label="Hba1c"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.Hba1c}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid className="fillDia">
                                <SelectByTwo
                                  name="situation"
                                  label="Situation"
                                  // options={this.state.Allsituation}
                                  onChange={(e) =>
                                    updateAllEntrySec(e, 'situation')
                                  }
                                  value={updateQues?.situation}
                                />
                              </Grid>
                            </>
                          )}
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'heart_attack')
                            }
                            label="Have you ever had a heart attack?"
                            value={updateQues?.heart_attack}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'heart_failure')
                            }
                            label="Do you suffer from diagnosed Heart failure?"
                            value={updateQues?.heart_failure}
                          />
                          <Grid>
                            <label>
                              Do you suffer from high or low blood pressure if
                              so can you give the values?
                            </label>
                          </Grid>
                          <Grid container direction="row" spacing="1">
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_systolic"
                                  Unit="mmHg"
                                  label="RR_systolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_systolic}
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_diastolic"
                                  Unit="mmHg"
                                  label="RR_diastolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_diastolic}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'cough_and_snees')
                        }
                        label="You have Cough and Snees?"
                        value={updateQues?.cough_and_snees}
                      />

                      {updateQues && updateQues?.cough_and_snees === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>When did the symptoms begin?</label>
                          </Grid>
                          <Grid>
                            <DateFormat
                              name="symptoms_begin"
                              value={
                                updateQues?.symptoms_begin
                                  ? new Date(updateQues?.symptoms_begin)
                                  : new Date()
                              }
                              max={new Date()}
                              onChange={(e) =>
                                updateAllEntrySec(e, 'symptoms_begin')
                              }
                              // date_format={
                              //   this.props.settings &&
                              //   this.props.settings.setting &&
                              //   this.props.settings.setting.date_format
                              // }
                              NotFutureDate={true}
                            />
                          </Grid>
                          <Grid className="textFieldArea1">
                            <label>
                              If you have Temperature, please tell me in C ?
                            </label>
                            <input
                              type="number"
                              placeholder="36.6"
                              name="body_temp"
                              onChange={(e) =>
                                updateAllEntrySec1(e, 'body_temp')
                              }
                              // className={forError ? 'setRedColor' : ''}
                              value={updateQues?.body_temp}
                            ></input>
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'environment_suffer_symtoms')
                            }
                            label="Does someone in your environment suffer from the same symtoms?"
                            value={updateQues?.environment_suffer_symtoms}
                          />
                          <Grid className="fillDiaAll">
                            <label>
                              Do you suffer from allergies? If so, against what?
                            </label>
                            <NotesEditor
                              name="suffer_from_allergies"
                              onChange={(e) =>
                                updateAllEntrySec(e, 'suffer_from_allergies')
                              }
                              value={updateQues?.suffer_from_allergies}
                            />
                          </Grid>
                        </Grid>
                      )}

                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'feel_depressed')
                        }
                        label="You feel Depressed?"
                        value={updateQues?.feel_depressed}
                      />

                      {updateQues && updateQues?.feel_depressed === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>When did the symptoms begin?</label>
                          </Grid>
                          <Grid>
                            <DateFormat
                              name="symptoms_begin"
                              value={
                                updateQues?.symptoms_begin
                                  ? new Date(updateQues?.symptoms_begin)
                                  : new Date()
                              }
                              max={new Date()}
                              onChange={(e) =>
                                updateAllEntrySec(e, 'symptoms_begin')
                              }
                              // date_format={
                              //   this.props.settings &&
                              //   this.props.settings.setting &&
                              //   this.props.settings.setting.date_format
                              // }
                              NotFutureDate={true}
                            />
                          </Grid>
                          <Grid>
                            <label>
                              On a scale of 1 - 10, how would you describe the
                              intensity of the pain?
                            </label>
                            <PainIntensity
                              name="pain_intensity"
                              onChange={(e) => updateAllEntrySec1(e)}
                              value={Math.round(updateQues?.pain_intensity)}
                              // setting={this.props.settings}
                              comesFrom="Evalute"
                            />
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'do_you_sleep')
                            }
                            label="Do you sleep?"
                            value={updateQues?.do_you_sleep}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'suicidal_thoughts')
                            }
                            label="You have suicidal thoughts or ?"
                            value={updateQues?.suicidal_thoughts}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'hurt_yourself')
                            }
                            label="Do you already hurt yourself once?"
                            value={updateQues?.hurt_yourself}
                          />
                        </Grid>
                      )}

                      <FatiqueQuestion
                        updateAllEntrySec={(e) =>
                          updateAllEntrySec(e, 'cardiac_problems')
                        }
                        label="you have Cardiac Problems?"
                        value={updateQues?.cardiac_problems}
                      />

                      {updateQues && updateQues?.cardiac_problems === 'yes' && (
                        <Grid className="borderLineAfer">
                          <Grid>
                            <label>What is your Blood pressure ?</label>
                          </Grid>
                          <Grid container direction="row" spacing="1">
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_systolic"
                                  Unit="mmHg"
                                  label="RR_systolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_systolic}
                                />
                              </Grid>
                            </Grid>
                            <Grid item md={6} sm={6}>
                              <Grid className="fillDia">
                                <MMHG
                                  name="rr_diastolic"
                                  Unit="mmHg"
                                  label="RR_diastolic"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  value={updateQues?.rr_diastolic}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'heart_attack')
                            }
                            label="Have you ever had a heart attack?"
                            value={updateQues?.heart_attack}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'heart_failure')
                            }
                            label="Do you suffer from diagnosed Heart failure?"
                            value={updateQues?.heart_failure}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'have_dizziness')
                            }
                            label="Do you have dizziness?"
                            value={updateQues?.have_dizziness}
                          />
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'have_shoulder_pain')
                            }
                            label="Do you have shoulder pain?"
                            value={updateQues?.have_shoulder_pain}
                          />
                        </Grid>
                      )}
                      <Grid className="infoShwSave3">
                        <input
                          type="submit"
                          value="Submit"
                          onClick={handleEvalSubmit}
                        ></input>
                      </Grid>
                    </Grid>
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
