import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GraphQLModule} from "./graphql.module";
import {InterceptorService} from "../shared/services/Interceptor/interceptor.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../environments/environment";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  exports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ]
})
export class CoreModule { }
