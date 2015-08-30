'use strict';

import biff from '../dispatcher/dispatcher';

const TimerActions = biff.createActions({
  newSolve() {
    this.dispatch({
      actionType: 'NEW_SOLVE'
    });
  },
  startSolve(time) {
    this.dispatch({
      actionType: 'START_SOLVE',
      body: time
    });
  },
  endSolve(time) {
    this.dispatch({
      actionType: 'END_SOLVE',
      body: time
    });
  },
  tick() {
    this.dispatch({
      actionType: 'TICK'
    });
  },
  addTodo(todo) {

    var self = this;

    this.dispatch({
      actionType: 'ADD_TODO_START'
    });

    // Simulate Async Call
    setTimeout(function() {

      if (todo !== '') {
        self.dispatch({
          actionType: 'ADD_TODO_SUCCESS',
          data: todo
        });
      } else {
        self.dispatch({
          actionType: 'ADD_TODO_ERROR'
        })
      }

    }, 600);
  }
});

export default TimerActions;
