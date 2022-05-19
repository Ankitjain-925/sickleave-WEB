import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import MMHG from 'Screens/Components/mmHgField/index';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import SelectByTwo from 'Screens/Components/SelectbyTwo/index';
import PainPoint from '../../Components/PointPain/index';

function Index(props) {
  useEffect(() => {}, []);

  return (
    <Grid className="borderLineAfer">
      <Grid className="fillDia">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>Where did the pain begin?</label>
          </Grid>
          <PainPoint
            id="New_id1"
            gender={props.user?.sex}
            painPoint={
              props.updateQues && props.updateQues?.stomach_painbegin_painPoint
                ? props.updateQues.stomach_painbegin_painPoint
                : []
            }
            onChange={(e) =>
              props.updateAllEntrySec(e, 'stomach_painbegin_painPoint')
            }
          />
          {props.error_section == 12 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="fillDia">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>Where does it hurt now?</label>
          </Grid>
          <PainPoint
            id="New_id2"
            gender={props.user?.sex}
            painPoint={
              props.updateQues && props.updateQues?.stomach_hurtnow_painPoint
                ? props.updateQues?.stomach_hurtnow_painPoint
                : []
            }
            onChange={(e) =>
              props.updateAllEntrySec(e, 'stomach_hurtnow_painPoint')
            }
          />
          {props.error_section == 13 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_behind_the_sternum', 2)
            }
            label="Do you have pain behind the sternum?"
            value={props.updateQues?.stomach_behind_the_sternum}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_heart_attack')
            }
            label="Have you ever had a heart attack?"
            value={props.updateQues?.stomach_heart_attack}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_heart_failure')
            }
            label="Do you suffer from diagnosed Heart failure?"
            value={props.updateQues?.stomach_heart_failure}
          />
        </Grid>
      </Grid>
      {props.error_section == 8 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
      <Grid className="haveCmnSpc">
        <Grid className="bgncmnLbl">
          <label>
            Do you suffer from high or low blood pressure if so can you give the
            values?
          </label>
        </Grid>
        <Grid container direction="row" spacing="1">
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="stomach_rr_systolic"
                Unit="mmHg"
                label="RR_systolic"
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.stomach_rr_systolic}
              />
            </Grid>
            {props.error_section == 14 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="stomach_rr_diastolic"
                Unit="mmHg"
                label="RR_diastolic"
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.stomach_rr_diastolic}
              />
            </Grid>
            {props.error_section == 15 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>{' '}
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'stomach_have_diabetes')
          }
          label="Do you have diabetes? If so, what is your blood sugar?"
          value={props.updateQues?.stomach_have_diabetes}
        />
      </Grid>
      {props.updateQues && props.updateQues?.stomach_have_diabetes === 'yes' && (
        <>
          <Grid container direction="row" spacing="1">
            <Grid item md={6} sm={6}>
              <Grid className="fillDia">
                <MMHG
                  name="stomach_blood_sugar"
                  Unit="mg/dl"
                  label="Blood sugar"
                  onChange={(e) => props.updateAllEntrySec1(e)}
                  value={props.updateQues?.stomach_blood_sugar}
                />
              </Grid>
              {props.error_section == 46 && (
                <div className="err_message2">{props.errorChrMsg}</div>
              )}
            </Grid>
            <Grid item md={6} sm={6}>
              <Grid className="fillDia">
                <MMHG
                  name="stomach_Hba1c"
                  Unit="%"
                  label="Hba1c"
                  onChange={(e) => props.updateAllEntrySec1(e)}
                  value={props.updateQues?.stomach_Hba1c}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className="fillDia">
            <SelectByTwo
              name="stomach_situation"
              label="Situation"
              options={props.Allsituation}
              onChange={(e) => props.updateAllEntrySec(e, 'stomach_situation')}
              value={props.updateQues?.stomach_situation}
            />
          </Grid>
        </>
      )}
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_continuously_or_periodically')
            }
            label="Do the symptoms occur continuously or periodically?"
            value={props.updateQues?.stomach_continuously_or_periodically}
          />
        </Grid>
      </Grid>
      {props.error_section == 16 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
      <Grid className="textFieldArea1">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>If you have Temperature, please tell me in C?</label>
          </Grid>
          <input
            type="number"
            placeholder="36.6"
            name="stomach_body_temp"
            onChange={(e) => props.updateAllEntrySec1(e)}
            // className={
            //   this.state.forError ? 'setRedColor' : ''
            // }
            value={props.updateQues?.stomach_body_temp}
          />
          {props.error_section == 17 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_take_painkillers')
            }
            label="Do you take painkillers ?"
            value={props.updateQues?.stomach_take_painkillers}
          />
        </Grid>

        {props.error_section == 18 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>
            On a scale of 1 - 10, how would you describe the intensity of the
            pain?
          </label>
        </Grid>
        <PainIntensity
          name="stomach_pain_intensity"
          onChange={(e) => props.updateAllEntrySec1(e)}
          value={Math.round(props.updateQues?.stomach_pain_intensity)}
          // setting={this.props.settings}
          comesFrom="Evalute"
        />
        {props.error_section == 19 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'stomach_undergoing_treatment')
          }
          label="Are you already undergoing treatment for this Problem ?"
          value={props.updateQues?.stomach_undergoing_treatment}
        />
      </Grid>
      {props.error_section == 20 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
    </Grid>
  );
}

export default Index;
