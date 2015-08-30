'use strict';

import biff from '../dispatcher/dispatcher';
import Immutable from 'immutable';
import scrambleGenerator from '../components/utils/ScrambleGenerator'

let scramble = scrambleGenerator();

const ScrambleStore = biff.createStore({
  getScramble() {
    return scramble;
  }
}, (payload) => {
  if (payload.actionType === 'END_SOLVE') {
    ScrambleStore._clearErrors();
    scramble = scrambleGenerator();
    ScrambleStore.emitChange();
  }
});

export default ScrambleStore;
