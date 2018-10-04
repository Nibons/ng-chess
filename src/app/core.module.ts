import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes as rootRoutes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(rootRoutes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class CoreModule { }
