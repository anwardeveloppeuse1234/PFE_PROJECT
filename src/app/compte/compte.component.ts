import { HistoriqueService } from './../services/historique.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { historiqueModel, historiqueResponse } from '../model/historique.model';
import { profil, profilRequest } from '../model/profil.model';
import { ProfilService } from '../services/profil.service';
import { anglais } from '../langueSetting/anglais';
import { arabe } from '../langueSetting/arabe';
import { fr } from '../langueSetting/fr';
import { HttpClient } from '@angular/common/http';
import { fileModel } from '../model/file-model';
import { request } from 'http';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  apiURL: string = 'http://wsmobile.expressdisplay.net/v1/mesreservation';
  request!: historiqueModel;
  historiqueResponse:historiqueResponse;
  tickets : any []= [];
  id_client:string | null = "";
  auth : string | null ="";

  num_ticket: string= "";
  historiqueModel: historiqueModel;
  num_agence: string="";
  date_print: string ="";
  heure_print: string ="";
  called:string="";
  jour_semaine:string="";
  nom_agence:string = "";
  HistoriqueService: any;
  selectedFile: File | null = null;
fileName: string | null ="";
  textsection1:any;textsection2:any;textsection3:any;
   textsection4:any;  textsection5:any;
  textsection6:any;  textsection7:any;  textsection8:any;
  textsection9:any;  textsection10:any;   textsection11:any;  textsection12:any; 
  textsection13:any;  textsection14:any;   textsection15:any;  textsection16:any;  textsection17:any;
  textsection18:any;  textsection19:any;  textsection27:any;  textsection28:any;  textsection29:any;  textsection30:any;
  textsection31:any;  textsection32:any; 
  newprofil = new profil();
