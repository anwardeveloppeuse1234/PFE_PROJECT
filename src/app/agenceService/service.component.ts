import { InfoTicket } from './../model/Infoticket';
import { ticketResponse, servicesModel, rdvModel } from './../model/ticket.model';
import { Component, OnInit } from '@angular/core';
import {  ticketModel } from '../model/ticket.model';
import { TicketService } from '../services/ticket.service'; 
import { AgenceService } from '../services/agence.service'; 
import { Location } from '@angular/common';
import { Observable,Subscription, interval  } from 'rxjs';
import { SmsService } from './../services/sms.service';

import { fr } from '../langueSetting/fr';
import { arabe } from '../langueSetting/arabe';
import { anglais } from '../langueSetting/anglais';
import * as _ from 'lodash';
import { request } from 'http';
import { SMS } from '../model/sms.model';
import { stringify } from 'querystring';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriqueService } from '../services/historique.service';


@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServicesComponent implements OnInit {
  private updateSubscription!: Subscription;
  apiURL: string = 'http://wsmobile.expressdisplay.net/v1/compte';
 num_agence:string | null = "";
 nom_agence:string | null = "";
 idService: number = 0;
 nombreClients: number=0;
 ticketResponse : InfoTicket ;
 startDate:any;
 rdvRequest: rdvModel;
 serviceIndex:number=0;
endDate:any;
  services : servicesModel []= [];
  lastnum: string = "";
  lasttrait:string="";
 
  textsection21:any; textsection22:any;  textsection23:any;
  textsection24:any;  textsection25:any; textsection26:any;   textsection27:any;
  textsection28:any;  textsection29:any; textsection30:any;   textsection31:any;
  textsection32:any;  textsection33:any; textsection34:any;   textsection35:any;
  agence: any;
  
  numeroticket:  string = "01";
  id_service: string| null = "";
  nbattente: string| null = "";
  msg: string = "";
  tel: string= "" ;
  id_client!: string | null;
  tickets!: any[];
  ok:Boolean = false ;

  
  constructor(private ticketService: TicketService, 
    private agenceService: AgenceService, 
    private location: Location,
    private SmsService:SmsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public historiqueService:HistoriqueService) {
   this.ticketResponse= {} as InfoTicket;
   this.rdvRequest={} as rdvModel;

  }

   ngOnInit() {
    this.id_client = localStorage.getItem('numTel'); 
   
  this.num_agence = this.activatedRoute.snapshot.params['numAgence']?.value;
  
   this.getAgenceServices();

 
  console.log(this.services)
   


/* this.updateSubscription = interval(3000).subscribe(
  (val) => { this.getAgenceServices()}); */


  localStorage.setItem('lang','2');
  this.textsection21 = fr.service[0];
  this.textsection22=fr.service[1];
  this.textsection23=fr.service[2];
  this.textsection24=fr.service[3];
  this.textsection25=fr.service[4];
  this.textsection26=fr.service[5];
  this.textsection27=fr.service[6];
  this.textsection28=fr.service[7];
  this.textsection29=fr.service[8];
  this.textsection30=fr.service[9];
  this.textsection31=fr.service[10];
  this.textsection32=fr.service[11];
  this.textsection33=fr.service[12];
  this.textsection34=fr.service[13];

}
setLangueArabe(){
  localStorage.setItem('lang','1');
  this.textsection21 = arabe.service[0];
  this.textsection22=arabe.service[1];
  this.textsection23=arabe.service[2];
  this.textsection24=arabe.service[3];
  this.textsection25=arabe.service[4];
  this.textsection26=arabe.service[5];
  this.textsection27=arabe.service[6];
  this.textsection28=arabe.service[7];
  this.textsection29=arabe.service[8];
  this.textsection30=arabe.service[9];
  this.textsection31=arabe.service[10];
  this.textsection32=arabe.service[11];
  this.textsection33=arabe.service[12];
  this.textsection34=arabe.service[13];
  
}
setLangueFrancais(){
  localStorage.setItem('lang','2');
  this.textsection21 = fr.service[0];
  this.textsection22=fr.service[1];
  this.textsection23=fr.service[2];
  this.textsection24=fr.service[3];
  this.textsection25=fr.service[4];
  this.textsection26=fr.service[5];
  this.textsection27=fr.service[6];
  this.textsection28=fr.service[7];
  this.textsection29=fr.service[8];
  this.textsection30=fr.service[9];
  this.textsection31=fr.service[10];
  this.textsection32=fr.service[11];
  this.textsection33=fr.service[12];
  this.textsection34=fr.service[13];
  
}
setlangueAnglais(){
  localStorage.setItem('lang','3');
  this.textsection21 = anglais.service[0];
  this.textsection22=anglais.service[1];
  this.textsection23=anglais.service[2];
  this.textsection24=anglais.service[3];
  this.textsection25=anglais.service[4];
  this.textsection26=anglais.service[5];
  this.textsection27=anglais.service[6];
  this.textsection28=anglais.service[7];
  this.textsection29=anglais.service[8];
  this.textsection30=anglais.service[9];
  this.textsection31=anglais.service[10];
  this.textsection32=anglais.service[11];
  this.textsection33=anglais.service[12];
  this.textsection34=anglais.service[13];
  
}
async getHistorique(){
  const response : any = await this.historiqueService.getReservation(this.id_client).toPromise(); 
    this.tickets = response.tickets;  
}
  async getAgenceServices(){
    return this.agenceService.getAgenceByNum(this.activatedRoute.snapshot.params['numAgence']).subscribe( async (response:any)=>{
      this.services = response.agence.services;
      this.agence = response.agence;
      await this.getHistorique();
      if (this.tickets) {
        for(let i = 0; i< this.tickets.length; i++){
          console.log(this.tickets[i]);
          
          if (this.tickets[i].id_agence == this.agence.num_agence ) {
            for(let j = 0; j< this.services.length; j++){
              if (this.services[j].id == this.tickets[i].id_service && this.tickets[i].called == 0) {
                this.services[j].disabled = true;
              }
            }
          }
        }  
      }
      
      this.checkAvailability();       
       }
  )
  
}

   checkAvailability() {
    let result = false;
  
  let pwd = "expressexpress1+";
  
    for(let i=0; i<this.services.length; i++){
      

      let login = this.agence.nom_agence+"."+this.services[i].prefixe;
      let now = new Date()
      this.ticketService.priseRDV(new Date(now), new Date(now.getTime()+ 60 *60 *1000), 3, login, pwd).subscribe(result =>{
        console.log("result info change",result)
        
        if (result.infoxchange.length>0) {
          this.services[i].event = true;
        }else {
          this.services[i].event = false;
        }
      });
      
    }
  }
  handleClick(button: any) {
    if (!button.clicked) {
      button.clicked = true;
    }}
 saveTicket(event:any){

  console.log("this.idService.toString()"+this.idService.toString());
  console.log("this.num_agence"+this.agence.num_agence);
    //var serviceIndex = this.services.map(e => e.id).indexOf(this.idService);
    
     this.serviceIndex = this.services.findIndex(x => x.id == this.idService);
    console.log("event ", this.services[event.target.id].event)
     if (this.services[event.target.id].event) {
      alert("There is an event")
      this.ok = false;
     }else{
      this.ok = true;

      let request = new ticketModel() ;
    request.id_service = event.target.id;
    request.lang= 1 ;
    request.id_client= (localStorage.getItem('numTel') == null) ? "123" : this.id_client; 
    
    request.id_agence= this.agence.num_agence;
    request.token= "ctKaD7IHbxU:APA91bGoFuaSdhgyRLEi6ofPNP";

   
    this.ticketService.reserveTicket(request).subscribe((response) => {
      console.log("response: "+response.message);
      this.ticketResponse = response.infoticket;
      _.debounce(() => {
       
        if(this.ticketResponse) {

      //    alert("ticket reserved successfully!");


        }else {
          alert("Champ(s) requis est (sont) manquant(s) ou vide(s)");
        }
      },300)()
    })
     }

    
    const nbattente: number=1;
    const tempsService = 3; // Durée du service en minutes
    const tempsTotal = nbattente* tempsService;

    if (nbattente > 0) {
      const tempsAttente = (tempsTotal - tempsService) / nbattente;
      console.log('L\'estimation du temps d\'attente pour chaque service est de', tempsAttente, 'minutes');
    } else {
      console.log('Le nombre de clients doit être supérieur à zéro.');
    }
  }
  


  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  
   padZero(value: any) {
    return value.toString().padStart(2, "0");
  }

  displayMsg(){
    
    console.log('test',this.agence.nom_agence)
    console.log('res',this.ticketResponse)
    let estim = this.ticketResponse.heure 
    const timeParts = estim.split(":");
const date = new Date();
date.setHours(parseInt(timeParts[0], 10));
date.setMinutes(parseInt(timeParts[1], 10));
date.setSeconds(parseInt(timeParts[2], 10));
let nbAbttent = 1;
for(let i = 0; i<this.services.length; i++){
  if(this.services[i].nom_service == this.ticketResponse.service){
    nbAbttent = Number(this.services[i].nbattente);
  }
}

// Add 3 minutes
date.setMinutes(date.getMinutes() + 3 * (nbAbttent+1));

// Format the updated time
const updatedTimeString = `${date.getHours()}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;

    let msg= "Bienvenur a l' : "+this.agence.nom_agence+" votre numero de ticket "
    +this.ticketResponse.numeroticket+" au service "+this.ticketResponse.service+". "+this.ticketResponse.nbattente+" en attente. Votre tour est estime a "+updatedTimeString;
    
    
   var request = new SMS() ;
   request.msg= msg;
   request.tel = (localStorage.getItem('numTel') == null) ? "123" : this.id_client;
   
   this.SmsService.sendsms(request).subscribe((response: any) => {
    this.msg= response.msg;
    this.tel=response.tel;
    console.log("sms: "+response.message);

    _.debounce(() => {
      if(this.SmsService){

        alert("message envoyée avec succé!");
        this.checkAvailability();
      }else {
        alert("Champ(s) requis est (sont) manquant(s) ou vide(s)");
      }
    },300)()
  });
  
  }


  
}
