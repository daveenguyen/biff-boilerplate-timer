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
    case 'NEW_SOLVE': {
      solve.start = 0;
      solve.end = 0;
      TimeStore.emitChange();
      break;
    }
    case 'START_SOLVE': {
      TimeStore._setPending(true);
      solve.start = payload.body;
      TimeStore.emitChange();
      break;
    }
    case 'END_SOLVE': {
      solve.end = payload.body;
      TimeStore._setPending(false);
      TimeStore.emitChange();
      break;
    }
    case 'TICK': {
      solve.end = Date.now();
      TimeStore.emitChange();
      break;
    }
  }
});

export default TimeStore;
