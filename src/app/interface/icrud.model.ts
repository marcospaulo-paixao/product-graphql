import { Observable } from 'rxjs';

export interface ICRUD {

    /**
     * @param  {any} object
     * @returns Observable
     */
    post(object: any): Observable<any>;

    /**
     * @returns Observable
     */
    get(): Observable<any>;

    /**
     * @param  {number} id
     * @returns Observable
     */
    getById(id: number): Observable<any>;

    /**
     * @param  {any} request
     * @param  {string} search
     * @returns Observable
     */
    getPaged(request: any, search: string): Observable<any>;
    /**
     * @param  {any} object
     * @returns Observable
     */
    update(object: any): Observable<any>;

    /**
     * @param  {number} id
     * @returns Observable
     */
    delete(id: number): Observable<any>;
}