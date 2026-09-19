(() => {
  function val(td) {
    if (!td) return "";
    const n = td.getAttribute("data-n");
    if (n !== null && n !== "") return parseFloat(n);
    return (td.textContent || "").trim().toLowerCase();
  }
  document.querySelectorAll("table.data").forEach((table) => {
    const ths = [...table.querySelectorAll("th")];
    ths.forEach((th, idx) => {
      if (th.dataset.sort === "no") return;
      th.addEventListener("click", () => {
        const tbody = table.tBodies[0];
        if (!tbody) return;
        const rows = [...tbody.rows];
        const dir = th.dataset.dir === "asc" ? "desc" : "asc";
        ths.forEach((x) => delete x.dataset.dir);
        th.dataset.dir = dir;
        rows.sort((a, b) => {
          const av = val(a.cells[idx]);
          const bv = val(b.cells[idx]);
          const an = typeof av === "number" && !Number.isNaN(av);
          const bn = typeof bv === "number" && !Number.isNaN(bv);
          let cmp;
          if (an && bn) cmp = av - bv;
          else if (an) cmp = -1;
          else if (bn) cmp = 1;
          else cmp = String(av).localeCompare(String(bv));
          return dir === "asc" ? cmp : -cmp;
        });
        rows.forEach((r) => tbody.appendChild(r));
      });
    });
  });
})();
