import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from 'src/app/shared/services/data-store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router, 
    private activatedRoute:ActivatedRoute, private dataStore:DataStoreService) { }

  ngOnInit(): void {
  }

  handleLoginSubmit(formData:any):any{
    console.log('Logging in...');
    console.log(formData.value);
    this.authService.login(formData.value)
    .subscribe((res:any)=>{
      console.log(res);
      if(res && res.token)
      {
        console.log(res.token);
        if(formData.value.username == 'Arun'){
          this.dataStore.toggleIsAdmin();
        }
        localStorage.setItem('authToken', res.token);
        if(this.activatedRoute.snapshot.queryParams['returnURL'] == undefined){
          this.router.navigate(['/']);
        }
        else{
          this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['returnURL']);
        }
      }
    });

    }
  }
