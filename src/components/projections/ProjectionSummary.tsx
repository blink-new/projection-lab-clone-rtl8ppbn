import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Home, CreditCard } from 'lucide-react'
import { ProjectionData, FinancialAccount } from '@/pages/Projections'

interface ProjectionSummaryProps {
  projectionData: ProjectionData[]
  accounts: FinancialAccount[]
}

export function ProjectionSummary({ projectionData, accounts }: ProjectionSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const currentData = projectionData[0]
  const futureData = projectionData[projectionData.length - 1]

  if (!currentData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Loading...</p>
                  <p className="text-2xl font-bold">$0</p>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const netWorthGrowth = futureData ? 
    ((futureData.totalNetWorth - currentData.totalNetWorth) / Math.abs(currentData.totalNetWorth) * 100) : 0

  const summaryCards = [
    {
      title: 'Current Net Worth',
      value: currentData.totalNetWorth,
      icon: DollarSign,
      color: currentData.totalNetWorth >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: currentData.totalNetWorth >= 0 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Total Assets',
      value: currentData.totalAssets,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Debts',
      value: currentData.totalDebts,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Projected Growth',
      value: netWorthGrowth,
      icon: TrendingUp,
      color: netWorthGrowth >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: netWorthGrowth >= 0 ? 'bg-green-100' : 'bg-red-100',
      isPercentage: true
    }
  ]

  const accountsByType = {
    savings: accounts.filter(a => a.type === 'savings'),
    investments: accounts.filter(a => a.type === 'investment'),
    realEstate: accounts.filter(a => a.type === 'real_estate'),
    debts: accounts.filter(a => a.type === 'debt')
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold">
                      {card.isPercentage 
                        ? `${card.value.toFixed(1)}%`
                        : formatCurrency(card.value)
                      }
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Account Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Savings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <PiggyBank className="w-4 h-4 mr-2 text-green-600" />
              Savings Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                {formatCurrency(currentData.savings)}
              </div>
              <div className="text-xs text-gray-600">
                {accountsByType.savings.length} account{accountsByType.savings.length !== 1 ? 's' : ''}
              </div>
              {accountsByType.savings.slice(0, 2).map((account) => (
                <div key={account.id} className="flex justify-between text-xs">
                  <span className="truncate">{account.name}</span>
                  <span>{formatCurrency(account.currentValue)}</span>
                </div>
              ))}
              {accountsByType.savings.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{accountsByType.savings.length - 2} more
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Investments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
              Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                {formatCurrency(currentData.investments)}
              </div>
              <div className="text-xs text-gray-600">
                {accountsByType.investments.length} account{accountsByType.investments.length !== 1 ? 's' : ''}
              </div>
              {accountsByType.investments.slice(0, 2).map((account) => (
                <div key={account.id} className="flex justify-between text-xs">
                  <span className="truncate">{account.name}</span>
                  <span>{formatCurrency(account.currentValue)}</span>
                </div>
              ))}
              {accountsByType.investments.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{accountsByType.investments.length - 2} more
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Real Estate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Home className="w-4 h-4 mr-2 text-purple-600" />
              Real Estate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                {formatCurrency(currentData.realEstate)}
              </div>
              <div className="text-xs text-gray-600">
                {accountsByType.realEstate.length} propert{accountsByType.realEstate.length !== 1 ? 'ies' : 'y'}
              </div>
              {accountsByType.realEstate.slice(0, 2).map((account) => (
                <div key={account.id} className="flex justify-between text-xs">
                  <span className="truncate">{account.name}</span>
                  <span>{formatCurrency(account.currentValue)}</span>
                </div>
              ))}
              {accountsByType.realEstate.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{accountsByType.realEstate.length - 2} more
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Debts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-red-600" />
              Debts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                {formatCurrency(currentData.debts)}
              </div>
              <div className="text-xs text-gray-600">
                {accountsByType.debts.length} debt{accountsByType.debts.length !== 1 ? 's' : ''}
              </div>
              {accountsByType.debts.slice(0, 2).map((account) => (
                <div key={account.id} className="flex justify-between text-xs">
                  <span className="truncate">{account.name}</span>
                  <span>{formatCurrency(Math.abs(account.currentValue))}</span>
                </div>
              ))}
              {accountsByType.debts.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{accountsByType.debts.length - 2} more
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}