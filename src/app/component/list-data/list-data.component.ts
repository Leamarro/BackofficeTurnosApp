import { Component, OnInit } from '@angular/core';
import { SheetService } from '../../service/sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit {
  data: any = [];
  today: string = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato ISO yyyy-mm-dd
  selectedDate: string = ''; // Inicialmente sin filtro de fecha
  searchName: string = '';

  constructor(private service: SheetService, private router: Router) {}

  ngOnInit() {
    this.listData();
  }

  listData() {
    this.service.listSheet().subscribe((res: any) => {
      if (Array.isArray(res)) {
        if (this.selectedDate) {
          // Filtrar por la fecha seleccionada y el nombre
          this.data = res.filter((item: any) =>
            item.fecha === this.selectedDate && item.nombre.toLowerCase().includes(this.searchName.toLowerCase())
          );
        } else {
          this.data = res.filter((item: any) =>
            item.nombre.toLowerCase().includes(this.searchName.toLowerCase())
          );
        }
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

  toggleState(id: any, currentState: number) {
    const newState = currentState === 1 ? 2 : 1; // Cambiar el estado
    this.service.updateSheetState(id, newState).subscribe(() => {
      // Actualizar la lista después de cambiar el estado
      this.listData();
    }, (error) => {
      console.log(error);
    });
  }
}
