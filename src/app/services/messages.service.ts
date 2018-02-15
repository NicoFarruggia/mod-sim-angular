import { Injectable } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';

@Injectable()
export class MessagesService {
    private msg: string;
    private errorMsg: string;
    private toasterService: ToasterService;
    public toasterConfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: false,
            tapToDismiss: false
        });

    constructor(toasterService: ToasterService) {
        this.toasterService = toasterService;
    }

    getToasterConfig(): ToasterConfig {
        return this.toasterConfig;
    }

    showNotification(type: string, title: string = 'Success', message: string, timeOut: number = 0): void {
        const toast = {
            type: type,
            title: title,
            body: message,
            timeout: timeOut
        };
        this.toasterService.pop(toast);
    }
}