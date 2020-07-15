import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {GraphqlService} from "./services/graphql/graphql.service";
import { TableComponent } from './components/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    ReactiveFormsModule,
    TableComponent,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  providers:[
    GraphqlService
  ]
})
export class SharedModule { }
