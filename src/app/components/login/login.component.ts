import { AuthenticationServiceService } from './../../shared/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';



@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationServiceService
    ) { 
        // redirect to home if already logged in
       /*  if (this.authenticationService.userValue) { 
            this.router.navigate(['/login']);
        } */
        localStorage.removeItem('administrador');
        authenticationService.validatorSend  =null;
    
    }




    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
       
         /*    .pipe(first())
            .subscribe({
                next: () => {.1
                  
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            }); */
            if ( (this.authenticationService.login(this.f.username.value, this.f.password.value))&&
            (localStorage.getItem('userAutosSion')) ==   'true'){
              //  console.log("localStorage: "+localStorage.getItem('userAutosSion'))
              
            //this.router.navigateByUrl("dashboard");
            this.router.navigate(['/dashboard'], { queryParams: { user: this.f.username.value, 
                                                                 pass: this.f.password.value, skipLocationChange: true } });
           
        }
            
        this.loading = false;
    }
}