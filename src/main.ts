import './style.css';

import { ScrollUtils } from './scroll-utils';

document.querySelector<HTMLDivElement>('section')!.innerHTML = Array.from(
  { length: 10 },
  (_, i): number => i + 1
)
  .map((index: number) => {
    return `<div>
    <h2>List ${index}</h2>

    <ul>
      ${Array.from({ length: 10 }, (_, i): number => i + 1)
        .map((_item: number) => {
          return `<li>
          List Item
        </li>`;
        })
        .join('')}
    </ul>
  </div>`;
  })
  .join('');

document
  .querySelector('section')
  ?.addEventListener('scroll', (event: Event) => {
    const scrollHeightTop = (event.target as HTMLElement).scrollTop,
      currentElement = ScrollUtils.getTopVisibleElement(event);

    let isCurrentContainerScrolling = false;

    if (scrollHeightTop > 15) {
      isCurrentContainerScrolling = true;
    }

    if (currentElement) {
      (event.target as HTMLElement)
        ?.querySelectorAll('h2')
        .forEach((element: Element) => {
          isCurrentContainerScrolling
            ? element.classList.add('fixed-title')
            : element.classList.remove('fixed-title');
        });
    }
  });
