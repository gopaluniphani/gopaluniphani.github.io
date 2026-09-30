"use client";

import { useEffect } from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const scrollWrapper = document.querySelector<HTMLElement>("[data-scroll-wrapper]");
    const sequence = document.querySelector<HTMLElement>("[data-intro-sequence]");
    if (!scrollWrapper || !sequence) return;

    const panels = Array.from(
      sequence.querySelectorAll<HTMLElement>(".story, .chapter-panel:not(.chapter-panel--contact)"),
    );
    const updateOffsets = () => {
      panels.forEach((panel) => {
        const top = Math.min(0, scrollWrapper.clientHeight - panel.offsetHeight);
        panel.style.setProperty("--panel-sticky-top", `${top}px`);
      });
    };
    const observer = new ResizeObserver(updateOffsets);
    observer.observe(scrollWrapper);
    panels.forEach((panel) => observer.observe(panel));
    updateOffsets();
    sequence.classList.add("has-panel-sticky");

    return () => {
      observer.disconnect();
      sequence.classList.remove("has-panel-sticky");
      panels.forEach((panel) => panel.style.removeProperty("--panel-sticky-top"));
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function initializeMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const scrollWrapper = document.querySelector<HTMLElement>("[data-scroll-wrapper]");
      if (!scrollWrapper) return;

      const context = gsap.context(() => {
        gsap.from("[data-hero-reveal]", {
          y: 34,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
        });
        const hero = document.querySelector<HTMLElement>("[data-hero]");
        const introSequence = document.querySelector<HTMLElement>("[data-intro-sequence]");
        if (hero && introSequence) {
          const heroTransition = gsap.timeline({
            scrollTrigger: {
              trigger: introSequence,
              scroller: scrollWrapper,
              start: "top top",
              end: () => `+=${hero.offsetHeight}`,
              invalidateOnRefresh: true,
              scrub: true,
            },
          });
          heroTransition
            .to("[data-hero-content]", { opacity: 0.5, ease: "none" }, 0)
            .to("[data-hero-orbit]", { yPercent: 8, ease: "none" }, 0)
            .to("[data-hero-scroll-cue]", { opacity: 0, ease: "none" }, 0);
        }
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: element, scroller: scrollWrapper, start: "top 86%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 30,
            duration: 0.7,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: group, scroller: scrollWrapper, start: "top 82%", once: true },
          });
        });
        gsap.to("[data-timeline-progress]", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            scroller: scrollWrapper,
            start: "top 64%",
            end: "bottom 64%",
            scrub: true,
          },
        });

        ScrollTrigger.refresh();
      });

      cleanup = () => {
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    initializeMotion();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return children;
}
