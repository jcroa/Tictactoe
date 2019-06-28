import { Component, OnInit } from '@angular/core';

import { StateService, State } from './../state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _state$: BehaviorSubject<State>;
  private _stateService: StateService;

  constructor(stateService: StateService) { 
    this._state$ = stateService.state$;
    this._stateService = stateService;
  }

  ngOnInit() {
  }

}
