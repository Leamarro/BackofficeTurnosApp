import { Component, OnInit } from '@angular/core';
import { SheetService } from '../../service/sheet.service';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any = [];
  today: string = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD'); // Obtener la fecha de hoy en formato YYYY-MM-DD ajustado a Argentina
  selectedDate: string = this.today;
  searchName: string = '';

  constructor(private service: SheetService, private router: Router) {}

  ngOnInit() {
    this.listData();
  }

  listData() {
    this.service.listSheet().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.data = res.filter((item: any) =>
          item.fecha === this.selectedDate && item.nombre.toLowerCase().includes(this.searchName.toLowerCase())
        ); // Filtrar por la fecha seleccionada y el nombre
      } else {
        console.error("La respuesta del servicio no es un array");
      }
    }, (error) => {
      console.log(error);
    });
  }
  
  deleteSheet(id: any) {
    this.service.deleteSheet(id).subscribe(
      () => {
        this.listData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editSheet(id: any) {
    this.router.navigate([`/edit-data/${id}`]);
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.listData();
  }

  onNameChange(event: any) {
    this.searchName = event.target.value;
    this.listData();
  }
}
