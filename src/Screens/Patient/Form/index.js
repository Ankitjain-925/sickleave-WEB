import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Settings } from "Screens/Login/setting";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authy } from "Screens/Login/authy.js";
import { LoginReducerAim } from "Screens/Login/actions";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import FatiqueQuestion from "../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateEvaluateAllSec: {},
    };
  }

  updateAllEntrySec = (value, name) => {
    var state = this.state.updateEvaluateAllSec;
    state[name] = value;
    console.log("fgfdgdgd", this.state.updateEvaluateAllSec);
    this.setState({ updateEvaluateAllSec: state });
  };

  render() {
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme homeBgDrk"
            : "homeBg"
        }
      >
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
                      <Grid className="fatiqueQues fatiqueQuess1">
                        <FatiqueQuestion
                          updateAllEntrySec={(e) =>
                            this.updateAllEntrySec(e, "Fever")
                          }
                          label="1. If you have Fever what is your Body Temp?"
                          value={this.state.updateEvaluateAllSec?.Fever}
                        />
                        <FatiqueQuestion
                          updateAllEntrySec={(e) =>
                            this.updateAllEntrySec(e, "how_long")
                          }
                          label="2. Have you been in the sun before, How long? "
                          value={this.state.updateEvaluateAllSec?.how_long}
                        />
                        <FatiqueQuestion
                          updateAllEntrySec={(e) =>
                            this.updateAllEntrySec(e, "lower_cold")
                          }
                          label="3. Have you been in the Cold (lower then -5C), how long?"
                          value={this.state.updateEvaluateAllSec?.lower_cold}
                        />
                        <FatiqueQuestion
                          updateAllEntrySec={(e) =>
                            this.updateAllEntrySec(e, "body_temp")
                          }
                          label="4. If you have Fever what is your Body Temp?"
                          value={this.state.updateEvaluateAllSec?.body_temp}
                        />
                        <FatiqueQuestion
                          updateAllEntrySec={(e) =>
                            this.updateAllEntrySec(e, "sun")
                          }
                          label="5. Have you been in the sun before, How long? "
                          value={this.state.updateEvaluateAllSec?.sun}
                        />

                        {/* <Grid className="infoShwSave3">
                      <input
                        type="submit"
                        value="Submit"
                        // onClick={() => this.handleEvalSubmit(2)}
                      ></input>
                    </Grid> */}
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
