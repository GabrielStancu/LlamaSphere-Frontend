import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  private apiUrl = 'http://your-backend-api.com/api/matching-jobs';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any[]> {
    // const url = `${this.apiUrl}/developer/matching-jobs`;
    // return this.http.get<any[]>(url);
    // Hardcoded job data
    const jobs = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        score: 95,
        explanation: 'Matched skills: Java, Angular; Industry experience: Banking'
      },
      {
        id: '2',
        title: 'Full Stack Developer',
        score: 88,
        explanation: 'Matched skills: Node.js, React; Industry experience: Healthcare'
      },
      {
        id: '3',
        title: 'Backend Developer',
        score: 80,
        explanation: 'Matched skills: Python, Django; Industry experience: E-commerce'
      }
    ];

    // Return the jobs as an Observable
    return of(jobs);
  }

  getMatchedJobs() {
    // const url = `${this.apiUrl}/developer/matching-jobs`;
    // return this.http.get<any[]>(url);
    // Hardcoded job data
    const jobs = [
      {
        id: '1',
        title: 'Senior Software Engineer1',
        score: 95,
        explanation: 'Matched skills: Java, Angular; Industry experience: Banking'
      },
      {
        id: '2',
        title: 'Full Stack Developer1',
        score: 88,
        explanation: 'Matched skills: Node.js, React; Industry experience: Healthcare'
      },
      {
        id: '3',
        title: 'Backend Developer1',
        score: 80,
        explanation: 'Matched skills: Python, Django; Industry experience: E-commerce'
      }
    ];

    // Return the jobs as an Observable
    return of(jobs);
  }

  getMatchedCandidates(selectedJob: string) {
    const candidates = [
      {
        name: 'Vulsan Bianca',
        score: 95,
        explanation: 'Matched skills: Java, Angular; Industry experience: Banking'
      },
      {
        name: 'Muscalagiu Anca',
        score: 88,
        explanation: 'Matched skills: Node.js, React; Industry experience: Healthcare'
      },
      {
        name: 'Toma Maria',
        score: 80,
        explanation: 'Matched skills: Python, Django; Industry experience: E-commerce'
      }
    ];

    return of(candidates);
  }

  sendFaqQuestion(question: string): Observable<any> {
    const url = `${this.apiUrl}/faq`;
    return this.http.post<any>(url, { question });
  }
}