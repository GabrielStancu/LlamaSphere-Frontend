import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'https://localhost:7037/api';

  constructor(private http: HttpClient) { }

  uploadCv(file: File): Observable<any> {
    const url = `${this.apiUrl}/Cvs/upload`;
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(url, formData);
  }

  uploadJob(file: File): Observable<any> {
    const url = `${this.apiUrl}/Jobs/upload`;
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(url, formData);
  }
}
