import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Observable} from "rxjs";
import {ApolloQueryResult} from "apollo-client";
import {FetchResult} from "apollo-link";


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  public query(query, variables = {}):Observable<ApolloQueryResult<unknown>> {
    return this.apollo
      .watchQuery({
        query: query,
        variables: variables
      }).valueChanges
  }

  public mutate(mutation, variables = {}):Observable<FetchResult<unknown>> {
    return this.apollo.mutate({
      mutation: mutation,
      variables: variables
    })
  }

  public clearStore(){
    this.apollo.getClient().clearStore();
  }
}
