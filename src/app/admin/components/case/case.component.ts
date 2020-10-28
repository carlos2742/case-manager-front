import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AdminStore from "../../store";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {
  BILLING_METHODS,
  CASE_STAGES,
  DIALOG_ACTION_TYPE,
  IClient,
  PRACTICE_AREAS,
  USER_ROLES
} from "../../models/admin.models";
import {debounceTime, map, startWith, tap} from "rxjs/operators";

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit, OnDestroy  {

  @ViewChild('template',{static: false})
  template: TemplateRef<any>;
  public data$: Observable<any>;
  public displayedColumns: Array<string>;

  public clients: Observable<Array<IClient>>;

  form: FormGroup;

  public DIALOG_ACTION_TYPE;
  public USER_ROLES;
  public CASE_STAGES;
  public PRACTICE_AREAS;
  public BILLING_METHODS;

  public dialogTitle: string;
  public dialogActionType: DIALOG_ACTION_TYPE;
  public dialogMainActionName: string;
  public dialogMainAction: Function;

  private _subscription: Subscription;

  constructor(private store: Store<AdminStore.AdminState>, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.DIALOG_ACTION_TYPE = DIALOG_ACTION_TYPE;
    this.USER_ROLES = USER_ROLES;
    this.CASE_STAGES = CASE_STAGES;
    this.PRACTICE_AREAS = PRACTICE_AREAS;
    this.BILLING_METHODS = BILLING_METHODS;

    this.displayedColumns = [
      'name',
      'number',
      'client',
      'description',
      'stage',
      'practiceArea',
      'billingMethod',
      'createdAt',
      'options'];
    this.data$ = this.store.select(AdminStore.allCases);
    this.clients = this.store.select(AdminStore.caseClients);
  }

  ngOnInit(): void {
    this.store.dispatch(new AdminStore.LoadCases({}));
    this._initializeForm();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public openCreateDialog(){
    this.dialogTitle = 'ACTIONS.CREATE';
    this.dialogMainActionName = 'ACTIONS.CREATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.CREATE;
    this.dialogMainAction = () => this.createCase();
    this._openDialog();
  }

  public openUpdateDialog(object){
    this.dialogTitle = 'ACTIONS.UPDATE';
    this.dialogMainActionName = 'ACTIONS.UPDATE';
    this.dialogActionType = DIALOG_ACTION_TYPE.EDIT;
    this._updateForm(object);
    this.dialogMainAction = () => this.updateCase(object);
    this._openDialog();
  }

  public openDeleteDialog(id){
    this.dialogTitle = 'ACTIONS.DELETE';
    this.dialogMainActionName = 'ACTIONS.DELETE';
    this.dialogActionType = DIALOG_ACTION_TYPE.REMOVE;
    this.dialogMainAction = () => this.deleteCase(id);
    this._openDialog();
  }

  public createCase(){
    const payload = {...this.form.value, client_id: this.form.value.client_id.id};
    this.store.dispatch(new AdminStore.CreateCase(payload));
  }

  public deleteCase(id){
    const payload = id;
    this.store.dispatch(new AdminStore.DeleteCase(payload));
  }

  public updateCase(element){
    const payload = Object.assign(
      {id: element.id},
      this.form.value,
      {client_id: this.form.value.client_id.id});
    this.store.dispatch(new AdminStore.UpdateCase(payload));
  }

  public displayFn(client: IClient): string{
    return client && client.firstName ? `${client.firstName} ${client.lastName}` : '';
  }

  private _openDialog(): void {
    const dialogRef = this.dialog.open(this.template, {
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.form.reset();
      this._initializeForm();
    });
  }

  private _initializeForm(){
    this._subscription = this.store.select(AdminStore.loggedUser).subscribe(loggedUser => {
      this.form = this.formBuilder.group({
        client_id: new FormControl('', [Validators.required]),
        user_id: new FormControl(loggedUser.id, [Validators.required]),
        name: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        stage: new FormControl(CASE_STAGES.DISCOVERY, [Validators.required]),
        practice_area: new FormControl(PRACTICE_AREAS.INJURIES, [Validators.required]),
        billing_method: new FormControl(BILLING_METHODS.HOURLY, [Validators.required]),
      });
      this.form.controls['client_id'].valueChanges.pipe(
        debounceTime(300),
        tap(value => {
          if(!(value instanceof Object)){
            this.store.dispatch(new AdminStore.LoadCaseClient({name: value}))
          }
        })).subscribe();
    });
  }

  private _updateForm(element){
    this.form.controls['client_id'].setValue(element['client']);
    this.form.controls['name'].setValue(element['name']);
    this.form.controls['number'].setValue(element['number']);
    this.form.controls['description'].setValue(element['description']);
    this.form.controls['stage'].setValue(element['stage']);
    this.form.controls['practice_area'].setValue(element['practiceArea']);
    this.form.controls['billing_method'].setValue(element['billingMethod']);
  }

}
