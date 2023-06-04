import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesDetailComponent } from './classes-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from "../../../../shared/pipes/pipes.module";




@NgModule({
    declarations: [
        ClassesDetailComponent
    ],
    exports: [
        ClassesDetailComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        PipesModule
    ]
})
export class ClassesDetailModule { }
