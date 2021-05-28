import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDataService } from 'src/app/srevice/category-data.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ])
  });
  category: any = { cat_id: null }

  /**
   */
  constructor(
    private service: CategoryDataService,
    private router: Router,
    private route: ActivatedRoute) { }

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (data.id != undefined) {
        this.service.getById(data.id).subscribe(ret => {
          this.category.cat_id = ret.data.category[0].cat_id
          this.categoryForm.get('name').setValue(ret.data.category[0].cat_name)
        })
      }
    })
  }

  /**
   * @returns void
   */
  onSubmit(): void {
    if (this.categoryForm.valid) {
      (this.category.cat_id) ?
        this.service.update({ id: this.category.cat_id, name: this.categoryForm.getRawValue().name }).subscribe(data => {
          this.router.navigate(['/category-list'])
        }) :
        this.service.post({ name: this.categoryForm.getRawValue().name }).subscribe(data => {
          this.router.navigate(['/category-list'])
        });
    } else {
      this.validateAllFields(this.categoryForm)
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
    const validator = this.categoryForm.get(formControlName).validator(this.categoryForm.get(formControlName));
    return ((validator != null && validator.required != undefined) ? true : false);
  }

  /**
   * @param  {string} formControlName
   * @returns boolean
   */
  isMinLengthFieldValid(formControlName: string): boolean {
    const validator = this.categoryForm.get(formControlName).validator(this.categoryForm.get(formControlName));
    return ((validator != null && validator.minlength != undefined) ? true : false);
  }

  /**
   * @param  {string} formControlName
   * @returns boolean
   */
  isMaxLengthFieldValid(formControlName: string): boolean {
    const validator = this.categoryForm.get(formControlName).validator(this.categoryForm.get(formControlName));
    return ((validator != null && validator.maxlength != undefined) ? true : false);
  }
}
