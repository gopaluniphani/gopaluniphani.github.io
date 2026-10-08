"use client";
import { useEffect, useRef } from "react";
import styles from "./TempoForge.module.css";

export function ProjectMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroller = root.current;
    if (!scroller) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const panels = Array.from(scroller.querySelectorAll<HTMLElement>("[data-project-panel]"));
    const updatePanels = () => {
      panels.forEach((panel) => {
        panel.style.setProperty("--project-panel-top", `${Math.min(0, scroller.clientHeight - panel.offsetHeight)}px`);
      });
      scroller.toggleAttribute("data-panels-ready", !media.matches);
    };
    const observer = new ResizeObserver(updatePanels);
    observer.observe(scroller);
    panels.forEach((panel) => observer.observe(panel));
    media.addEventListener("change", updatePanels);
    updatePanels();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updatePanels);
      scroller.removeAttribute("data-panels-ready");
      panels.forEach((panel) => panel.style.removeProperty("--project-panel-top"));
    };
  }, []);
  useEffect(() => {
    const scroller = root.current;
    if (!scroller) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (media.matches) return;
        const animation = target.animate([{ opacity: .35, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 750, easing: "cubic-bezier(.22,1,.36,1)" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { root: scroller, threshold: .08 });
    scroller.querySelectorAll("[data-project-reveal]").forEach((element) => observer.observe(element));
    const stopMotion = () => { if (media.matches) { animations.forEach((animation) => animation.cancel()); animations.clear(); } };
    media.addEventListener("change", stopMotion);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); media.removeEventListener("change", stopMotion); };
  }, []);
  function navigateChapter(event: React.MouseEvent<HTMLElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const scroller = root.current;
    if (!link || !scroller) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target || !scroller.contains(target)) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    scroller.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    window.history.replaceState(null, "", link.hash);
    if (event.detail === 0) {
      const heading = target.nextElementSibling?.querySelector<HTMLElement>("h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
        heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
      }
    }
  }
  return <main ref={root} id="project-content" className={styles.page} tabIndex={-1} onClick={navigateChapter}>{children}</main>;
}
