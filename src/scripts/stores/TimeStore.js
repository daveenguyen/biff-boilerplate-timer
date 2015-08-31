'use strict';

import biff from '../dispatcher/dispatcher';

let solve = {
  start: 0,
  end: 0
}

const TimeStore = biff.createStore({
  getTime() {
    return solve;
  }
}, (payload) => {
  switch (payload.actionType) {
    case 'START_INSPECTION': {
      solve.start = payload.data.time;
      solve.end = solve.start + 15000;
      TimeStore.emitChange();
      break;
    }
    case 'NEW_SOLVE': {
      solve.start = 0;
      solve.end = 0;
      TimeStore.emitChange();
      break;
    }
    case 'START_SOLVE': {
      TimeStore._setPending(true);
      solve.start = payload.data.time;
      solve.end = solve.start;
      TimeStore.emitChange();
      break;
    }
    case 'END_SOLVE': {
      solve.end = payload.data.time;
      TimeStore._setPending(false);
      TimeStore.emitChange();
      break;
    }
    case 'TICK': {
      if (TimeStore.getPending()) {
        solve.end = Date.now();
      } else {
        solve.start = Date.now();
      }
      TimeStore.emitChange();
      break;
    }
  }
});

export default TimeStore;
