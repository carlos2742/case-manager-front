import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {Observable} from "rxjs";
import {ApolloClient, ApolloQueryResult} from "apollo-client";
import {FetchResult} from "apollo-link";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-angular-link-http';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo, private httpLink: HttpLink) { }

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
