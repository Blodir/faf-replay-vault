import { Directive, HostListener, ComponentFactoryResolver, Renderer2, Injector, ElementRef, ComponentRef, Input } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[fafTooltip]'
})
export class TooltipDirective {
  @Input() textContent;
  private tooltipCompInst: ComponentRef<TooltipComponent>;
  constructor(
    private el: ElementRef,
    private cfr: ComponentFactoryResolver,
    private renderer: Renderer2,
    private injector: Injector) {
      const compFac = this.cfr.resolveComponentFactory(TooltipComponent);
      this.tooltipCompInst = compFac.create(this.injector);
      this.tooltipCompInst.instance.textContent = this.textContent;
      const rootElement = this.el.nativeElement;
      this.renderer.appendChild(rootElement, this.tooltipCompInst.location.nativeElement);
    }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event) {
    this.renderer.setStyle(this.tooltipCompInst.location.nativeElement, 'display', 'block');
    this.tooltipCompInst.instance.textContent = this.textContent;
    this.tooltipCompInst.changeDetectorRef.detectChanges();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    this.renderer.setStyle(this.tooltipCompInst.location.nativeElement, 'display', 'none');
  }
}
