import { Component } from '@angular/core';

@Component({
    selector: 'introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
    teamMembers: Array<string> = ['Nicolas Farruggia', 'Leandro Donato', 'Sebastian Meza', 'Alexis Palavecino', 'Jonatan García'];
}