import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SheetService } from 'src/app/service/sheet.service';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css'],
})
export class EditDataComponent implements OnInit {
  updateSheetForm!: FormGroup;
  id!: number;
  data!: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: SheetService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.updateSheetForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      barbero: ['', Validators.required],
      servicio: ['', Validators.required],
      fecha: ['', Validators.required], // Agregar el control 'fecha' al formulario
      horario: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getSheetDataById(this.id).subscribe((res: any) => {
        console.log(res[0]);
        this.data = res[0];
        this.updateSheetForm.patchValue({
          nombre: this.data.nombre,
          telefono: this.data.telefono,
          barbero: this.data.barbero,
          servicio: this.data.servicio,
          fecha: this.data.fecha,
          horario: this.data.horario,
        });
      });
    });
  }

  onSubmit() {
    if (this.updateSheetForm.invalid) {
      return;
    }
  
    const { value } = this.updateSheetForm;
    console.log('value', value);
  
    this.service.updateSheet(this.id, value).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.router.navigate(['/list-data']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
