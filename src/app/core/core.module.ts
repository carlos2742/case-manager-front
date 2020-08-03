import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GraphQLModule} from "./graphql.module";
import {InterceptorService} from "../shared/services/Interceptor/interceptor.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
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
