import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { satisfaction: 4.5, delay: 2, customers: 12 },
  { satisfaction: 3.8, delay: 5, customers: 8 },
  { satisfaction: 4.2, delay: 3, customers: 15 },
  { satisfaction: 3.2, delay: 8, customers: 6 },
  { satisfaction: 4.8, delay: 1, customers: 18 },
  { satisfaction: 2.9, delay: 12, customers: 4 },
  { satisfaction: 4.1, delay: 4, customers: 10 },
  { satisfaction: 3.5, delay: 6, customers: 7 }
]

export function SatisfactionDelayScatter() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="delay" 
          name="Response Delay (hours)" 
          unit="h"
          label={{ value: 'Response Delay (hours)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          dataKey="satisfaction" 
          name="Satisfaction" 
          unit="/5"
          label={{ value: 'Satisfaction Rating', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter 
          name="Interactions" 
          data={data} 
          fill="#3b82f6"
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}