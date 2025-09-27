import type { SituationDescriptionFormData } from '../../schemas';
import type { AnalysisResult } from './types';
import { SCORING_CONFIG, RECOMMENDATIONS } from './constants';

// Optimized analysis engine with better performance
export const AnalysisEngine = {
  analyzeSituationDescription(
    data: SituationDescriptionFormData
  ): AnalysisResult {
    let score = 0;
    const recommendations: string[] = [];

    // Pre-process text for keyword analysis
    const financialLower = data.currentFinancialSituation.toLowerCase();
    const employmentLower = data.employmentCircumstances.toLowerCase();
    const reasonLower = data.reasonForApplying.toLowerCase();

    // Length-based scoring
    if (
      data.currentFinancialSituation.length >=
      SCORING_CONFIG.FINANCIAL_LENGTH.threshold
    ) {
      score += SCORING_CONFIG.FINANCIAL_LENGTH.points;
    }
    if (
      data.employmentCircumstances.length >=
      SCORING_CONFIG.EMPLOYMENT_LENGTH.threshold
    ) {
      score += SCORING_CONFIG.EMPLOYMENT_LENGTH.points;
    }
    if (
      data.reasonForApplying.length >= SCORING_CONFIG.REASON_LENGTH.threshold
    ) {
      score += SCORING_CONFIG.REASON_LENGTH.points;
    }

    // Keyword-based scoring and recommendations
    const keywordChecks = [
      {
        text: financialLower,
        keyword: 'income',
        points: SCORING_CONFIG.INCOME_KEYWORD.points,
      },
      {
        text: financialLower,
        keyword: 'debt',
        recommendation: RECOMMENDATIONS.debt,
      },
      {
        text: employmentLower,
        keyword: 'contract',
        points: SCORING_CONFIG.CONTRACT_KEYWORD.points,
      },
      {
        text: employmentLower,
        keyword: 'unemployed',
        recommendation: RECOMMENDATIONS.unemployed,
      },
      {
        text: reasonLower,
        keyword: 'urgent',
        recommendation: RECOMMENDATIONS.urgent,
      },
    ];

    keywordChecks.forEach(({ text, keyword, points, recommendation }) => {
      if (text.includes(keyword)) {
        if (points) score += points;
        if (recommendation) recommendations.push(recommendation);
      }
    });

    // Score-based recommendations
    if (score < 50) {
      recommendations.push(RECOMMENDATIONS.lowScore);
    } else if (score >= 80) {
      recommendations.push(RECOMMENDATIONS.highScore);
    }

    return { validationScore: Math.min(score, 100), recommendations };
  },
};
