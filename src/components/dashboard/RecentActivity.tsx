import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'income',
    description: 'Salary Deposit',
    amount: 5200,
    date: '2024-01-15',
    category: 'Employment',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'expense',
    description: 'Rent Payment',
    amount: -1800,
    date: '2024-01-14',
    category: 'Housing',
    icon: TrendingDown,
    color: 'text-red-600'
  },
  {
    id: 3,
    type: 'investment',
    description: 'Index Fund Purchase',
    amount: -1000,
    date: '2024-01-12',
    category: 'Investments',
    icon: TrendingUp,
    color: 'text-blue-600'
  },
  {
    id: 4,
    type: 'expense',
    description: 'Groceries',
    amount: -320,
    date: '2024-01-11',
    category: 'Food',
    icon: CreditCard,
    color: 'text-orange-600'
  },
  {
    id: 5,
    type: 'savings',
    description: 'Emergency Fund',
    amount: -500,
    date: '2024-01-10',
    category: 'Savings',
    icon: PiggyBank,
    color: 'text-purple-600'
  },
  {
    id: 6,
    type: 'income',
    description: 'Freelance Project',
    amount: 800,
    date: '2024-01-08',
    category: 'Side Income',
    icon: DollarSign,
    color: 'text-green-600'
  }
]

const formatCurrency = (value: number) => {
  const abs = Math.abs(value)
  return `${value >= 0 ? '+' : '-'}$${abs.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  })
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Latest financial transactions and updates
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            const isPositive = activity.amount > 0
            
            return (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-semibold ${
                        isPositive ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {formatCurrency(activity.amount)}
                      </span>
                      {isPositive ? (
                        <ArrowUpRight className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.category}</p>
                    <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button variant="outline" className="w-full" size="sm">
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}