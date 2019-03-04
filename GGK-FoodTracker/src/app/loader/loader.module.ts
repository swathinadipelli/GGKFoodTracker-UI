import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,NgxSpinnerModule
  ],
  declarations: [LoaderComponent],
  exports:[LoaderComponent]
})
export class LoaderModule { }
