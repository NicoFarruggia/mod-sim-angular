import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { RandomNumbersComponent } from './pages/random-numbers/random-numbers.component';
import { OnlyNumbersDirective } from "./directives/only-numbers.directive";
import { MessagesService } from "./services/messages.service";

const appRoutes: Routes = [
    { path: 'introduction', component: IntroductionComponent },
    { path: 'random-numbers', component: RandomNumbersComponent },
    { path: '**', redirectTo: 'introduction' }
];

@NgModule({
    declarations: [
		AppComponent,
		HeaderComponent,
		IntroductionComponent,
        RandomNumbersComponent,
        OnlyNumbersDirective,
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        ToasterModule.forRoot(),
        NgbModule.forRoot(),
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularFontAwesomeModule
    ],
    providers: [MessagesService],
    bootstrap: [AppComponent]
})
export class AppModule { }