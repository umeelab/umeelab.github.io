// Dùng chung cho index.html và product.html
const S = window.SITE;
const $ = (q, el = document) => el.querySelector(q);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = n => Number(n).toLocaleString("vi-VN") + "đ";
const SPARK = '<svg class="spark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C13 9 15 11 24 12 15 13 13 15 12 24 11 15 9 13 0 12 9 11 11 9 12 0Z"/></svg>';
const STATUS = { in: "Còn hàng", out: "Hết hàng" };
const ICON_PATHS = {
  // cốc đựng cọ trang điểm: thân cốc + 2 cây cọ
  brushcup: '<path d="M5.5 11h13l-1.3 8.3A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.7Z"/><path d="M8 15.5h8"/><path d="M9.5 11V7.5"/><path d="M9.5 7.5c-1.3 0-1.8-1.7-1.1-3.4.3-.9.8-1.4 1.1-2 .3.6.8 1.1 1.1 2 .7 1.7.2 3.4-1.1 3.4Z"/><path d="M14 11l1.4-3.6"/><path d="M15.4 7.4c1.2.5 2.3-.8 2.5-2.6.1-1-.1-1.6-.2-2.2-.5.3-1.1.7-1.7 1.4-1.2 1.4-1.8 2.9-.6 3.4Z"/>',
  earbuds: '<path d="M7.5 4A3.5 3.5 0 0 0 4 7.5 3.5 3.5 0 0 0 7.5 11H8v8.5a1.5 1.5 0 0 0 3 0V7a3 3 0 0 0-3-3Z"/><path d="M16.5 4A3.5 3.5 0 0 1 20 7.5 3.5 3.5 0 0 1 16.5 11H16v8.5a1.5 1.5 0 0 1-3 0V7a3 3 0 0 1 3-3Z"/>',
  figure: '<circle cx="12" cy="15" r="5.5"/><path d="M9.6 10.1C8.6 6.2 8.7 3 10.2 3s2 3.3 1.3 7.1M14.4 10.1c1-3.9.9-7.1-.6-7.1s-2 3.3-1.3 7.1"/><path d="M10 14.6v.4M14 14.6v.4M11.2 17h1.6"/>',
  headphone: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="6.5" rx="2"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="2"/>',
  star: '<path d="M12 3c.7 5.4 1.9 6.6 7 7.2-5.1.6-6.3 1.8-7 7.2-.7-5.4-1.9-6.6-7-7.2 5.1-.6 6.3-1.8 7-7.2Z"/>'
};
const icon = k => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[k] || ICON_PATHS.star}</svg>`;
const socialIcon = s => `<img src="assets/ic-${esc(s.id)}.svg" alt="" width="28" height="28">`;
const cat = id => S.categories.find(c => c.id === id) || {};
const link = p => `product.html?id=${encodeURIComponent(p.id)}`;

function photo(p, i = 0) {
  return p.images && p.images[i]
    ? `<img src="${esc(p.images[i])}" alt="${esc(p.name)}" loading="lazy">`
    : `<div class="ph-fake" role="img" aria-label="Chưa có ảnh"><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M6.3 17.7 17.7 6.3"/></svg></div>`;
}
function cardHTML(p) {
  const tags = [p.featured && `<span class="tag">✦ HOT</span>`, p.status === "out" && `<span class="tag out">HẾT HÀNG</span>`].filter(Boolean).join("");
  return `<article class="win card rv ${p.status === "out" ? "sold" : ""}">
    <a class="ph" href="${link(p)}" target="_blank" rel="noopener" aria-label="${esc(p.name)}">${photo(p)}<div class="tags">${tags}</div></a>
    <div class="bd">
      <span class="mono" style="color:var(--blue)">${esc(cat(p.category).name)}</span>
      <h3><a href="${link(p)}" target="_blank" rel="noopener">${esc(p.name)}</a></h3>
      <div class="price"><b>${money(p.price)}</b></div>
      <div class="ft"><span class="st ${p.status}">${STATUS[p.status]}</span><button class="btn pink sm" data-buy="${esc(p.id)}">Mua</button></div>
    </div></article>`;
}

