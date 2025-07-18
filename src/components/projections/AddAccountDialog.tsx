import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PiggyBank, TrendingUp, Home, CreditCard } from 'lucide-react'
import { FinancialAccount } from '@/pages/Projections'

interface AddAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (account: Omit<FinancialAccount, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void
}

export function AddAccountDialog({ open, onOpenChange, onAdd }: AddAccountDialogProps) {
  const [accountType, setAccountType] = useState<'savings' | 'investment' | 'real_estate' | 'debt'>('savings')
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    currentValue: '',
    interestRate: '',
    monthlyContribution: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  })

  const accountTypes = [
    {
      id: 'savings',
      name: 'Savings Account',
      icon: PiggyBank,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'High-yield savings, checking accounts, CDs',
      categories: ['High Yield Savings', 'Checking Account', 'Certificate of Deposit', 'Money Market']
    },
    {
      id: 'investment',
      name: 'Investment Account',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: '401(k), IRA, brokerage accounts, stocks',
      categories: ['401(k)', 'Traditional IRA', 'Roth IRA', 'Brokerage Account', 'HSA']
    },
    {
      id: 'real_estate',
      name: 'Real Estate',
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Primary residence, rental properties, land',
      categories: ['Primary Residence', 'Rental Property', 'Commercial Property', 'Land']
    },
    {
      id: 'debt',
      name: 'Debt',
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Mortgages, credit cards, student loans',
      categories: ['Mortgage', 'Credit Card', 'Student Loan', 'Auto Loan', 'Personal Loan']
    }
  ]

  const selectedType = accountTypes.find(type => type.id === accountType)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const currentValue = parseFloat(formData.currentValue) || 0
    const interestRate = parseFloat(formData.interestRate) || 0
    const monthlyContribution = parseFloat(formData.monthlyContribution) || 0

    const account: Omit<FinancialAccount, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
      name: formData.name,
      type: accountType,
      category: formData.category,
      currentValue: accountType === 'debt' ? -Math.abs(currentValue) : currentValue,
      interestRate,
      monthlyContribution: accountType === 'debt' ? -Math.abs(monthlyContribution) : monthlyContribution,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined
    }

    onAdd(account)
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      currentValue: '',
      interestRate: '',
      monthlyContribution: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    })
    setAccountType('savings')
    onOpenChange(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Financial Account</DialogTitle>
          <DialogDescription>
            Add a new account to include in your financial projections
          </DialogDescription>
        </DialogHeader>

        <Tabs value={accountType} onValueChange={(value) => setAccountType(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            {accountTypes.map((type) => {
              const Icon = type.icon
              return (
                <TabsTrigger key={type.id} value={type.id} className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{type.name.split(' ')[0]}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {accountTypes.map((type) => {
            const Icon = type.icon
            return (
              <TabsContent key={type.id} value={type.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className={`w-8 h-8 ${type.bgColor} rounded-full flex items-center justify-center mr-3`}>
                        <Icon className={`w-4 h-4 ${type.color}`} />
                      </div>
                      {type.name}
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Account Name</Label>
                          <Input
                            id="name"
                            placeholder={`e.g., ${type.name === 'Savings Account' ? 'Emergency Fund' : 
                              type.name === 'Investment Account' ? 'My 401(k)' :
                              type.name === 'Real Estate' ? 'Primary Home' : 'Mortgage'}`}
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {type.categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentValue">
                            Current {type.id === 'debt' ? 'Balance' : 'Value'}
                          </Label>
                          <Input
                            id="currentValue"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.currentValue}
                            onChange={(e) => updateFormData('currentValue', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="interestRate">
                            {type.id === 'debt' ? 'Interest Rate' : 'Growth Rate'} (% annually)
                          </Label>
                          <Input
                            id="interestRate"
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.interestRate}
                            onChange={(e) => updateFormData('interestRate', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="monthlyContribution">
                            Monthly {type.id === 'debt' ? 'Payment' : 'Contribution'}
                          </Label>
                          <Input
                            id="monthlyContribution"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.monthlyContribution}
                            onChange={(e) => updateFormData('monthlyContribution', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => updateFormData('startDate', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {type.id === 'debt' && (
                        <div>
                          <Label htmlFor="endDate">Payoff Date (optional)</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => updateFormData('endDate', e.target.value)}
                          />
                        </div>
                      )}

                      <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          Add {type.name}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}