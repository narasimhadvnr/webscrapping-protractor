import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <p>
            <button kendoButton
                (click)="onClick()"
                (focus)="onFocus()"
                (blur)="onBlur()">
                My Button
            </button>
        </p>
        <event-log title="Event log" [events]="events"></event-log>
    `
})

export class AppComponent {
    public events: string[] = [];

    public onClick(): void {
        this.log("click");
    }

    public onFocus(): void {
        this.log("focus");
    }

    public onBlur(): void {
        this.log("blur");
    }

    private log(event: string, arg: any): void {
        this.events.push(`${event}`);
    }
}