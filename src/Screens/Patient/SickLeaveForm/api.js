import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index"
import Timezone from "timezon.json";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";

export const GetLanguageMetadata = (current) => {
    var Allsituation = GetLanguageDropdown(
        current.state.allMetadata &&
        current.state.allMetadata.situation &&
        current.state.allMetadata.situation,
        current.props.stateLanguageType
    );
    current.setState({ Allsituation: Allsituation });
};

// Set the state of questions
export const updateAllEntrySec = (e, name, current) => {
    var updateQues = current.state.updateQues
    updateQues[name] = e;
    current.setState({ updateQues: updateQues });
};

export const updateAllEntrySec1 = (e, current) => {
    var updateQues = current.state.updateQues
    updateQues[e.target.name] = e.target.value;
    current.setState({ updateQues: updateQues });
};
// Set the checkbox state
export const updateAllEntrySec2 = (e, current) => {
    if (e.target.name === "DataprotectionRules") {
        current.setState({ DataprotectionRules: e.target.checked });
    } else {
        var updateQues = current.state.updateQues
        updateQues[e.target.name] = e.target.checked;
        current.setState({ updateQues: updateQues });
    }
};
// For scroll of every error message
export const MoveTop = (top) => {
    window.scroll({
        top: top,
        behavior: "smooth",
    });
};

