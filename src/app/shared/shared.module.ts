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
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';
import {NotificationService} from "./services/notification/notification.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [TableComponent, NotificationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    ReactiveFormsModule,
    TableComponent,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    TranslateModule
  ],
  providers:[
    GraphqlService,
    NotificationService
  ]
})
export class SharedModule { }
