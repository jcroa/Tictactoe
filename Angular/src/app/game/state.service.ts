import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string,
    values: string[][],
    movementCount: number,
    winner: string
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

	private _state$: BehaviorSubject<State>;

  constructor() { 

	  let initialState = {
	    turn: 'PLAYERX',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
      ],
      movementCount: 0,
      winner: null
	  };

	  this._state$ = new BehaviorSubject(initialState);

  }

  get state$ (): BehaviorSubject<State> {
    return this._state$; 
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }
  
  updateValue(row, col) {
    if(this.state.values[row][col] === '-' && !this.state.winner) {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';

      this.state.values[row][col] = newValue;
      this.state.movementCount += 1;

      if (this.checkWinner(newValue)) {
        this.state.winner = this.state.turn;
      }

      this.state.turn = newTurn;

      this._state$.next(this.state);
    }
  }

  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movementCount: 0,
      winner: null
    };
  }

  checkWinner(v) {
    var lines: number[][] = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
   
    for (var i=0; i<lines.length; i++) {
      var line = lines[i];
      var c1 = this.cellValue(line[0]);
      var c2 = this.cellValue(line[1]);
      var c3 = this.cellValue(line[2]);
      if (c1==v && c1==c2 && c2==c3) {
        return true;
      }
    }
  }

  cellValue(index) {
    var row = Math.floor(index / 3);
    var column = index % 3;
    return this.state.values[row][column];
  }

}
