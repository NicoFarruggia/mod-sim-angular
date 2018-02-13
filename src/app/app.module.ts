import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { RandomNumbersComponent } from './pages/random-numbers/random-numbers.component';

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
		RandomNumbersComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot(),
        FormsModule,
        BrowserModule,
        AngularFontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }