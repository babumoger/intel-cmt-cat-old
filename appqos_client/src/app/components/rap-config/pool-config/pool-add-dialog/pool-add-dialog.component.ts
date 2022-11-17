/*BSD LICENSE

Copyright(c) 2022 Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the
    distribution.
  * Neither the name of Intel Corporation nor the names of its
    contributors may be used to endorse or promote products derived
    from this software without specific prior written permission.
    
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppqosService } from 'src/app/services/appqos.service';
import { LocalService } from 'src/app/services/local.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Pools } from '../../../overview/overview.model';

type PostPool = Omit<Pools, 'id'>;
type dialogDataType = {
  l2cwNum?: number | undefined;
  l3cwNum?: number | undefined;
};

@Component({
  selector: 'app-pool-add-dialog',
  templateUrl: './pool-add-dialog.component.html',
  styleUrls: ['./pool-add-dialog.component.scss'],
})
export class PoolAddDialogComponent implements OnInit {
  form!: FormGroup;
  pool = {};
  caps!: string[] | null;
  mbaBwDefNum = Math.pow(2, 32) - 1;
  mbaCtrl!: boolean | null;

  constructor(
    private localService: LocalService,
    private service: AppqosService,
    private snackBar: SnackBarService,
    public dialogRef: MatDialogRef<PoolAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogDataType
  ) {}

  ngOnInit(): void {
    this.localService.getCapsEvent().subscribe((caps) => (this.caps = caps));
    this.localService
      .getMbaCtrlEvent()
      .subscribe((mbaCtrl) => (this.mbaCtrl = mbaCtrl));

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cores: new FormControl('', [Validators.required]),
    });
  }

  savePool(): void {
    if (!this.form.valid || !this.caps) return;

    let pool: PostPool = {
      name: this.form.value.name,
      cores: this.form.value.cores
        .split(/[,-]/)
        .filter((core: string) => core)
        .map(Number),
    };

    if (this.caps.includes('mba')) {
      if (this.mbaCtrl) {
        pool.mba_bw = this.mbaBwDefNum;
      } else {
        pool.mba = 100;
      }
    }
    if (this.caps.includes('l3cat') && this.data.l3cwNum)
      pool.l3cbm = (1 << this.data.l3cwNum) - 1;

    if (this.caps.includes('l2cat') && this.data.l2cwNum)
      pool.l2cbm = (1 << this.data.l2cwNum) - 1;

    this.postPool(pool);
  }

  postPool(pool: PostPool): void {
    this.service.postPool(pool).subscribe({
      next: (response) => {
        this.snackBar.displayInfo(response.message);
        this.dialogRef.close(response);
      },
      error: (error) => {
        this.snackBar.handleError(error.error.message);
      },
    });
  }
}
