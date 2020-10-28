import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IClient, USER_ROLES} from "../../../admin/models/admin.models";
import * as AdminStore from "../../../admin/store";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  @Input() entity: String;
  @Input() dataSource;
  @Input() displayedColumns:Array<any>;
  @Output() updateEvent: EventEmitter<object>;
  @Output() deleteEvent: EventEmitter<String>;

  constructor() {
    this.updateEvent = new EventEmitter<object>();
    this.deleteEvent = new EventEmitter<String>();
  }

  ngOnInit(): void { }

  /**
   * Edit callback function
   * */
  public update(element){
    this.updateEvent.emit(element);
  }

  /**
   * Delete callback function
   * */
  public delete(id){
    this.deleteEvent.emit(id);
  }

  get displayColumnFilter(){
    return this.displayedColumns.length > 0 ? this.displayedColumns.filter(item => item !== 'options') : [];
  }

  getLanguageKeyColumn(column){
    return `${this.entity.toUpperCase()}.ATTR.${column.toUpperCase()}`;
  }

  getColumnValue(column, element){
    const value = element[column];
    switch (column) {
      case 'rol':{
        return `ROLES.${value}`;
      }
      case 'title':{
        return `TITLES.${value}`;
      }
      case 'stage':{
        return `CASE.STAGES.${value}`;
      }
      case 'practiceArea':{
        return `PRACTICE_AREA.${value}`;
      }
      case 'billingMethod':{
        return `BILLING.METHODS.${value}`;
      }
      case 'client':{
        const client: IClient = value;
        return `${client.firstName} ${client.lastName}`;
      }
      default:{
        return element[column];
      }
    }
  }

}
