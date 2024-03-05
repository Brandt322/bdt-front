import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private githubLinkSource = new BehaviorSubject<string>('');
  private linkedinLinkSource = new BehaviorSubject<string>('');
  private initialMontSource = new BehaviorSubject<number>(0);
  private finalMontSource = new BehaviorSubject<number>(0);
  private currencySource = new BehaviorSubject<string>('');

  currentInitialMont = this.initialMontSource.asObservable();
  currentFinalMont = this.finalMontSource.asObservable();
  currentCurrency = this.currencySource.asObservable();
  currentGithubLink = this.githubLinkSource.asObservable();
  currentLinkedinLink = this.linkedinLinkSource.asObservable();

  changeInitialMont(mont: number) {
    this.initialMontSource.next(mont);
  }

  changeFinalMont(mont: number) {
    this.finalMontSource.next(mont);
  }

  changeCurrency(currency: string) {
    this.currencySource.next(currency);
  }

  changeGithubLink(link: string) {
    this.githubLinkSource.next(link);
  }

  changeLinkedinLink(link: string) {
    this.linkedinLinkSource.next(link);
  }
}
