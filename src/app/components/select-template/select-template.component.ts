import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { NewGame } from '@chess/NewGame';
import { IGameTemplate } from '@chess/igame-template.model';

@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
export class SelectTemplateComponent implements OnInit {
  @Input() template: IGameTemplate;

  constructor(private store: Store) { }

  ngOnInit() {
    // TODO- remove this line
    this.store.dispatch(new NewGame(this.template, this.store));
  }

  onClick() {
    console.log('Template called');
    this.store.dispatch(new NewGame(this.template, this.store));
  }

}
