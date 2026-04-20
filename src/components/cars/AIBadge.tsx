import { AIValuation } from '../../types';
import { AI_RATING_CONFIG } from '../../lib/aiValuation';

interface AIBadgeProps {
  valuation: AIValuation;
  showDetails?: boolean;
  size?: 'sm' | 'md';
}

export function AIBadge({ valuation, showDetails = false, size = 'sm' }: AIBadgeProps) {
  const config = AI_RATING_CONFIG[valuation.rating];

  return (
    <div className={`inline-flex flex-col ${size === 'sm' ? 'gap-0' : 'gap-0.5'}`}>
      <span className={config.badgeClass}>
        {valuation.rating === 'chollo_excelente' && (
          <span className="text-xs">🔥</span>
        )}
        {config.label}
      </span>
      {showDetails && valuation.priceDiffPercent !== 0 && (
        <span className={`text-xs ${config.detailColor} font-medium`}>
          {valuation.priceDiffPercent < 0
            ? `${Math.abs(valuation.priceDiffPercent)}% menos que el mercado`
            : `${valuation.priceDiffPercent}% más que el mercado`}
        </span>
      )}
    </div>
  );
}
