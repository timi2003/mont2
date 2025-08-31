import { g as p } from "./index.Brfk6Bdo.js";
let w = document.querySelectorAll(".navigation-social-item"),
  H = document.querySelectorAll(".navigation-social-button"),
  v = document.querySelector("#content-social-dk"),
  o = document.querySelectorAll(".slide"),
  h = 0,
  q = !1,
  m = !1,
  L = null,
  d = 0,
  S = Array.from(v?.querySelectorAll(".content-social-item") || []).map(
    (e, t) => (
      e?.clientHeight > h && (h = e.clientHeight),
      o[t]?.clientHeight > d && (d = o[t].clientHeight),
      {
        el: e,
        navigation: w[t],
        slide: o[t],
        button: H[t],
        logos: e.querySelectorAll(".logo-item"),
        descriptionLines: e.querySelectorAll("p div"),
      }
    ),
  ),
  I = 0,
  u = 0,
  c = null;
const r = (e) => (e >= 0 ? e % o.length : o.length - 1 + ((e + 1) % o.length)),
  k = (e, t = 392) => {
    const l = e.clientHeight;
    return t / l;
  },
  y = (e, t, l, s, i = 294, a = 280, f = !1) => {
    const n = k(t, i),
      g = (t.clientWidth * n) / 2 + a;
    e.to(
      t,
      {
        duration: l,
        x: g * s,
        scale: n,
        ease: "power2.inOut",
        zIndex: f ? 1 : void 0,
      },
      "<",
    );
  },
  A = (e, t, l = 0) => {
    (e.set(o, { zIndex: 0 }, ">+=.6"),
      e.set([o[r(t - l + 1)], o[r(t - l - 1)]], { zIndex: 2 }, "<"),
      e.set(o[t], { zIndex: 4 }, "<"));
  },
  T = (e, t, l = 0) => {
    (e.set(o, { zIndex: 0 }, "<+=.6"),
      e.set(o[r(t - l)], { zIndex: 2 }, "<"),
      e.set(o[r(t + l)], { zIndex: 1 }, "<"),
      e.set(o[t], { zIndex: 4 }, "<"));
  },
  b = (e, t, l, s, i = 0) => {
    const a = m ? 280 : 160,
      f = m ? 294 : 172;
    (e.to(o[t], { duration: s, x: 0, ease: "power2.inOut" }, `<+=${i}`),
      y(e, o[r(t + 1)], s, 1, f, a, !0),
      y(e, o[r(t - 1)], s, -1, f, a, !0),
      e.to(
        [o[r(t + 1)], o[r(t - 1)]],
        { opacity: 1, duration: s / 2, ease: "linear" },
        "<",
      ),
      l !== 0 &&
        (y(e, o[r(t + 2 * l)], s, 2 * l, f / 2, 0),
        y(e, o[r(t - 2 * l)], s, -2 * l, f / 2, 0),
        e.to(
          [o[r(t + 2 * l)], o[r(t - 2 * l)]],
          { opacity: 0, duration: s / 2, ease: "linear" },
          "<",
        )),
      A(e, t));
  },
  P = (e, t, l, s) => {
    (T(e, t, l),
      e.to(o[t], { duration: s, x: 0, ease: "power2.inOut" }, "<+=.3"));
    const i = m ? 280 : 160,
      a = m ? 294 : 172;
    (y(e, o[r(t + 1)], s, 1, a, i), y(e, o[r(t - 1)], s, -1, a, i));
  },
  O = (e, t, l, s) => {
    if (s) return 0;
    const i = t > e ? t - e : t - e + l,
      a = e > t ? e - t : e - t + l;
    return i <= a ? 1 : -1;
  },
  E = (e, t = !1) => {
    if ((e === I && !t) || (q && !t)) return;
    ((q = !0), (u = I), (I = e));
    const l = O(u, e, o.length, t);
    let s = 0;
    if (l > 0) for (; r(u + s) !== e; ) s++;
    else for (; r(u - s) !== e; ) s++;
    const i =
      l > 0
        ? Array.from({ length: s }, (n, g) => r(u + g + 1))
        : l === 0
          ? [e]
          : Array.from({ length: s }, (n, g) => r(u - g - 1));
    (c?.kill(),
      (c = p.timeline()),
      A(c, u),
      S.forEach((n, g) => {
        g === e
          ? (n.navigation.classList.add("active"),
            c.to(
              n.el,
              {
                pointerEvents: "auto",
                alpha: 1,
                duration: 0.7,
                ease: "linear",
              },
              0.7,
            ),
            (n.descriptionLines = n.el.querySelectorAll("p div")),
            c.fromTo(
              n.descriptionLines,
              { y: "0.4em" },
              {
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                stagger: { each: 0.15 },
              },
              1,
            ),
            c.fromTo(
              n.descriptionLines,
              { opacity: 0 },
              { opacity: 1, duration: 0.8, stagger: { each: 0.15 } },
              "<",
            ),
            n.logos.length > 0 &&
              c.fromTo(
                n.logos,
                { opacity: 0 },
                { stagger: 0.1, opacity: 1, duration: 0.3, ease: "linear" },
                1.2,
              ))
          : (n.navigation.classList.remove("active"),
            c.to(
              n.el,
              {
                alpha: 0,
                duration: 0.7,
                ease: "linear",
                pointerEvents: "none",
              },
              0,
            ));
      }));
    const a = 0.8;
    (c.to(
      o[u],
      { scale: k(o[u], m ? 294 : 172), duration: a, ease: "immg.zoomOut" },
      0,
    ),
      i.forEach((n, g) => {
        o.length === 3 ? P(c, n, l, a) : b(c, n, l, a, g == 0 ? a - 0.2 : 0);
      }));
    const f = o.length === 3 ? 0.9 : i.length > 1 ? 0.4 : 1.1;
    (c.to(o[I], { scale: 1, duration: a, ease: "immg.zoomOut" }, `-=${f}`),
      c.add(() => {
        q = !1;
      }));
  },
  z = () => {
    const e = window.innerWidth;
    if (e < 1024) {
      (S.forEach((t, l) => {
        t.slide.removeEventListener("click", () => E(l));
      }),
        c?.kill(),
        p.set(o, { clearProps: "all" }),
        p.set(v, { clearProps: "height" }),
        L && p.set(L, { clearProps: "height" }));
      return;
    }
    ((h = 0),
      (d = 0),
      (m = e >= 1680),
      S.forEach((t) => {
        (t.el?.clientHeight > h && (h = t.el.clientHeight),
          t.slide?.clientHeight > d && (d = t.slide.clientHeight));
      }),
      v && p.set(v, { height: h }),
      L && p.set(L, { height: d }),
      E(I, !0));
  },
  W = () => {
    ((h = 0),
      (d = 0),
      (w = document.querySelectorAll(".navigation-social-item")),
      (H = document.querySelectorAll(".navigation-social-button")),
      (v = document.querySelector("#content-social-dk")),
      (o = document.querySelectorAll(".slide")),
      (L = document.querySelector(".images-container")),
      (S = Array.from(v?.querySelectorAll(".content-social-item") || []).map(
        (e, t) => (
          e?.clientHeight > h && (h = e.clientHeight),
          o[t]?.clientHeight > d && (d = o[t].clientHeight),
          {
            el: e,
            navigation: w[t],
            slide: o[t],
            button: H[t],
            logos: e.querySelectorAll(".logo-item"),
            descriptionLines: e.querySelectorAll("p div"),
          }
        ),
      )),
      !(window.innerWidth < 1024 || !v) &&
        (z(),
        S.forEach((e, t) => {
          (e.slide.addEventListener("click", () => E(t)),
            e.button.addEventListener("click", () => E(t)));
        }),
        window.addEventListener("resize", z)));
  },
  C = () => {
    (window.removeEventListener("resize", z),
      S.forEach((e, t) => {
        (e.slide.removeEventListener("click", () => E(t)),
          e.button.removeEventListener("click", () => E(t)));
      }));
  };
document.addEventListener("astro:page-load", W);
document.addEventListener("astro:before-preparation", C);
