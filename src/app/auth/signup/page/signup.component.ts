import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import { SingupService } from '../service/signup.service';
import { LocalStorageService, StorageKeys } from '../../../@shared/services/local-storage.service';
import { Router } from '@angular/router';
import { SnackBarNotificationService } from '../../../@shared/services/snack-bar-notification.service';
import { singupResponse } from '../signup.interface';
import {FormAccountObject} from "../components/form-account-signup/form-account-signup.component";
import {FormAddressObject} from "../components/form-address-signup/form-address-signup.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy{

  formAccount!: FormGroup;
  formAddress!: FormGroup;
  cepResponse?: any;
  destroy$: Subject<void> = new Subject<void>();


  constructor(
    private singupService: SingupService,
    private localStorage: LocalStorageService,
    private router: Router,
    private snackBarService: SnackBarNotificationService,
  ) {
  }

  sendSignupService(): void {
    const idValid = this.validateForms()
    const credentials = this.buildCredentials();
    this.singupService.singup(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: singupResponse) => {
          this.localStorage.set(StorageKeys.user_logged_token, response.authToken);
          this.localStorage.set(StorageKeys.user_logged_info, response.user);
          this.snackBarService.openSuccessSnackBar('Cadastro realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.snackBarService.openErrorSnackBar('Erro ao cadastrar usuário: ' + (error.error.message ?? 'Erro desconhecido'));
        }
      });
  };

  validateForms(){
    if(!this.formAccount || this.formAccount.invalid){
      this.snackBarService.openErrorSnackBar('Formulário de conta inválido');
      return false;
    }
    if(!this.formAddress || this.formAddress.invalid){
      this.snackBarService.openErrorSnackBar('Formulário de endereço inválido');
      return false;
    }
    return true;
  }

  buildCredentials(){
    return {
      email: this.formAccount.get('email')?.value,
      password: this.formAccount.get('password')?.value,
      name: this.formAccount.get('name')?.value,
      cpf: this.formAccount.get('cpf')?.value,
      phone: this.formAccount.get('phone')?.value,
      address: {
        cep: this.formAccount.get('cep')?.value,
        address: this.formAccount.get('address')?.value,
        number: this.formAccount.get('number')?.value,
        state: this.formAccount.get('state')?.value,
        city: this.formAccount.get('city')?.value,
      }
    }
  }

  receiveFormAccountEvent(event: FormGroup): void {
    this.formAccount = event;    
  }

  receiveFormAddressEvent(event: FormGroup): void {
    this.formAddress = event;
  }

  receiveSearchByCepEvent(event: string): void {
    this.singupService.getCEPFromApi(event)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.cepResponse = response;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

