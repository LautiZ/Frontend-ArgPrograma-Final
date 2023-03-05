import { Injectable } from '@angular/core';
import { getDownloadURL, list, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string = '';

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `Imagen/` + name)
    uploadBytes(imgRef, file).then(res => {
      this.getImages();
    }).catch(err => {
      console.log(err);
    })
  }

  getImages() {
    const imagesRef = ref(this.storage, 'Imagen')
    list(imagesRef).then(async res => {
      for(let item of res.items) {
        this.url = await getDownloadURL(item);
        console.log("url: " + this.url);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
