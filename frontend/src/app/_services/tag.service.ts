import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { env } from '../_helpers';
import { Tag } from '../_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = env.apiBase + '/api/tags';

@Injectable({ providedIn: 'root' })
export class TagService {
    constructor(private http: HttpClient) { }

    getTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(apiUrl).pipe(
            tap(_ => console.log('fetched Tags'))
        );
    }

    getTag(id: string): Observable<Tag> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Tag>(url).pipe(
            tap(_ => console.log(`fetched Tag id=${id}`))
        );
    }

    addTag(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(apiUrl, tag, httpOptions).pipe(
            tap(result => console.log(`added Tag w/ id=${result._id}`))
        );
    }

    updateTag(id: string, tag: Tag): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, tag, httpOptions).pipe(
            tap(_ => console.log(`updated Tag id=${id}`))
        );
    }

    deleteTag(id: string): Observable<Tag> {
        const url = `${apiUrl}/${id}`;

        return this.http.delete<Tag>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted Tag id=${id}`))
        );
    }
}
