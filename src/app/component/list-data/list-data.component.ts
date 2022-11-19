import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SheetService } from 'src/app/service/sheet.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
})
export class ListDataComponent implements OnInit {
  data: any = [];
  constructor(private service: SheetService, private router: Router) {}

  ngOnInit() {
    this.listData();
  }

  listData() {
    this.service.listSheet().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteSheet(index: number) {
    this.service.deleteSheet(index).subscribe(
      (res: any) => {
        console.log(res);
        this.listData();
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(index);
  }

  editSheet(id: any) {
    this.router.navigate([`/edit-data/${id}`]);
  }
}
