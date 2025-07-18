import { useState, useEffect, useCallback } from 'react'
import { blink } from '@/blink/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Plus, TrendingUp, Calculator, Download, Settings } from 'lucide-react'
import { ProjectionChart } from '@/components/projections/ProjectionChart'
import { AccountsList } from '@/components/projections/AccountsList'
import { AddAccountDialog } from '@/components/projections/AddAccountDialog'
import { ProjectionSettings } from '@/components/projections/ProjectionSettings'
import { ProjectionSummary } from '@/components/projections/ProjectionSummary'

export interface FinancialAccount {
  id: string
  userId: string
  name: string
  type: 'savings' | 'investment' | 'real_estate' | 'debt'
  category: string
  currentValue: number
  interestRate: number
  monthlyContribution: number
  startDate: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectionData {
  year: number
  totalNetWorth: number
  totalAssets: number
  totalDebts: number
  savings: number
  investments: number
  realEstate: number
  debts: number
}

export function Projections() {
  const [accounts, setAccounts] = useState<FinancialAccount[]>([])
  const [projectionData, setProjectionData] = useState<ProjectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [projectionYears, setProjectionYears] = useState(30)
  const [inflationRate, setInflationRate] = useState(2.5)

  useEffect(() => {
    loadAccounts()
  }, [])

  const calculateProjections = useCallback(() => {
    const projections: ProjectionData[] = []
    const currentYear = new Date().getFullYear()

    for (let year = 0; year <= projectionYears; year++) {
      let totalAssets = 0
      let totalDebts = 0
      let savings = 0
      let investments = 0
      let realEstate = 0
      let debts = 0

      accounts.forEach(account => {
        const monthsElapsed = year * 12
        const annualRate = account.interestRate / 100
        const monthlyRate = annualRate / 12
        
        let value = account.currentValue

        if (account.type === 'debt') {
          // For debts, calculate remaining balance
          if (account.endDate) {
            const endYear = new Date(account.endDate).getFullYear()
            const totalMonths = (endYear - currentYear) * 12
            
            if (monthsElapsed < totalMonths) {
              // Calculate remaining debt balance
              const monthlyPayment = Math.abs(account.monthlyContribution)
              const remainingMonths = totalMonths - monthsElapsed
              value = -calculateLoanBalance(Math.abs(account.currentValue), monthlyRate, totalMonths, monthsElapsed)
            } else {
              value = 0 // Debt paid off
            }
          } else {
            // Ongoing debt
            value = account.currentValue - (account.monthlyContribution * monthsElapsed)
          }
          
          debts += Math.abs(value)
          totalDebts += Math.abs(value)
        } else {
          // For assets, calculate compound growth
          if (account.monthlyContribution !== 0) {
            // Future value of current amount + future value of monthly contributions
            const futureValueCurrent = value * Math.pow(1 + annualRate, year)
            const futureValueContributions = account.monthlyContribution * 
              (Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate
            value = futureValueCurrent + futureValueContributions
          } else {
            value = value * Math.pow(1 + annualRate, year)
          }

          // Adjust for inflation
          const inflationAdjustedValue = value / Math.pow(1 + inflationRate / 100, year)
          
          switch (account.type) {
            case 'savings':
              savings += inflationAdjustedValue
              break
            case 'investment':
              investments += inflationAdjustedValue
              break
            case 'real_estate':
              realEstate += inflationAdjustedValue
              break
          }
          
          totalAssets += inflationAdjustedValue
        }
      })

      const totalNetWorth = totalAssets - totalDebts

      projections.push({
        year: currentYear + year,
        totalNetWorth,
        totalAssets,
        totalDebts,
        savings,
        investments,
        realEstate,
        debts
      })
    }

    setProjectionData(projections)
  }, [accounts, projectionYears, inflationRate])

  useEffect(() => {
    if (accounts.length > 0) {
      calculateProjections()
    }
  }, [accounts, projectionYears, inflationRate, calculateProjections])

  const loadAccounts = async () => {
    try {
      setLoading(true)
      // For now, use mock data since database creation failed
      const mockAccounts: FinancialAccount[] = [
        {
          id: '1',
          userId: 'user1',
          name: 'Emergency Fund',
          type: 'savings',
          category: 'High Yield Savings',
          currentValue: 25000,
          interestRate: 4.5,
          monthlyContribution: 500,
          startDate: '2024-01-01',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          userId: 'user1',
          name: '401(k)',
          type: 'investment',
          category: 'Retirement Account',
          currentValue: 150000,
          interestRate: 7.0,
          monthlyContribution: 1500,
          startDate: '2020-01-01',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          userId: 'user1',
          name: 'Primary Home',
          type: 'real_estate',
          category: 'Primary Residence',
          currentValue: 450000,
          interestRate: 3.5,
          monthlyContribution: 0,
          startDate: '2022-01-01',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          userId: 'user1',
          name: 'Mortgage',
          type: 'debt',
          category: 'Home Loan',
          currentValue: -320000,
          interestRate: 6.5,
          monthlyContribution: -2200,
          startDate: '2022-01-01',
          endDate: '2052-01-01',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setAccounts(mockAccounts)
    } catch (error) {
      console.error('Error loading accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateLoanBalance = (principal: number, monthlyRate: number, totalMonths: number, monthsElapsed: number): number => {
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    
    const remainingBalance = principal * Math.pow(1 + monthlyRate, monthsElapsed) - 
      monthlyPayment * (Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate
    
    return Math.max(0, remainingBalance)
  }

  const addAccount = (account: Omit<FinancialAccount, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: FinancialAccount = {
      ...account,
      id: Date.now().toString(),
      userId: 'user1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setAccounts(prev => [...prev, newAccount])
  }

  const updateAccount = (id: string, updates: Partial<FinancialAccount>) => {
    setAccounts(prev => prev.map(account => 
      account.id === id 
        ? { ...account, ...updates, updatedAt: new Date().toISOString() }
        : account
    ))
  }

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projections...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Projections</h1>
          <p className="text-gray-600 mt-1">
            Model your financial future with detailed projections and scenario planning
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddAccount(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <ProjectionSummary 
        projectionData={projectionData}
        accounts={accounts}
      />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projection Chart */}
            <div className="lg:col-span-2">
              <ProjectionChart 
                data={projectionData}
                projectionYears={projectionYears}
              />
            </div>
            
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectionData.length > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Net Worth</span>
                      <span className="font-semibold">
                        ${projectionData[0]?.totalNetWorth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projected Net Worth (10Y)</span>
                      <span className="font-semibold text-green-600">
                        ${projectionData[10]?.totalNetWorth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projected Net Worth (30Y)</span>
                      <span className="font-semibold text-green-600">
                        ${projectionData[projectionYears]?.totalNetWorth.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Growth</span>
                      <span className="font-semibold text-blue-600">
                        {projectionData[0] && projectionData[projectionYears] ? 
                          (((projectionData[projectionYears].totalNetWorth - projectionData[0].totalNetWorth) / 
                            Math.abs(projectionData[0].totalNetWorth) * 100).toFixed(1)
                          ) : 0}%
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts">
          <AccountsList 
            accounts={accounts}
            onUpdate={updateAccount}
            onDelete={deleteAccount}
          />
        </TabsContent>

        <TabsContent value="scenarios">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning</CardTitle>
              <CardDescription>
                Compare different financial scenarios and their impact on your projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Scenario Planning</h3>
                <p className="text-gray-600 mb-4">
                  Create and compare different financial scenarios to see how changes affect your projections
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Scenario
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <ProjectionSettings 
            projectionYears={projectionYears}
            inflationRate={inflationRate}
            onProjectionYearsChange={setProjectionYears}
            onInflationRateChange={setInflationRate}
          />
        </TabsContent>
      </Tabs>

      {/* Add Account Dialog */}
      <AddAccountDialog 
        open={showAddAccount}
        onOpenChange={setShowAddAccount}
        onAdd={addAccount}
      />
    </div>
  )
}