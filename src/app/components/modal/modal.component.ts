import { ProviderService } from './../../shared/provider.service';
import { Component, VERSION } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
//import { ToastrService } from 'ngx-toastr';

// Depending on whether r ollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    
  },
 /*  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
 */
   dateInput: 'YYYY',
  display: {
    dateInput: 'YYYY'
   
  },
};
@Component({
  selector: "my-modal",
  templateUrl: "./modal.component.html",
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],


})
export class ModalComponent {

  
  minDate = new Date(2000, 2, 1); 
maxDate = new Date();

  dateModelo :number;

  
  a = moment().subtract(5, 'year');
  b = moment().add(1, 'year');
  date = new FormControl(moment.max(this.a, this.b));
  /* date = new FormControl(moment);
 */

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {

   /*  var a = moment().subtract(10, 'year');
    var b = moment().add(5, 'year');
    console.log(a);
    console.log(b);
    moment.max(a, b);  // b */

  this.dateModelo = normalizedYear.year();

    const ctrlValue = this.date.value;

    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    
    datepicker.close();
  }

  /* chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  } */


  form: FormGroup;

  constructor(private providerService:ProviderService,
              private notifyService : ProviderService
              ) {
    this.form = new FormGroup({
      $key: new FormControl(null),

      iglesia: new FormControl("", Validators.required),
      marca: new FormControl("", Validators.required),
      placas: new FormControl("", Validators.required),
       color : new FormControl(""),
     modelo: new FormControl(""),
     administrador: new FormControl(""),

     /*  fullName: new FormControl("", Validators.required), */
      /* email: new FormControl("", Validators.email),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
       department: new FormControl(0),
      hireDate: new FormControl(""), */
      isPermanent: new FormControl(false)
    });
  }

  clearForm() {
    
      console.log("Form reset!");
      this.form.reset();
    
  }


  submitStudentData() {
   
   

    this.form.controls.modelo.setValue(this.dateModelo);
    
    this.form.controls.administrador.setValue(localStorage.getItem('administrador'));
    this.providerService.createNewAuto(this.form.value);


    /* lanza notificación de tupla guardada */
    this.notifyService.showSuccess("Data shown successfully !!", "Notification")
 
    this.ResetForm();
   };

   ResetForm() {
    this.form.reset();
  } 
}
