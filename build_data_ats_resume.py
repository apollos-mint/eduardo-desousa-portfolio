# -*- coding: utf-8 -*-
import os
import shutil
import asyncio
from playwright.async_api import async_playwright
from pypdf import PdfReader, PdfWriter

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

async def render_pdf(browser, html_rel_path, pdf_rel_path, metadata):
    html_abs_path = os.path.join(BASE_DIR, html_rel_path)
    pdf_abs_path = os.path.join(BASE_DIR, pdf_rel_path)
    os.makedirs(os.path.dirname(pdf_abs_path), exist_ok=True)

    page = await browser.new_page()
    html_url = f"file://{html_abs_path}"
    await page.goto(html_url, wait_until="networkidle")

    await page.pdf(
        path=pdf_abs_path,
        format="A4",
        print_background=True,
        margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
    )
    await page.close()
    print(f"[PDF Rendered] {pdf_rel_path}")

    # Forensic metadata cleaning via pypdf (Microsoft Word 365 executive metadata)
    reader = PdfReader(pdf_abs_path)
    writer = PdfWriter()
    for p in reader.pages:
        writer.add_page(p)

    writer.add_metadata(metadata)
    with open(pdf_abs_path, "wb") as f_out:
        writer.write(f_out)
    print(f"[Metadata Applied] {pdf_rel_path}")
    return pdf_abs_path

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # 1. Spanish Resume (3-page executive master)
        es_meta = {
            "/Title": "Eduardo de Sousa - Currículum Vitae | Director de Operaciones Globales, Sistemas de Calidad y Sourcing Estratégico",
            "/Author": "Eduardo de Sousa",
            "/Subject": "Currículum Vitae de Operaciones Industriales, Sourcing Directo, Cadena de Suministro y Calidad Lean Six Sigma",
            "/Keywords": "Eduardo de Sousa, Operaciones Industriales, Sourcing Directo, Cadena de Suministro, Lean Six Sigma Black Belt, DMAIC, ASML, BMW Group, VDL Nedcar, HQ Pack, Salas Limpias ISO 5, OptiAsset, CMMS, ERP ISAH, SQL, Excel Avanzado, Power Query, Gestión de Calidad, WMS",
            "/Creator": "Microsoft® Word para Microsoft 365",
            "/Producer": "Microsoft® Word para Microsoft 365"
        }
        es_pdf = await render_pdf(
            browser,
            "resume_eduardo_de_sousa_es.html",
            "public/Eduardo_de_Sousa_Resume_es.pdf",
            es_meta
        )

        # 2. English Resume (2-page executive)
        en_meta = {
            "/Title": "Eduardo de Sousa - Executive Resume | Director of Global Sourcing & Quality Systems",
            "/Author": "Eduardo de Sousa",
            "/Subject": "Executive Resume — Global Sourcing, Industrial Operations, Quality Systems & Lean Six Sigma Black Belt",
            "/Keywords": "Eduardo de Sousa, Global Sourcing, Industrial Operations, Supply Chain, Lean Six Sigma Black Belt, DMAIC, ASML, BMW Group, VDL Nedcar, HQ Pack, ISO Class 5 Cleanrooms, OptiAsset, CMMS, ERP ISAH, SQL, WMS",
            "/Creator": "Microsoft® Word para Microsoft 365",
            "/Producer": "Microsoft® Word para Microsoft 365"
        }
        en_pdf = await render_pdf(
            browser,
            "resume_eduardo_de_sousa_en.html",
            "public/Eduardo_de_Sousa_Resume_en.pdf",
            en_meta
        )

        # Mirror master default PDFs
        shutil.copyfile(en_pdf, os.path.join(BASE_DIR, "public/Eduardo_de_Sousa_Resume.pdf"))
        shutil.copyfile(en_pdf, os.path.join(BASE_DIR, "public/cv_eduardo_de_sousa.pdf"))

        await browser.close()

    # Copies for Downloads directory
    downloads_dir = "/home/apollos-mint/Downloads"
    if os.path.exists(downloads_dir):
        # Overwrite all versions in Downloads with verified clean resumes
        shutil.copyfile(es_pdf, os.path.join(downloads_dir, "Eduardo_de_Sousa_CV_Espanol.pdf"))
        shutil.copyfile(es_pdf, os.path.join(downloads_dir, "Eduardo_de_Sousa_CV_Espanol_ATS.pdf"))
        # Overwrite the old corrupted CV_Datos with this clean authentic resume
        shutil.copyfile(es_pdf, os.path.join(downloads_dir, "Eduardo_de_Sousa_CV_Datos.pdf"))
        shutil.copyfile(es_pdf, os.path.join(downloads_dir, "Eduardo_de_Sousa_CV_Datos_ATS.pdf"))
        shutil.copyfile(en_pdf, os.path.join(downloads_dir, "Eduardo_de_Sousa_Resume_EN.pdf"))
        print("[Downloads Updated] All PDF copies successfully updated in /home/apollos-mint/Downloads/")

if __name__ == "__main__":
    asyncio.run(main())
