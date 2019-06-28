import { Component, OnInit } from '@angular/core';

import { StateService, State } from './../state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private _stateService: StateService;

  constructor(stateService: StateService) { 
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  _handleResetClick() {
    console.log('Click on reset');
    this._stateService.reset();
  }

}
