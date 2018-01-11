app.component.ts
ng.module.ts
main.ts
import {
    AfterViewInit,
    Component,
    ViewChild
} from '@angular/core';

import {
    GridComponent,
    GridDataResult,
    PageChangeEvent
} from '@progress/kendo-angular-grid';

import { debounceTime } from 'rxjs/operators/add/debounceTime';

@Component({
    selector: 'my-app',
    template: `
      <kendo-grid #grid
          [data]="gridView"
          [skip]="skip"
          [pageSize]="pageSize"
          [scrollable]="'virtual'"
          [rowHeight]="36"
          [height]="350"
        >
        <kendo-grid-column field="id" [width]="80" title="ID"></kendo-grid-column>
        <kendo-grid-column field="firstName" title="First Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="lastName" title="Last Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="city" title="City" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="title" title="Title" [width]="180"></kendo-grid-column>
      </kendo-grid>
  `
})
export class AppComponent implements AfterViewInit {
    public gridView: GridDataResult;
    public data: any[];
    public pageSize = 100;
    public skip = 0;

    @ViewChild('grid') private grid: GridComponent;

    constructor() {
        this.data = this.createRandomData(100000);
        this.loadProducts();
    }

    public ngAfterViewInit(): void {
        this.grid.pageChange
            .debounceTime(500)
            .subscribe((e) => this.pageChange(e));
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: this.data.slice(this.skip, this.skip + this.pageSize),
            total: this.data.length
        };
    }

    /* Generating example data */
    private createRandomData(count: number): any[] {
        const firstNames = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Nige'],
            lastNames = ['Davolio', 'Fuller', 'Leverling', 'Peacock', 'Buchanan', 'Suyama', 'King', 'Callahan', 'Dodsworth', 'White'],
            cities = ['Seattle', 'Tacoma', 'Kirkland', 'Redmond', 'London', 'Philadelphia', 'New York', 'Seattle', 'London', 'Boston'],
            titles = ['Accountant', 'Vice President, Sales', 'Sales Representative', 'Technical Support', 'Sales Manager', 'Web Designer',
                'Software Developer'];

        return Array(count).fill({}).map((_, idx) => ({
            id: idx + 1,
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            title: titles[Math.floor(Math.random() * titles.length)]
        })
        );
    }
}