function shell() {
  const b = S.brand;
  $("#hd").innerHTML = `<div class="wrap">
    <a class="logo" href="index.html"><img src="${esc(b.logo)}" alt="${esc(b.name)}"><small>${esc(b.slogan)}</small></a>
    <button class="menu-btn" aria-label="Mở menu" aria-expanded="false">☰</button>
    <nav class="nav">
      <a href="index.html#categories">Danh mục</a><a href="index.html#featured">Đề xuất</a>
      <a href="index.html#all">Sản phẩm</a><a href="index.html#faq">Hỏi đáp</a><a href="index.html#contact">Liên hệ</a>
    </nav></div>`;
  const nav = $(".nav"), mb = $(".menu-btn");
  mb.onclick = () => mb.setAttribute("aria-expanded", nav.classList.toggle("open"));
  nav.onclick = e => e.target.tagName === "A" && nav.classList.remove("open");
  $("#ft").innerHTML = `<div class="wrap"><img src="${esc(b.logoFooter || b.logo)}" alt="${esc(b.name)}"><span>© ${new Date().getFullYear()} ${esc(b.name)} · ${esc(b.slogan)}</span></div>`;

  // Icon social nổi ở góc dưới phải, luôn hiện khi cuộn
  document.body.insertAdjacentHTML("beforeend", `<nav class="fab" aria-label="Kênh liên hệ">${S.socials.map(s =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${socialIcon(s)}<span>${esc(s.label)}</span></a>`).join("")}</nav>`);

  // Popup chọn kênh mua: kênh đầu tiên (Instagram) được làm nổi bật
  document.body.insertAdjacentHTML("beforeend", `<div class="modal" id="buy" role="dialog" aria-modal="true" aria-labelledby="buy-t"><div class="win">
    <div class="bar pink"><i></i><i></i><i></i><span id="buy-t">mua_hang.exe</span><button aria-label="Đóng" data-close>×</button></div>
    <div class="in"><p>Nhắn cho Umee Lab để đặt <b id="buy-name"></b>. Tên sản phẩm đã được copy sẵn, bạn chỉ cần dán vào tin nhắn.</p>
    ${S.socials.map((s, i) => `<a class="ch ${i ? "" : "first"}" href="${esc(s.url)}" target="_blank" rel="noopener">${socialIcon(s)}<div><b>${esc(s.label)}${s.note ? `<span class="note">${esc(s.note)}</span>` : ""}</b><small>${esc(s.handle)}</small></div>→</a>`).join("")}
    <div class="copied" id="copied" aria-live="polite"></div></div></div></div>`);
  const modal = $("#buy");
  let last;
  const close = () => { modal.classList.remove("on"); last && last.focus(); };
  modal.onclick = e => (e.target === modal || e.target.closest("[data-close]")) && close();
  document.addEventListener("keydown", e => e.key === "Escape" && close());
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-buy]");
    if (!btn) return;
    const p = S.products.find(x => x.id === btn.dataset.buy);
    last = btn;
    $("#buy-name").textContent = p.name;
    const color = $(".swatches input:checked")?.value;
    const msg = `Chào Umee Lab, mình muốn đặt: ${p.name} (${money(p.price)})${color ? ` - màu ${color}` : ""}`;
    $("#copied").textContent = "";
    navigator.clipboard?.writeText(msg).then(() => $("#copied").textContent = "✓ Đã copy: " + msg, () => {});
    modal.classList.add("on");
    $(".ch", modal).focus();
  });
}

// Hiện dần khi cuộn tới; xong thì gỡ class để hiệu ứng hover của thẻ chạy bình thường
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    io.unobserve(el);
    el.classList.add("show");
    setTimeout(() => el.classList.remove("rv", "show"), 750);
  }), { threshold: .1 });
  document.querySelectorAll(".rv:not(.show)").forEach(el => io.observe(el));
}
