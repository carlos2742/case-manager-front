import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationComponent} from "../../components/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _type: string;
  private _icon: string;

  constructor(private _snackBar: MatSnackBar) { }

  public info(message, param = {}){
    this._icon = 'info';
    this._type = 'alert-info';
    this.show(message, param)
  }

  public success(message, param = {}){
    this._icon = 'thumb_up';
    this._type = 'alert-success';
    this.show(message, param)
  }

  public warning(message, param = {}){
    this._icon = 'warning';
    this._type = 'alert-warning';
    this.show(message, param)
  }

  public error(message, param = {}){
    this._icon = 'error';
    this._type = 'alert-danger';
    this.show(message, param)
  }

  private show(message, param){
    this._snackBar.openFromComponent(NotificationComponent,{
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition:"bottom",
      data:{
        message: message,
        message_param: param,
        type: this._type,
        icon: this._icon,
      }
    });
  }
}
