import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import MMHG from 'Screens/Components/mmHgField/index';

function Index(props) {
  useEffect(() => {}, []);

  return (
    <Grid className="borderLineAfer">
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>What is your Blood pressure ?</label>
        </Grid>
        <Grid container direction="row" spacing="1">
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="cardiac_rr_systolic"
                Unit="mmHg"
                label="RR_systolic"
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.cardiac_rr_systolic}
              />
            </Grid>
            {props.error_section == 42 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="cardiac_rr_diastolic"
                Unit="mmHg"
                label="RR_diastolic"
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.cardiac_rr_diastolic}
              />
            </Grid>
            {props.error_section == 43 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'cardiac_heart_attack')
          }
          label="Have you ever had a heart attack?"
          value={props.updateQues?.cardiac_heart_attack}
        />
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cardiac_heart_failure')
            }
            label="Do you suffer from diagnosed Heart failure?"
            value={props.updateQues?.cardiac_heart_failure}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cardiac_have_dizziness')
            }
            label="Do you have dizziness?"
            value={props.updateQues?.cardiac_have_dizziness}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cardiac_have_shoulder_pain')
            }
            label="Do you have shoulder pain?"
            value={props.updateQues?.cardiac_have_shoulder_pain}
          />
        </Grid>
      </Grid>
      {props.error_section == 44 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
    </Grid>
  );
}

export default Index;
