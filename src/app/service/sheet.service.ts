import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Sheet } from '../models/sheet.model';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor(private http: HttpClient) {}

  checkCredentials(usuario: string, contraseña: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.CONNECTION_LOGIN}`, {
      usuario,
      contraseña,
    });
  }

  createSheet(data: any): Observable<Sheet> {
    return this.http.post<Sheet>(`${environment.CONNECTION_URL}`, data);
  }

  listSheet(date?: string, name?: string): Observable<Sheet[]> {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<Sheet[]>(`${environment.CONNECTION_URL}`, { params });
  }

  deleteSheet(id: number): Observable<any> {
    return this.http.delete(`${environment.CONNECTION_URL}/${id}`);
  }

  getSheetDataById(id: number) {
    return this.http.get<any>(`${environment.CONNECTION_URL}/${id}`);
  }

  updateSheet(id: number, data: any): Observable<Sheet> {
    return this.http.put<Sheet>(`${environment.CONNECTION_URL}/${id}`, data);
  }

  isPastDate(date: string): boolean {
    const today = new Date();
    const selectedDate = new Date(date);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 
    return selectedDate < todayDate;
  }

  updateSheetState(id: number, state: number): Observable<any> {
    return this.http.patch(`${environment.CONNECTION_URL}/${id}`, { estado: state });
}


}
