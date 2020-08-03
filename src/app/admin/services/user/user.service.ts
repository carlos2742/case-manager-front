import { Injectable } from '@angular/core';
import {GraphqlService} from "../../../shared/services/graphql/graphql.service";
import gql from "graphql-tag";
import {map} from "rxjs/operators";
import {DocumentNode} from "graphql";
import {BaseService} from "../base.service";

enum ENTITY {
  USER = 'user',
  USERS = 'users',
}

enum MUTATION{
  REGISTER_USER = 'registerUser',
  UPDATE_USER = 'updateUser',
  DELETE_USER = 'removeUser'
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(private graphql: GraphqlService) {
    super();
  }

  get all(){
    this.query = gql`
          {
            users{
              id
              name
              email
              rol
            }
          }`;
    return this.graphql.query(this.query).pipe(this.extractQueryResponseData(ENTITY.USERS));
  }

  public register(payload){
    this.mutation = gql`
          mutation registerUser(
            $name: String!,
            $email: String!,
            $rol: Int!
            $password: String!,
          ) {
            registerUser(input: {
              name: $name,
              email: $email,
              rol: $rol
              password: $password,
            }) {
              user {
                id
                name
                email
                rol
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation,payload).pipe(this.extractMutationResponseData(MUTATION.REGISTER_USER, ENTITY.USER));
  }

  public delete(id){
    this.mutation = gql`
          mutation removeUser($id: ID!) {
            removeUser(input: {id: $id}) {
              user {
                id
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation,{id: id}).pipe(this.extractMutationResponseData(MUTATION.DELETE_USER, ENTITY.USER));
  }

  public update(payload){
    this.mutation = gql`
          mutation updateUser(
            $id: ID!
            $email: String!
            $name: String!
            $rol: Int!
          ) {
            updateUser(input: {
              id: $id
              email: $email
              name: $name
              rol: $rol
            }) {
              user {
                id
                name
                email
                rol
              }
              success
              errors
            }
          }`;
    return this.graphql.mutate(this.mutation,payload).pipe(this.extractMutationResponseData(MUTATION.UPDATE_USER, ENTITY.USER));
  }

}
