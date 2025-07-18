import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'

interface Scenario {
  id: string
  name: string
  description: string
  isActive: boolean
  totalIncome: number
  totalExpenses: number
  netWorth: number
  projectedGrowth: number
  lastUpdated: string
}

interface ScenarioComparisonProps {
  scenarios: Scenario[]
}

export function ScenarioComparison({ scenarios }: ScenarioComparisonProps) {
  // Generate projection data for comparison
  const generateProjectionData = () => {
    const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030]
    
    return years.map(year => {
      const yearData: any = { year }
      
      scenarios.forEach(scenario => {
        const yearsFromNow = year - 2024
        const monthlyNetCashFlow = scenario.totalIncome - scenario.totalExpenses
        const annualNetCashFlow = monthlyNetCashFlow * 12
        const growthMultiplier = Math.pow(1 + (scenario.projectedGrowth / 100), yearsFromNow)
        
        yearData[scenario.name] = Math.round(
          scenario.netWorth + (annualNetCashFlow * yearsFromNow * growthMultiplier)
        )
      })
      
      return yearData
    })
  }

  const projectionData = generateProjectionData()

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  return (
    <div className="space-y-6">
      {/* Summary Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Scenario</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Monthly Income</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Monthly Expenses</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Net Cash Flow</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Projected Growth</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">5-Year Net Worth</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((scenario, index) => {
                  const netCashFlow = scenario.totalIncome - scenario.totalExpenses
                  const fiveYearNetWorth = projectionData.find(d => d.year === 2029)?.[scenario.name] || 0
                  
                  return (
                    <tr key={scenario.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: colors[index % colors.length] }}
                          />
                          <span className="font-medium">{scenario.name}</span>
                          {scenario.isActive && (
                            <Badge variant="default" className="text-xs">Active</Badge>
                          )}
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-green-600 font-medium">
                        ${scenario.totalIncome.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-red-600 font-medium">
                        ${scenario.totalExpenses.toLocaleString()}
                      </td>
                      <td className={`text-right py-3 px-4 font-medium ${
                        netCashFlow > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${netCashFlow.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end">
                          {scenario.projectedGrowth > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                          )}
                          <span className={`font-medium ${
                            scenario.projectedGrowth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {scenario.projectedGrowth > 0 ? '+' : ''}{scenario.projectedGrowth}%
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {formatCurrency(fiveYearNetWorth)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Net Worth Projection Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Net Worth Projection Comparison</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Compare how each scenario affects your net worth over time
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Adjust Timeline
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
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
                <Legend />
                {scenarios.map((scenario, index) => (
                  <Line
                    key={scenario.id}
                    type="monotone"
                    dataKey={scenario.name}
                    stroke={colors[index % colors.length]}
                    strokeWidth={scenario.isActive ? 3 : 2}
                    strokeDasharray={scenario.isActive ? '0' : '5 5'}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Cash Flow Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarios.map(s => ({
                name: s.name,
                income: s.totalIncome,
                expenses: s.totalExpenses,
                netFlow: s.totalIncome - s.totalExpenses
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#10B981" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="netFlow" fill="#2563EB" name="Net Cash Flow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Best Scenario */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-900">Best Performing</h4>
              </div>
              <p className="text-sm text-green-700">
                {scenarios.reduce((best, current) => 
                  current.projectedGrowth > best.projectedGrowth ? current : best
                ).name} shows the highest projected growth at {
                  Math.max(...scenarios.map(s => s.projectedGrowth))
                }% annually.
              </p>
            </div>

            {/* Highest Cash Flow */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Highest Cash Flow</h4>
              </div>
              <p className="text-sm text-blue-700">
                {scenarios.reduce((best, current) => 
                  (current.totalIncome - current.totalExpenses) > (best.totalIncome - best.totalExpenses) ? current : best
                ).name} generates ${Math.max(...scenarios.map(s => s.totalIncome - s.totalExpenses)).toLocaleString()} monthly.
              </p>
            </div>

            {/* Most Conservative */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingDown className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">Most Conservative</h4>
              </div>
              <p className="text-sm text-yellow-700">
                {scenarios.reduce((most, current) => 
                  current.totalExpenses < most.totalExpenses ? current : most
                ).name} has the lowest expenses at ${Math.min(...scenarios.map(s => s.totalExpenses)).toLocaleString()} monthly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}