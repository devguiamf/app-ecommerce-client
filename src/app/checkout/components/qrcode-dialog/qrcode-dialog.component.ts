import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { SnackBarNotificationService } from 'src/app/@shared/services/snack-bar-notification.service';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<QrcodeDialogComponent>,
    private snackBarService: SnackBarNotificationService
  ) { }


  CopyRandomKey(){
    const randomKeyPix = crypto.randomUUID() + '-' + crypto.randomUUID();
    navigator.clipboard.writeText(randomKeyPix);
    this.snackBarService.defaultSnackBar('Abra o aplicativo do seu banco e cole a chave!');
  }

  confirmPayment(){
    this.dialogRef.close(true);
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
