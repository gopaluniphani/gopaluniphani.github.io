"use client";

import { useEffect, useState } from "react";
import {
  Article,
  Briefcase,
  ChatCircle,
  Flask,
  Shapes,
  type Icon,
} from "@phosphor-icons/react";
import { profile } from "@/content/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { getScrollDestination, getSectionStart, scrollToSection, sectionScrollChange } from "./sectionNavigation";

const links: Array<{ label: string; href: string; icon: Icon }> = [
  { label: "Story", href: "#story", icon: Article },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "Range", href: "#range", icon: Shapes },
  { label: "Lab", href: "#lab", icon: Flask },
  { label: "Contact", href: "#contact", icon: ChatCircle },
];

export function Navigation() {
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    const scrollWrapper = document.querySelector<HTMLElement>("[data-scroll-wrapper]");
    if (!scrollWrapper) return;
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      // Keep the requested destination active while intermediate sections pass by.
      const destination = getScrollDestination(scrollWrapper);
      if (destination !== undefined) {
        setActiveIndex(links.findIndex(({ href }) => href === `#${destination}`));
        return;
      }
      const marker = scrollWrapper.scrollTop + scrollWrapper.clientHeight * 0.56;
      let nextIndex = -1;
      links.forEach(({ href }, index) => {
        const start = getSectionStart(scrollWrapper, href.slice(1));
        if (start !== null && start <= marker) nextIndex = index;
      });
      setActiveIndex(nextIndex);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    scrollWrapper.addEventListener("scroll", handleScroll, { passive: true });
    scrollWrapper.addEventListener(sectionScrollChange, handleScroll);
    window.addEventListener("resize", handleScroll);
    updateActiveSection();
    return () => {
      scrollWrapper.removeEventListener("scroll", handleScroll);
      scrollWrapper.removeEventListener(sectionScrollChange, handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function handleNavigate(event: React.MouseEvent<HTMLAnchorElement>, index: number, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector<HTMLElement>(href);
    const scrollWrapper = document.querySelector<HTMLElement>("[data-scroll-wrapper]");
    if (!target || !scrollWrapper) return;
    if (!scrollToSection(scrollWrapper, href.slice(1))) return;
    event.preventDefault();
    setActiveIndex(index);
    window.history.replaceState(null, "", href);
    if (event.detail === 0) {
      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
  }

  return (
    <header className="site-nav" data-nav>
      <a className="site-nav__brand" href="#top" aria-label={`${profile.name}, back to top`} onClick={(event) => handleNavigate(event, -1, "#top")}>
        <span className="site-nav__brand-full">{profile.name}</span>
        <span className="site-nav__brand-short" aria-hidden="true">Phani G.</span>
      </a>
      <div className="site-nav__actions">
        <nav className="site-nav__menu" aria-label="Primary navigation">
          {links.map(({ label, href, icon: NavIcon }, index) => {
            const active = index === activeIndex;
            return (
              <a
                className="site-nav__link"
                href={href}
                key={href}
                data-active={active ? "true" : "false"}
                aria-current={active ? "location" : undefined}
                onClick={(event) => handleNavigate(event, index, href)}
              >
                <span className="site-nav__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <NavIcon className="site-nav__icon" size={20} weight={active ? "fill" : "regular"} aria-hidden="true" />
                <span className="site-nav__label">{label}</span>
              </a>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
