import { Component } from '@angular/core';
import { IMenuItems } from './menu-items.interface';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    teamName: string = 'Los Simuladores';
    menuItems: Array<IMenuItems> = [
        {
            itemTitle: 'introducci&oacute;n',
            itemPath: 'introduction'
        },{
            itemTitle: 'n&uacute;meros aleatorios',
            itemPath: 'numeros-aleatorios'
        },{
            itemTitle: 'variables',
            itemPath: 'variables'
        },
    ]; 
}