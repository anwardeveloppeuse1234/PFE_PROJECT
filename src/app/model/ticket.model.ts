export class ticketModel {
    id_service: string="";
    lang: number=0;
    id_client!: string | null;
    id_agence:string | null ="";
    token:string="";
    }
    export class rdvModel {
        startDate:string="";
        enddate:string="";
    }


export class ticketResponse {
    numeroticket: string="";
    nbattente: number=0;
    date: string ="";
    heure: string ="";
    service:string="" ;
    agence:string = ""
   
}


export class servicesModel{
    id:number=0;
    nom_service:string="";
    prefixe:string="";
    nom_service_ar="";
    nom_service_en="";
    nbattente:string="";
    lastnum:string="";
    lasttrait:string="";
    disabled:boolean = false;
    event: boolean = false;
}