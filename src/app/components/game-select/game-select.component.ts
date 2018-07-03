import { NewGame } from '@chess/NewGame';
import { HttpClient } from '@angular/common/http';
import { TemplateState } from '@chess/game-select-state';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RetrieveTemplateList } from '@chess/RetrieveTemplateList';
import { TemplateStateModel } from '@chess/ITemplateState.model';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.css']
})
export class GameSelectComponent implements OnInit {
  @Select(TemplateState.TemplateList) templates$: Observable<TemplateStateModel[]>;

  constructor(private store: Store, private _http: HttpClient) {
    store.dispatch(new RetrieveTemplateList(_http, store));
  }

  ngOnInit() {
    console.log(this.templates$);
  }
  clickMe() {
    console.log('button clicked');
  }
}
