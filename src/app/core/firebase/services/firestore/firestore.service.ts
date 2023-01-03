import { inject, Injectable } from '@angular/core';
import { Firestore, collection, WithFieldValue, DocumentData, QueryDocumentSnapshot, SnapshotOptions, query, QueryConstraint, collectionData, addDoc, setDoc, doc, getDoc, docData, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore)

  private convertor<T extends DocumentData>() {
    return {
      toFirestore(data: WithFieldValue<T>): DocumentData {
        return data as T;
      },
      fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): T {
        const data = snapshot.data(options);
        return data as T;
      }
    }
  }
  private collection<T extends DocumentData>(collectionPath: string | string[]) {
    return (Array.isArray(collectionPath) ? collection(this.firestore, collectionPath[0], ...collectionPath.slice(1)) : collection(this.firestore, collectionPath)).
      withConverter<T>(this.convertor<T>());
  }
  private doc<T extends DocumentData>(docPath: string | string[]) {
    return (Array.isArray(docPath) ? doc(this.firestore, docPath[0], ...docPath.slice(1)) : doc(this.firestore, docPath)).
      withConverter<T>(this.convertor<T>());
  }

  public create<T extends DocumentData>(collectionPath: string | string[], data: T) {
    return addDoc(this.collection<T>(collectionPath), data);
  }

  public set<T extends DocumentData>(docPath: string | string[], data: T) {
    return setDoc(this.doc(docPath), data)
  }

  public get<T extends DocumentData>(docPath: string | string[]) {
    return docData(this.doc<T>(docPath))
  }

  public delete(docPath: string | string[]) {
    return deleteDoc(this.doc(docPath));
  }

  // Get all documents from the collection that match the query
  public getAll<T extends DocumentData>(collectionPath: string | string[], queries?: QueryConstraint[]) {
    let collection = this.collection<T>(collectionPath);
    if (queries) {
      let queriedCollection = query(collection, ...queries)
      return collectionData<T>(queriedCollection)
    }
    return collectionData(collection);
  }
}