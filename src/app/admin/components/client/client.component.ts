import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../services/client/client.service";

export enum DIALOG_ACTION_TYPE{
  CREATE,
  EDIT,
  REMOVE
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @ViewChild('template',{static: false})
  template: TemplateRef<any>;
  data: any;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'birthday',
    'address',
    'phoneNumber',
    'emergencyContact',
    'ssn',
    'arn',
    'actions'];

  form: FormGroup;

  public DIALOG_ACTION_TYPE;

  public dialogTitle: String;
  public dialogActionType: DIALOG_ACTION_TYPE;
  public dialogMainActionName: string;
  public dialogMainAction: Function;

  constructor(private client: ClientService, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.DIALOG_ACTION_TYPE = DIALOG_ACTION_TYPE;
    this.client.all.subscribe(response => {
      this.data = response;
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  openCreateDialog(){
    this.dialogTitle = 'Create Client';
    this.dialogMainActionName = 'ACTIONS.CREATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.CREATE;
    this.dialogMainAction = () => this.createClient();
    this.openDialog();
  }

  openUpdateDialog(object){
    this.dialogTitle = 'Update Client';
    this.dialogMainActionName = 'ACTIONS.UPDATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.EDIT;
    this.updateForm(object);
    this.dialogMainAction = () => this.updateClient(object);
    this.openDialog();
  }

  openDeleteDialog(id){
    this.dialogTitle = 'Delete Client';
    this.dialogMainActionName = 'ACTIONS.DELETE';
    this.dialogActionType = DIALOG_ACTION_TYPE.REMOVE;
    this.dialogMainAction = () => this.deleteClient(id);
    this.openDialog();
  }

  createClient(){
    const payload = this.form.value;
    this.client.create(payload).subscribe(response =>{
      const element = response;
      this.data = this.data.concat([element]);
    });
  }

  deleteClient(id){
    const payload = id;
    this.client.delete(payload).subscribe(response =>{
      const element = response;
      this.data = this.data.filter(item => item.id !== element.id);
    });
  }

  updateClient(element){
    const payload = Object.assign({id: element.id}, this.form.value);
    this.client.update(payload).subscribe( response =>{
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
    });
  }

  private initializeForm(){
    this.form = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      emergency_contact: new FormControl('', [Validators.required])
    });
  }

  private updateForm(element){
    this.form.controls['first_name'].setValue(element['firstName']);
    this.form.controls['email'].setValue(element['email']);
    this.form.controls['phone_number'].setValue(element['phoneNumber']);
    this.form.controls['emergency_contact'].setValue(element['emergencyContact']);
  }
}
