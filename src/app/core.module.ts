import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { RouterModule } from '@angular/router';

import { routes as rootRoutes } from './app.routes';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthenticationModule,
        RouterModule.forRoot(rootRoutes)
    ],
    exports: [AuthenticationModule],
    providers: [],
})
export class CoreModule { }