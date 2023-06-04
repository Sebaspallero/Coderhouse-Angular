import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})

export class FontSizeDirective implements OnChanges{

  @Input() appFontSize:number = 1;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.applyFontSize()
   }

   ngOnChanges(changes: SimpleChanges): void{
    this.applyFontSize()
   }

   applyFontSize():void{
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', `${this.appFontSize}em`)
   }
}
