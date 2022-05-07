import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import FatiqueQuestion from "../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions";
import PainIntensity from "Screens/Components/PainIntansity/index";
import DateFormat from "Screens/Components/DateFormat/index";

function Index(props) {
  useEffect(() => {

  }, []);

  return (
    <Grid className="borderLineAfer">
    <Grid className="bgncmnSpc">
      <Grid className="bgncmnLbl">
        <label>When did the symptoms begin?</label>
      </Grid>
      <Grid>
        <DateFormat
          name="depressed_symptoms_begin"
          value={
            props.updateQues?.depressed_symptoms_begin
              ? new Date(
                  props.updateQues?.depressed_symptoms_begin
                )
              : new Date()
          }
          max={new Date()}
          onChange={(e) =>
            props.updateAllEntrySec(
              e,
              "depressed_symptoms_begin"
            )
          }
          // date_format={
          //   this.props.settings &&
          //   this.props.settings.setting &&
          //   this.props.settings.setting.date_format
          // }
          NotFutureDate={true}
        />
        {props.error_section == 39 && (
          <div className="err_message2">
            {props.errorChrMsg}
          </div>
        )}
      </Grid>
    </Grid>

    <Grid className="bgncmnSpc">
      <Grid className="bgncmnLbl">
        <label>
          On a scale of 1 - 10, how would you describe
          the intensity of the pain?
        </label>
      </Grid>
      <PainIntensity
        name="depressed_pain_intensity"
        onChange={(e) => props.updateAllEntrySec1(e)}
        value={Math.round(
          props.updateQues?.depressed_pain_intensity
        )}
        // setting={this.props.settings}
        comesFrom="Evalute"
      />
      {props.error_section == 40 && (
        <div className="err_message2">
          {props.errorChrMsg}
        </div>
      )}
    </Grid>
    <Grid className="fatiqueQues fatiqueQuess1">
    <FatiqueQuestion
      updateAllEntrySec={(e) =>
        props.updateAllEntrySec(e, "depressed_do_you_sleep")
      }
      label="Do you sleep?"
      value={props.updateQues?.depressed_do_you_sleep}
    />
    </Grid>
    <Grid className="sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
        updateAllEntrySec={(e) =>
          props.updateAllEntrySec(
            e,
            "depressed_suicidal_thoughts"
          )
        }
        label="You have suicidal thoughts or ?"
        value={props.updateQues?.depressed_suicidal_thoughts}
      />
      </Grid>
    </Grid>
    <Grid className="bgncmnSpcRmv sickQuesSec">
    <Grid className="fatiqueQues fatiqueQuess1">
      <FatiqueQuestion
        updateAllEntrySec={(e) =>
          props.updateAllEntrySec(
            e,
            "depressed_hurt_yourself"
          )
        }
        label="Do you already hurt yourself once?"
        value={props.updateQues?.depressed_hurt_yourself}
      />
      </Grid>
      {props.error_section == 41 && (
        <div className="err_message2">
          {props.errorChrMsg}
        </div>
      )}
    </Grid>
  </Grid>        
  );
}

export default Index;
