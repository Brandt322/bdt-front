import { Component, Input, OnInit } from '@angular/core';
import { ICarouselItem } from './ICarousel-metadata';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() items: ICarouselItem[] = [];
  @Input() id!: number;

  slider!: HTMLElement;
  defaultTransform!: number;

  goNext() {
    if (!this.slider || !this.slider.parentElement) return;

    const containerWidth = this.slider.offsetWidth; // Ancho del contenedor

    this.defaultTransform = this.defaultTransform - containerWidth;

    // Calculate the total width of all carousel items
    const totalWidth = containerWidth * this.items.length;

    if (Math.abs(this.defaultTransform) >= totalWidth) this.defaultTransform = 0;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  goPrev() {
    if (!this.slider || !this.slider.parentElement) return;

    const containerWidth = this.slider.offsetWidth; // Ancho del contenedor

    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + containerWidth;
    this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
  }

  resetCarousel() {
    this.defaultTransform = 0;
    this.slider.style.transform = "translateX(0px)";
  }


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.items.map((i, index) => {
      i.id = i.id;
    })
    // console.log(this.items)

    const sliderElement = document.getElementById("slider");
    if (sliderElement) {
      this.slider = sliderElement;
    } else {
      console.error('No se encontró el elemento con id "slider"');
    }

    this.defaultTransform = 0
  }

  sanitizePdfUrl(base64Data: string) {
    const base64Url = base64Data.split(",")[1];
    const byteCharacters = atob(base64Url);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
