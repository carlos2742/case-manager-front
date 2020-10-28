import { Injectable } from '@angular/core';
import {BaseService} from "../base.service";
import gql from "graphql-tag";
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import {DocumentNode} from "graphql";
import {ICase} from "../../models/admin.models";

@Injectable({
  providedIn: 'root'
})
export class CaseService extends BaseService{

  constructor(private graphql: GraphqlService) {
    super();

    this._entityName = 'case';
    this._entityListName = 'cases';

    this._mutationCreateName = 'createCase';
    this._mutationUpdateName = 'updateCase';
    this._mutationDeleteName = 'removeCase';
  }

  protected _initializeQM(){
    super._initializeQM();
    const clientFields = gql`
          fragment fields on Client{
              id
              firstName
              lastName
          }`;
    this._getEntityAllQuery = gql`
          {
            cases{
              id
              name
              number
              description
              stage
              practiceArea
              billingMethod
              createdAt
              client{
                ...fields
              }
              user{
                id
                name
              }
            }
          }
          ${clientFields}`;
    this._createMutation = gql`
          mutation createCase(
            $client_id: ID!
            $user_id: ID!
            $name: String!
            $number: String!
            $description: String!
            $stage: Int!
            $practice_area: Int!
            $billing_method: Int!
          ){
            createCase(input:{
              clientId: $client_id
              userId: $user_id
              name: $name
              number: $number
              description: $description
              stage: $stage
              practiceArea: $practice_area
              billingMethod: $billing_method
            }){
              case{
                id
                name
                number
                description
                stage
                practiceArea
                billingMethod
                createdAt
                client{
                  ...fields
                }
                user{
                  id
                  name
                }
              }
              success
              errors
            }
          }${clientFields}`;
    this._deleteMutation = gql`
          mutation removeCase($id: ID!) {
            removeCase(input: {id: $id}) {
              case {
                id
              }
              success
              errors
            }
          }`;
    this._updateMutation = gql`
          mutation updateCase(
            $id: ID!
            $client_id: ID!
            $name: String!
            $number: String!
            $description: String!
            $stage: Int!
            $practice_area: Int!
            $billing_method: Int!
          ) {
            updateCase(input: {
              id: $id
              clientId: $client_id
              name: $name
              number: $number
              description: $description
              stage: $stage
              practiceArea: $practice_area
              billingMethod: $billing_method
            }) {
              case{
                id
                name
                number
                description
                stage
                practiceArea
                billingMethod
                createdAt
                client{
                  ...fields
                }
                user{
                  id
                  name
                }
              }
              success
              errors
            }
          }${clientFields}`;
  }

  get all(){
    return this.graphql.query(this._getEntityAllQuery)
      .pipe(this._extractQueryResponseData(this._entityListName));
  }

  public create(payload){
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
