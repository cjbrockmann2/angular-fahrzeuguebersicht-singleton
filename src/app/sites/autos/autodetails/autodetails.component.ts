import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import {
  GlobalConstants,
  CARS,
  HAENDLER,
  KUNDE,
} from '../../../global-constants';

@Component({
  selector: 'app-autodetails',
  templateUrl: './autodetails.component.html',
  styleUrls: ['./autodetails.component.css'],
})
export class AutodetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  auto: CARS;
  viewstate: string = 'details';
  editmodus: boolean = false;
  message: string = '';
  errorMessage: string = '';
  haendler: HAENDLER[];
  kunden: KUNDE[];

  private selectedId: number = 0;

  ngOnInit() {
    var selID: string = this.route.snapshot.paramMap.get('ID');
    if (selID && !isNaN(selID as any)) this.selectedId = parseInt(selID);

    let view = this.route.snapshot.queryParamMap.get('viewstate') || 'details';

    this.haendler = GlobalConstants.HaendlerList;
    this.kunden = GlobalConstants.KundenList;

    this.selectAction(view);
  }

  RR(val) {
    if (val) return val;
    return '';
  }

  haendlerZuweisen() {
    let tmpH = this.haendler.filter((h) => h.ID == this.auto.HaendlerID);
    if (tmpH && tmpH.length) this.auto.Haendler = tmpH[0].Firmenname;
  }

  kundeZuweisen() {
    let tmpK = this.kunden.filter((k) => k.ID == this.auto.KundenID);
    if (tmpK && tmpK.length)
      this.auto.Kunde =
        this.RR(tmpK[0].Vorname) + ' ' + this.RR(tmpK[0].Nachname);
  }

  autoLaden() {
    var autos = GlobalConstants.CarList.filter((c) => c.ID == this.selectedId);

    if (autos.length > 0) {
      this.auto = { ...autos[0] };
      this.haendlerZuweisen();
      this.kundeZuweisen();
    }
    if (autos.length == 0) {
      this.auto = {} as CARS;
    }
  }

  selectAction(action: string) {
    this.message = '';
    this.errorMessage = '';

    if (!action) action = 'details';
    if (action == 'details') {
      this.autoLaden();
      this.viewstate = 'details';
      this.editmodus = false;
    }
    if (action == 'edit') {
      if (!this.auto) this.autoLaden();
      this.viewstate = 'edit';
      this.editmodus = true;
    }
    if (action == 'new') {
      this.viewstate = 'new';
      this.editmodus = true;
      this.auto = {} as CARS;
      this.auto.ID = GlobalConstants.CarList.length + 1;
    }
    if (action == 'save') {
      var isNew: boolean = false;
      var tmp = GlobalConstants.CarList.filter((c) => c.ID == this.auto.ID);
      if (this.auto.Marke) {
        if (tmp.length == 0) {
          this.haendlerZuweisen();
          this.kundeZuweisen();
          GlobalConstants.CarList.push(this.auto);
          this.viewstate = 'details';
          this.editmodus = false;
          this.message = 'Datensatz hinzugefügt!';
        }
        if (tmp.length > 0) {
          this.haendlerZuweisen();
          this.kundeZuweisen();
          GlobalConstants.CarList = GlobalConstants.CarList.filter(
            (c) => c.ID != this.auto.ID
          );
          GlobalConstants.CarList.push(this.auto);
          GlobalConstants.CarList = GlobalConstants.CarList.sort((a, b) =>
            a.ID < b.ID ? -1 : a.ID > b.ID ? 1 : 0
          );
          this.viewstate = 'details';
          this.editmodus = false;
          this.message = 'Datensatz gespeichert!';
        }
      } else {
        this.errorMessage = 'Bitte Daten vervollstädigen!';
      }
    }
  }
}
