import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { create as create_spy } from 'rxjs-spy';

// export const spy = create_spy()
//   .log('board*'); // logs all observables with tag

// import { RouterModule } from '@angular/router';
// import { routes as rootRoutes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [HttpClient],
})
export class CoreModule { }
