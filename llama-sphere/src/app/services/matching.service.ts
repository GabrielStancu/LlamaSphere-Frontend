import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  private apiUrl = 'http://your-backend-api.com/api/matching-jobs';

  constructor(private http: HttpClient) { }

  getMatchingJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  sendFaqQuestion(question: string): Observable<any> {
    const url = `${this.apiUrl}/faq`;
    return this.http.post<any>(url, { question });
  }
}