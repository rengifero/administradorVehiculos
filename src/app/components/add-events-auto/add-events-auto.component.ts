import { NgAuthService } from './../../ng-auth.service';
import { Moment } from 'moment';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Registro } from './../../model/registro';
import { ProviderService } from './../../shared/provider.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, ViewChild } from '@angular/core';
import Autos from 'src/app/model/autos';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-events-auto',
  templateUrl: './add-events-auto.component.html',
  styleUrls: ['./add-events-auto.component.css']
})
export class AddEventsAutoComponent implements OnInit {
  @ViewChild('input', { read: MatInput}) input: MatInput;
  ngAfterViewInit() {  }
 public date: Date;
  disableBalanceOnAdd:boolean = false;
  public addmore: FormGroup;
  public arrayTemp: FormGroup;
  public temp;
  public marca : String;  
  public  autoId: String;
  public  admin;
  loggedInUser: string;

  auto: Registro = {
    fecha: null,
    kilometraje:null,
    costo: 0.00,
  }

  
  constructor( private toastr: ToastrService ,
             public router: Router,
             public clientService: ProviderService,
             //public settingsService: SettingsService
             private _fb: FormBuilder,
             public rutaActiva: ActivatedRoute,
             private authService: NgAuthService,
             ) {

              this.rutaActiva.params.subscribe(
                (params: Params) => {
                  this.autoId = params['autoId'];
                  //this.coche.marca = params.marca;
                  console.log("autoId: "+this.autoId);
                }
              );


              this.authService.getAuth().subscribe(auth => {
                // If user is logged in
                if (auth) {
                    this.loggedInUser = auth.email;
                } 
              });
        


              }
             
             
  ngOnInit() {
    //this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
    this.addmore = this._fb.group({
  	  fecha:[''],
      kilometraje:['', [
        Validators.required,
        Validators.pattern("^[0-9].*$"),
          ]],
      type:[''],
      lugar:[''],
      descripcion:['', [
        Validators.required ]],
      itemRows: this._fb.array([this.initItemRows()])
    });


    this.marca=this.rutaActiva.snapshot.params.autoId;
    // this.autoId = this.rutaActiva.snapshot.paramMap.get("autoId");
     this.admin = this.rutaActiva.snapshot.paramMap.get("admin");
       console.log("autoId: "+this.autoId);
    console.log("admin: "+this.admin);
  }

  resetForm() {
    this.input.value = '';
  }
  

  initItemRows() {
    return this.arrayTemp = this._fb.group({
      descripcion:[''],
      costo:['', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]],
      recomendacion:[''],
    });
  }

  submitForm() {
    console.log('Form Submitted with value: ', this.addmore.value);
  }



  clearDate(event) {
    event.stopPropagation();
    this.date = null;
  }


  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }


  addNewRow() {
    this.formArr.push(this.initItemRows());
   /* const control = <FormArray>this.arrayTemp.controls['itemRows'];
    control.push(this.initItemRows());
 */
/*   
  this.isClicked = true;
    const itemFormCtrl = this.formArr.controls['itemRows'];
    if (itemFormCtrl.valid) {
      this.formArr.push(this.initItemRows());
      this.isClicked = false;
    } */
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  onSubmit({value, valid}: {   value: Autos,    valid: boolean}) {
             console.log(value)   ;
             console.log(valid);
             
          if (this.disableBalanceOnAdd) {
            //value.balance = 0;
          }

    if(!valid) {
      console.log('Not Valid');
      this.toastr.show('Please fill in all the fields', " ", { timeOut: 4000})

      // Redirect
      this.router.navigate(['/add-events-auto']);

    } else {
      console.log('Valid');
      // Add new client
      this.clientService.newClient(value);
      this.toastr.success('New client is added','', { timeOut: 4000});

      // navigate to dashboard
      this.router.navigate(['/']);

      }
    }

          onSubmit1() {
/* add id , administrator */
//this.addmore.addControl('autoId',this.autoId);
this.addmore.addControl('autoId', new FormControl( this.autoId, Validators.required ) );

this.addmore.addControl('User', new FormControl( this.loggedInUser ) );



console.log("this.addmore.value :"+this.addmore.value);
let dateOfBirth: Moment = this.addmore.get('fecha').value;



     // Add new client
      this.clientService.newEvent(this.addmore.value);
       this.toastr.success('New event is added','', { timeOut: 4000});
      // navigate to dashboard
      this.router.navigate(['/autos-list']);



        }

  }
