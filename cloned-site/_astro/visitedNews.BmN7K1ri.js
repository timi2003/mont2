function i() {
    let s = [];
    const t = localStorage.getItem("visitedNews") || "";
    if (t) {
        const e = JSON.parse(t)?.visitedNews;
        Array.isArray(e) && (s = e)
    }
    return s
}
function a(s) {
    const t = i()
      , e = new Set(t);
    e.add(s),
    localStorage.setItem("visitedNews", JSON.stringify({
        visitedNews: [...e.values()]
    }))
}
export {a, i as g};
