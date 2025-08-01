import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComparisonComponent } from './profile-comparison.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ProfileComparisonComponent
  ],
  exports: [
    ProfileComparisonComponent
  ]
})
export class ProfileComparisonModule { }
