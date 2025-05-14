import type { Ref } from 'vue';
import { isClient } from '@vueuse/core';

import { onMounted, onUnmounted, onUpdated } from 'vue';

export function getOffsetTop(el: HTMLElement) {
  let offset = 0;
  let parent = el;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }

  return offset;
}

export function throttleAndDebounce(fn: () => any, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  let called = false;
  return () => {
    if (timeout)
      clearTimeout(timeout);

    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    }
    else {
      timeout = setTimeout(fn, delay);
    }
  };
}

export function useActiveSidebarLinks(
  container: Ref<HTMLElement>,
  marker: Ref<HTMLElement>,
  root?: string,
  offset?: number,
  linkSelector?: string,
) {
  if (!isClient)
    return;

  const onScroll = throttleAndDebounce(setActiveLink, 150);
  function onLinkClick(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const targetId = target!.getAttribute('href')!.substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement)
      return;
    const containerEl = (root && document.querySelector(root)) || window;
    const scrollEle: HTMLElement = (containerEl === window ? targetElement.ownerDocument.documentElement : containerEl) as any;
    const distance = Math.abs(getOffsetTop(targetElement) - getOffsetTop(scrollEle));
    const max = scrollEle.scrollHeight - scrollEle.clientHeight;
    const to = Math.min(distance - (offset || 0), max);
    containerEl.scrollTo({
      top: to,
      behavior: 'smooth',
    });
  }
  function setActiveLink() {
    const sidebarLinks = getSidebarLinks();
    const anchors = getAnchors(sidebarLinks);
    // Cancel the processing of the anchor point being forced to be the last one in the storefront
    // if (
    //   anchors.length &&
    //   scrollDom &&
    //   scrollDom.scrollTop + scrollDom.clientHeight === scrollDom.scrollHeight
    // ) {
    //   activateLink(anchors[anchors.length - 1].hash)
    //   return
    // }
    const containerEl = (root && document.querySelector(root)) || window;
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const nextAnchor = anchors[i + 1];
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor, containerEl);
      if (isActive) {
        history.replaceState(
          null,
          document.title,
          hash ? (hash as string) : ' ',
        );
        activateLink(hash as string);
        return;
      }
    }
  }

  let prevActiveLink: HTMLAnchorElement | null = null;

  function activateLink(hash: string) {
    deactiveLink(prevActiveLink);
    const activeLink = (prevActiveLink
      = hash == null
        ? null
        : (container.value.querySelector(
            `.toc-item a[href="${hash}"]`,
          ) as HTMLAnchorElement));
    if (activeLink) {
      activeLink.classList.add('active');
      if (marker.value) {
        marker.value.style.opacity = '1';
        marker.value.style.top = `${activeLink.offsetTop}px`;
      }
    }
    else {
      if (marker.value) {
        marker.value.style.opacity = '0';
        marker.value.style.top = '33px';
      }
    }
  }

  function deactiveLink(link: HTMLElement | null) {
    link && link.classList.remove('active');
  }

  onMounted(() => {
    window.requestAnimationFrame(setActiveLink);
    const containerEl = (root && document.querySelector(root)) || window;
    containerEl.addEventListener('scroll', onScroll);
    if (linkSelector) {
      const links = document.querySelectorAll(linkSelector);
      if (links) {
        links.forEach((link) => {
          link.addEventListener('click', onLinkClick);
        });
      }
    }
  });

  onUpdated(() => {
    activateLink(location.hash);
  });

  onUnmounted(() => {
    const containerEl = (root && document.querySelector(root)) || window;
    containerEl.removeEventListener('scroll', onScroll);
    if (linkSelector) {
      const links = document.querySelectorAll(linkSelector);
      if (links) {
        links.forEach((link) => {
          link.removeEventListener('click', onLinkClick);
        });
      }
    }
  });
}

function getSidebarLinks() {
  return Array.from(
    document.querySelectorAll('.toc-content .toc-link'),
  ) as HTMLAnchorElement[];
}

function getAnchors(sidebarLinks: HTMLAnchorElement[]) {
  return (
    Array.from(
      document.querySelectorAll('.page-content .header-anchor'),
    ) as HTMLAnchorElement[]
  ).filter(anchor =>
    sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash),
  );
}

function getPageOffset() {
  // return (document.querySelector('.navbar') as HTMLElement).offsetHeight
  return 0;
}

function getAnchorTop(anchor: HTMLAnchorElement) {
  const pageOffset = getPageOffset();
  try {
    return anchor.parentElement!.offsetTop - pageOffset - 15;
  }
  catch {
    return 0;
  }
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement,
  containerEl: any,
) {
  const scrollTop = containerEl === window ? window.scrollY : containerEl.scrollTop;
  if (index === 0 && scrollTop === 0)
    return [true, null];

  if (scrollTop < getAnchorTop(anchor))
    return [false, null];

  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor))
    return [true, decodeURIComponent(anchor.hash)];

  return [false, null];
}
