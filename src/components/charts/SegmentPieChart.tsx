import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface SegmentPieChartProps {
  segment?: string
}

const data = [
  { name: 'Loyal', value: 35, color: '#10b981' },
  { name: 'New', value: 25, color: '#3b82f6' },
  { name: 'At Risk', value: 20, color: '#f59e0b' },
  { name: 'Churned', value: 20, color: '#ef4444' }
]

export function SegmentPieChart({ segment = 'Loyal' }: SegmentPieChartProps) {
  const highlightIndex = data.findIndex(d => 
    d.name.toLowerCase().replace(' ', '') === (segment || 'Loyal').toLowerCase().replace(' ', '')
  )

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke={index === highlightIndex ? '#1f2937' : 'none'}
              strokeWidth={index === highlightIndex ? 2 : 0}
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Percentage']}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry: any) => (
            <span style={{ color: entry.color }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}