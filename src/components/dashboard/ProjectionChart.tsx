import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Button } from '@/components/ui/button'
import { Calendar, TrendingUp } from 'lucide-react'

const projectionData = [
  { year: 2024, netWorth: 127450, conservative: 120000, optimistic: 135000 },
  { year: 2025, netWorth: 165000, conservative: 155000, optimistic: 180000 },
  { year: 2026, netWorth: 208000, conservative: 195000, optimistic: 230000 },
  { year: 2027, netWorth: 257000, conservative: 240000, optimistic: 285000 },
  { year: 2028, netWorth: 312000, conservative: 290000, optimistic: 350000 },
  { year: 2029, netWorth: 374000, conservative: 345000, optimistic: 425000 },
  { year: 2030, netWorth: 443000, conservative: 405000, optimistic: 510000 },
  { year: 2035, netWorth: 785000, conservative: 680000, optimistic: 920000 },
  { year: 2040, netWorth: 1200000, conservative: 1000000, optimistic: 1450000 },
]

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toLocaleString()}`
}

export function ProjectionChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Net Worth Projection</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Track your financial growth over time with different scenarios
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Time Range
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Scenarios
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="year" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="optimistic"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#colorOptimistic)"
                name="Optimistic"
              />
              <Area
                type="monotone"
                dataKey="netWorth"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#colorCurrent)"
                name="Current Trajectory"
              />
              <Area
                type="monotone"
                dataKey="conservative"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#colorConservative)"
                name="Conservative"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Optimistic Scenario</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Current Trajectory</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Conservative Scenario</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}