import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameConsoleComponent } from 'src/app/components/GameConsole/GameConsole.component';
import { GameTabsComponent } from 'src/app/components/GameTabs/GameTabs.component';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatStepperModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GameConsoleComponent,
    GameTabsComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
