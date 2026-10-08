"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

export const disclosureDuration = 450;

/** Shared height transition used by portfolio cases and responsive project choices. */
export function AnimatedDisclosure({ active, onExpandedChange, summary, children, className, summaryClassName, contentClassName, labelledBy, contentId, collapsibleQuery }: {
  active: boolean;
  onExpandedChange: (expanded: boolean) => void;
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
  labelledBy: string;
  contentId?: string;
  collapsibleQuery?: string;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);

  const animation = useRef<Animation | null>(null);
  const returnFocus = useRef(false);

  useEffect(() => () => animation.current?.cancel(), []);

  const setExpanded = useCallback((next: boolean, focusTitle = false) => {
    const element = disclosure.current;
    const summary = element?.querySelector("summary");
    const content = element?.querySelector<HTMLElement>("[data-disclosure-content]");
    if (!element || !summary || !content) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Read the visible height before cancelling so rapid taps reverse smoothly.
    const startHeight = element.getBoundingClientRect().height;
    animation.current?.cancel();
    animation.current = null;
    if (!next && !element.open) return;
    element.open = true;
    element.toggleAttribute("data-closing", !next);
    summary.setAttribute("aria-expanded", String(next));
    content.inert = !next;

    if (focusTitle) {
      summary.focus({ preventScroll: true });
      summary.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "instant" : "smooth" });
    }

    const computed = getComputedStyle(element);
    const border = (parseFloat(computed.borderBottomWidth) || 0) + (parseFloat(computed.borderTopWidth) || 0);
    const endHeight = summary.getBoundingClientRect().height + border
      + (next ? content.getBoundingClientRect().height : 0);

    function finish() {
      element!.open = next;
      element!.removeAttribute("data-closing");
      element!.style.removeProperty("height");
      element!.style.removeProperty("overflow");
      animation.current?.cancel();
      animation.current = null;
    }

    if (reducedMotion) {
      finish();
      return;
    }

    element.style.overflow = "clip";
    animation.current = element.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: disclosureDuration, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "both" },
    );
    animation.current.onfinish = finish;
  }, []);

  useEffect(() => {
    const media = collapsibleQuery ? window.matchMedia(collapsibleQuery) : null;
    const update = () => {
      const collapsible = !media || media.matches;
      setExpanded(collapsible ? active : true, returnFocus.current);
      returnFocus.current = false;
      const summary = disclosure.current?.querySelector("summary");
      if (summary) summary.tabIndex = collapsible ? 0 : -1;
    };
    update();
    media?.addEventListener("change", update);
    return () => media?.removeEventListener("change", update);
  }, [active, collapsibleQuery, setExpanded]);

  function close() {
    returnFocus.current = true;
    onExpandedChange(false);
  }

  return <details className={className} ref={disclosure}>
    <summary className={summaryClassName} aria-controls={contentId} onClick={(event) => {
      event.preventDefault();
      if (!collapsibleQuery || window.matchMedia(collapsibleQuery).matches) onExpandedChange(!active);
    }}>{summary}</summary>
    <div className={contentClassName} id={contentId} data-disclosure-content role="region" aria-labelledby={labelledBy} onClick={(event) => {
      if ((event.target as Element).closest("[data-disclosure-close]")) close();
    }}>
      {children}
    </div>
  </details>;
}
