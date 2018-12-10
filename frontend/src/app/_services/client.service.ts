import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { env } from '../_helpers';
import { Client } from '../_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = env.apiBase + '/api/clients';

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(apiUrl).pipe(
            tap(_ => console.log('fetched Clients'))
        );
    }

    getClient(id: string): Observable<Client> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Client>(url).pipe(
            tap(_ => console.log(`fetched Client id=${id}`))
        );
    }

    addClient(client: Client): Observable<Client> {
        return this.http.post<Client>(apiUrl, client, httpOptions).pipe(
            tap(result => console.log(`added Client w/ id=${result._id}`))
        );
    }

    updateClient(id: string, client: Client): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, client, httpOptions).pipe(
            tap(_ => console.log(`updated Client id=${id}`))
        );
    }

    deleteClient(id: string): Observable<Client> {
        const url = `${apiUrl}/${id}`;

        return this.http.delete<Client>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted Client id=${id}`))
        );
    }
}
