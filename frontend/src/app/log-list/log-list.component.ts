import { Component, OnInit, ViewChild } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { Logs } from '../models/logs';
import { UsersService } from '../services/users.service';
import { PipeData } from '../models/pipeData';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  public list: Logs;
  public pipeData: PipeData;

  public columnsToDisplay = ['date', 'user', 'endpoint', 'body'];
  public dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private logServ: LogsService,
    private userServ: UsersService
  ) {
    this.list = <Logs>{};
    this.pipeData = <PipeData>{};
  }

  ngOnInit(): void {
    this.initReadings();
  }
  
  async initReadings() {
    this.list = await this.logServ.getAll();
    this.pipeData = await this.userServ.getPipeData();
    this.dataSource = new MatTableDataSource(this.list.logs);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
