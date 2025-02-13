import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProviderService } from '../shared/provider.service';
import { map } from 'rxjs/operators';
import { Vitacora } from '../model/autos';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-autos',
  templateUrl: './edit-autos.component.html',
  styleUrls: ['./edit-autos.component.css']
})

  
export class EditAutosComponent implements OnInit {

   public addmore: FormGroup;
public autoDetalle
public autoId
public value:{}
public newDate: any
public newDate2 :Date
public flag : boolean
public arreglo1:any
public tempo :number
changed: Date;
public arrayTemp: FormGroup;
//public vitacora : Vitacora[];
pipe = new DatePipe('en-US');
public incremental=[0,1,2];
public x =0
public ItemRowsTemp = {}
 vitacora : Vitacora = {
  $key:false,
  descripcion: '',
  fecha: new Date,
  kilometraje :'',
  tipo:'',
  lugar:'',
  itemRows:{

   costo:0,
   descripcion:'',
recomendacion:''
    }
  
};
cadena :any
nombre_cabeceras: string[] = [];
public valores: string[]=["Todo1","Todo2","Todo3"];

  constructor(
     private toastr: ToastrService,
    public rutaActiva: ActivatedRoute,
    public autosService: ProviderService,
                 private _fb: FormBuilder,
                   public router: Router,

  ) { 
  
     }

     ngOnInit(): void {

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
      
      this.retrieveVitacota();
      


      
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
   
     retrieveVitacota(): void { 

      this.rutaActiva.params.subscribe(
        (params: Params) => {
          this.autoDetalle = params['auto-detalle'];
          this.autoId = params['autoId'];
          //this.coche.marca = params.marca;
       
        }
      );  


      this.getById(this.autoDetalle )

/* consulta a la base de datos para el registro  */   

}
saverange( points) {
 console.log(  points)
  }
  
  


async getById(id : string ) {
  this.autosService.getById(this.autoDetalle ).subscribe(data => {
    console.log(data.autoId)
    if(data.fecha.seconds)
    this.newDate = this.pipe.transform(new Date(data.fecha.seconds*1000), 'yyyy-MM-dd');
    else
    this.newDate = data.fecha;
    
    //this.newDate2 = this.pipe.transform(this.newDate *1000, 'short')
    this.newDate2 = new Date(data.fecha.seconds*1000)
    this.vitacora = data
    this.arreglo1 = data.itemRows
   console.log( this.newDate *1000)
 
 console.log(this.vitacora.itemRows)

   this.nombre_cabeceras= data.itemRows
   console.log(this.nombre_cabeceras[0]['costo'])
  });
 
}
submitForm() {
  console.log('Form Submitted with value: ', this.addmore.value);
}
clearDate(event) {
    event.stopPropagation();
   // this.date = null;
  }


  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }
  addNewRow() {


   
    this.formArr.push(this.arrayTemp)
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

onSubmit({value, valid}: {value: Vitacora, valid: boolean}) {

this.initItemRows 

let descripcion =''
let costo =0
let recomendacion= ''
let flag =false

this.value = value
 console.log(Object.values(this.value).length)
 console.log((this.value))
   /*   console.log(this.value['itemRows']['recomendacion']) */
for(let x =0 ; x <Object.values(this.value).length ;x++){



  if ((this.value['detalle'+x]!==undefined)){
    descripcion = this.value['detalle'+x]
    console.log(this.value['detalle'+x])
  flag = true
  }
    if (this.value['costo'+x]!=0||this.value['costo'+x]!==undefined){
      costo = this.value['costo'+x]
       }   if (this.value['recomendacion'+x]!=''||this.value['recomendacion'+x]!==undefined){
        recomendacion = this.value['recomendacion'+x]
  }

if (flag){
  console.log(descripcion)
  console.log(costo)
  console.log(recomendacion)
  this.arrayTemp = this._fb.group({
    descripcion:[descripcion],
    costo:[costo, [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
    ]],
    recomendacion:[recomendacion],
  });
  console.log( this.arrayTemp.value)
  this.addNewRow()
}
flag = false

/* 
   addNewRow() {
    this.formArr.push(this.initItemRows());
*/

}

/* onSubmit():void { */
console.log(this.value )
this.addmore.addControl('autoId', new FormControl( this.autoId, Validators.required ) );
this.addmore.removeControl('descripcion')
this.addmore.addControl('descripcion',new FormControl( this.value['Descripcion'], Validators.required ) );
this.addmore.removeControl('fecha')
this.addmore.addControl('fecha', new FormControl( this.value['newDate'], Validators.required ) );

this.addmore.removeControl('kilometraje')
this.addmore.addControl('kilometraje', new FormControl( this.value['kilometraje'], Validators.required ) );
this.addmore.removeControl('lugar')
this.addmore.addControl('lugar', new FormControl( this.value['lugar'], Validators.required ) );
/*this.addmore.removeControl('itemRows')
 this.addmore.addControl('itemRows', new FormControl( this.arrayTemp.value, Validators.required ) ); */


if((this.addmore.get('itemRows') as FormArray).value[0]['descripcion']==='')
  this.formArr.removeAt(0);
 /* 
 this.formArr.removeAt(index); */
console.log(this.addmore.value)

     // Add new client1
    // this.autosService.update(this.autoId, this.addmore.value);
     this.toastr.success('New update','', { timeOut: 4000});
      // navigate to dashboard
      this.router.navigate(['/autos-list']);

console.log(this.autoDetalle)
     this.autosService.update( this.autoDetalle,this.addmore.value)

  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }

  trackByFn(index, item) {
    return index;  

  }
  myFunction(e: Event){
   console.log(e)
  }

  changeFormat(changed) {
    let ChangedFormat = this.pipe.transform(this.newDate, 'yyyy-MM-dd');
    this.newDate = ChangedFormat;
  }

  onClick() {
    this.changeFormat(this.changed);
    console.log(this.newDate);
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

}
