import { PagedRequest } from './../interface/paged.model';
import {
  CATEGORY_FIND_ALL,
  CATEGORY_FIND_PAGED,
  CATEGORY_FIND_BY_NAME_PAGED,
  CATEGORY_FIND_BY_ID,
  CATEGORY_SAVE,
  CATEGORY_UPDATE,
  CATEGORY_DELETE
} from './../gql/category.operations.gql';
import { ICRUD } from './../interface/icrud.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService implements ICRUD {

  constructor(private apollo: Apollo) { }

  /**
   * @param  {any} object
   * @returns Observable
   */
  post(object: any): Observable<any> {
    return this.apollo.mutate({
      mutation: CATEGORY_SAVE,
      variables: { "name": `${object.name}` }
    })
  }

  /**
   * @returns Observable
   */
  get(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: CATEGORY_FIND_ALL
    }).valueChanges
  }

  /**
   * @param  {number} id
   * @returns Observable
   */
  getById(id: number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: CATEGORY_FIND_BY_ID,
      variables: { "id": `${id}` }
    }).valueChanges
  }

  /**
   * @param  {any} request
   * @param  {string} search
   * @returns Observable
   */
  getPaged(request: PagedRequest, search: string = null): Observable<any> {
    if (search) {
      return this.apollo.watchQuery<any>({
        query: CATEGORY_FIND_BY_NAME_PAGED,
        variables: {
          "limit": request.limit,
          "offset": ((request.limit * (request.page + 1)) - request.limit),
          "name": `%${search}%`
        }
      }).valueChanges
    }
    return this.apollo.watchQuery<any>({
      query: CATEGORY_FIND_PAGED,
      variables: {
        "limit": request.limit,
        "offset": ((request.limit * (request.page + 1)) - request.limit)
      }
    }).valueChanges
  }

  /**
   * @param  {any} object
   * @returns Observable
   */
  update(object: any): Observable<any> {
    return this.apollo.mutate({
      mutation: CATEGORY_UPDATE,
      variables: {
        "id": `${object.id}`,
        "name": `${object.name}`
      }
    })
  }

  /**
   * @param  {number} id
   * @returns Observable
   */
  delete(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: CATEGORY_DELETE,
      variables: { "id": `${id}` }
    })
  }
}

