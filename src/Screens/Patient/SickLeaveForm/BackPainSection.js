import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import FatiqueQuestion from "../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions";
import MMHG from "Screens/Components/mmHgField/index";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import DateFormat from "Screens/Components/DateFormat/index";

function Index(props) {
  return (
    <Grid className="borderLineAfer">
    <Grid className="bgncmnSpc">
      <Grid className="bgncmnLbl">
        <label>When did the symptoms begin?</label>
      </Grid>
      <Grid>
        <DateFormat
          name="back_pain_symptoms_begin"
          value={
            props.updateQues?.back_pain_symptoms_begin
              ? new Date(
                  props.updateQues?.back_pain_symptoms_begin
                )
              : new Date()
          }
          max={new Date()}
          onChange={(e) =>
            props.updateAllEntrySec(
              e,
              "back_pain_symptoms_begin"
            )
          }
          // date_format={
          //   this.props.settings &&
          //   this.props.settings.setting &&
          //   this.props.settings.setting.date_format
          // }
          NotFutureDate={true}
        />
        {props.error_section == 31 && (
          <div className="err_message2">
            {props.errorChrMsg}
          </div>
        )}
      </Grid>
    </Grid>
    <Grid className="fatiqueQues fatiqueQuess1">
    <FatiqueQuestion
      updateAllEntrySec={(e) =>
        props.updateAllEntrySec(e, "back_pain_been_injured")
      }
      label="Have you been injured ?"
      value={props.updateQues?.back_pain_been_injured}
    />
    </Grid>
    <Grid className="sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
        updateAllEntrySec={(e) =>
          props.updateAllEntrySec(
            e,
            "back_pain_physically_strained"
          )
        }
        label="Have you been physically strained?"
        value={
          props.updateQues?.back_pain_physically_strained
        }
      />
      </Grid>
    </Grid>
    <Grid className="sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
      updateAllEntrySec={(e) =>
          props.updateAllEntrySec(
            e,
            "back_pain_stress_depression"
          )
        }
        label="Do you suffer from stress and/or depression?"
        value={props.updateQues?.back_pain_stress_depression}
      />
      </Grid>
    </Grid>
    <Grid className="sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
        updateAllEntrySec={(e) =>
          props.updateAllEntrySec(
            e,
            "back_pain_have_diabetes"
          )
        }
        label="Do you have diabetes? If so, what is your blood sugar?"
        value={props.updateQues?.back_pain_have_diabetes}
      />
      </Grid>
    </Grid>
    {props.updateQues &&
      props.updateQues?.back_pain_have_diabetes === "yes" && (
        <>
          <Grid container direction="row" spacing="1">
            <Grid item md={6} sm={6}>
              <Grid className="fillDia">
                <MMHG
                  name="back_pain_blood_sugar"
                  Unit="mg/dl"
                  label="Blood sugar"
                  onChange={(e) =>
                    props.updateAllEntrySec1(e)
                  }
                  value={
                    props.updateQues?.back_pain_blood_sugar
                  }
                />
              </Grid>
            </Grid>
            <Grid item md={6} sm={6}>
              <Grid className="fillDia">
                <MMHG
                  name="back_pain_Hba1c"
                  Unit="%"
                  label="Hba1c"
                  onChange={(e) =>
                    props.updateAllEntrySec1(e)
                  }
                  value={props.updateQues?.back_pain_Hba1c}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className="fillDia">
            <SelectByTwo
              name="back_pain_situation"
              label="Situation"
              options={props.Allsituation}
              onChange={(e) =>
                props.updateAllEntrySec(
                  e,
                  "back_pain_situation"
                )
              }
              value={props.updateQues?.back_pain_situation}
            />
          </Grid>
        </>
      )}
    <Grid className="sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
        updateAllEntrySec={(e) =>
          props.updateAllEntrySec(e, "back_pain_heart_attack")
        }
        label="Have you ever had a heart attack?"
        value={props.updateQues?.back_pain_heart_attack}
      />
      </Grid>
    </Grid>
    <Grid className="sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
        updateAllEntrySec={(e) =>
          props.updateAllEntrySec(
            e,
            "back_pain_heart_failure"
          )
        }
        label="Do you suffer from diagnosed Heart failure?"
        value={props.updateQues?.back_pain_heart_failure}
      />
      </Grid>
    </Grid>
    {props.error_section == 32 && (
      <div className="err_message2">{props.errorChrMsg}</div>
    )}
    <Grid>
      <Grid className="bgncmnLbl">
        <label>
          Do you suffer from high or low blood pressure
          if so can you give the values?
        </label>
      </Grid>
      <Grid container direction="row" spacing="1">
        <Grid item md={6} sm={6}>
          <Grid className="fillDia">
            <MMHG
              name="back_pain_rr_systolic"
              Unit="mmHg"
              label="RR_systolic"
              onChange={(e) => props.updateAllEntrySec1(e)}
              value={props.updateQues?.back_pain_rr_systolic}
            />
          </Grid>
          {props.error_section == 33 && (
            <div className="err_message2">
              {props.errorChrMsg}
            </div>
          )}
        </Grid>
        <Grid item md={6} sm={6}>
          <Grid className="fillDia">
            <MMHG
              name="back_pain_rr_diastolic"
              Unit="mmHg"
              label="RR_diastolic"
              onChange={(e) => props.updateAllEntrySec1(e)}
              value={props.updateQues?.back_pain_rr_diastolic}
            />
          </Grid>
          {props.error_section == 34 && (
            <div className="err_message2">
              {props.errorChrMsg}
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  </Grid>          
  );
}

export default Index;
