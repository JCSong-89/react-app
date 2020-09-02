import { combineReducers } from "redux";
import {
  checkSearchHandler,
  checkProfileHandler,
  checknewMusicHandler,
  checkMusicHandler,
  musicHandler,
} from "./Home.readux";

export default combineReducers({
  checkSearchHandler,
  checkProfileHandler,
  checknewMusicHandler,
  checkMusicHandler,
  musicHandler,
});
