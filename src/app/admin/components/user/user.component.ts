import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DIALOG_ACTION_TYPE} from "../client/client.component";
import * as AdminStore from '../../store';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {USER_ROLES} from "../../models/admin.models";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('template',{static: false})
  template: TemplateRef<any>;
  data$: Observable<any>;
  displayedColumns: Array<string>;

  form: FormGroup;

  public DIALOG_ACTION_TYPE;
  public USER_ROLES;

  public dialogTitle: String;
  public dialogActionType: DIALOG_ACTION_TYPE;
  public dialogMainActionName: string;
  public dialogMainAction: Function;

  constructor(private store: Store<AdminStore.AdminState>, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.DIALOG_ACTION_TYPE = DIALOG_ACTION_TYPE;
    this.USER_ROLES = USER_ROLES;
    this.displayedColumns = [
      'name',
      'email',
      'rol',
      'actions'];
    this.data$ = this.store.select(AdminStore.allUsers);
  }

  ngOnInit(): void {
    this.store.dispatch(new AdminStore.LoadUsers({}));
    this.initializeForm();
  }

  openCreateDialog(){
    this.dialogTitle = 'Create User';
    this.dialogMainActionName = 'ACTIONS.CREATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.CREATE;
    this.dialogMainAction = () => this.createUser();
    this.openDialog();
  }

  openUpdateDialog(object){
    this.dialogTitle = 'Update User';
    this.dialogMainActionName = 'ACTIONS.UPDATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.EDIT;
    this.updateForm(object);
    this.dialogMainAction = () => this.updateUser(object);
    this.openDialog();
  }

  openDeleteDialog(id){
    this.dialogTitle = 'Delete Users';
    this.dialogMainActionName = 'ACTIONS.DELETE';
    this.dialogActionType = DIALOG_ACTION_TYPE.REMOVE;
    this.dialogMainAction = () => this.deleteUser(id);
    this.openDialog();
  }

  createUser(){
    const payload = this.form.value;
    this.store.dispatch(new AdminStore.RegisterUser(payload));
  }

  deleteUser(id){
    const payload = id;
    this.store.dispatch(new AdminStore.DeleteUser(payload));
  }

  updateUser(element){
    const payload = Object.assign({id: element.id}, this.form.value);
    this.store.dispatch(new AdminStore.UpdateUser(payload));
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(this.template, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.form.reset();
      this.initializeForm();
    });
  }

  private initializeForm(){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl(USER_ROLES.COLLABORATOR, [Validators.required]),
      password: new FormControl('1234567890', [Validators.required])
    });
  }

  private updateForm(element){
    this.form.controls['name'].setValue(element['name']);
    this.form.controls['email'].setValue(element['email']);
    this.form.controls['rol'].setValue(element['rol']);
  }

}
