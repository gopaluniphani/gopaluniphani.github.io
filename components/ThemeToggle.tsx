"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Desktop, Moon, Sun, type Icon } from "@phosphor-icons/react";
import { gsap } from "gsap";

type Theme = "light" | "dark" | "system";

const themes: Array<{ value: Theme; label: string; icon: Icon }> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Desktop },
];

const themeStorageKey = "portfolio-theme";
const themeChangeEvent = "portfolio-theme-change";

function getSavedTheme(): Theme {
  const saved = window.localStorage.getItem(themeStorageKey);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === themeStorageKey) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(themeChangeEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, getSavedTheme, () => "system");
  const iconRef = useRef<HTMLSpanElement>(null);
  const animatingRef = useRef(false);
  const queuedTapsRef = useRef(0);
  const queuedFrameRef = useRef<number | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentIndex = themes.findIndex((option) => option.value === theme);
  const currentTheme = themes[currentIndex] ?? themes[2];
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  const CurrentIcon = currentTheme.icon;

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = () => {
      if (theme !== "system") return;
      root.removeAttribute("data-theme");
      root.style.colorScheme = "";
    };

    if (theme === "system") {
      applySystemTheme();
      media.addEventListener("change", applySystemTheme);
      return () => media.removeEventListener("change", applySystemTheme);
    }

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => () => {
    timelineRef.current?.kill();
    if (queuedFrameRef.current !== null) window.cancelAnimationFrame(queuedFrameRef.current);
  }, []);

  function cycleTheme() {
    if (animatingRef.current) {
      queuedTapsRef.current += 1;
      return;
    }

    const savedIndex = themes.findIndex((option) => option.value === getSavedTheme());
    const nextValue = themes[(savedIndex + 1) % themes.length].value;

    const activateNextTheme = () => {
      window.localStorage.setItem(themeStorageKey, nextValue);
      window.dispatchEvent(new Event(themeChangeEvent));
    };

    const icon = iconRef.current;
    if (!icon || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      activateNextTheme();
      return;
    }

    animatingRef.current = true;
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
        timelineRef.current = null;
        if (queuedTapsRef.current > 0) {
          queuedTapsRef.current -= 1;
          queuedFrameRef.current = window.requestAnimationFrame(cycleTheme);
        }
      },
    })
      .to(icon, { rotation: -90, scale: 0.6, autoAlpha: 0, duration: 0.16, ease: "power2.in" })
      .add(() => {
        activateNextTheme();
        gsap.set(icon, { rotation: 90, scale: 0.6 });
      })
      .to(icon, { rotation: 0, scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(1.5)" });
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`${currentTheme.label} theme. Switch to ${nextTheme.label} theme`}
      title={`${currentTheme.label} theme · next: ${nextTheme.label}`}
      onClick={cycleTheme}
    >
      <span className="theme-toggle__icon" ref={iconRef} aria-hidden="true">
        <CurrentIcon size={20} weight="regular" />
      </span>
    </button>
  );
}
