import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { ProjectionData } from '@/pages/Projections'

interface ProjectionChartProps {
  data: ProjectionData[]
  projectionYears: number
}

export function ProjectionChart({ data, projectionYears }: ProjectionChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatTooltipValue = (value: number, name: string) => {
    return [formatCurrency(value), name]
  }

  const formatXAxisLabel = (tickItem: number) => {
    return tickItem.toString()
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Financial Projections
          </CardTitle>
          <CardDescription>
            Your net worth projection over {projectionYears} years
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Add financial accounts to see projections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Financial Projections
        </CardTitle>
        <CardDescription>
          Your net worth projection over {projectionYears} years (inflation-adjusted)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="assetsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="debtsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="year" 
                tickFormatter={formatXAxisLabel}
                className="text-xs"
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value).replace('$', '$').replace('.00', '')}
                className="text-xs"
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              
              {/* Net Worth Area */}
              <Area
                type="monotone"
                dataKey="totalNetWorth"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#netWorthGradient)"
                name="Net Worth"
              />
              
              {/* Assets Line */}
              <Line
                type="monotone"
                dataKey="totalAssets"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Total Assets"
              />
              
              {/* Debts Line */}
              <Line
                type="monotone"
                dataKey="totalDebts"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Total Debts"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
            <span>Net Worth (Assets - Debts)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1 bg-green-600 rounded mr-2"></div>
            <span>Total Assets</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1 bg-red-600 rounded mr-2"></div>
            <span>Total Debts</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}