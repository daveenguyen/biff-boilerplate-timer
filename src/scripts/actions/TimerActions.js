'use strict';

import biff from '../dispatcher/dispatcher';

const TimerActions = biff.createActions({
  startInspection(data) {
    this.dispatch({
      actionType: 'START_INSPECTION',
      data: data
    });
  },
  newSolve() {
    this.dispatch({
      actionType: 'NEW_SOLVE'
    });
  },
  startSolve(data) {
    this.dispatch({
      actionType: 'START_SOLVE',
      data: data
    });
  },
  endSolve(data) {
    this.dispatch({
      actionType: 'END_SOLVE',
      data: data
    });
  },
  tick(data) {
    this.dispatch({
      actionType: 'TICK',
      data: data
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
