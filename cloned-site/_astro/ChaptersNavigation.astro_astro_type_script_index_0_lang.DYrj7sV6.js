import { g as r } from "./index.Brfk6Bdo.js";
import { S as u } from "./ScrollTrigger.6qCihK2t.js";
let a,
  y,
  n,
  o,
  c,
  g,
  l,
  d,
  s = null,
  h = 0;
const T = u || null,
  f = [],
  m = [],
  L = () => {
    ((a = document.querySelector(".chapters-navigation")),
      (y = document.querySelector(".chapters-navigation .chapters-list")),
      (n =
        document.querySelectorAll(
          ".chapters-navigation .chapters-list .chapter-wrapper",
        ) || []),
      !(!a || !n.length || !y) &&
        ((a.style.pointerEvents = "none"),
        B(),
        d.forEach((e, t) => {
          (e.addEventListener("mouseenter", () => D(t)),
            e.addEventListener("mouseleave", () => P(t)));
        }),
        window.addEventListener("resize", v)));
  },
  A = () => {
    (E(),
      f.forEach((e) => e.kill()),
      m.forEach((e) => e.kill()),
      window.removeEventListener("resize", v));
  },
  v = () => {
    (T.refresh(), f.forEach((e) => e.refresh()), m.forEach((e) => e.refresh()));
  },
  B = () => {
    (Array.from(n).forEach((e, t) => {
      const p = document.querySelector(
          `[data-chapter='${e.dataset.chapterKey}']`,
        ),
        w = e.querySelector(".progress-bar.white-part");
      if (e.dataset.chapter === "undefined" || !p || !w) return;
      r.registerPlugin(u);
      const S = u.create({
        trigger: p,
        start: "top 85%",
        end: "bottom 85%",
        onEnter: () => {
          (O(t), t === 0 && q(), (h = t));
        },
        onEnterBack: () => {
          (M(t), t === n.length - 2 && C(), (h = t));
        },
        onLeave: () => {
          (z(t), t === n.length - 2 && Y());
        },
        onLeaveBack: () => {
          (W(t), t === 0 && E());
        },
        onUpdate: (k) => {
          r.set(w, { scaleY: k.progress, transformOrigin: "top center" });
        },
      });
      f.push(S);
    }),
      (d = a.querySelectorAll(".chapter-link")),
      (o = a.querySelectorAll(".dot")),
      (c = a.querySelectorAll(".text-container span")),
      (g = a.querySelectorAll(".progress-bar.white-part")),
      (l = a.querySelectorAll(".progress-bar.blue-part")),
      b());
  },
  q = () => {
    if (!a) return;
    ((a.style.pointerEvents = "all"), s?.kill(), (s = r.timeline()));
    const e = Array.from(o).slice(2);
    s.fromTo(
      e,
      { scale: 0 },
      { scale: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
      0,
    );
  },
  C = () => {
    if (!a) return;
    ((a.style.pointerEvents = "all"), s?.kill(), (s = r.timeline()));
    const e = Array.from(o).slice(0, -2);
    s.fromTo(
      e,
      { scale: 0 },
      { scale: 1, stagger: -0.1, duration: 0.6, ease: "power2.out" },
      0,
    );
  },
  i = (e = "light") => {
    a.dataset.theme = e;
  },
  b = () => {
    const e = document.querySelectorAll("[data-theme-chapters]");
    e.length !== 0 &&
      e.forEach((t) => {
        const p = u.create({
          trigger: t,
          start: "top 85%",
          end: "bottom 85%",
          onEnter: () => i(t.dataset.themeChapters),
          onLeave: () => i(),
          onEnterBack: () => i(t.dataset.themeChapters),
          onLeaveBack: () => i(),
        });
        m.push(p);
      });
  },
  Y = () => {
    a &&
      ((a.style.pointerEvents = "none"),
      s?.kill(),
      (s = r.timeline()),
      s.to(
        o,
        { scale: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        0,
      ));
  },
  E = () => {
    a &&
      ((a.style.pointerEvents = "none"),
      s?.kill(),
      (s = r.timeline()),
      s.to(
        o,
        { scale: 0, stagger: -0.1, duration: 0.6, ease: "power2.out" },
        0,
      ));
  },
  O = (e) => {
    let t;
    (e === n.length - 1 ? (t = o[e]) : (t = [o[e], o[e + 1]]),
      r.to(t, { scale: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }),
      r.fromTo(
        c[e],
        { y: "200%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
      ),
      r.fromTo(
        l[e],
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          duration: 0.6,
          ease: "power2.out",
        },
      ));
  },
  D = (e) => {
    e !== h &&
      (r.to(o[e], { scale: 1.5, duration: 0.4, ease: "power2.out" }),
      r.fromTo(
        c[e],
        { y: "200%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
      ));
  },
  P = (e) => {
    e !== h &&
      (r.to(o[e], { scale: 1, duration: 0.4, ease: "power2.out" }),
      r.to(c[e], { y: "200%", duration: 0.6, ease: "power2.out" }));
  },
  M = (e) => {
    let t;
    (e === n.length - 1 ? (t = o[e]) : (t = [o[e], o[e + 1]]),
      r.to(t, { scale: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }),
      r.fromTo(
        c[e],
        { y: "-200%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
      ),
      r.fromTo(
        l[e],
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "bottom center",
          duration: 0.6,
          ease: "power2.out",
        },
      ));
  },
  z = (e) => {
    let t;
    (e === n.length - 1 ? (t = o[e]) : (t = [o[e], o[e + 1]]),
      r.to(t, { scale: 1, duration: 0.6, ease: "power2.out" }),
      r.to(c[e], { y: "-200%", duration: 0.6, ease: "power2.out" }),
      r.to(l[e], {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power2.out",
      }),
      r.to(g[e], {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      }));
  },
  W = (e) => {
    let t;
    (e === n.length - 1 ? (t = o[e]) : (t = [o[e], o[e + 1]]),
      r.to(t, { scale: 1, duration: 0.6, ease: "power2.out" }),
      r.to(c[e], { y: "200%", duration: 0.6, ease: "power2.out" }),
      r.to(g[e], {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.6,
        ease: "power2.out",
      }),
      r.to(l[e], {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      }));
  };
document.addEventListener("astro:page-load", L);
document.addEventListener("astro:before-preparation", A);
