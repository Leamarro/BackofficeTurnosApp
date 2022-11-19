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
      name: ['', Validators.required],
      platform: ['', Validators.required],
      technology: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getSheetDataById(this.id).subscribe((res: any) => {
        console.log(res[0]);
        this.data = res[0];
        this.updateSheetForm.get('name')?.setValue(this.data.name);
        this.updateSheetForm.get('platform')?.setValue(this.data.platform);
        this.updateSheetForm.get('technology')?.setValue(this.data.technology);
        this.updateSheetForm.get('link')?.setValue(this.data.link);
      });
    });
  }

  onSubmit() {
    const { value } = this.updateSheetForm;
    console.log('value', value);

    const name = this.updateSheetForm.value.name;
    const platform = this.updateSheetForm.value.platform;
    const technology = this.updateSheetForm.value.technology;
    const link = this.updateSheetForm.value.link;

    this.service
      .updateSheet(this.id, name, platform, technology, link)
      .subscribe({
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
