import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {DocumentNode} from "graphql";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected _getEntityAllQuery: DocumentNode;

  protected _createMutation: DocumentNode;
  protected _updateMutation: DocumentNode;
  protected _deleteMutation: DocumentNode;

  protected _entityName: string;
  protected _entityListName: string;

  protected _mutationCreateName: string;
  protected _mutationUpdateName: string;
  protected _mutationDeleteName: string;

  constructor() {
    this._initializeQM()
  }

  /**
  *  Initialize Queries and Mutations
  */
  protected _initializeQM(){}

  protected _extractMutationResponseData(method: String, entity: String){
    return map(item => item['data'][method][entity])
  }

  protected _extractQueryResponseData(entity: String){
    return map(item => item['data'][entity])
  }

  protected _afterCreate(){
    return (proxy, response) => {
      const entity = response.data[this._mutationCreateName][this._entityName];
      const data = proxy.readQuery({query: this._getEntityAllQuery});
      const updatedData = new Object();
      updatedData[this._entityListName] = [...data[this._entityListName], entity];
      proxy.writeQuery({
        query: this._getEntityAllQuery,
        data:updatedData
      });
    };
  }

  protected _afterDelete(){
    return (proxy, response) => {
      const entity = response.data[this._mutationDeleteName][this._entityName];
      const data = proxy.readQuery({query: this._getEntityAllQuery});
      const updatedData = new Object();
      updatedData[this._entityListName] = [...data[this._entityListName].filter(item => item.id !== entity.id)];
      proxy.writeQuery({
        query: this._getEntityAllQuery,
        data:updatedData
      });
    };
  }

}
