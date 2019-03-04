import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderVisible = false;

  constructor(private spinner: NgxSpinnerService) { }
  public showLoader() {
    if (!this.loaderVisible) {
      this.loaderVisible = true;
      this.spinner.show();
    }
  }
  public hideLoader() {
    if (this.loaderVisible) {
      this.loaderVisible = false;
      this.spinner.hide();
    }
  }
}
