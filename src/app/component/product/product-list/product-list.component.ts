import { PagedRequest } from './../../../interface/paged.model';
import { CategoryDataService } from './../../../srevice/category-data.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductDataService } from 'src/app/srevice/product-data.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'action'];

  dataSource: any[];
  length: number = null
  pageSize: number = 5
  pageIndex: number = 0
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  search: string = null

  /**
   * @param  {CategoryDataService} privateservice
   */
  constructor(private service: ProductDataService) { }

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.charge(this.pageIndex, this.pageSize);
  }

  /**
   * @param  {number=0} page
   * @param  {number=5} size
   */
  charge(page: number = 0, size: number = 5) {
    let pageRequest: PagedRequest = {
      page: page,
      limit: size
    }
    this.service.getPaged(pageRequest, this.search).subscribe((ret: any) => {
      this.dataSource = ret.data.product
      this.length = ret.data.product_aggregate.aggregate.totalCount
    });
  }

  /**
   * @param  {PageEvent} pageEvent
   */
  onPaginate(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.charge(this.pageIndex, this.pageSize);
  }

  /**
   * @param  {number} id
   */
  delete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.charge();
    })
  }
}
