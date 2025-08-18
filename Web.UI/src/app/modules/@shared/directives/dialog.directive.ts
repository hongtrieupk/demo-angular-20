import {
    afterEveryRender,
    contentChild,
    Directive,
    effect,
    ElementRef,
    inject,
    model,
    Renderer2,
    signal,
    ViewContainerRef,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Directive({
    selector: '[upDialog]',
})
export class DialogDirective {
    pDialog = inject(Dialog);
    er: ElementRef<HTMLElement> = inject(ElementRef);
    render = inject(Renderer2);
    vcr = inject(ViewContainerRef);

    dialogFooterRef = contentChild<ElementRef<HTMLElement>>('dialogFooter');
    dialogBodyRef = contentChild<ElementRef<HTMLElement>>('dialogBody');

    headerHeight = signal<number>(0);
    footerHeight = signal<number>(0);
    loading = model(false);

    constructor() {
        const renderer = this.render;
        afterEveryRender(() => {
            // calculate the dialog header height and footer height
            var header =
                this.er.nativeElement.querySelector('.p-dialog-header');
            this.headerHeight.set(header?.clientHeight ?? 0);
            this.footerHeight.set(
                this.dialogFooterRef()?.nativeElement.clientHeight ?? 0,
            );
        });

        effect(() => {
            // effect to add scroll to dialog body
            const headerHeight = this.headerHeight();
            const footerHeight = this.footerHeight();
            const dialogBody = this.dialogBodyRef();
        });
    }
}
