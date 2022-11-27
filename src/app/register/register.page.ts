import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  dataNascimento;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  async registrar() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.apiService.signUp(this.credentials.value).subscribe(
      async _ => {
        setTimeout(() => {
          loading.dismiss();
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }, 100);
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Register failed',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

}
