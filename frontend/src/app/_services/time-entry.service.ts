import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { env } from '../_helpers';
import { TimeEntry } from '../_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = env.apiBase + '/api/time-entries';

@Injectable({ providedIn: 'root' })
export class TimeEntryService {
    constructor(private http: HttpClient) { }

    getTimeEntries(): Observable<TimeEntry[]> {
        const url = `${apiUrl}?include=client`;
        return this.http.get<TimeEntry[]>(url).pipe(
            tap(_ => console.log('fetched TimeEntries'))
        );
    }

    getTimeEntry(id: string): Observable<TimeEntry> {
        const url = `${apiUrl}/${id}?include=all`;
        return this.http.get<TimeEntry>(url).pipe(
            tap(_ => console.log(`fetched TimeEntry id=${id}`))
        );
    }

    addTimeEntry(entry: TimeEntry): Observable<TimeEntry> {
        return this.http.post<TimeEntry>(apiUrl, entry, httpOptions).pipe(
            tap(result => console.log(`added TimeEntry w/ id=${result._id}`))
        );
    }

    updateTimeEntry(id: string, entry: TimeEntry): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, entry, httpOptions).pipe(
            tap(_ => console.log(`updated TimeEntry id=${id}`))
        );
    }

    deleteTimeEntry(id: string): Observable<TimeEntry> {
        const url = `${apiUrl}/${id}`;
        return this.http.delete<TimeEntry>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted TimeEntry id=${id}`))
        );
    }

    pauseTimeEntry(id: string, date?: Date): Observable<any> {
        const url = `${apiUrl}/${id}/pause`;
        return this.http.post(url, {paused_at: date}, httpOptions).pipe(
            tap(_ => console.log(`paused TimeEntry id=${id}`))
        );
    }

    resumeTimeEntry(id: string, date?: Date): Observable<any> {
        const url = `${apiUrl}/${id}/resume`;
        return this.http.post(url, {resumed_at: date}, httpOptions).pipe(
            tap(_ => console.log(`resumed TimeEntry id=${id}`))
        );
    }

    stopTimeEntry(id: string, date?: Date): Observable<any> {
        const url = `${apiUrl}/${id}/stop`;
        return this.http.post(url, {ended_at: date}, httpOptions).pipe(
            tap(_ => console.log(`stopped TimeEntry id=${id}`))
        );
    }

    lockTimeEntry(id: string, date?: Date): Observable<any> {
        const url = `${apiUrl}/${id}/lock`;
        return this.http.post(url, {locked_at: date}, httpOptions).pipe(
            tap(_ => console.log(`locked TimeEntry id=${id}`))
        );
    }
}
