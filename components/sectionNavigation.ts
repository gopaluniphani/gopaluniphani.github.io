import { gsap } from "gsap";

let activeScroll: gsap.core.Tween | null = null;
const scrollDestinations = new WeakMap<HTMLElement, string>();
export const sectionScrollChange = "section-scroll-change";

export function getScrollDestination(scroller: HTMLElement) {
  return scrollDestinations.get(scroller);
}

export function getSectionAnchor(id: string) {
  return document.querySelector<HTMLElement>(`[data-section-anchor="${id}"]`);
}

export function getSectionStart(scroller: HTMLElement, id: string) {
  const anchor = getSectionAnchor(id);
  if (!anchor) return null;
  return anchor.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
}

export function scrollToSection(scroller: HTMLElement, id: string) {
  const top = getSectionStart(scroller, id);
  if (top === null) return false;

  activeScroll?.kill();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(top - scroller.scrollTop) < 1) {
    scroller.scrollTop = top;
    return true;
  }

  const stopOnInput = () => activeScroll?.kill();
  const cleanup = () => {
    scroller.removeEventListener("wheel", stopOnInput);
    scroller.removeEventListener("touchstart", stopOnInput);
    activeScroll = null;
    scrollDestinations.delete(scroller);
    scroller.dispatchEvent(new Event(sectionScrollChange));
  };
  scrollDestinations.set(scroller, id);
  scroller.dispatchEvent(new Event(sectionScrollChange));
  scroller.addEventListener("wheel", stopOnInput, { passive: true });
  scroller.addEventListener("touchstart", stopOnInput, { passive: true });
  activeScroll = gsap.to(scroller, {
    scrollTop: top,
    duration: 0.7,
    ease: "power2.inOut",
    onComplete: cleanup,
    onInterrupt: cleanup,
  });
  return true;
}
