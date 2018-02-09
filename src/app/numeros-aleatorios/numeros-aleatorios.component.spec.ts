import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumerosAleatoriosComponent } from './numeros-aleatorios.component';

describe('NumerosAleatoriosComponent', () => {
    let component: NumerosAleatoriosComponent;
    let fixture: ComponentFixture<NumerosAleatoriosComponent>;

    beforeEach(async(() => {
      	TestBed.configureTestingModule({
    		declarations: [ NumerosAleatoriosComponent ]
      	})
      	.compileComponents();
    }));

  	beforeEach(() => {
    	fixture = TestBed.createComponent(NumerosAleatoriosComponent);
    	component = fixture.componentInstance;
    	fixture.detectChanges();
  	});

  	it('should create', () => {
    	expect(component).toBeTruthy();
  	});
});