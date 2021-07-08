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
}
