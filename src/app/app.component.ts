import { Component, ViewEncapsulation } from '@angular/core';
import { MessagesService } from './services/messages.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title: string = 'Modelos de Simulaci&oacute;n';
    public toasterConfig;

    constructor(private messagesService: MessagesService) {
        this.toasterConfig = this.messagesService.getToasterConfig();
    }
}