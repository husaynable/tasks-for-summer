import { Component, OnInit, Inject } from '@angular/core';
import { FED_CATS_COUNT } from 'src/app/services/fed-cats-counter-overlay.service';
import { FedCatsCounterOverlayRef } from 'src/app/services/fed-cats-counter-overlay-ref';

@Component({
  selector: 'app-fed-cats-counter',
  templateUrl: './fed-cats-counter.component.html',
  styleUrls: ['./fed-cats-counter.component.css']
})
export class FedCatsCounterComponent implements OnInit {
  catsCount: number;

  constructor(private dialogRef: FedCatsCounterOverlayRef, @Inject(FED_CATS_COUNT) private fedCatsCount: number) {}

  ngOnInit() {
    this.catsCount = this.fedCatsCount;
  }

  save() {
    this.dialogRef.close(this.catsCount);
  }

  cancel() {
    this.dialogRef.close();
  }

  add() {
    if (this.catsCount <= 100) {
      this.catsCount += 1;
    }
  }

  subtract() {
    if (this.catsCount > 0) {
      this.catsCount -= 1;
    }
  }
}
