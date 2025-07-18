import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  PiggyBank, 
  TrendingUp, 
  Home, 
  CreditCard,
  Plus
} from 'lucide-react'
import { FinancialAccount } from '@/pages/Projections'

interface AccountsListProps {
  accounts: FinancialAccount[]
  onUpdate: (id: string, updates: Partial<FinancialAccount>) => void
  onDelete: (id: string) => void
}

export function AccountsList({ accounts, onUpdate, onDelete }: AccountsListProps) {
  const [editingAccount, setEditingAccount] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'savings':
        return <PiggyBank className="w-4 h-4 text-green-600" />
      case 'investment':
        return <TrendingUp className="w-4 h-4 text-blue-600" />
      case 'real_estate':
        return <Home className="w-4 h-4 text-purple-600" />
      case 'debt':
        return <CreditCard className="w-4 h-4 text-red-600" />
      default:
        return <PiggyBank className="w-4 h-4 text-gray-600" />
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'savings':
        return 'bg-green-100 text-green-800'
      case 'investment':
        return 'bg-blue-100 text-blue-800'
      case 'real_estate':
        return 'bg-purple-100 text-purple-800'
      case 'debt':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case 'savings':
        return 'Savings'
      case 'investment':
        return 'Investment'
      case 'real_estate':
        return 'Real Estate'
      case 'debt':
        return 'Debt'
      default:
        return 'Unknown'
    }
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Accounts</CardTitle>
          <CardDescription>
            Manage your savings, investments, real estate, and debts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <PiggyBank className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts yet</h3>
            <p className="text-gray-600 mb-4">
              Add your financial accounts to start building projections
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Account
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Accounts</CardTitle>
        <CardDescription>
          Manage your savings, investments, real estate, and debts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">Interest Rate</TableHead>
                <TableHead className="text-right">Monthly Contribution</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getAccountIcon(account.type)}
                      <div>
                        <div className="font-medium">{account.name}</div>
                        <div className="text-sm text-gray-500">
                          Added {new Date(account.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAccountTypeColor(account.type)}>
                      {getAccountTypeName(account.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{account.category}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${
                      account.currentValue >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(Math.abs(account.currentValue))}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm">
                      {account.interestRate.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`text-sm font-medium ${
                      account.monthlyContribution >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {account.monthlyContribution === 0 
                        ? '—' 
                        : formatCurrency(Math.abs(account.monthlyContribution))
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingAccount(account.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete(account.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Account Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Total Assets</div>
            <div className="text-lg font-bold text-green-700">
              {formatCurrency(
                accounts
                  .filter(a => a.type !== 'debt')
                  .reduce((sum, a) => sum + a.currentValue, 0)
              )}
            </div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-sm text-red-600 font-medium">Total Debts</div>
            <div className="text-lg font-bold text-red-700">
              {formatCurrency(
                Math.abs(accounts
                  .filter(a => a.type === 'debt')
                  .reduce((sum, a) => sum + a.currentValue, 0))
              )}
            </div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Net Worth</div>
            <div className="text-lg font-bold text-blue-700">
              {formatCurrency(
                accounts.reduce((sum, a) => sum + a.currentValue, 0)
              )}
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Monthly Flow</div>
            <div className={`text-lg font-bold ${
              accounts.reduce((sum, a) => sum + a.monthlyContribution, 0) >= 0 
                ? 'text-green-700' 
                : 'text-red-700'
            }`}>
              {formatCurrency(
                accounts.reduce((sum, a) => sum + a.monthlyContribution, 0)
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}