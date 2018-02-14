import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {
    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent> event;
        
        if (((e.keyCode < 47 && e.keyCode !== 8 && e.keyCode !== 9) || e.keyCode > 57) && (e.keyCode < 95 || e.keyCode > 105)) {
            e.preventDefault();
        } else {
            return;
        }
    }
}