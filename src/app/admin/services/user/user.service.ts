import { Injectable } from '@angular/core';
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import gql from "graphql-tag";
import {BaseService} from "../base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(private graphql: GraphqlService) {
    super();

    this._entityName = 'user';
    this._entityListName = 'users';

    this._mutationCreateName = 'registerUser';
    this._mutationUpdateName = 'updateUser';
    this._mutationDeleteName = 'removeUser';
  }

  protected _initializeQM(){
    super._initializeQM();
    this._getEntityAllQuery = gql`
             {
              users{
                id
                name
                email
                rol
                title
              }
            }`;
    this._createMutation = gql`
          mutation registerUser(
            $name: String!,
            $email: String!,
            $rol: Int!
            $title: Int!
            $password: String!,
          ) {
            registerUser(input: {
              name: $name,
              email: $email,
              rol: $rol,
              title: $title
              password: $password,
            }) {
              user {
                id
                name
                email
                rol
                title
              }
              success
              errors
            }
          }`;
    this._deleteMutation = gql`
          mutation removeUser($id: ID!) {
            removeUser(input: {id: $id}) {
              user {
                id
              }
              success
              errors
            }
          }`;
    this._updateMutation = gql`
          mutation updateUser(
            $id: ID!
            $email: String!
            $name: String!
            $rol: Int!
            $title: Int!
          ) {
            updateUser(input: {
              id: $id
              email: $email
              name: $name
              rol: $rol
              title: $title
            }) {
              user {
                id
                name
                email
                rol
                title
              }
              success
              errors
            }
          }`;
  }

  get all(){
    return this.graphql.query(this._getEntityAllQuery)
      .pipe(this._extractQueryResponseData(this._entityListName));
  }

  public register(payload){
    const update = this._afterCreate();
    return this.graphql.mutate(this._createMutation, payload, update)
      .pipe(this._extractMutationResponseData(this._mutationCreateName, this._entityName));
  }

  public delete(id){
    const update = this._afterDelete();
    return this.graphql.mutate(this._deleteMutation,{id: id}, update)
      .pipe(this._extractMutationResponseData(this._mutationDeleteName, this._entityName));
  }

  public update(payload){
    return this.graphql.mutate(this._updateMutation,payload)
      .pipe(this._extractMutationResponseData(this._mutationUpdateName, this._entityName));
  }

}
