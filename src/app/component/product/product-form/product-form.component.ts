import { ProductDataService } from './../../../srevice/product-data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDataService } from 'src/app/srevice/category-data.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  productForm: FormGroup = new FormGroup({
    category: new FormControl({ cat_id: null, cat_name: null }, [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required,   
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    price: new FormControl('', [
      Validators.required,
    ])
  });

  product: any = { pro_id: null }
  categoryList: any[] = []


  /**
   * @param  {CategoryDataService} publicserviceCategory
   * @param  {ProductDataService} privateservice
   * @param  {Router} privaterouter
   * @param  {ActivatedRoute} privateroute
   */
  constructor(
    public serviceCategory: CategoryDataService,
    private service: ProductDataService,
    private router: Router,
    private route: ActivatedRoute) { }

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.categoryChange();
    this.route.params.subscribe(data => {
      if (data.id != undefined) {
        this.service.getById(data.id).subscribe(ret => {
          this.product.pro_id = ret.data.product[0].pro_id
          this.productForm.get('category').setValue(ret.data.product[0].category)
          this.productForm.get('name').setValue(ret.data.product[0].pro_name)
          this.productForm.get('price').setValue(ret.data.product[0].pro_price)
        })
      }
    })
  }

  /**
   * @param  {any} o1
   * @param  {any} o2
   */
  compareObjects(o1: any, o2: any) {
    if (o1.cat_id == o2.cat_id)
      return true;
    else return false
  }

  /**
   * @returns void
   */
  categoryChange(): void {
    this.serviceCategory.get().subscribe(ret => {
      this.categoryList = ret.data.category
    })
  }
  /**
   * @returns void
   */
  onSubmit(): void {
    if (this.productForm.valid) {
      (this.product.pro_id) ?
        this.service.update({ id: this.product.pro_id, name: this.productForm.getRawValue().name, price: this.productForm.getRawValue().price, category: { id: this.productForm.getRawValue().category.cat_id } }).subscribe(data => {
          this.router.navigate(['/product-list'])
        }) :
        this.service.post({ name: this.productForm.getRawValue().name, price: this.productForm.getRawValue().price, category: { id: this.productForm.getRawValue().category.cat_id } }).subscribe(data => {
          this.router.navigate(['/product-list'])
        });
    } else {
      this.validateAllFields(this.productForm)
    }
  }

  /**
 * @param  {FormGroup} formGroup
 */
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }


  /**
  * @param  {string} formControlName
  * @returns boolean
  */
  isRequiredFieldValid(formControlName: string): boolean {
    const validator = this.productForm.get(formControlName).validator(this.productForm.get(formControlName));
    return ((validator != null && validator.required != undefined) ? true : false);
  }

  /**
   * @param  {string} formControlName
   * @returns boolean
   */
  isMinLengthFieldValid(formControlName: string): boolean {
    const validator = this.productForm.get(formControlName).validator(this.productForm.get(formControlName));
    return ((validator != null && validator.minlength != undefined) ? true : false);
  }

  /**
   * @param  {string} formControlName
   * @returns boolean
   */
  isMaxLengthFieldValid(formControlName: string): boolean {
    const validator = this.productForm.get(formControlName).validator(this.productForm.get(formControlName));
    return ((validator != null && validator.maxlength != undefined) ? true : false);
  }
}