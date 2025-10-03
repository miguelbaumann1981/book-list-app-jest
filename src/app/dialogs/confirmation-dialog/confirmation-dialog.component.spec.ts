import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfirmDialogComponent } from "./confirmation-dialog.component";
import { CUSTOM_ELEMENTS_SCHEMA, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

const matDialogRefMock = {
    close: () => null
}


describe('ConfirmationDialogComponent', () => {

    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[],
            declarations: [ConfirmDialogComponent],
            providers: [
                // MatDialogRef,
                // MAT_DIALOG_DATA
                {
                    provide: MAT_DIALOG_DATA, useValue: {}
                },
                {
                    provide: MatDialogRef, useValue: matDialogRefMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onConfirm works fine as true', () => {
        const service = TestBed.inject(MatDialogRef);
        const spy = jest.spyOn(service, 'close');
        component.onConfirm();
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('onConfirm works fine as false', () => {
        const service = TestBed.inject(MatDialogRef);
        const spy = jest.spyOn(service, 'close');
        component.onDismiss();
        expect(spy).toHaveBeenCalledWith(false);
    });

});