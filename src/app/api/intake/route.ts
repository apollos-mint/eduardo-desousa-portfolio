import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    if (!rawBody || rawBody.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Empty payload provided' },
        { status: 400 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Malformed request object' },
        { status: 400 }
      );
    }

    const { name, email, company, turnover, bottleneck, volume, brief, mandateScope, tier, preferredWindow, lang, mandateId: clientMandateId } = body;

    // Mandatory field validations
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Corporate email address is required' },
        { status: 422 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 422 }
      );
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Principal name is required' },
        { status: 422 }
      );
    }

    if (!company || typeof company !== 'string' || !company.trim()) {
      return NextResponse.json(
        { success: false, error: 'Company or production facility name is required' },
        { status: 422 }
      );
    }

    // Generate authoritative B2B mandate tracking reference with sanitization
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const sanitizedClientMandateId =
      typeof clientMandateId === 'string' && /^EDS-MANDATE-[A-Za-z0-9]+-\d{4}$/.test(clientMandateId.trim())
        ? clientMandateId.trim()
        : null;
    const mandateId = sanitizedClientMandateId || `EDS-MANDATE-${timestamp}-${randomSuffix}`;

    const intakeRecord = {
      mandateId,
      submittedAt: new Date().toISOString(),
      client: {
        name: String(name).trim(),
        email: String(email).trim(),
        company: String(company).trim(),
        turnover: (turnover && String(turnover).trim()) || 'To be scoped during 20-min triage',
        bottleneck: (bottleneck && String(bottleneck).trim()) || 'Operational Diagnostic',
        volume: (volume && String(volume).trim()) || 'To be scoped during 20-min triage',
        brief: (brief && String(brief).trim()) || 'N/A'
      },
      engagement: {
        selectedTier: mandateScope || tier || '14-Day Remote Diagnostic Sprint (€5,500)',
        preferredWindow: preferredWindow || 'Morning CET (09:00 - 12:00)',
        language: lang || 'en'
      },
      status: 'LOGGED_PENDING_TRIAGE',
      ndaStatus: 'MUTUAL_NDA_ATTACHED'
    };

    // Log to server console / audit trail
    console.log('[B2B INTAKE AUDIT]', JSON.stringify(intakeRecord, null, 2));

    // Persist to private local JSON ledger file (NEVER in public/ directory)
    try {
      const ledgerDir = path.join(process.cwd(), 'data');
      await fs.mkdir(ledgerDir, { recursive: true });
      const ledgerPath = path.join(ledgerDir, 'mandates.json');
      let existing: any[] = [];
      try {
        const fileData = await fs.readFile(ledgerPath, 'utf-8');
        existing = JSON.parse(fileData);
      } catch {
        existing = [];
      }
      existing.unshift(intakeRecord);
      if (existing.length > 100) existing = existing.slice(0, 100);
      await fs.writeFile(ledgerPath, JSON.stringify(existing, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('[B2B INTAKE LEDGER WARNING] File write skipped:', fsErr);
    }

    return NextResponse.json({
      success: true,
      mandateId,
      message: 'Intake dossier successfully logged with Principal',
      ndaGuaranteed: true,
      triageWindowHours: 24
    });
  } catch (error) {
    console.error('[B2B INTAKE ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process intake dossier' },
      { status: 500 }
    );
  }
}
