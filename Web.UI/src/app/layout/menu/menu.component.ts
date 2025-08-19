import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MenuItemComponent, RouterModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Menu bar',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/companies'],
                    },
                    {
                        // temporarily  define routing for company cards feature
                        label: 'ABC Custard',
                        icon: 'pi pi-fw pi-building',
                        routerLink: [
                            '/companies/view/6489930d-9caa-420a-b096-f1602e771e45',
                        ],
                    },
                ],
            },
        ];
    }
}
