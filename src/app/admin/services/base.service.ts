import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {DocumentNode} from "graphql";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected mutation: DocumentNode;
  protected query: DocumentNode;

  constructor() { }

  protected extractMutationResponseData(method: String, entity: String){
    return map(item => item['data'][method][entity])
  }

  protected extractQueryResponseData(entity: String){
    return map(item => item['data'][entity])
  }

}
