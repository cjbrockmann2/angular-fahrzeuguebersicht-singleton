export interface CARS {
  ID: number;
  Marke: string;
  Modell: string;
  Fahrgestellnummer: string;
  KundenID: number;
  HaendlerID: number;
  Erstzulassung: string;
  ErstKennzeichen: string;
  Kunde: string;
  Haendler: string;
}

export interface HAENDLER {
  ID: number;
  Firmenname: string;
  PLZ: string;
  Ort: string;
  Email: string;
  Telefon: string;
}

export interface KUNDE {
  ID: number;
  Nachname: string;
  Vorname: string;
  Anrede: string;
  PLZ: string;
  Ort: string;
  Email: string;
  Telefon: string;
}

export class GlobalConstants {
  public static CarList: CARS[];
  public static HaendlerList: HAENDLER[];
  public static KundenList: KUNDE[];
}
