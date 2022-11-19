import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sheet } from '../models/sheet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor(private http: HttpClient) {}

  createSheet(
    name: string,
    platform: string,
    technology: string,
    link: string
  ): Observable<Sheet> {
    return this.http.post<Sheet>(`${environment.CONNECTION_URL}`, {
      name,
      platform,
      technology,
      link,
    });
  }

  listSheet() {
    return this.http.get(`${environment.CONNECTION_URL}`);
  }

  deleteSheet(id: number) {
    return this.http.delete(`${environment.CONNECTION_URL}/${id}`);
  }

  getSheetDataById(id: number) {
    return this.http.get(`${environment.CONNECTION_URL}/${id}`);
  }

  updateSheet(
    id: number,
    name: string,
    platform: string,
    technology: string,
    link: string
  ): Observable<Sheet> {
    return this.http.put<Sheet>(`${environment.CONNECTION_URL}/${id}`, {
      name,
      platform,
      technology,
      link,
    });
  }
}
