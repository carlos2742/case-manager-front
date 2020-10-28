import { Injectable } from '@angular/core';
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import gql from "graphql-tag";
import {BaseService} from "../base.service";
import {DocumentNode} from "graphql";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService{

  constructor(private graphql: GraphqlService) {
    super();

    this._entityName = 'client';
    this._entityListName = 'clients';

    this._mutationCreateName = 'createClient';
    this._mutationUpdateName = 'updateClient';
    this._mutationDeleteName = 'removeClient';
  }

  protected _initializeQM(){
    super._initializeQM();
    this._createMutation = gql`
          mutation createClient(
            $email: String!
            $first_name: String!
            $last_name: String!
            $birthday: String!
            $address: String!
            $ssn: String!
            $arn: String!
            $phone_number: String!
            $emergency_contact: String!
          ){
            createClient(input:{
              email: $email
              firstName: $first_name
              lastName: $last_name
              birthday: $birthday
              address: $address
              ssn: $ssn
              arn: $arn
              phoneNumber: $phone_number
              emergencyContact: $emergency_contact
            }){
            client{
                id
                firstName
                lastName
                email
                birthday
                address
                phoneNumber
                emergencyContact
                ssn
                arn
              }
             success
             errors
            }
          }`;
    this._deleteMutation = gql`
          mutation removeClient($id: ID!) {
            removeClient(input: {id: $id}) {
              client {
                id
              }
              success
              errors
            }
          }`;
    this._updateMutation = gql`
          mutation updateClient(
            $id: ID!
            $email: String!
            $first_name: String!
            $last_name: String!
            $birthday: String!
            $address: String!
            $ssn: String!
            $arn: String!
            $phone_number: String!
            $emergency_contact: String!
          ) {
            updateClient(input: {
              id: $id
              email: $email
              firstName: $first_name
              lastName: $last_name
              birthday: $birthday
              address: $address
              ssn: $ssn
              arn: $arn
              phoneNumber: $phone_number
              emergencyContact: $emergency_contact
            }) {
              client {
                id
                firstName
                lastName
                email
                birthday
                address
                phoneNumber
                emergencyContact
                ssn
                arn
              }
              success
              errors
            }
          }`;
  }

  get list(){
    const fields: DocumentNode = gql`
          fragment fields on Client{
              firstName
              lastName
              email
              birthday
              address
              phoneNumber
              emergencyContact
              ssn
              arn
          }`;
    return this._search(fields);
  }

  public find(filter = {}){
    const fields: DocumentNode = gql`
          fragment fields on Client{
              firstName
              lastName
          }`;
    return this._search(fields, filter);
  }


  public create(payload){
    const update = this._afterCreate();
    return this.graphql.mutate(this._createMutation,payload, update)
      .pipe(this._extractMutationResponseData(this._mutationCreateName, this._entityName));
  }

  public delete(id){
    const update = this._afterDelete();
    return this.graphql.mutate(this._deleteMutation,{id: id}, update)
      .pipe(this._extractMutationResponseData(this._mutationDeleteName, this._entityName));
  }

  public update(payload){
    return this.graphql.mutate(this._updateMutation,payload).pipe(this._extractMutationResponseData(this._mutationUpdateName, this._entityName));
  }

  private _search(fields: DocumentNode = gql``, payload = {}){
    this._getEntityAllQuery = gql`
          query getClients($name: String){
            clients(name: $name){
              id
              ...fields
            }
          }
          ${fields}`;
    return this.graphql.query(this._getEntityAllQuery, payload).pipe(this._extractQueryResponseData(this._entityListName));
  }

}
