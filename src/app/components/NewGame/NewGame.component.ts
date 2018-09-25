import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GamesaveQuery } from 'src/app/chess-service/state/gamesave/gamesave.query';


@Component({
  selector: 'app-newgame',
  templateUrl: './NewGame.component.html',
  styleUrls: ['./NewGame.component.css']
})
export class NewGameComponent implements OnInit {

  isLinear = false;
  gameStartType$ = this.gameStartType$.pipe();
  resumeOrNewFormGroup: FormGroup;


  constructor(protected gameSaveQuery: GamesaveQuery, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resumeOrNewFormGroup = this._formBuilder.group({
      resumeOrNewFormControl: ['', Validators.required]
    });
  }

}
