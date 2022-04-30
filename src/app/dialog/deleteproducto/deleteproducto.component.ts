import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteproducto',
  templateUrl: './deleteproducto.component.html',
  styleUrls: ['./deleteproducto.component.scss']
})
export class DeleteproductoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteproductoComponent>) { }

  ngOnInit(): void {
  }

}
