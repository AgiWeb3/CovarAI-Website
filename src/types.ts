export type Language = 'zh-CN' | 'zh-TW' | 'en';
export type ActivePageView = 'home' | 'products';
export type IndustryScenarioId = 'legal' | 'healthcare' | 'finance';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface IndustryScenario {
  id: IndustryScenarioId;
  name: string;
  badge: string;
  subtitle: string;
  iconName: string;
  headline: string;
  painPoints: {
    title: string;
    desc: string;
    risk: string;
  }[];
  solutionHighlights: {
    title: string;
    desc: string;
    tag: string;
  }[];
  useCases: {
    title: string;
    desc: string;
    metrics: string;
  }[];
  complianceBadges: string[];
  beforeVsAfter: {
    beforeTitle: string;
    beforeDesc: string;
    afterTitle: string;
    afterDesc: string;
  };
  samplePrompt: string;
  obfuscatedResultPreview: string;
  businessOutcome: string;
}

export interface BusinessValuePillar {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
}

export interface CrisisCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  impact: string;
  badge: string;
  riskLevel: 'critical' | 'high' | 'severe';
}

export interface ComparisonRow {
  solution: string;
  performance: string;
  performanceOk: boolean;
  capability: string;
  capabilityOk: boolean;
  sovereignty: string;
  sovereigntyOk: boolean;
  highlight?: boolean;
}

export interface DefenseLayer {
  id: 'trustgate' | 'enclavex' | 'covarpri';
  name: string;
  level: string;
  tagline: string;
  description: string;
  color: string;
  accentHex: string;
  features: {
    title: string;
    desc: string;
    icon: string;
  }[];
  techSpec: string;
}

export interface MetricItem {
  value: string;
  label: string;
  subtext: string;
  verifiedOn: string;
}

export interface DeploymentModel {
  modeNumber: string;
  title: string;
  targetAudience: string;
  coreValue: string;
  iconType: 'cloud' | 'server';
  features: string[];
  recommendedBadge?: string;
}

