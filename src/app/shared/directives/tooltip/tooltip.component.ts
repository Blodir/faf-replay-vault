import { Component, OnDestroy } from "@angular/core";

@Component({
    selector: 'faf-tooltip',
    template: `
{{ textContent }}
`,
styleUrls: ['tooltip.component.scss']
})
export class TooltipComponent {
    textContent: string;
}