import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';

import * as Chart from 'chart.js';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';

import { OzetService } from 'app/pages/ozet/ozet.service';
import { User } from 'models/user';
import { SpinnerService } from 'shared/spinner/spinner.service';

@Component({
  selector: 'aylik-chart',
  templateUrl: 'aylikChart.component.html'
})

export class AylikChartComponent implements OnInit {
  kriter = input('');

  baslikRenk = 'red';
  chartData: Chart.ChartData;
  chartOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        min: 0
      }
    }
  };

  kriterler: string[] = [];
  seciliKriter = '';

  private currentUser: User;

  constructor(
    private messageService: MessageService,
    private ozetService: OzetService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.chartData = {
      labels: ['Oc'],
      datasets: [
        {
          label: 'Saat',
          data: [12],
          backgroundColor: ['#5E91EB'],
          borderColor: ['#5E91EB']
        }
      ]
    };

    // const today = new Date().getFullYear();
    const buYil = new Date().getFullYear();
    for (let sayac = buYil; sayac >= 2016; sayac--) {
      this.kriterler.push(sayac.toString());
    }
    this.kriterler.push('Tümü');

    this.seciliKriter = this.kriterler[0];
  }

  ngOnInit() {
    this.chartDataYukle();
  }

  kriterChange() {
    this.chartDataYukle();
  }

  selectData(event: any) {
    const ay = event.dataset[event.element._index]._model.label;
    const yilNo = this.seciliKriter;

    let url: any = null;

    switch (this.kriter()) {
      case 'Mecra': {
        if (this.seciliKriter === 'Tümü') {
          url = ['mecra-islemleri', 'Tümü'];
        } else {
          url = ['mecra-islemleri', 'Tümü'];
        }
        this.router.navigate(url);
        break;
      }

      default: {
        if (this.seciliKriter === 'Tümü') {
          url = ['prototip-islemleri', 'Tümü', ay, 'Tümü', 'Tümü'];
        } else {
          url = ['prototip-islemleri', 'Tümü', yilNo, ay, 'Tümü'];
        }
        break;
      }
    }

    if (url !== null) {
      const urlParam = this.router.createUrlTree(url);
      window.open(urlParam.toString());
      // this.router.navigate(url);
    }
  }

  private chartDataYukle() {
    this.spinnerService.start();
    this.ozetService.getOzetChartData(this.currentUser, this.kriter(), this.seciliKriter)
      .subscribe({
        next: (ozetData) => {
          this.spinnerService.stop();
          if (ozetData.aylikListe) {
            this.baslikRenk = ozetData.aylikListe.baslikRenk,
              this.chartData = {
                labels: ozetData.aylikListe.aylar,
                datasets: [
                  {
                    label: ozetData.birim,
                    backgroundColor: ozetData.aylikListe.baslikRenk,
                    borderColor: ozetData.aylikListe.baslikRenk,
                    data: ozetData.aylikListe.degerler
                  }
                ]
              };
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler(error);
        }
      });
  }

  private errorHandler(error: HttpErrorResponse) {
    this.spinnerService.stop();
    let mesaj: string;
    if (error instanceof Error) {
      mesaj = 'Bir hata oluştu: ' + error.message;
    } else {
      mesaj = 'Sunucu hatası oluştu: ' + error.error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Hata',
      detail: mesaj
    });
    console.error(error);
  }
}
