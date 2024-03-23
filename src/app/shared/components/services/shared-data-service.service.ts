import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListUserTalent } from '../../models/interfaces/user.interface';
import { BasicTalentResponse } from '../../models/interfaces/talent.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private githubLinkSource = new BehaviorSubject<string>('');
  private linkedinLinkSource = new BehaviorSubject<string>('');
  private initialMontSource = new BehaviorSubject<number>(0);
  private finalMontSource = new BehaviorSubject<number>(0);
  private currencySource = new BehaviorSubject<number>(0);
  private descriptionSource = new BehaviorSubject<string>('');
  private imageSource = new BehaviorSubject<string>('');
  private favoriteListSource = new BehaviorSubject<ListUserTalent[]>([]);


  favoriteList$ = this.favoriteListSource.asObservable();
  currentImage = this.imageSource.asObservable();
  currentInitialMont = this.initialMontSource.asObservable();
  currentFinalMont = this.finalMontSource.asObservable();
  currentCurrency = this.currencySource.asObservable();
  currentGithubLink = this.githubLinkSource.asObservable();
  currentLinkedinLink = this.linkedinLinkSource.asObservable();
  currentDescription = this.descriptionSource.asObservable();


  updateFavoriteList(list: ListUserTalent[]) {
    this.favoriteListSource.next(list);
  }

  changeImage(image: string) {
    this.imageSource.next(image);
  }

  changeDescription(description: string) {
    this.descriptionSource.next(description);
  }

  changeInitialMont(mont: number) {
    this.initialMontSource.next(mont);
  }

  changeFinalMont(mont: number) {
    this.finalMontSource.next(mont);
  }

  changeCurrency(currency: number) {
    this.currencySource.next(currency);
  }

  changeGithubLink(link: string) {
    this.githubLinkSource.next(link);
  }

  changeLinkedinLink(link: string) {
    this.linkedinLinkSource.next(link);
  }
}
