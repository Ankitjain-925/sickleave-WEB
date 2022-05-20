import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import Checkbox from '@material-ui/core/Checkbox';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import NotesEditor from '../../Components/Editor/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Index(props) {
  useEffect(() => {}, []);

  return (
    <Grid className="borderLineAfer">
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl hurtit">
          <label>When did the symptoms begin?</label>
        </Grid>
        <Grid>
          <DateFormat
            name="fever_symptoms_begin"
            value={
              props.updateQues?.fever_symptoms_begin
                ? new Date(props.updateQues?.fever_symptoms_begin)
                : new Date()
            }
            max={new Date()}
            onChange={(e) => props.updateAllEntrySec(e, 'fever_symptoms_begin')}
            // date_format={
            //   this.props.settings &&
            //   this.props.settings.setting &&
            //   this.props.settings.setting.date_format
            // }
            NotFutureDate={true}
          />
          {props.error_section == 26 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="textFieldArea1">
        <Grid className="bgncmnSpc">
          <Grid>
            <Grid className="bgncmnLbl hurtit">
              <label>
                In which range do the temperatures move throughout the day?
              </label>
            </Grid>
            <Grid>
              <label>Top Value :Number in C (35 - 43)</label>
              <input
                type="number"
                placeholder="36.6"
                name="fever_top_body_temp"
                onChange={(e) =>
                  props.updateAllEntrySec1(e, 'fever_top_body_temp')
                }
                // className={forError ? 'setRedColor' : ''}
                value={props.updateQues?.fever_top_body_temp}
              />
              {props.error_section == 27 && (
                <div className="err_message2">{props.errorChrMsg}</div>
              )}
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <label>Low Value : Number in C (35 - 43)</label>
            </Grid>
            <Grid>
              <input
                type="number"
                placeholder="36.6"
                name="fever_low_body_temp"
                onChange={(e) =>
                  props.updateAllEntrySec1(e, 'fever_low_body_temp')
                }
                // className={forError ? 'setRedColor' : ''}
                value={props.updateQues?.fever_low_body_temp}
              />
              {props.error_section == 28 && (
                <div className="err_message2">{props.errorChrMsg}</div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl hurtit">
          <label>
            On a scale of 1 - 10, how would you describe the intensity of the
            pain?
          </label>
        </Grid>
        <PainIntensity
          name="fever_pain_intensity"
          onChange={(e) => props.updateAllEntrySec1(e)}
          value={Math.round(props.updateQues?.fever_pain_intensity)}
          // setting={this.props.settings}
          comesFrom="Evalute"
        />
        {props.error_section == 29 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'fever_have_a_cough')
          }
          label="Do you have a cough?"
          value={props.updateQues?.fever_have_a_cough}
        />
      </Grid>
      {props.updateQues && props.updateQues?.fever_have_a_cough === 'yes' && (
        <Grid className="fatiqueQues">
          <Grid className="bgncmnSpc">
            <Grid container direction="row" justify="center">
              <Grid item xs={12} md={12}>
                <Grid container direction="row" justify="center">
                  <Grid item xs={4} md={4}>
                    <Grid className="sickCheckSec">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fever_cold"
                            value={
                              props.updateQues &&
                              props.updateQues?.fever_cold &&
                              props.updateQues?.fever_cold == true
                                ? false
                                : true
                            }
                            color="#00ABAF"
                            checked={props.updateQues?.fever_cold}
                            onChange={(e) => {
                              props.updateAllEntrySec2(e);
                            }}
                            className="PIC_Condition"
                          />
                        }
                        label="Cold ?"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Grid className="sickCheckSec">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fever_hoarseness"
                            value={
                              props.updateQues &&
                              props.updateQues?.fever_hoarseness &&
                              props.updateQues?.fever_hoarseness == true
                                ? false
                                : true
                            }
                            color="#00ABAF"
                            checked={props.updateQues?.fever_hoarseness}
                            onChange={(e) => {
                              props.updateAllEntrySec2(e);
                            }}
                            className="PIC_Condition"
                          />
                        }
                        label="Hoarseness?"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} md={4}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid className="fillDiaAll hurtit">
        <label>Sputum? If sputum, what consistency and color?</label>
        <NotesEditor
          name="fever_sputum"
          onChange={(e) => props.updateAllEntrySec(e, 'fever_sputum')}
          value={props.updateQues?.fever_sputum}
        />
        {props.error_section == 30 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
    </Grid>
  );
}

export default Index;