export const handleEvalSubmit = (current) => { 
    current.setState({  errorChrMsg: "" })
    let data = {};
    data = current.state.updateQues;
    var due_on = data?.due_on || {};
    due_on["date"] = new Date();
    data.due_on = due_on;
    due_on["time"] = new Date();
    data.due_on = due_on;
    var patient = {
      first_name: current.props.stateLoginValueAim?.user?.first_name,
      last_name: current.props.stateLoginValueAim?.user?.last_name,
      alies_id: current.props.stateLoginValueAim?.user?.alies_id,
      profile_id: current.props.stateLoginValueAim?.user?.profile_id,
      user_id: current.props.stateLoginValueAim?.user.user?._id,
      image: current.props.stateLoginValueAim?.user.user?.image,
    };
    data.patient = patient;
    data.patient_id = current.props.stateLoginValueAim?.user?._id;
    data.task_name = "Sick leave certificate from patient";
    data.task_type = "sick_leave";
    data.done_on = "";
    data.priority = 0;
    data.archived = false;
    data.status = "open";
    data.created_at = new Date();
    data.house_id = "60fabfe5b3394533f7f9a6dc-1639551688707";
    if (!data?.due_on?.date) {
      let due_on = data?.due_on || {};
      due_on["date"] = new Date();
      data.due_on = due_on;
    }
    if (!data?.due_on?.time) {
      let due_on = data?.due_on || {};
      due_on["time"] = new Date();
      data.due_on = due_on;
    }
    if (validatePainHeart1(data.headache, '', 'headache', current)) {
      if (validatePainHeart(data.headache, data, 'painbegin', current)) {
        if (validatePainHeart(data.headache, data, 'hurtnow', current)) {
          if (
            validatePainHeart(
              data.headache,
              data.headache_rr_systolic,
              'headache_rr_systolic',
              current
            )
          ) {
            if (
              validatePainHeart(
                data.headache,
                data.headache_rr_diastolic,
                'headache_rr_diastolic', current
              )
            ) {
              if (
                validatePainHeart(
                  data.headache,
                  data.headache_body_temp,
                  'headache_body_temp', current
                )
              ) {
                if (
                  validatePainHeart(
                    data.headache,
                    data,
                    'headache_have_diabetes', current
                  )
                ) {
                  if (
                    validatePainHeart(
                      data.headache,
                      data.headache_quality_of_pain,
                      'headache_quality_of_pain', current
                    )
                  ) {
                    if (
                      validatePainHeart1(
                        data.headache,
                        data.headache_need_to_vomit,
                        'headache_need_to_vomit', current
                      )
                    ) {
                      if (
                        validatePainHeart1(
                          data.headache,
                          data.headache_onset_of_pain,
                          'headache_onset_of_pain', current
                        )
                      ) {
                        if (
                          validatePainHeart1(
                            data.headache,
                            data.headache_take_painkillers,
                            'headache_take_painkillers', current
                          )
                        ) {
                          if (
                            validatePainHeart(
                              data.headache,
                              data.headache_pain_intensity,
                              'headache_pain_intensity', current
                            )
                          ) {
                            if (
                              validatePainHeart(
                                data.headache,
                                data.headache_undergoing_treatment,
                                'headache_undergoing_treatment', current
                              )
                            ) {
                              if (
                                validatePainHeart1(
                                  data.stomach_problems,
                                  data,
                                  'stomach_problems', current
                                )
                              ) {
                                if (
                                  validatePainHeart(
                                    data.stomach_problems,
                                    data.stomach_painbegin_painPoint,
                                    'stomach_painbegin_painPoint', current
                                  )
                                ) {
                                  if (
                                    validatePainHeart(
                                      data.stomach_problems,
                                      data.stomach_hurtnow_painPoint,
                                      'stomach_hurtnow_painPoint', current
                                    )
                                  ) {
                                    if (
                                      validatePainHeart1(
                                        data.stomach_problems,
                                        data.stomach_behind_the_sternum,
                                        'stomach_behind_the_sternum', current
                                      )
                                    ) {
                                      if (
                                        validatePainHeart1(
                                          data.stomach_problems,
                                          data.stomach_heart_attack,
                                          'stomach_heart_attack', current
                                        )
                                      ) {
                                        if (
                                          validatePainHeart1(
                                            data.stomach_problems,
                                            data.stomach_heart_failure,
                                            'stomach_heart_failure', current
                                          )
                                        ) {
                                          if (
                                            validatePainHeart(
                                              data.stomach_problems,
                                              data.stomach_rr_systolic,
                                              'stomach_rr_systolic', current
                                            )
                                          ) {
                                            if (
                                              validatePainHeart(
                                                data.stomach_problems,
                                                data.stomach_rr_diastolic,
                                                'stomach_rr_diastolic', current
                                              )
                                            ) {
                                              if (
                                                validatePainHeart(
                                                  data.stomach_problems,
                                                  data.stomach_continuously_or_periodically,
                                                  'stomach_continuously_or_periodically', current
                                                )
                                              ) {
                                                if (
                                                  validatePainHeart(
                                                    data.stomach_problems,
                                                    data.stomach_body_temp,
                                                    'stomach_body_temp', current
                                                  )
                                                ) {
                                                  if (
                                                    validatePainHeart(
                                                      data.stomach_problems,
                                                      data.stomach_take_painkillers,
                                                      'stomach_take_painkillers', current
                                                    )
                                                  ) {
                                                    if (
                                                      validatePainHeart(
                                                        data.stomach_problems,
                                                        data.stomach_pain_intensity,
                                                        'stomach_pain_intensity', current
                                                      )
                                                    ) {
                                                      if (
                                                        validatePainHeart(
                                                          data.stomach_problems,
                                                          data.stomach_undergoing_treatment,
                                                          'stomach_undergoing_treatment', current
                                                        )
                                                      ) {
                                                        if (
                                                          validatePainHeart1(
                                                            data.diarrhea,
                                                            data,
                                                            'diarrhea', current
                                                          )
                                                        ) {
                                                          if (
                                                            validatePainHeart(
                                                              data.diarrhea,
                                                              data.diarrhea_symptoms_begin,
                                                              'diarrhea_symptoms_begin', current
                                                            )
                                                          ) {
                                                            if (
                                                              validatePainHeart(
                                                                data.diarrhea,
                                                                data.diarrhea_suffer_from_vomiting,
                                                                'diarrhea_suffer_from_vomiting', current
                                                              )
                                                            ) {
                                                              if (
                                                                validatePainHeart(
                                                                  data.diarrhea,
                                                                  data.diarrhea_body_temp,
                                                                  'diarrhea_body_temp', current
                                                                )
                                                              ) {
                                                                if (
                                                                  validatePainHeart(
                                                                    data.diarrhea,
                                                                    data.diarrhea_envi_suffer_symtoms,
                                                                    'diarrhea_envi_suffer_symtoms', current
                                                                  )
                                                                ) {
                                                                  if (
                                                                    validatePainHeart(
                                                                      data.diarrhea,
                                                                      data.diarrhea_liquids_with_you,
                                                                      'diarrhea_liquids_with_you', current
                                                                    )
                                                                  ) {
                                                                    if (
                                                                      validatePainHeart1(
                                                                        data.have_fever,
                                                                        data,
                                                                        'have_fever', current
                                                                      )
                                                                    ) {
                                                                      if (
                                                                        validatePainHeart(
                                                                          data.have_fever,
                                                                          data.fever_symptoms_begin,
                                                                          'fever_symptoms_begin', current
                                                                        )
                                                                      ) {
                                                                        if (
                                                                          validatePainHeart(
                                                                            data.have_fever,
                                                                            data.fever_top_body_temp,
                                                                            'fever_top_body_temp', current
                                                                          )
                                                                        ) {
                                                                          if (
                                                                            validatePainHeart(
                                                                              data.have_fever,
                                                                              data.fever_low_body_temp,
                                                                              'fever_low_body_temp' , current
                                                                            )
                                                                          ) {
                                                                            if (
                                                                              validatePainHeart(
                                                                                data.have_fever,
                                                                                data.fever_pain_intensity,
                                                                                'fever_pain_intensity', current
                                                                              )
                                                                            ) {
                                                                              if (
                                                                                validatePainHeart(
                                                                                  data.have_fever,
                                                                                  data.fever_sputum,
                                                                                  'fever_sputum', current
                                                                                )
                                                                              ) {
                                                                                if (
                                                                                  validatePainHeart1(
                                                                                    data.back_pain,
                                                                                    data,
                                                                                    'back_pain', current
                                                                                  )
                                                                                ) {
                                                                                  if (
                                                                                    validatePainHeart(
                                                                                      data.back_pain,
                                                                                      data.back_pain_symptoms_begin,
                                                                                      'back_pain_symptoms_begin', current
                                                                                    )
                                                                                  ) {
                                                                                    if (
                                                                                      validatePainHeart(
                                                                                        data.back_pain,
                                                                                        data.back_pain_symptoms_begin,
                                                                                        'back_pain_symptoms_begin', current
                                                                                      )
                                                                                    ) {
                                                                                      if (
                                                                                        validatePainHeart1(
                                                                                          data.back_pain,
                                                                                          data.back_pain_been_injured,
                                                                                          'back_pain_been_injured', current
                                                                                        )
                                                                                      ) {
                                                                                        if (
                                                                                          validatePainHeart1(
                                                                                            data.back_pain,
                                                                                            data.back_pain_physically_strained,
                                                                                            'back_pain_physically_strained', current
                                                                                          )
                                                                                        ) {
                                                                                          if (
                                                                                            validatePainHeart1(
                                                                                              data.back_pain,
                                                                                              data.back_pain_stress_depression,
                                                                                              'back_pain_stress_depression', current
                                                                                            )
                                                                                          ) {
                                                                                            if (
                                                                                              validatePainHeart1(
                                                                                                data.back_pain,
                                                                                                data.back_pain_heart_attack,
                                                                                                'back_pain_heart_attack', current
                                                                                              )
                                                                                            ) {
                                                                                              if (
                                                                                                validatePainHeart1(
                                                                                                  data.back_pain,
                                                                                                  data.back_pain_heart_failure,
                                                                                                  'back_pain_heart_failure', current
                                                                                                )
                                                                                              ) {
                                                                                                if (
                                                                                                  validatePainHeart(
                                                                                                    data.back_pain,
                                                                                                    data.back_pain_rr_systolic,
                                                                                                    'back_pain_rr_systolic', current
                                                                                                  )
                                                                                                ) {
                                                                                                  if (
                                                                                                    validatePainHeart(
                                                                                                      data.back_pain,
                                                                                                      data.back_pain_rr_diastolic,
                                                                                                      'back_pain_rr_diastolic', current
                                                                                                    )
                                                                                                  ) {
                                                                                                    if (
                                                                                                      validatePainHeart1(
                                                                                                        data.cough_and_snees,
                                                                                                        data,
                                                                                                        'cough_and_snees', current
                                                                                                      )
                                                                                                    ) {
                                                                                                      if (
                                                                                                        validatePainHeart(
                                                                                                          data.cough_and_snees,
                                                                                                          data.cough_symptoms_begin,
                                                                                                          'cough_symptoms_begin', current
                                                                                                        )
                                                                                                      ) {
                                                                                                        if (
                                                                                                          validatePainHeart(
                                                                                                            data.cough_and_snees,
                                                                                                            data.cough_body_temp,
                                                                                                            'cough_body_temp', current
                                                                                                          )
                                                                                                        ) {
                                                                                                          if (
                                                                                                            validatePainHeart(
                                                                                                              data.cough_and_snees,
                                                                                                              data.cough_envi_suffer_symtoms,
                                                                                                              'cough_envi_suffer_symtoms', current
                                                                                                            )
                                                                                                          ) {
                                                                                                            if (
                                                                                                              validatePainHeart(
                                                                                                                data.cough_and_snees,
                                                                                                                data.cough_suffer_from_allergies,
                                                                                                                'cough_suffer_from_allergies', current
                                                                                                              )
                                                                                                            ) {
                                                                                                              if (
                                                                                                                validatePainHeart1(
                                                                                                                  data.feel_depressed,
                                                                                                                  data,
                                                                                                                  'feel_depressed', current
                                                                                                                )
                                                                                                              ) {
                                                                                                                if (
                                                                                                                  validatePainHeart1(
                                                                                                                    data.feel_depressed,
                                                                                                                    data.depressed_symptoms_begin,
                                                                                                                    'depressed_symptoms_begin', current
                                                                                                                  )
                                                                                                                ) {
                                                                                                                  if (
                                                                                                                    validatePainHeart(
                                                                                                                      data.feel_depressed,
                                                                                                                      data.depressed_pain_intensity,
                                                                                                                      'depressed_pain_intensity', current
                                                                                                                    )
                                                                                                                  ) {
                                                                                                                    if (
                                                                                                                      validatePainHeart1(
                                                                                                                        data.feel_depressed,
                                                                                                                        data.depressed_do_you_sleep,
                                                                                                                        'depressed_do_you_sleep', current
                                                                                                                      )
                                                                                                                    ) {
                                                                                                                      if (
                                                                                                                        validatePainHeart1(
                                                                                                                          data.feel_depressed,
                                                                                                                          data.depressed_suicidal_thoughts,
                                                                                                                          'depressed_suicidal_thoughts', current
                                                                                                                        )
                                                                                                                      ) {
                                                                                                                        if (
                                                                                                                          validatePainHeart1(
                                                                                                                            data.feel_depressed,
                                                                                                                            data.depressed_hurt_yourself,
                                                                                                                            'depressed_hurt_yourself', current
                                                                                                                          )
                                                                                                                        ) {
                                                                                                                          if (
                                                                                                                            validatePainHeart1(
                                                                                                                              data.cardiac_problems,
                                                                                                                              data,
                                                                                                                              'cardiac_problems', current
                                                                                                                            )
                                                                                                                          ) {
                                                                                                                            if (
                                                                                                                              validatePainHeart(
                                                                                                                                data.cardiac_problems,
                                                                                                                                data.cardiac_rr_systolic,
                                                                                                                                'cardiac_rr_systolic', current
                                                                                                                              )
                                                                                                                            ) {
                                                                                                                              if (
                                                                                                                                validatePainHeart(
                                                                                                                                  data.cardiac_problems,
                                                                                                                                  data.cardiac_rr_diastolic,
                                                                                                                                  'cardiac_rr_diastolic'
                                                                                                                                )
                                                                                                                              ) {
                                                                                                                                if (
                                                                                                                                  validatePainHeart1(
                                                                                                                                    data.cardiac_problems,
                                                                                                                                    data.cardiac_heart_attack,
                                                                                                                                    'cardiac_heart_attack', current
                                                                                                                                  )
                                                                                                                                ) {
                                                                                                                                  if (
                                                                                                                                    validatePainHeart1(
                                                                                                                                      data.cardiac_problems,
                                                                                                                                      data.cardiac_heart_failure,
                                                                                                                                      'cardiac_heart_failure', current
                                                                                                                                    )
                                                                                                                                  ) {
                                                                                                                                    if (
                                                                                                                                      validatePainHeart1(
                                                                                                                                        data.cardiac_problems,
                                                                                                                                        data.cardiac_have_dizziness,
                                                                                                                                        'cardiac_have_dizziness', current
                                                                                                                                      )
                                                                                                                                    ) {
                                                                                                                                      if (
                                                                                                                                        validatePainHeart1(
                                                                                                                                          data.cardiac_problems,
                                                                                                                                          data.cardiac_have_shoulder_pain,
                                                                                                                                          'cardiac_have_shoulder_pain', current
                                                                                                                                        )
                                                                                                                                      ) {
    if (current.state.DataprotectionRules && current.state.DataprotectionRules === true) {
        // current.setState({loaderImage : true});
      // axios
      //   .post(
      //     sitedata
      //       .data
      //       .path +
      //       '/vh/AddTask',

      //     data,
      //     commonHeader(
      //       current.props.stateLoginValueAim?.token
      //     )
      //   )
      // .then(
      //   (
      //     responce
      //   ) => {
      //     setUpdateQues(
      //       {}
      //     );
      current.setState({loaderImage : false, openCalendar: true, DataprotectionRules: false});
      //   }
      // )
      // .catch(
      //   function (
      //     error
      //   ) {
      //     console.log(
      //       'error'
      //     );
      //        current.setState({loaderImage : false});
      //       }
      //     );
    } else {
        current.setState({ error_section: 45, errorChrMsg: "Please select Data protection rules and Regulations of Aimedis." })
    }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
}

// Validate all fields
export const validatePainHeart = (check, value, item, current) => {
    var bpPattern = /^[0-9]+$/;
    var Valid = bpPattern.test(value);
    if (item === "painbegin" && check === "yes") {
        if (
            !value.headache_painbegin_back === true &&
            !value.headache_painbegin_front === true &&
            !value.headache_painbegin_left === true &&
            !value.headache_painbegin_right === true &&
            !value.headache_painbegin_top === true
        ) {
            current.setState({ error_section: 1, errorChrMsg: "Please select pain begin" });
            MoveTop(0);
            return false;
        } else {
            return true;
        }
    } else if (item === "hurtnow" && check === "yes") {
        if (
            !value.headache_hurtnow_back === true &&
            !value.headache_hurtnow_front === true &&
            !value.headache_hurtnow_left === true &&
            !value.headache_hurtnow_right === true &&
            !value.headache_hurtnow_top === true
        ) {
            current.setState({ error_section: 2, errorChrMsg: "Please select hurt now" });
            MoveTop(0);
            return false;
        } else {
            return true;
        }
    } else if (item === "headache_quality_of_pain" && check === "yes") {
        if (!value && !(value > -1)) {
            current.setState({ error_section: 6, errorChrMsg: "Please enter Quality of pain valuey" });
            MoveTop(250);
            return false;
        } else {
            return true;
        }
    } else if (item === "headache_undergoing_treatment" && check === "yes") {
        if (!value) {
            current.setState({ error_section: 11, errorChrMsg:"Please select Undergoing treatment with YES / No" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "stomach_painbegin_painPoint" ||
            item === "stomach_hurtnow_painPoint") &&
        check === "yes"
    ) {
        var section = item === "stomach_painbegin_painPoint" ? 12 : 13;
        if (!value) {
            current.setState({ error_section: section, errorChrMsg: "Please select Pain point" })
            MoveTop(0);
            return false;
        } else {
            return true;
        }
    } else if (
        item === "stomach_continuously_or_periodically" &&
        check === "yes"
    ) {
        if (!value) {
            current.setState({ error_section: 16, errorChrMsg:   "Please select Continuously or Periodically with Yes / No" })
            MoveTop(450);
            return false;
        } else {
            return true;
        }
    } else if (item === "stomach_take_painkillers" && check === "yes") {
        if (!value) {
            current.setState({ error_section: 18,errorChrMsg: "Please select Take painkillers with Yes / No" })
            MoveTop(250);
            return false;
        } else {
            return true;
        }
    } else if (item === "stomach_undergoing_treatment" && check === "yes") {
        if (!value) {
            current.setState({ error_section: 20, errorChrMsg: "Please select Undergoing treatment with Yes / No" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (item === "diarrhea_suffer_from_vomiting" && check === "yes") {
        if (!value) {
            current.setState({ error_section: 22, errorChrMsg: "Please select Suffer from vomiting with Yes / No" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "diarrhea_envi_suffer_symtoms" ||
            item === "cough_envi_suffer_symtoms") &&
        check === "yes"
    ) {
        var section = item === "diarrhea_envi_suffer_symtoms" ? 24 : 37;
        if (!value) {
            current.setState({ error_section: section, errorChrMsg: "Please select Environmental Suffer symtoms with YES / NO" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (item === "diarrhea_liquids_with_you" && check === "yes") {
        if (!value) {
            current.setState({ error_section: 25, errorChrMsg: "Please select keep Liquids with you with YES / NO" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "fever_low_body_temp" || item === "fever_top_body_temp") &&
        check === "yes"
    ) {
        var section = item === "fever_low_body_temp" ? 28 : 27;
        var currentItem =
            item === "fever_low_body_temp" ? "low value" : "top value";
        if (!value) {
            current.setState({ error_section: section, errorChrMsg:  "Please Enter" + " " + currentItem + " " + "of body temprature"})
            MoveTop(550);
            return false;
        } else if (value < 36 || value > 41) {
            current.setState({ error_section: section, errorChrMsg: "Please Enter valid body temprature" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "fever_sputum" || item === "cough_suffer_from_allergies") &&
        check === "yes"
    ) {
        var section = item === "fever_sputum" ? 30 : 38;
        var currentItem =
            item === "fever_sputum" ? "Sputum" : "suffer from Allergies";
        if (!value || value === "<p><br></p>" || value === "<p></p>") {
            current.setState({ error_section: section , errorChrMsg: "Please enter sputum intensity"})
            MoveTop(450);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "fever_symptoms_begin" ||
            item === "back_pain_symptoms_begin" ||
            item === "diarrhea_symptoms_begin" ||
            item === "cough_symptoms_begin" ||
            item === "depressed_symptoms_begin") &&
        check === "yes"
    ) {
        var section =
            item === "fever_symptoms_begin"
                ? 26
                : item === "back_pain_symptoms_begin"
                    ? 31
                    : item === "diarrhea_symptoms_begin"
                        ? 21
                        : item === "cough_symptoms_begin"
                            ? 35
                            : 39;
        if (!value) {
            current.setState({ error_section: section, errorChrMsg: "Please enter Symptoms begin" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "headache_rr_systolic" ||
            item === "stomach_rr_systolic" ||
            item === "back_pain_rr_systolic" ||
            item === "cardiac_rr_systolic") &&
        check === "yes"
    ) {
        var section =
            item === "headache_rr_systolic"
                ? 3
                : item === "stomach_rr_systolic"
                    ? 14
                    : item === "back_pain_rr_systolic"
                        ? 33
                        : 42;
        if (!value) {
            current.setState({ error_section: section, errorChrMsg: "Please enter RR Systolic" })
            MoveTop(250);
            return false;
        } else if (!Valid) {
            current.setState({ error_section: section, errorChrMsg: "RR Systolic bp should be in number" })
            MoveTop(250);
            return false;
        } else if (value < 120) {
            current.setState({ error_section: section, errorChrMsg: "Please select systolic bp value between 120-140"});
            MoveTop(250);
            return false;
        } else if (value > 140) {
            current.setState({ error_section: section, errorChrMsg:  "Please select systolic bp value between 120-140"})
            MoveTop(250);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "headache_rr_diastolic" ||
            item === "stomach_rr_diastolic" ||
            item === "back_pain_rr_diastolic" ||
            item === "cardiac_rr_diastolic") &&
        check === "yes"
    ) {
        var section =
            item === "headache_rr_diastolic"
                ? 4
                : item === "stomach_rr_diastolic"
                    ? 15
                    : item === "back_pain_rr_diastolic"
                        ? 34
                        : 43;
        if (!value) {
            current.setState({ error_section: section, errorChrMsg: "Please enter RR Diastolic" })
            MoveTop(250);
            return false;
        } else if (!Valid) {
            current.setState({ error_section: section, errorChrMsg: "Diastolic bp should be in number" })
            MoveTop(250);
            return false;
        } else if (value < 80) {
            current.setState({ error_section: section, errorChrMsg: "Please select Diastolic bp value between 80-90" })
            MoveTop(250);
            return false;
        } else if (value > 90) {
            current.setState({ error_section: section, errorChrMsg: "Please select Diastolic bp value between 80-90" })
            MoveTop(250);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "headache_pain_intensity" ||
            item === "stomach_pain_intensity" ||
            item === "fever_pain_intensity" ||
            item === "depressed_pain_intensity") &&
        check === "yes"
    ) {
        var section =
            item === "headache_pain_intensity"
                ? 10
                : item === "stomach_pain_intensity"
                    ? 19
                    : item === "fever_pain_intensity"
                        ? 29
                        : 40;
        if (!value && !(value > 0)) {
            current.setState({ error_section: section, errorChrMsg: "Please enter Pain intensity" })
            MoveTop(450);
            return false;
        } else {
            return true;
        }
    }
    if (
        (item === "headache_body_temp" ||
            item === "stomach_body_temp" ||
            item === "diarrhea_body_temp" ||
            item === "cough_body_temp") &&
        check === "yes"
    ) {
        var section =
            item === "headache_body_temp"
                ? 5
                : item === "stomach_body_temp"
                    ? 17
                    : item === "diarrhea_body_temp"
                        ? 23
                        : 36;
        if (!value) {
            current.setState({ error_section: section, errorChrMsg: "Please enter Body temperature" })
            MoveTop(550);
            return false;
        } else if (value < 36 || value > 41) {
            current.setState({ error_section: section, errorChrMsg: "Please select Body temperature between 36-41" })
            MoveTop(550);
            return false;
        } else {
            return true;
        }
    } else if (item === "headache_have_diabetes" && check === "yes") {
        console.log("item,value,check", item, value, check);
        if (!value.headache_have_diabetes) {
            current.setState({ error_section: 46 ,errorChrMsg: "Please select Diabetes with YES / NO"})
            MoveTop(200);
            return false;
        } else if (value && value.headache_have_diabetes === "yes") {
            var bpPattern = /^[0-9]+$/;
            var valid = bpPattern.test(value.headache_blood_sugar);
            let calHba1c = value.headache_Hba1c && value.headache_Hba1c / 10;
            if (!value.headache_blood_sugar) {
                current.setState({ error_section: 47, errorChrMsg: "Please enter Blood sugar"})
                MoveTop(200);
                return false;
            } else if (!valid) {
                current.setState({ error_section: 47, errorChrMsg: "Blood sugar should be in number"})
                MoveTop(200);
                MoveTop(0);
                return false;
            } else if (value?.headache_blood_sugar < 160) {
                current.setState({ error_section: 47, errorChrMsg:  "Blood sugar should be between 160-240"})
                MoveTop(200);
                MoveTop(0);
                return false;
            } else if (value?.headache_blood_sugar > 240) {
                current.setState({ error_section: 47, errorChrMsg: "Blood sugar should be between 160-240" })
                MoveTop(200);
                MoveTop(0);
                return false;
            } else if (!value.headache_Hba1c) {
                current.setState({ error_section: 56, errorChrMsg: "Please enter Hba1c"})
                MoveTop(200);
                MoveTop(0);
                return false;
            } else if (calHba1c < 57 / 10) {
                current.setState({ error_section: 56, errorChrMsg: "Hba1c should be between 57-64"})
                MoveTop(200);
                MoveTop(0);
                return false;
            } else if (calHba1c > 64 / 10) {
                current.setState({ error_section: 56, errorChrMsg: "Hba1c should be between 57-64"})
                MoveTop(200);
                MoveTop(0);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
};

export const validatePainHeart1 = (check, value, item, current) => {
    // console.log('check, value, item', check, value, item);
    if (
        (item === "headache_need_to_vomit" ||
            item === "headache_onset_of_pain" ||
            item === "headache_take_painkillers") &&
        check === "yes"
    ) {
        var currentItem =
            item === "headache_need_to_vomit"
                ? "Need to vomit"
                : item === "headache_onset_of_pain"
                    ? "Onset of pain"
                    : "Take painkillers";

        if (!value) {
            current.setState({error_section: 7, errorChrMsg: "Please select" + " " + currentItem + " " + "with Yes / No"});
            MoveTop(200);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "stomach_behind_the_sternum" ||
            item === "stomach_heart_attack" ||
            item === "stomach_heart_failure") &&
        check === "yes"
    ) {
        var currentItem =
            item === "stomach_behind_the_sternum"
                ? "Behind the sternum"
                : item === "stomach_heart_attack"
                    ? "Heart attack"
                    : "Heart failure";

        if (!value) {
            current.setState({error_section: 8, errorChrMsg: "Please select" + " " + currentItem + " " + "with Yes / No"});
            MoveTop(200);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "back_pain_been_injured" ||
            item === "back_pain_physically_strained" ||
            item === "back_pain_stress_depression" ||
            item === "back_pain_heart_attack" ||
            item === "back_pain_heart_failure") &&
        check === "yes"
    ) {
        var currentItem =
            item === "back_pain_been_injured"
                ? "been Injured"
                : item === "back_pain_physically_strained"
                    ? "Physically strained"
                    : item === "back_pain_stress_depression"
                        ? "Pain stress depression"
                        : item === "back_pain_heart_attack"
                            ? "Heart attack"
                            : "Heart failure";

        if (!value) {
            current.setState({error_section: 32, errorChrMsg: "Please select" + " " + currentItem + " " + "with Yes / No"});
            MoveTop(200);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "depressed_do_you_sleep" ||
            item === "depressed_suicidal_thoughts" ||
            item === "depressed_hurt_yourself") &&
        check === "yes"
    ) {
        var currentItem =
            item === "depressed_do_you_sleep"
                ? "do you Sleep"
                : item === "depressed_suicidal_thoughts"
                    ? "Suicidal thoughts"
                    : "Hurt yourself";
        if (!value) {
            current.setState({error_section: 41, errorChrMsg: "Please select" + " " + currentItem + " " + "with Yes / No"});
            MoveTop(200);
            return false;
        } else {
            return true;
        }
    } else if (
        (item === "cardiac_heart_attack" ||
            item === "cardiac_heart_failure" ||
            item === "cardiac_have_dizziness" ||
            item === "cardiac_have_shoulder_pain") &&
        check === "yes"
    ) {
        var currentItem =
            item === "cardiac_heart_attack"
                ? "Heart attack"
                : item === "cardiac_heart_failure"
                    ? "Heart failure"
                    : item === "cardiac_have_dizziness"
                        ? "have Dizziness"
                        : "have Shoulder pain";

        if (!value) {
            current.setState({error_section: 44, errorChrMsg: "Please select" + " " + currentItem + " " + "with Yes / No"});
            MoveTop(200);
            return false;
        } else {
            return true;
        }
    } else if (
        item === "headache" ||
        item === "stomach_problems" ||
        item === "diarrhea" ||
        item === "have_fever" ||
        item === "back_pain" ||
        item === "cough_and_snees" ||
        item === "feel_depressed" ||
        item === "cardiac_problems"
    ) {
        var currentItem =
            item === "headache"
                ? "Headache"
                : item === "stomach_problems"
                    ? "Stomach problems"
                    : item === "diarrhea"
                        ? "Diarrhea"
                        : item === "have_fever"
                            ? "have Fever"
                            : item === "back_pain"
                                ? "Back pain"
                                : item === "feel_depressed"
                                    ? "feel Depressed"
                                    : item === "cough_and_snees"
                                        ? "Cough and Snees"
                                        : "Cardiac problems";
        var section =
            item === "headache"
                ? 48
                : item === "stomach_problems"
                    ? 49
                    : item === "diarrhea"
                        ? 50
                        : item === "have_fever"
                            ? 51
                            : item === "back_pain"
                                ? 52
                                : item === "cough_and_snees"
                                    ? 53
                                    : item === "feel_depressed"
                                        ? 54
                                        : 55;
        if (!check) {
            current.setState({error_section: section, errorChrMsg: "Please select" + " " + currentItem + " " + "with Yes / No"});
            MoveTop(200);
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};

export const onChange = (date, current) => {
    current.setState({ date: date });
    var day_num;
    var Month, date1;
    if (date !== undefined && date) {
      day_num = date.getDay();
      Month = date.getMonth() + 1;
      date1 = Month + "-" + date.getDate() + "-" + date.getFullYear();
    } else {
      date = new Date();
      day_num = date.getDay();
      Month = date.getMonth() + 1;
      date1 = Month + "-" + date.getDate() + "-" + date.getFullYear();
    }
    let days;
    switch (day_num) {
      case 1:
        days = "monday";
        break;
      case 2:
        days = "tuesday";
        break;
      case 3:
        days = "wednesday";
        break;
      case 4:
        days = "thursday";
        break;
      case 5:
        days = "friday";
        break;
      case 6:
        days = "saturday";
        break;
      case 0:
        days = "sunday";
        break;
    }
    let appointmentData = current.state.appointmentData;
    var appointDate;
    if (appointmentData && appointmentData.length > 0 && appointmentData[0]) {
      Object.entries(appointmentData[0]).map(([key, value]) => {
        if (key == days) {
          appointDate = value;
          current.setState({ appointDate: appointDate });
        }
      });
    }
    current.setState({ apointDay: days, selectedDate: date1 });
  };

  export const ExitinHoliday = (date, h_start, h_end) => {
    if (h_start && h_end && date) {
      let start_date = new Date(h_start);
      let end_date = new Date(h_end);
      start_date = start_date.setHours(0, 0, 0, 0);
      end_date = end_date.setDate(end_date.getDate() + 1);
      end_date = new Date(end_date).setHours(0, 0, 0, 0);
      return (
        new Date(Date.parse(date.replace(/-/gm, "/"))) >= start_date &&
        new Date(Date.parse(date.replace(/-/gm, "/"))) < end_date
      );
    } else {
      return false;
    }
  };

  export const Isintime = (currentTime, b_start, b_end) => {
    if (!currentTime || !b_end || !b_start) return false;
    let b_start_time, b_end_time, current_time, smint;
    b_start_time =
      parseInt(this._getHourMinut(b_start)[0]) * 60 +
      parseInt(this._getHourMinut(b_start)[1]);
    b_end_time =
      parseInt(this._getHourMinut(b_end)[0]) * 60 +
      parseInt(this._getHourMinut(b_end)[1]);
    current_time =
      parseInt(this._getHourMinut(currentTime)[0]) * 60 +
      parseInt(this._getHourMinut(currentTime)[1]);
    smint = parseInt(this._getHourMinut(currentTime)[1]);

    if (current_time >= b_start_time && current_time < b_end_time) {
      return true;
    } else {
      return false;
    }
  };

  export const Availabledays = (date, days_upto) => {
    let current_date = new Date();
    let Newdate = new Date();
    if (date && days_upto) {
      current_date = new Date(current_date).setHours(0, 0, 0, 0);
      Newdate = Newdate.setDate(Newdate.getDate() + parseInt(days_upto));
      return (
        new Date(Date.parse(date.replace(/-/gm, "/"))) < current_date ||
        new Date(Date.parse(date.replace(/-/gm, "/"))) >= Newdate
      );
    } else {
      return false;
    }
  };

  export const getCalendarData = (current) => {
    var user_token = current.props.stateLoginValueAim?.token;
    axios
      .get(
        sitedata.data.path + "/vactive/SelectDocforSickleave",
        commonHeader(user_token)
      )
      .then((response) => {
        if (
          response?.data &&
          response?.data?.data
        ) {
          var data = response?.data?.data[0]?.sickleave[0];
          console.log("data", data);
          console.log("response", response);
          current.setState({appointmentData: data});
          // setTimeout(() => onChange(new Date()), 200);
        }
      });
  };
