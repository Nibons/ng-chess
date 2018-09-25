import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameConsoleComponent } from 'src/app/components/GameConsole/GameConsole.component';
import { GameTabsComponent } from 'src/app/components/GameTabs/GameTabs.component';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
