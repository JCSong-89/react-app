import { createAction, handleActions } from "redux-actions";

const CHECK_SEARCH = "checkSearch";
const CHECK_PROFILE = "checkProfile";
const CHECK_NEW_MUSIC = "checknewMusic";
const CHECK_MUSIC = "checkMusic";
const MUSIC_DATA = "musicData";

export const checkSearch = createAction(CHECK_SEARCH);
export const checkProfile = createAction(CHECK_PROFILE);
export const checknewMusic = createAction(CHECK_NEW_MUSIC);
export const checkMusic = createAction(CHECK_MUSIC);
export const musicData = createAction(MUSIC_DATA);

const initState = false;
const musicInitState = {};

export const checkSearchHandler = handleActions(
  {
    [CHECK_SEARCH]: (state) => state,
  },
  initState
);

export const checkProfileHandler = handleActions(
  {
    [CHECK_PROFILE]: (state) => state,
  },
  initState
);

export const checknewMusicHandler = handleActions(
  {
    [CHECK_NEW_MUSIC]: (state) => state,
  },
  initState
);

export const checkMusicHandler = handleActions(
  {
    [CHECK_MUSIC]: (state) => state,
  },
  initState
);

export const musicHandler = handleActions(
  {
    [MUSIC_DATA]: (state) => state,
  },
  musicInitState
);
