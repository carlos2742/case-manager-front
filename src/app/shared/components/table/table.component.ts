import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {USER_ROLES} from "../../../admin/models/admin.models";
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

}
