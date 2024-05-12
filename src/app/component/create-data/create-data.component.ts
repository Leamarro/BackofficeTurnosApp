import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SheetService } from 'src/app/service/sheet.service';

@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.css'],
})
export class CreateDataComponent implements OnInit {
  googleSheetForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SheetService,
    private router: Router
  ) {
    this.googleSheetForm = this.formBuilder.group({
      nombre: [''],
      telefono: [''],
      barbero: [''],
      servicio: [''],
      fecha: [''],
      horario: [''],
      precio: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.service.createSheet(this.googleSheetForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/list-data']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
