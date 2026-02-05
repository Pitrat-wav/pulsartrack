'use client';

interface DataPoint {
  label: string;
  impressions: number;
  clicks: number;
}

interface ImpressionChartProps {
  data: DataPoint[];
  height?: number;
}

function Bar({
  value,
  max,
  color,
  tooltip,
}: {
  value: number;
  max: number;
  color: string;
  tooltip: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="group relative flex-1">
      <div className="w-full bg-gray-700 rounded-sm overflow-hidden" style={{ height: 80 }}>
        <div
          className={`w-full rounded-sm transition-all duration-500 ${color}`}
          style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
        />
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {tooltip}
      </div>
    </div>
  );
}

export function ImpressionChart({ data, height = 160 }: ImpressionChartProps) {
  const maxImpressions = Math.max(...data.map((d) => d.impressions), 1);
  const maxClicks = Math.max(...data.map((d) => d.clicks), 1);
  const globalMax = Math.max(maxImpressions, maxClicks);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 text-sm" style={{ height }}>
        No data available
      </div>
    );
  }

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" /> Impressions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block" /> Clicks
        </span>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((point) => (
          <div key={point.label} className="flex-1 flex flex-col items-stretch gap-0.5">
            <div className="flex gap-0.5 items-end" style={{ height: height - 24 }}>
              <Bar
                value={point.impressions}
                max={globalMax}
                color="bg-indigo-500"
                tooltip={`${point.label}: ${point.impressions.toLocaleString()} impressions`}
              />
              <Bar
                value={point.clicks}
                max={globalMax}
                color="bg-cyan-500"
                tooltip={`${point.label}: ${point.clicks.toLocaleString()} clicks`}
              />
            </div>
            <p className="text-xs text-gray-500 text-center truncate">{point.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
