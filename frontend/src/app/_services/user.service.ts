import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { env } from '../_helpers';
import { User } from '../_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = env.apiBase + '/api/users';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(apiUrl).pipe(
            tap(_ => console.log('fetched Users'))
        );
    }

    getUser(id: string): Observable<User> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            tap(_ => console.log(`fetched User id=${id}`))
        );
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${apiUrl}/sign-up`, user, httpOptions).pipe(
            tap(result => console.log(`added User w/ id=${result._id}`))
        );
    }

    updateUser(id: string, user: User): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, user, httpOptions).pipe(
            tap(_ => console.log(`updated User id=${id}`))
        );
    }

    deleteUser(id: string): Observable<User> {
        const url = `${apiUrl}/${id}`;

        return this.http.delete<User>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted User id=${id}`))
        );
    }
}
