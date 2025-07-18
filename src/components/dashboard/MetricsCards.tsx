import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Target, PiggyBank, Calendar } from 'lucide-react'

const metrics = [
  {
    title: 'Current Net Worth',
    value: '$127,450',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    description: 'vs last month'
  },
  {
    title: 'Monthly Savings Rate',
    value: '23.4%',
    change: '+2.1%',
    trend: 'up',
    icon: PiggyBank,
    description: 'of income'
  },
  {
    title: 'Retirement Goal',
    value: '$1.2M',
    change: '67% complete',
    trend: 'up',
    icon: Target,
    description: 'by age 65'
  },
  {
    title: 'Years to FI',
    value: '18.2',
    change: '-0.8 years',
    trend: 'down',
    icon: Calendar,
    description: 'financial independence'
  }
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown
        
        return (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                <TrendIcon className={`h-3 w-3 ${
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-xs font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-xs text-gray-500">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}