profil = new profil();
  currentprofil = new profil();
  //fileDetails: import("c:/Users/Administrator/Desktop/Application/Application/src/app/file-details.model").FileDetails;
  file!: File;
  //fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  constructor( private router: Router,private http: HttpClient, private historiqueService:HistoriqueService,private profilService: ProfilService) {
    this.historiqueModel= {} as historiqueModel;
    this.historiqueResponse= {} as historiqueResponse;

   }

  onSubmit() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:8080/api/upload', formData).subscribe(
      (response) => {
        console.log('Téléchargement réussi', response);
      },
      (error) => {
        console.error('Erreur lors du téléchargement', error);
      }
    );
  }
  ngOnInit(): void {
    localStorage.setItem('lang','2');
    this.textsection1 = fr.compte[0];
    this.textsection2=fr.compte[1];
    this.textsection3=fr.compte[2];
    this.textsection4=fr.compte[3];
    this.textsection5=fr.compte[4];
    this.textsection6=fr.compte[5];
    this.textsection7=fr.compte[6];
    this.textsection8=fr.compte[7];
    this.textsection9=fr.compte[8];
    this.textsection10=fr.compte[9];
    this.textsection11=fr.compte[10];
    this.textsection12=fr.compte[11];
    this.textsection13=fr.compte[12];
    this.textsection14=fr.compte[13];
    this.textsection15=fr.compte[14];
    this.textsection16=fr.compte[15];
    this.textsection17=fr.compte[16];
    this.textsection18=fr.compte[17];
    this.textsection19=fr.compte[18];
    this.textsection27 = fr.ajouter[0];
    this.textsection28=fr.ajouter[1];
    this.textsection29=fr.ajouter[2];
    this.textsection30 = fr.ajouter[3];
    this.textsection31=fr.ajouter[4];
    this.textsection32=fr.ajouter[5];
    console.log('fr',fr.compte)
   
    this.id_client=(localStorage.getItem('numTel') == null) ? "123" : localStorage.getItem('numTel');
    this.chargerprofils();


    this.auth = localStorage.getItem('isConnected');
   
    }



    
  setLangueArabe(){
    localStorage.setItem('lang','1');
    this.textsection1 = arabe.compte[0];
    this.textsection2=arabe.compte[1];
    this.textsection3=arabe.compte[2];
    this.textsection4=arabe.compte[3];
    this.textsection5=arabe.compte[4];
    this.textsection6=arabe.compte[5];
    this.textsection7=arabe.compte[6];
    this.textsection8=arabe.compte[7];
    this.textsection9=arabe.compte[8];
    this.textsection10=arabe.compte[9];
    this.textsection11=arabe.compte[10];
    this.textsection12=arabe.compte[11];
    this.textsection13=arabe.compte[12];
    this.textsection14=arabe.compte[13];
    this.textsection15=arabe.compte[14];
    this.textsection16=arabe.compte[15];
    this.textsection17=arabe.compte[16];
    this.textsection18=arabe.compte[17];
    this.textsection19=arabe.compte[18];
    this.textsection27 = arabe.ajouter[0];
    this.textsection28=arabe.ajouter[1];
    this.textsection29=arabe.ajouter[2];
    this.textsection30 = arabe.ajouter[3];
    this.textsection31=arabe.ajouter[4];
    this.textsection32=arabe.ajouter[5];
  }
  setLangueFrancais(){
    localStorage.setItem('lang','2');
    this.textsection1 = fr.compte[0];
    this.textsection2=fr.compte[1];
    this.textsection3=fr.compte[2];
    this.textsection4=fr.compte[3];
    this.textsection5=fr.compte[4];
    this.textsection6=fr.compte[5];
    this.textsection7=fr.compte[6];
    this.textsection8=fr.compte[7];
    this.textsection9=fr.compte[8];
    this.textsection10=fr.compte[9];
    this.textsection11=fr.compte[10];
    this.textsection12=fr.compte[11];
    this.textsection13=fr.compte[12];
    this.textsection14=fr.compte[13];
    this.textsection15=fr.compte[14];
    this.textsection16=fr.compte[15];
    this.textsection17=fr.compte[16];
    this.textsection18=fr.compte[17];
    this.textsection19=fr.compte[18];
    this.textsection27 = fr.ajouter[0];
    this.textsection28=fr.ajouter[1];
    this.textsection29=fr.ajouter[2];
    this.textsection30 = fr.ajouter[3];
    this.textsection31=fr.ajouter[4];
    this.textsection32=fr.ajouter[5];

  
  }
  setlangueAnglais(){
    localStorage.setItem('lang','3');
    this.textsection1 = anglais.compte[0];
    this.textsection2=anglais.compte[1];
    this.textsection3=anglais.compte[2];
    this.textsection4=anglais.compte[3];
    this.textsection5=anglais.compte[4];
    this.textsection6=anglais.compte[5];
    this.textsection7=anglais.compte[6];
    this.textsection8=anglais.compte[7]; 
    this.textsection9=anglais.compte[8];
    this.textsection10=anglais.compte[9];
    this.textsection11=anglais.compte[10];
    this.textsection12=anglais.compte[11];
    this.textsection13=anglais.compte[12];
    this.textsection14=anglais.compte[13];
    this.textsection15=anglais.compte[14];
    this.textsection16=anglais.compte[15];
    this.textsection17=anglais.compte[16];
    this.textsection18=anglais.compte[17];
    this.textsection19=anglais.compte[18];
    this.textsection27 = anglais.ajouter[0];
    this.textsection28=anglais.ajouter[1];
    this.textsection29=anglais.ajouter[2];
    this.textsection30 = anglais.ajouter[3];
    this.textsection31=anglais.ajouter[4];
    this.textsection32=anglais.ajouter[5];
  }

  
    getnumAgence(event:any){
      let agenceId = event.target;
      this.num_agence = agenceId.id;
    }

  
      


  getHistorique(){
    this.historiqueService.getReservation(this.id_client).subscribe((response: any) => {
      this.tickets = response.tickets;
      console.log('tickets',this.tickets)

    }) 
  }
  chargerprofils(){
    var numTel = localStorage.getItem('numTel');
    console.log('tel', numTel)
    this.profilService.listeProfil(numTel).subscribe((profs: any) => {
      if(profs){
        console.log(profs);
        this.profil = profs;
      }else {
        this.profil = new profil();
        this.profil.nomprofil = "";
        this.profil.numtel = numTel;
        this.profil.prenomprofil = "";
        this.profil.email = "";

      }

      });
}
update(){
  console.log('test')
}
add(){
  this.newprofil = this.profil;
}
/* getdeconnect(){
   
  //localStorage.setItem('isConnected', 'no');
  //localStorage.removeItem('isConnected');
  localStorage.clear();
  this.historiqueService.getReservation(this.id_client).subscribe((response: any) => {
    this.tickets = response.tickets;
    this.router.navigate(['/']);
   

  }) 
} */
getdeconnect(){
   
  localStorage.clear();
  this.router.navigate(['/']);
  this.historiqueService.getReservation(this.id_client).subscribe((response: any) => {
    if(response){
      this.tickets = response.tickets;

      console.log('tickets',this.tickets)
    }
   


  }) 
}

addprofil(){
  let request = new profilRequest();
  request.nomprofil = this.profil.nomprofil;
  request.prenomprofil = this.profil.prenomprofil;
  request.numtel = this.profil.numtel;
  request.email = this.profil.email;
  //request.file = this.selectedFile;
  console.log('selectedfile', this.selectedFile)
   this.profilService.ajouterProfil(this.selectedFile,request).subscribe(prof => {
  console.log(prof);
  //this.router.navigate(['profils']);
  }); 


/*     this.profilService.uploadfile(this.newprofil).subscribe(prof => {
  console.log(prof);
  this.router.navigate(['profils']);
  });  */
    }



  selectFile(event: any) {
    this.selectedFile  = event.target.files[0];
    console.log( this.selectedFile)
  }

  uploadFile() {
   /*  this.fileUploadService.upload(this.file).subscribe({
      next: (data) => {
        this.fileDetails = data;
        this.fileUris.push(this.fileDetails.fileUri);
        alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
      }
    }); */
  }

}