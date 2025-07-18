import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  TrendingUp,
  Calendar,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  Utensils,
  Zap,
  Smartphone,
  Heart,
  GraduationCap,
  Plane
} from 'lucide-react'

interface IncomeSource {
  id: string
  name: string
  amount: number
  frequency: 'monthly' | 'yearly' | 'weekly' | 'bi-weekly'
  startDate?: string
  endDate?: string
  growthRate: number
  isActive: boolean
}

interface ExpenseCategory {
  id: string
  name: string
  amount: number
  frequency: 'monthly' | 'yearly' | 'weekly' | 'bi-weekly'
  categoryType: 'fixed' | 'variable' | 'discretionary'
  startDate?: string
  endDate?: string
  growthRate: number
  isActive: boolean
  icon?: string
}

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

interface IncomeExpenseFormProps {
  scenario: Scenario
  onClose: () => void
  onSave: (scenario: Scenario) => void
}

// Mock data for demonstration
const mockIncomeData: IncomeSource[] = [
  {
    id: '1',
    name: 'Primary Salary',
    amount: 7500,
    frequency: 'monthly',
    growthRate: 3,
    isActive: true
  },
  {
    id: '2',
    name: 'Freelance Work',
    amount: 1000,
    frequency: 'monthly',
    growthRate: 5,
    isActive: true
  }
]

const mockExpenseData: ExpenseCategory[] = [
  {
    id: '1',
    name: 'Rent/Mortgage',
    amount: 2200,
    frequency: 'monthly',
    categoryType: 'fixed',
    growthRate: 2,
    isActive: true,
    icon: 'home'
  },
  {
    id: '2',
    name: 'Groceries',
    amount: 600,
    frequency: 'monthly',
    categoryType: 'variable',
    growthRate: 3,
    isActive: true,
    icon: 'utensils'
  },
  {
    id: '3',
    name: 'Car Payment',
    amount: 450,
    frequency: 'monthly',
    categoryType: 'fixed',
    growthRate: 0,
    isActive: true,
    icon: 'car'
  },
  {
    id: '4',
    name: 'Utilities',
    amount: 180,
    frequency: 'monthly',
    categoryType: 'variable',
    growthRate: 2,
    isActive: true,
    icon: 'zap'
  },
  {
    id: '5',
    name: 'Entertainment',
    amount: 300,
    frequency: 'monthly',
    categoryType: 'discretionary',
    growthRate: 1,
    isActive: true,
    icon: 'plane'
  }
]

const expenseIcons = {
  home: Home,
  car: Car,
  utensils: Utensils,
  zap: Zap,
  smartphone: Smartphone,
  heart: Heart,
  graduationCap: GraduationCap,
  plane: Plane,
  creditCard: CreditCard,
  piggyBank: PiggyBank
}

