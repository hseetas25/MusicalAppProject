import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { MusicalUser } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MusicalService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createUser(userData: MusicalUser): Observable<{isSuccessful: boolean, reason: string | null}> {
    const musicalUserData: MusicalUser = JSON.parse(JSON.stringify(userData)) as MusicalUser;
    return new Observable((sub) => {
      if (musicalUserData) {
        this.firestore.collection(`registered-users-data`).doc(musicalUserData.id).set(musicalUserData).then(() => {
          this.firestore.collection('email-data').add({mail: musicalUserData.mail});
          if (musicalUserData.username) {
            this.firestore.collection('phone-data').add({phone: musicalUserData.username});
          }
          sub.next({ isSuccessful: true, reason: null });
        }, (reason) => {
          sub.next({ isSuccessful: false, reason: reason.message });
        }).catch((error) => {
          sub.next({ isSuccessful: false, reason: error.message });
        });
      }
      else {
        sub.next({ isSuccessful: false, reason: null });
      }
    });
  }

  getAllEmails(): Observable<{isSuccessful: boolean, emailData: any, reason: string | null}> {
    return new Observable((sub) => {
      this.firestore.collection('email-data').stateChanges().subscribe((data) => {
        if (data && data.length>0) {
          const emails: any[] = [];
          data.forEach((data) => {
            emails.push(data.payload.doc.data());
          });
          sub.next({isSuccessful: true, emailData: emails, reason: null});
        } else {
          sub.next({isSuccessful: false, emailData: null, reason: 'No Data'});
        }
      });
    });
  }

  getAllContactNumbers(): Observable<{isSuccessful: boolean, phoneData: any, reason: string | null}> {
    return new Observable((sub) => {
      this.firestore.collection('phone-data').stateChanges().subscribe((data) => {
        if (data && data.length>0) {
          const contacts: any[] = [];
          data.forEach((data) => {
            contacts.push(data.payload.doc.data());
          })
          sub.next({isSuccessful: true, phoneData: contacts, reason: null});
        } else {
          sub.next({isSuccessful: false, phoneData: null, reason: 'No Data'});
        }
      });
    });
  }
}
