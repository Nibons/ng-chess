import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameConsoleComponent } from 'src/app/components/GameConsole/GameConsole.component';
import { GameTabsComponent } from 'src/app/components/GameTabs/GameTabs.component';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatStepperModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { CoreModule } from 'src/app/core.module';

@NgModule({
  declarations: [
    AppComponent,
    GameConsoleComponent,
    GameTabsComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,

    // Material + forms stuff
    MatTabsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
