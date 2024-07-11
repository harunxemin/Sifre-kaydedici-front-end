import { IOzetKartAlan } from 'limitng/api/models/ozet/ozetkartalan';

interface IAylikTablo {
  baslikRenk: string;
  aylar: string[];
  degerler: number[];
}

export interface IOzetData {
  kullaniciAdiSoyadi: string;
  kartlar: IOzetKartAlan[];
  aylikListe: IAylikTablo;
  aylikGrafikler: string[];
  birim: string;
}
