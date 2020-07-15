import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DIALOG_ACTION_TYPE} from "../client/client.component";

enum USER_ROLES{
  DEVELOPER,
  ADMIN,
  COLLABORATOR
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('template',{static: false})
  template: TemplateRef<any>;
  data: any;
  displayedColumns: string[] = [
    'name',
    'email',
    'rol',
    'actions'];

  form: FormGroup;

  public DIALOG_ACTION_TYPE;
  public USER_ROLES;

  public dialogTitle: String;
  public dialogActionType: DIALOG_ACTION_TYPE;
  public dialogMainActionName: String;
  public dialogMainAction: Function;

  constructor(private user: UserService, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.DIALOG_ACTION_TYPE = DIALOG_ACTION_TYPE;
    this.USER_ROLES = USER_ROLES;
    this.user.all.subscribe(response => {
      this.data = response;
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  openCreateDialog(){
    this.dialogTitle = 'Create User';
    this.dialogMainActionName = 'Create';
    this.dialogActionType = DIALOG_ACTION_TYPE.CREATE;
    this.dialogMainAction = () => this.createUser();
    this.openDialog();
  }

  openUpdateDialog(object){
    this.dialogTitle = 'Update User';
    this.dialogMainActionName = 'Update';
    this.dialogActionType = DIALOG_ACTION_TYPE.EDIT;
    this.updateForm(object);
    this.dialogMainAction = () => this.updateUser(object);
    this.openDialog();
  }

  openDeleteDialog(id){
    this.dialogTitle = 'Delete Users';
    this.dialogMainActionName = 'Delete';
    this.dialogActionType = DIALOG_ACTION_TYPE.REMOVE;
    this.dialogMainAction = () => this.deleteUser(id);
    this.openDialog();
  }

  createUser(){
    const payload = this.form.value;
    this.user.register(payload).subscribe(response =>{
      const element = response;
      this.data = this.data.concat([element]);
    });
  }

  deleteUser(id){
    const payload = id;
    this.user.delete(payload).subscribe(response =>{
      const element = response;
      this.data = this.data.filter(item => item.id !== element.id);
    });
  }

  updateUser(element){
    const payload = Object.assign({id: element.id}, this.form.value);
    this.user.update(payload).subscribe( response =>{
      const element = response;
      const index = this.data.findIndex(item => item.id === element.id);
      this.data.splice(index,1,element);
    });
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
