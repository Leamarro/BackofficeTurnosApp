import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sheet } from 'src/app/models/sheet.model';
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
      name: formBuilder.control(''),
      platform: formBuilder.control(''),
      technology: formBuilder.control(''),
      link: formBuilder.control(''),
    });
  }

  ngOnInit() {}

  public onSubmit() {
    console.log(this.googleSheetForm.value);

    const name = this.googleSheetForm.value.name;
    const platform = this.googleSheetForm.value.platform;
    const technology = this.googleSheetForm.value.technology;
    const link = this.googleSheetForm.value.link;

    this.service.createSheet(name, platform, technology, link).subscribe({
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
