import { Injectable } from '@angular/core';
import { profil, profilRequest } from '../model/profil.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { fileModel } from '../model/file-model';
import { serialize } from 'v8';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
const httpsOptions2 = {
  headears: new HttpHeaders({
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "X-Requested-With": "XMLHttpRequest"
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProfilService {
 
  apiURL: string = 'http://localhost:8080/profils/api';
  uploadURL:string = `http://localhost:8080/profils/saveprofil`

  profils: profil[] = []; 

  constructor(private http : HttpClient) {
  }

   listeProfil(numTel : string | null){
    return this.http.get(this.apiURL+'/'+numTel);
    }
 
    ajouterfile( prof: profil):Observable<profil>{
      return this.http.post<profil>(this.apiURL, prof, httpOptions);
      }
      uploadFile(request:fileModel):Observable<fileModel>{
        return this.http.post<fileModel>(this.uploadURL, request,httpOptions);
      }

  ajouterProfil(file: File| null, profil: profilRequest):  Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
    });
    if (file != null && profil.numtel ){
      const formData = new FormData();
      formData.append('file', file);
     // formData.append('profilRequest',JSON.stringify(profil));

      formData.append('profil',JSON.stringify(profil));

      console.log('test1')
      return this.http.post<any>(this.uploadURL, formData, {headers});
    }else 
    console.log('test2')
      return this.http.post<any>(this.uploadURL, profil, httpOptions);
      }
/*       uploadfile(request: profil){
    
  var form ="nomprofil=" + request.nomprofil +"&prenomprofil=" + request. prenomprofil +"&email=" + request.email+"&numtel="+request.numtel
  +"&photo="+request.photo;
  return this.http.post("http://localhost:8080/profils/testSave",form,httpOptions);
    } */
      
      consulterProfil(id: number): Observable<profil> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<profil>(url);
        }
        
        updateProfil(prof :profil) : Observable<profil>
{
return this.http.put<profil>(this.apiURL, prof, httpOptions);
}

}
