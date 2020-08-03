import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {USER_ROLES} from "../../models/admin.models";
import {Store} from "@ngrx/store";
import * as AdminStore from "../../store";
import {Subscription} from "rxjs";

@Directive({
  selector: '[isAllow]'
})
export class IsAllowDirective implements OnInit, OnDestroy{

  @Input('isAllow') roles: Array<USER_ROLES>;

  private _subscription: Subscription;

  constructor(private _store: Store<AdminStore.AdminState>, private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  ngOnInit(): void {
    this._subscription = this._store.select(AdminStore.loggedUser).subscribe(loggedUser => {
      if(loggedUser && this.roles.includes(loggedUser.rol)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
