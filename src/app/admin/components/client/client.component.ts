import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as AdminStore from '../../store';
import {Observable} from "rxjs";
import {MatStepper} from "@angular/material/stepper";
import {USER_ROLES} from "../../../admin/models/admin.models";

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


  @ViewChild('stepper',{static: false})
  stepper: MatStepper;

  public showNextButton: boolean;

  public data$: Observable<any>;
  public displayedColumns: Array<string>;

  public requiredForm: FormGroup;
  public optionalForm: FormGroup;

  public DIALOG_ACTION_TYPE;
  public USER_ROLES;

  public dialogTitle: string;
  public dialogActionType: DIALOG_ACTION_TYPE;
  public dialogMainActionName: string;
  public dialogMainAction: Function;

  constructor(private store: Store<AdminStore.AdminState>, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.DIALOG_ACTION_TYPE = DIALOG_ACTION_TYPE;
    this.USER_ROLES = USER_ROLES;

    this.displayedColumns = [
      'firstName',
      'lastName',
      'email',
      'birthday',
      'address',
      'phoneNumber',
      'emergencyContact',
      'ssn',
      'arn',
      'options'];
    this.data$ = this.store.select(AdminStore.allClients);
  }

  ngOnInit(): void {
    this.store.dispatch(new AdminStore.LoadClients({}));

    this._initializeForm();
  }

  public openCreateDialog(){
    this.showNextButton = true;
    this.dialogTitle = 'ACTIONS.CREATE';
    this.dialogMainActionName = 'ACTIONS.CREATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.CREATE;
    this.dialogMainAction = () => this.createClient();
    this._openDialog();
  }

  public openUpdateDialog(object){
    this.showNextButton = true;
    this.dialogTitle = 'ACTIONS.UPDATE';
    this.dialogMainActionName = 'ACTIONS.UPDATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.EDIT;
    this._updateForm(object);
    this.dialogMainAction = () => this.updateClient(object);
    this._openDialog();
  }

  public openDeleteDialog(id){
    this.showNextButton = false;
    this.dialogTitle = 'ACTIONS.DELETE';
    this.dialogMainActionName = 'ACTIONS.DELETE';
    this.dialogActionType = DIALOG_ACTION_TYPE.REMOVE;
    this.dialogMainAction = () => this.deleteClient(id);
    this._openDialog();
  }

  public createClient(){
    const payload = {...this.requiredForm.value, ...this.optionalForm.value};
    this.store.dispatch(new AdminStore.CreateClient(payload));
  }

  public deleteClient(id){
    const payload = id;
    this.store.dispatch(new AdminStore.DeleteClient(payload));
  }

  public updateClient(element){
    const payload = Object.assign(
      {id: element.id},
      this.requiredForm.value,
      this.optionalForm.value);
    this.store.dispatch(new AdminStore.UpdateClient(payload));
  }

  public stepperChanged(data){
    const label = data.selectedStep.label;
    this.showNextButton = label === 'step1' ? true : false;
  }

  private _openDialog(): void {
    const dialogRef = this.dialog.open(this.template, {
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.requiredForm.reset();
      this.optionalForm.reset();
      if(this.stepper) this.stepper.reset();
      this.showNextButton = true;
    });
  }

  private _initializeForm(){
    this.requiredForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      emergency_contact: new FormControl('', [Validators.required])
    });
    this.optionalForm = this.formBuilder.group({
      last_name: new FormControl('', ),
      birthday: new FormControl('', ),
      address: new FormControl('', ),
      ssn: new FormControl('', ),
      arn: new FormControl('', ),
    });
  }

  private _updateForm(element){
    this.requiredForm.controls['first_name'].setValue(element['firstName']);
    this.requiredForm.controls['email'].setValue(element['email']);
    this.requiredForm.controls['phone_number'].setValue(element['phoneNumber']);
    this.requiredForm.controls['emergency_contact'].setValue(element['emergencyContact']);

    this.optionalForm.controls['last_name'].setValue(element['lastName'] ? element['lastName'] : '');
    this.optionalForm.controls['birthday'].setValue(element['birthday'] ? element['birthday'] : '');
    this.optionalForm.controls['address'].setValue(element['address'] ? element['address'] : '');
    this.optionalForm.controls['ssn'].setValue(element['ssn'] ? element['ssn'] : '');
    this.optionalForm.controls['arn'].setValue(element['arn'] ? element['arn'] : '');
  }
}
