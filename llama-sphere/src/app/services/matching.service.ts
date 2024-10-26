import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  private apiUrl = 'http://your-backend-api.com/api/matching-jobs';
  private faqUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any[]> {
    // const url = `${this.apiUrl}/developer/all-jobs`;
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

  getAllDevelopers(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/developers`);
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

  getMatchedJobs(data: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/match-jobs`, data);
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

  getMatchedCandidates(data: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/match-candidates`, data);
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

  sendFaqQuestion(user_question: string): Observable<any> {
    const url = `${this.faqUrl}/ask-question`;
    return this.http.post<any>(url, { user_question });
  }

  sendEmail(data: any): Observable<any> {
    // const url = `${this.faqUrl}/send-email`;
    // return this.http.post<any>(url, { data });
    return of('send email response');
  }

  getAcceptEmailTemplate(data: any): Observable<any> {
    // const url = `${this.faqUrl}/get-accept-email-template`;
    // return this.http.post<any>(url, { data });
    return of('Email text for accepting the candidate.');
  }

  getRejectEmailTemplate(data: any): Observable<any> {
    // const url = `${this.faqUrl}/get-reject-email-template`;
    // return this.http.post<any>(url, { data });
    return of('Email text for rejecting the candidate.');
  }
}