export function IncomeExpenseForm({ scenario, onClose, onSave }: IncomeExpenseFormProps) {
  const [incomeData, setIncomeData] = useState<IncomeSource[]>(mockIncomeData)
  const [expenseData, setExpenseData] = useState<ExpenseCategory[]>(mockExpenseData)
  const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income')
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [editingIncome, setEditingIncome] = useState<IncomeSource | null>(null)
  const [editingExpense, setEditingExpense] = useState<ExpenseCategory | null>(null)

  // Form states
  const [incomeForm, setIncomeForm] = useState({
    name: '',
    amount: '',
    frequency: 'monthly' as const,
    growthRate: '0',
    isActive: true
  })

  const [expenseForm, setExpenseForm] = useState({
    name: '',
    amount: '',
    frequency: 'monthly' as const,
    categoryType: 'fixed' as const,
    growthRate: '0',
    isActive: true,
    icon: 'home'
  })

  const calculateMonthlyAmount = (amount: number, frequency: string) => {
    switch (frequency) {
      case 'weekly': return amount * 4.33
      case 'bi-weekly': return amount * 2.17
      case 'yearly': return amount / 12
      default: return amount
    }
  }

  const totalMonthlyIncome = incomeData
    .filter(item => item.isActive)
    .reduce((sum, item) => sum + calculateMonthlyAmount(item.amount, item.frequency), 0)

  const totalMonthlyExpenses = expenseData
    .filter(item => item.isActive)
    .reduce((sum, item) => sum + calculateMonthlyAmount(item.amount, item.frequency), 0)

  const handleAddIncome = () => {
    if (!incomeForm.name || !incomeForm.amount) return

    const newIncome: IncomeSource = {
      id: Date.now().toString(),
      name: incomeForm.name,
      amount: parseFloat(incomeForm.amount),
      frequency: incomeForm.frequency,
      growthRate: parseFloat(incomeForm.growthRate),
      isActive: incomeForm.isActive
    }

    setIncomeData(prev => [...prev, newIncome])
    setIncomeForm({
      name: '',
      amount: '',
      frequency: 'monthly',
      growthRate: '0',
      isActive: true
    })
    setShowIncomeForm(false)
  }

  const handleAddExpense = () => {
    if (!expenseForm.name || !expenseForm.amount) return

    const newExpense: ExpenseCategory = {
      id: Date.now().toString(),
      name: expenseForm.name,
      amount: parseFloat(expenseForm.amount),
      frequency: expenseForm.frequency,
      categoryType: expenseForm.categoryType,
      growthRate: parseFloat(expenseForm.growthRate),
      isActive: expenseForm.isActive,
      icon: expenseForm.icon
    }

    setExpenseData(prev => [...prev, newExpense])
    setExpenseForm({
      name: '',
      amount: '',
      frequency: 'monthly',
      categoryType: 'fixed',
      growthRate: '0',
      isActive: true,
      icon: 'home'
    })
    setShowExpenseForm(false)
  }

  const handleDeleteIncome = (id: string) => {
    setIncomeData(prev => prev.filter(item => item.id !== id))
  }

  const handleDeleteExpense = (id: string) => {
    setExpenseData(prev => prev.filter(item => item.id !== id))
  }

  const handleToggleIncomeActive = (id: string) => {
    setIncomeData(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ))
  }

  const handleToggleExpenseActive = (id: string) => {
    setExpenseData(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ))
  }

  const handleSave = () => {
    const updatedScenario: Scenario = {
      ...scenario,
      totalIncome: Math.round(totalMonthlyIncome),
      totalExpenses: Math.round(totalMonthlyExpenses),
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    onSave(updatedScenario)
  }

  const getCategoryTypeColor = (type: string) => {
    switch (type) {
      case 'fixed': return 'bg-blue-100 text-blue-800'
      case 'variable': return 'bg-yellow-100 text-yellow-800'
      case 'discretionary': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Income & Expenses - {scenario.name}</DialogTitle>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Income</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${totalMonthlyIncome.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Expenses</p>
                  <p className="text-2xl font-bold text-red-600">
                    ${totalMonthlyExpenses.toLocaleString()}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Net Cash Flow</p>
                  <p className={`text-2xl font-bold ${
                    totalMonthlyIncome - totalMonthlyExpenses > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    ${(totalMonthlyIncome - totalMonthlyExpenses).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="income">Income Sources</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          {/* Income Tab */}
          <TabsContent value="income" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Income Sources</h3>
              <Button onClick={() => setShowIncomeForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Income
              </Button>
            </div>

            {showIncomeForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add Income Source</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="income-name">Income Source Name</Label>
                      <Input
                        id="income-name"
                        value={incomeForm.name}
                        onChange={(e) => setIncomeForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Primary Salary, Freelance"
                      />
                    </div>
                    <div>
                      <Label htmlFor="income-amount">Amount</Label>
                      <Input
                        id="income-amount"
                        type="number"
                        value={incomeForm.amount}
                        onChange={(e) => setIncomeForm(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="income-frequency">Frequency</Label>
                      <Select value={incomeForm.frequency} onValueChange={(value) => 
                        setIncomeForm(prev => ({ ...prev, frequency: value as any }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="income-growth">Annual Growth Rate (%)</Label>
                      <Input
                        id="income-growth"
                        type="number"
                        value={incomeForm.growthRate}
                        onChange={(e) => setIncomeForm(prev => ({ ...prev, growthRate: e.target.value }))}
                        placeholder="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={incomeForm.isActive}
                        onCheckedChange={(checked) => setIncomeForm(prev => ({ ...prev, isActive: checked }))}
                      />
                      <Label>Active</Label>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => setShowIncomeForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddIncome}>
                        Add Income
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {incomeData.map((income) => (
                <Card key={income.id} className={`${!income.isActive ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <div>
                            <h4 className="font-medium">{income.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>${income.amount.toLocaleString()} / {income.frequency}</span>
                              <span>≈ ${calculateMonthlyAmount(income.amount, income.frequency).toLocaleString()} / month</span>
                              {income.growthRate > 0 && (
                                <span className="text-green-600">+{income.growthRate}% growth</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={income.isActive}
                          onCheckedChange={() => handleToggleIncomeActive(income.id)}
                        />
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteIncome(income.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Expense Categories</h3>
              <Button onClick={() => setShowExpenseForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            {showExpenseForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add Expense Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expense-name">Expense Name</Label>
                      <Input
                        id="expense-name"
                        value={expenseForm.name}
                        onChange={(e) => setExpenseForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Rent, Groceries"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expense-amount">Amount</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        value={expenseForm.amount}
                        onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expense-frequency">Frequency</Label>
                      <Select value={expenseForm.frequency} onValueChange={(value) => 
                        setExpenseForm(prev => ({ ...prev, frequency: value as any }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expense-category">Category Type</Label>
                      <Select value={expenseForm.categoryType} onValueChange={(value) => 
                        setExpenseForm(prev => ({ ...prev, categoryType: value as any }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="variable">Variable</SelectItem>
                          <SelectItem value="discretionary">Discretionary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expense-growth">Annual Growth Rate (%)</Label>
                      <Input
                        id="expense-growth"
                        type="number"
                        value={expenseForm.growthRate}
                        onChange={(e) => setExpenseForm(prev => ({ ...prev, growthRate: e.target.value }))}
                        placeholder="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expense-icon">Icon</Label>
                      <Select value={expenseForm.icon} onValueChange={(value) => 
                        setExpenseForm(prev => ({ ...prev, icon: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="utensils">Food</SelectItem>
                          <SelectItem value="zap">Utilities</SelectItem>
                          <SelectItem value="smartphone">Phone</SelectItem>
                          <SelectItem value="heart">Healthcare</SelectItem>
                          <SelectItem value="graduationCap">Education</SelectItem>
                          <SelectItem value="plane">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={expenseForm.isActive}
                        onCheckedChange={(checked) => setExpenseForm(prev => ({ ...prev, isActive: checked }))}
                      />
                      <Label>Active</Label>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => setShowExpenseForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddExpense}>
                        Add Expense
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {expenseData.map((expense) => {
                const IconComponent = expenseIcons[expense.icon as keyof typeof expenseIcons] || Home
                return (
                  <Card key={expense.id} className={`${!expense.isActive ? 'opacity-60' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5 text-gray-500" />
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{expense.name}</h4>
                                <Badge className={getCategoryTypeColor(expense.categoryType)}>
                                  {expense.categoryType}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>${expense.amount.toLocaleString()} / {expense.frequency}</span>
                                <span>≈ ${calculateMonthlyAmount(expense.amount, expense.frequency).toLocaleString()} / month</span>
                                {expense.growthRate > 0 && (
                                  <span className="text-red-600">+{expense.growthRate}% growth</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={expense.isActive}
                            onCheckedChange={() => handleToggleExpenseActive(expense.id)}
                          />
                          <Button variant="outline" size="sm">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}