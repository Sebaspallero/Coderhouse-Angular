import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { CapitalizePipe } from './capitalize.pipe';



@NgModule({
  declarations: [
    FullNamePipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullNamePipe,
    CapitalizePipe
  ]
})
export class PipesModule { }
