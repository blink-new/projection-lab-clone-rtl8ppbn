import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Target, Plus, Calendar, DollarSign } from 'lucide-react'

const goals = [
  {
    id: 1,
    title: 'Emergency Fund',
    target: 25000,
    current: 18500,
    deadline: '2024-12-31',
    category: 'Safety Net',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'House Down Payment',
    target: 80000,
    current: 32000,
    deadline: '2026-06-30',
    category: 'Real Estate',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Retirement Fund',
    target: 1200000,
    current: 127450,
    deadline: '2042-01-01',
    category: 'Retirement',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Vacation Fund',
    target: 8000,
    current: 3200,
    deadline: '2024-08-15',
    category: 'Lifestyle',
    color: 'bg-orange-500'
  }
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

const getTimeRemaining = (deadline: string) => {
  const now = new Date()
  const target = new Date(deadline)
  const diffTime = target.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Overdue'
  if (diffDays < 30) return `${diffDays} days`
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months`
  return `${Math.ceil(diffDays / 365)} years`
}

export function GoalsProgress() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Financial Goals</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Track progress towards your financial objectives
            </p>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            const remaining = goal.target - goal.current
            
            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${goal.color}`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-xs text-gray-500">{goal.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </p>
                    <p className="text-xs text-gray-500">{progress.toFixed(1)}% complete</p>
                  </div>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{formatCurrency(remaining)} remaining</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{getTimeRemaining(goal.deadline)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium text-gray-900">
              {goals.filter(g => (g.current / g.target) >= 1).length} of {goals.length} completed
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}