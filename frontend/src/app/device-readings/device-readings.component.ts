import { Component, OnInit, ViewChild } from '@angular/core';
import { ReadingsService } from '../services/readings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Readings } from '../models/readings';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-device-readings',
  templateUrl: './device-readings.component.html',
  styleUrls: ['./device-readings.component.css']
})
export class DeviceReadingsComponent implements OnInit {

  public list: Readings;
  public columnsToDisplay = ['date', 'val'];
  public tag: string;
  public dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rServ: ReadingsService) {
      this.tag = this.route.snapshot.paramMap.get('tag');
    }


  ngOnInit(): void {
    this.initReadings();
  }
  
  async initReadings() {
    let tag = this.route.snapshot.paramMap.get('tag');
    this.list = await this.rServ.getYearReadings(tag);
    this.dataSource = new MatTableDataSource(this.list.readings);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  back() {
    this.router.navigate(['devices']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
