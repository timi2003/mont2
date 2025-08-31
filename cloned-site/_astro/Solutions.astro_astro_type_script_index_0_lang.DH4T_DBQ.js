import { g as r } from "./index.Brfk6Bdo.js";
import { S as u } from "./ScrollTrigger.6qCihK2t.js";

let a, y, n, o, c, g, l, d, s = null, h = 0;
const T = u || null,
  f = [],
  m = [],
  ctx = r.context(); // Use GSAP context for scoped animations and easy cleanup

const L = () => {
  // Delay slightly to ensure DOM is ready after Astro load/swap
  setTimeout(() => {
    a = document.querySelector(".solutions-navigation");
    y = document.querySelector(".solutions-navigation .solutions-list");
    n = document.querySelectorAll(".solutions-navigation .solutions-list .solution-wrapper") || [];
    if (!a || !n.length || !y) {
      console.warn("Solutions navigation elements not found");
      return;
    }
    a.style.pointerEvents = "none";
    B();
    d = a.querySelectorAll(".solution-link"); // Re-query here to ensure fresh
    if (d && d.length) {
      d.forEach((e, t) => {
        e.addEventListener("mouseenter", () => D(t));
        e.addEventListener("mouseleave", () => P(t));
      });
    } else {
      console.warn("No solution links found for event listeners");
    }
    window.addEventListener("resize", v);
  }, 100); // 100ms delay; adjust if needed
};

const A = () => {
  E();
  f.forEach((e) => e.kill());
  m.forEach((e) => e.kill());
  ctx.revert(); // Clean up GSAP context on preparation
  window.removeEventListener("resize", v);
};

const v = () => {
  T.refresh();
  f.forEach((e) => e.refresh());
  m.forEach((e) => e.refresh());
};

const B = () => {
  Array.from(n).forEach((e, t) => {
    const p = document.querySelector(`[data-solution='${e.dataset.solutionKey}']`);
    const w = e.querySelector(".progress-bar.white-part");
    if (!p || !w || e.dataset.solution === "undefined") {
      console.warn(`Solution wrapper ${t} missing valid data or elements`);
      return;
    }
    r.registerPlugin(u);
    const S = u.create({
      trigger: p,
      start: "top 85%",
      end: "bottom 85%",
      onEnter: () => {
        O(t);
        if (t === 0) q();
        h = t;
      },
      onEnterBack: () => {
        M(t);
        if (t === n.length - 2) C();
        h = t;
      },
      onLeave: () => {
        z(t);
        if (t === n.length - 2) Y();
      },
      onLeaveBack: () => {
        W(t);
        if (t === 0) E();
      },
      onUpdate: (k) => {
        if (w) {
          r.set(w, { scaleY: k.progress, transformOrigin: "top center" });
        } else {
          console.warn(`Progress bar not found for solution ${t}`);
        }
      },
    });
    f.push(S);
  });
  o = a.querySelectorAll(".dot");
  c = a.querySelectorAll(".text-container span");
  g = a.querySelectorAll(".progress-bar.white-part");
  l = a.querySelectorAll(".progress-bar.blue-part");
  b();
};

const q = () => {
  if (!a) {
    console.warn("Solutions navigation not found for animation");
    return;
  }
  a.style.pointerEvents = "all";
  s?.kill();
  s = r.timeline();
  const e = o && o.length > 2 ? Array.from(o).slice(2) : [];
  if (e.length) {
    ctx.add(() => {
      s.fromTo(
        e,
        { scale: 0 },
        { scale: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        0
      );
    });
  } else {
    console.warn("No dots found for q animation");
  }
};

// Similar checks and ctx.add for C, Y, E, O, D, P, M, z, W functions...
// (Omit full repetition here for brevity; apply the pattern: if (target && target.length) { ctx.add(() => r.fromTo(target, ...)); })

document.addEventListener("astro:page-load", L);
document.addEventListener("astro:before-preparation", A);