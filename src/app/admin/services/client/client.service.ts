import { Injectable } from '@angular/core';
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import gql from "graphql-tag";
import {BaseService} from "../base.service";

enum ENTITY{
  CLIENT = 'client',
  CLIENTS = 'clients'
}

enum MUTATION{
  CREATE_CLIENT = 'createClient',
  UPDATE_CLIENT = 'updateClient',
  DELETE_CLIENT = 'removeClient'
}

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService{

  constructor(protected graphql: GraphqlService) {
    super();
  }

  get all(){
    this.query = gql`
          {
            clients{
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
          }`;
    return this.graphql.query(this.query).pipe(this.extractQueryResponseData(ENTITY.CLIENTS));
  }

  public create(payload){
    this.mutation = gql`
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
            }
          }`;
    return this.graphql.mutate(this.mutation,payload).pipe(this.extractMutationResponseData(MUTATION.CREATE_CLIENT, ENTITY.CLIENT));
  }

  public delete(id){
    this.mutation = gql`
          mutation removeClient($id: ID!) {
            removeClient(input: {id: $id}) {
              client {
                id
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation,{id: id}).pipe(this.extractMutationResponseData(MUTATION.DELETE_CLIENT, ENTITY.CLIENT));
  }

  public update(payload){
    this.mutation = gql`
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
    return this.graphql.mutate(this.mutation,payload).pipe(this.extractMutationResponseData(MUTATION.UPDATE_CLIENT, ENTITY.CLIENT));
  }

}
