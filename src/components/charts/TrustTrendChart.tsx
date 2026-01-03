import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: '1', score: 65 },
  { day: '5', score: 68 },
  { day: '10', score: 72 },
  { day: '15', score: 70 },
  { day: '20', score: 75 },
  { day: '25', score: 78 },
  { day: '30', score: 82 }
]

export function TrustTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Trust Score', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="score" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}