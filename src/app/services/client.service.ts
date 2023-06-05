import { Observable } from 'rxjs';
import { apiURL } from './../config';
import { clientModel } from './../model/client.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Contact } from '../model/contact.model';



@Injectable()

export class ClientService {
    constructor(private http: HttpClient){
    }
    

    apiURL= "http://wsmobile.expressdisplay.net/v1/allagence";


    createClient(request: clientModel){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa('admin:expressmobile$$2018')
            })
          };
var body ="nom=" + request.nom +"&prenom=" + request.prenom+ "&tel="+request.tel + "&id_client=" + request.id_client + "&token=" + request.token;
return this.http.post("http://wsmobile.expressdisplay.net/v1/compte",body,httpOptions);
    }
    sendsms(request: Contact){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('admin:expressmobile$$2018')
          })
        };
var body ="name=" + request.name +"&nickname=" + request.nickname +"&email=" + request.email;
return this.http.post("http://email.expressdisplay.net/v1/sendmail",body,httpOptions);
  }

  /*   consultclient(id: number): Observable<clientModel>{
      return this.http.get<clientModel>(this.apiURL, id,);
    } */

}