import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private baseUrl = 'https://your-api-url.com/api'; // todo: Replace

  constructor(private http: HttpClient) { }

  // Method to get all developers
  getAllDevelopers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/developers`);
  }

  // Method to get all jobs
  getAllJobs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobs`);
  }

  // Method to send an email, mail, content
  sendRequest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-email`, data);
  }

}
