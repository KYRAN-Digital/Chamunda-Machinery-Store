// Customize optional social links here
const INSTAGRAM_URL = ""; // e.g. "https://instagram.com/your_handle"
const WEBSITE_URL = ""; // e.g. "https://your-website.com"

const OWNER = {
  fullName: "Bhagawat Singh Rathore",
  phoneE164: "+919660667310",
  email: "bagawat1987@gmail.com",
};

const SHOP = {
  name: "Chamunda Machinery Store",
  phoneE164: "+919784157240",
  email: "chamundamachinarystores@gmail.com",
  address:
    "Hari Singh Ji Ka Vera, Near Vaishno Devi Temple, Village Guda Jait Singh, Somesar, Pali, Rajasthan 306503",
  note:
    "Submersible pumps (Openwell & Borewell) sales, service, repairing & on-site service. Pump sets 0.5HP–20HP, panels, cables, ropes, and all parts.",
};

function $(id) {
  return document.getElementById(id);
}

function encodeQuery(value) {
  return encodeURIComponent(value.trim().replace(/\s+/g, " "));
}

function setAnchorHref(anchor, href) {
  if (!anchor) return;
  anchor.href = href;
  anchor.classList.remove("disabled");
  anchor.removeAttribute("aria-disabled");
}

function disableAnchor(anchor) {
  if (!anchor) return;
  anchor.classList.add("disabled");
  anchor.setAttribute("aria-disabled", "true");
  anchor.addEventListener("click", (event) => event.preventDefault());
}

function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Rathore;Bhagawat Singh;;;`,
    `FN:${OWNER.fullName}`,
    `ORG:${SHOP.name}`,
    "TITLE:Owner",
    `TEL;TYPE=CELL:${OWNER.phoneE164}`,
    `TEL;TYPE=WORK:${SHOP.phoneE164}`,
    `EMAIL;TYPE=INTERNET:${OWNER.email}`,
    `EMAIL;TYPE=INTERNET;TYPE=WORK:${SHOP.email}`,
    `ADR;TYPE=WORK:;;${SHOP.address};;;;`,
    `NOTE:${SHOP.note}`,
    "END:VCARD",
  ];

  return `${lines.join("\r\n")}\r\n`;
}

function downloadTextFile({ filename, mimeType, text }) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function init() {
  const year = $("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeQuery(SHOP.address)}`;

  setAnchorHref($("btn-location"), mapsUrl);
  setAnchorHref($("btn-directions"), mapsUrl);

  const websiteHref = WEBSITE_URL?.trim() ? WEBSITE_URL.trim() : window.location.href.split("#")[0];
  setAnchorHref($("btn-website"), websiteHref);

  const whatsappText = encodeQuery(
    `Hello ${OWNER.fullName} ji, I need help related to submersible pump (Openwell/Borewell).`
  );
  const whatsappHref = `https://wa.me/${OWNER.phoneE164.replace("+", "")}?text=${whatsappText}`;
  setAnchorHref($("btn-whatsapp"), whatsappHref);

  const instagram = $("btn-instagram");
  if (INSTAGRAM_URL?.trim()) setAnchorHref(instagram, INSTAGRAM_URL.trim());
  else disableAnchor(instagram);

  const saveBtn = $("btn-save");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const vcard = buildVCard();
      downloadTextFile({
        filename: "Bhagawat_Singh_Rathore-Chamunda_Machinery_Store.vcf",
        mimeType: "text/vcard;charset=utf-8",
        text: vcard,
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
