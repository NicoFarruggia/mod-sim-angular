import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { NumerosAleatoriosComponent } from './numeros-aleatorios/numeros-aleatorios.component';

const appRoutes: Routes = [
    { path: 'introduction', component: IntroductionComponent },
    { path: 'numeros-aleatorios', component: NumerosAleatoriosComponent },
    { path: '**', redirectTo: 'introduction' }
];

@NgModule({
    declarations: [
		AppComponent,
		HeaderComponent,
		IntroductionComponent,
		NumerosAleatoriosComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
		NgbModule.forRoot(),
        BrowserModule,
        AngularFontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }