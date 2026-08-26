export type Locale = 'en' | 'es' | 'pt' | 'nl' | 'de' | 'fr';

export interface PersonalInfo {
  name: string;
  surname: string;
  fullName: string;
  email: string;
  phones: {
    callsOnly: string;
    callsAndWhatsApp: string;
    whatsAppRaw: string;
  };
  location: string;
  birthDate: string;
  nationalities: string[];
  drivingLicenses: string;
  roleTitle: string;
  headline: string;
  summary: string;
}

export interface MetricItem {
  value: string;
  label: string;
  subtext?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  industry: string;
  summary: string;
  responsibilities: string[];
  metrics: MetricItem[];
  technologies: string[];
  partners?: string[];
  challenge: string;
  solution: string;
  impact: string;
  visualType: 'cleanroom' | 'automotive' | 'logistics' | 'commercial' | 'consulting';
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period?: string;
  type: 'degree' | 'certification';
  credentialBadge: string;
  description: string;
  keyTakeaways: string[];
  skillsAcquired: string[];
  verificationNote: string;
}

export interface SkillCategory {
  id: 'problem-solving' | 'quality-compliance' | 'systems-data' | 'technical-engineering';
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'problem-solving' | 'quality-compliance' | 'systems-data' | 'technical-engineering';
  level: number;
  description: string;
  methodology: string;
  practicalApplication: string;
  tools: string[];
  relatedExperienceIds: string[];
}

export interface HighlightSectionData {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  pillars: {
    title: string;
    description: string;
    icon: 'microchip' | 'shield' | 'globe' | 'trending-up';
  }[];
  keyStats: MetricItem[];
}

export interface CVContent {
  personal: PersonalInfo;
  hero: {
    badge: string;
    developedBySelfBadge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    downloadCvBtn: string;
    contactBtn: string;
    exploreBtn: string;
    availableForWork: string;
    verifiedBadge: string;
  };
  highlights: HighlightSectionData;
  experiences: ExperienceItem[];
  educationAndCertifications: EducationItem[];
  skills: SkillItem[];
  skillCategories: SkillCategory[];
  navigation: {
    about: string;
    experience: string;
    skills: string;
    certifications: string;
    specialization: string;
    contact: string;
    switchLanguage: string;
    toggleTheme: string;
    backToHome: string;
    viewDeepDive: string;
    clickToExpand: string;
    clickToCollapse: string;
    openDedicatedPage: string;
    allExperiences: string;
    allSkills: string;
    allCertificates: string;
    scheduleCall: string;
    downloadPdf: string;
    downloadVCard: string;
  };
  common: {
    overview: string;
    keyAchievements: string;
    operationalChallenge: string;
    engineeredSolution: string;
    measurableImpact: string;
    detailedResponsibilities?: string;
    coreCompetencies: string;
    relatedExperiences: string;
    technologiesAndFrameworks: string;
    industryPartners: string;
    nextMilestone: string;
    previousMilestone: string;
    contactTitle: string;
    contactSubtitle: string;
    sendMessage: string;
    phoneCalls: string;
    whatsAppDirect: string;
    emailDirect: string;
    locationLabel: string;
    allRightsReserved: string;
    systemStatus: string;
    operationalReady: string;
    craftedBySelf: string;
    executiveCv: string;
    availableForTravel: string;
    leanSixSigmaBadge: string;
    iso9001Auditor: string;
    asmlCleanroom: string;
    vcaVol: string;
    locations: string;
    fullStackArchitecture: string;
    techStackBadge: string;
    callsOnlyLabel: string;
    whatsAppLabel: string;
    andStandards: string;
    whatsAppPrefill: string;
    verifiedLead: string;
    portraitSubtitle: string;
    asmlSupplyChainBadge: string;
    credentialsBadge: string;
    educationAndCertificationsTitle: string;
    educationAndCertificationsSubtitle: string;
    dmaicGanttTitle: string;
    verifiedCredentialsDossier: string;
    careerMilestoneDossier: string;
    careerTrackRecord: string;
    careerExperiencesTitle: string;
    careerExperiencesSubtitle: string;
    visualSkillsMatrix: string;
    visualMatrixBadge: string;
    technicalSkillsTitle: string;
    technicalSkillsSubtitle: string;
    achievement1: string;
    achievement2: string;
    achievement3: string;
    ecosystemLabel: string;
    availabilityStatus: string;
  };
  contact: {
    inquiryReceived: string;
    inquiryMessage: string;
    sendAnother: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    topic: string;
    topicOption1: string;
    topicOption2: string;
    topicOption3: string;
    topicOption4: string;
    topicOption5: string;
    messageScope: string;
    messagePlaceholder: string;
    submit: string;
  };
}
