import logoUrl from '../assets/yum-ta-dum-logo.png';

export function applyCatalogImageFallback(image: HTMLImageElement): void {
  if (image.dataset.fallbackApplied === 'true') return;

  image.dataset.fallbackApplied = 'true';
  image.src = logoUrl;
  image.alt = 'Yum Ta Dum image placeholder';
  image.style.backgroundColor = '#E8F5E9';
  image.style.objectFit = 'contain';
  image.style.padding = '24px';
}
