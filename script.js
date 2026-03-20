// Customize optional social links here
const INSTAGRAM_URL = ""; // e.g. "https://instagram.com/your_handle"
const WEBSITE_URL = ""; // e.g. "https://your-website.com"
const BUSINESS_HOURS = ""; // e.g. "Mon–Sat: 9:00 AM – 7:00 PM"

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

function setAnchorHref(anchor, href, { newTab = false } = {}) {
  if (!anchor) return;
  anchor.href = href;
  anchor.hidden = false;
  if (newTab) {
    anchor.target = "_blank";
    anchor.rel = "noopener";
  }
}

function hideElement(element) {
  if (!element) return;
  element.hidden = true;
}

function flashButtonLabel(button, label, ms = 1400) {
  if (!button) return;
  const labelEl = button.querySelector(".btnLabel");
  if (labelEl) {
    const original = button.dataset.originalLabel || labelEl.textContent;
    button.dataset.originalLabel = original;
    labelEl.textContent = label;
    window.setTimeout(() => {
      labelEl.textContent = original;
    }, ms);
    return;
  }

  const original = button.dataset.originalLabel || button.textContent;
  button.dataset.originalLabel = original;
  button.textContent = label;
  window.setTimeout(() => {
    button.textContent = original;
  }, ms);
}

async function copyToClipboard(text) {
  const value = String(text || "").trim();
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    // fall back below
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function buildVCard({ url } = {}) {
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
    ...(url ? [`URL:${url}`] : []),
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

  const address = $("shop-address")?.textContent?.trim() || SHOP.address;
  const pageUrl = window.location.href.split("#")[0];

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeQuery(address)}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeQuery(address)}&output=embed`;

  setAnchorHref($("btn-directions"), mapsUrl, { newTab: true });
  setAnchorHref($("btn-directions-address"), mapsUrl, { newTab: true });
  setAnchorHref($("cta-directions"), mapsUrl, { newTab: true });

  const mapFrame = $("map-embed");
  if (mapFrame) mapFrame.src = mapsEmbedUrl;

  const whatsappText = encodeQuery(
    `Hello ${OWNER.fullName} ji, I need help related to submersible pump (Openwell/Borewell).`
  );
  const whatsappHref = `https://wa.me/${OWNER.phoneE164.replace("+", "")}?text=${whatsappText}`;
  setAnchorHref($("btn-whatsapp"), whatsappHref, { newTab: true });
  setAnchorHref($("cta-whatsapp"), whatsappHref, { newTab: true });

  const website = $("btn-website");
  if (WEBSITE_URL?.trim()) setAnchorHref(website, WEBSITE_URL.trim(), { newTab: true });
  else hideElement(website);

  const instagram = $("btn-instagram");
  if (INSTAGRAM_URL?.trim()) setAnchorHref(instagram, INSTAGRAM_URL.trim(), { newTab: true });
  else hideElement(instagram);

  const hours = $("business-hours");
  if (hours && BUSINESS_HOURS?.trim()) hours.textContent = BUSINESS_HOURS.trim();

  const copyBtn = $("btn-copy-address");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      await copyToClipboard(address);
      flashButtonLabel(copyBtn, "Copied!");
    });
  }

  const shareBtn = $("btn-share");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: SHOP.name,
        text: `${SHOP.name} — Submersible pumps sales & service`,
        url: pageUrl,
      };

      try {
        if (navigator.share) await navigator.share(shareData);
        else {
          await copyToClipboard(pageUrl);
          flashButtonLabel(shareBtn, "Link Copied!");
        }
      } catch {
        // user dismissed share sheet; no-op
      }
    });
  }

  const saveBtn = $("btn-save");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const vcardUrl = WEBSITE_URL?.trim() ? WEBSITE_URL.trim() : pageUrl;
      const vcard = buildVCard({ url: vcardUrl });
      downloadTextFile({
        filename: "Bhagawat_Singh_Rathore-Chamunda_Machinery_Store.vcf",
        mimeType: "text/vcard;charset=utf-8",
        text: vcard,
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
