import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:de Sousa;Eduardo;;;
FN:Eduardo de Sousa
ORG:Operations & High-Tech Process Engineering
TITLE:Operations, Quality & Process Leader (Lean Six Sigma Black Belt)
TEL;TYPE=CELL,VOICE:+31661440045
TEL;TYPE=WHATSAPP,MSG:+34661440045
EMAIL;TYPE=PREF,INTERNET:desousaej@gmail.com
ADR;TYPE=HOME:;;Enguera;Comunidad Valenciana;;46810;Spain
NOTE:Staff Operations Leader | ASML Supply Chain | ISO 9001 Lead Auditor | VCA VOL Certified
URL:https://eduardo-desousa.com
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
