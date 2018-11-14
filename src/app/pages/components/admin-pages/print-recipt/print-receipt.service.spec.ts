/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrintReceiptService } from './print-receipt.service';

describe('Service: PrintReceipt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintReceiptService]
    });
  });

  it('should ...', inject([PrintReceiptService], (service: PrintReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
