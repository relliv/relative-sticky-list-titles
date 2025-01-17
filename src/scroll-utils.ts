export enum ScrollPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  MIDDLE = 'middle',
}

export class ScrollUtils {
  /**
   * Gets the top most visible element within a scrollable container.
   *
   * @param event - Event object from a scroll event.
   * @returns The top most visible element or null if none are visible.
   */
  static getTopVisibleElement(event: Event): Element | null {
    if (!event.target) {
      throw new Error('onGroupContainerScroll: event.target is undefined');
    }

    const target = event.target as HTMLElement;

    let parentRect;

    // if event.target is document
    if (event.target === document) {
      parentRect = document.documentElement.getBoundingClientRect();
    } else {
      // if event.target is normal element
      parentRect = target.getBoundingClientRect();
    }

    let closestElement: Element | null = null,
      closestDistance = Infinity;

    Array.from(target.children).forEach((child: Element) => {
      const childRect = child.getBoundingClientRect(),
        distanceFromTop = childRect.bottom - parentRect.top;

      if (distanceFromTop >= 0 && distanceFromTop < closestDistance) {
        closestDistance = distanceFromTop;
        closestElement = child;
      }
    });

    return closestElement ?? null;
  }

  /**
   * Checks if the given element has a scrollbar.
   *
   * @param element - Element to check.
   * @returns True if the element has a scrollbar, false otherwise.
   */
  static hasScrollbar(element: Element): boolean {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  static isScrollbarClosestTo(
    element: Element,
    threshold: number
  ): ScrollPosition {
    const scrollTop = element.scrollTop,
      scrollHeight = element.scrollHeight,
      clientHeight = element.clientHeight;

    // check distance to top and bottom
    const distanceToTop = scrollTop,
      distanceToBottom = scrollHeight - clientHeight - scrollTop;

    // determine if closer to top or bottom
    if (distanceToTop <= threshold) {
      return ScrollPosition.TOP;
    } else if (distanceToBottom <= threshold) {
      return ScrollPosition.BOTTOM;
    }

    return ScrollPosition.MIDDLE;
  }
}
