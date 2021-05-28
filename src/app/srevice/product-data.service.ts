import { PagedRequest } from './../interface/paged.model';
import {
  PRODUCT_FIND_ALL,
  PRODUCT_FIND_PAGED,
  PRODUCT_FIND_BY_NAME_PAGED,
  PRODUCT_FIND_BY_ID,
  PRODUCT_SAVE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE
} from './../gql/product.operations.gql';
import { ICRUD } from './../interface/icrud.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService implements ICRUD {

  constructor(private apollo: Apollo) { }

  /**
   * @param  {any} object
   * @returns Observable
   */
  post(object: any): Observable<any> {
    return this.apollo.mutate({
      mutation: PRODUCT_SAVE,
      variables: {
        "pro_name": `${object.name}`,
        "pro_price": `${object.price}`,
        "cat_id": object.category.id,
      }
    })
  }

  /**
   * @returns Observable
   */
  get(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: PRODUCT_FIND_ALL
    }).valueChanges
  }

  /**
   * @param  {number} id
   * @returns Observable
   */
  getById(id: number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: PRODUCT_FIND_BY_ID,
      variables: { "id": `${id}` }
    }).valueChanges
  }

  /**
   * @param  {any} request
   * @param  {string} search
   * @returns Observable
   */
  getPaged(request: PagedRequest, search: string): Observable<any> {
    if (search) {
      return this.apollo.watchQuery<any>({
        query: PRODUCT_FIND_BY_NAME_PAGED,
        variables: {
          "limit": request.limit,
          "offset": ((request.limit * (request.page + 1)) - request.limit),
          "name": `%${search}%`
        }
      }).valueChanges
    }
    return this.apollo.watchQuery<any>({
      query: PRODUCT_FIND_PAGED,
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
      mutation: PRODUCT_UPDATE,
      variables: {
        "pro_id": object.id,
        "pro_name": `${object.name}`,
        "pro_price": `${object.price}`,
        "cat_id": object.category.id,
      }
    })
  }

  /**
   * @param  {number} id
   * @returns Observable
   */
  delete(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: PRODUCT_DELETE,
      variables: { "pro_id": `${id}` }
    })
  }
}
