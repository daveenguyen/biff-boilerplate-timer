'use strict';

import biff from '../dispatcher/dispatcher';
import Immutable from 'immutable';

let solves = Immutable.List.of();

const SolveStore = biff.createStore({
  getSolves() {
    return solves;
  }
}, (payload) => {
  switch (payload.actionType) {
    case 'END_SOLVE': {
      solves = solves.push({start: payload.data.solveTime.start, end: payload.data.time, scramble: payload.data.scramble});
      SolveStore.emitChange();
      break;
    }
  }

});

export default SolveStore;
