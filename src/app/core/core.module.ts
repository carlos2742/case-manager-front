import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GraphQLModule} from "./graphql.module";
import {InterceptorService} from "../shared/services/Interceptor/interceptor.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    GraphQLModule,
    HttpClientModule
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
