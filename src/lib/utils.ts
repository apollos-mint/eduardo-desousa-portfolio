import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateVCard(roleTitle?: string, note?: string) {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:de Sousa;Eduardo;;;
FN:Eduardo de Sousa
ORG:Digital Operations, Global Sourcing & Software Architecture
TITLE:${roleTitle || 'Director of Digital Operations, Quality Systems & Global Sourcing'}
TEL;TYPE=CELL,VOICE:+34661440045
TEL;TYPE=WHATSAPP,MSG:+34661440045
EMAIL;TYPE=PREF,INTERNET:desousaej@gmail.com
ADR;TYPE=WORK:;;Enguera;Comunidad Valenciana;;46810;Spain
NOTE:${note || 'Lean Six Sigma Black Belt (DMAIC) | ISO 9001:2015 Lead Auditor | CMMS Software Architect | Global Sourcing ($800K/yr) | Ex-ASML Supply Chain'}
URL:https://eduardodesousa.vercel.app
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Eduardo_de_Sousa_Contact.vcf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
