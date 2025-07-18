import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Play, 
  Copy, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  TrendingDown,
  Calculator,
  BarChart3
} from 'lucide-react'
import { ScenarioForm } from '@/components/scenarios/ScenarioForm'
import { ScenarioComparison } from '@/components/scenarios/ScenarioComparison'
import { IncomeExpenseForm } from '@/components/scenarios/IncomeExpenseForm'

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

// Mock data for demonstration
const mockScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Current Plan',
    description: 'My current financial situation and projections',
    isActive: true,
    totalIncome: 8500,
    totalExpenses: 6200,
    netWorth: 127450,
    projectedGrowth: 12.5,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Career Change',
    description: 'What if I switch to a higher-paying job next year?',
    isActive: false,
    totalIncome: 11000,
    totalExpenses: 6800,
    netWorth: 127450,
    projectedGrowth: 18.2,
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    name: 'Conservative Savings',
    description: 'Lower risk investments and higher savings rate',
    isActive: false,
    totalIncome: 8500,
    totalExpenses: 5500,
    netWorth: 127450,
    projectedGrowth: 8.7,
    lastUpdated: '2024-01-08'
  }
]

export function Scenarios() {
  const [scenarios, setScenarios] = useState<Scenario[]>(mockScenarios)
  const [showScenarioForm, setShowScenarioForm] = useState(false)
  const [showIncomeExpenseForm, setShowIncomeExpenseForm] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'details'>('overview')

  const handleCreateScenario = () => {
    setSelectedScenario(null)
    setShowScenarioForm(true)
  }

  const handleEditScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setShowScenarioForm(true)
  }

  const handleManageIncomeExpenses = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setShowIncomeExpenseForm(true)
  }

  const handleActivateScenario = (scenarioId: string) => {
    setScenarios(prev => prev.map(s => ({
      ...s,
      isActive: s.id === scenarioId
    })))
  }

  const handleDeleteScenario = (scenarioId: string) => {
    setScenarios(prev => prev.filter(s => s.id !== scenarioId))
  }

  const handleDuplicateScenario = (scenario: Scenario) => {
    const newScenario: Scenario = {
      ...scenario,
      id: Date.now().toString(),
      name: `${scenario.name} (Copy)`,
      isActive: false,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setScenarios(prev => [...prev, newScenario])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scenario Planning</h1>
          <p className="text-gray-600 mt-1">
            Model different financial scenarios and compare their outcomes
          </p>
        </div>
        <Button onClick={handleCreateScenario} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Scenario
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'comparison', name: 'Comparison', icon: TrendingUp },
            { id: 'details', name: 'Details', icon: Calculator }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className={`hover:shadow-md transition-shadow ${
              scenario.isActive ? 'ring-2 ring-primary ring-opacity-50' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      {scenario.name}
                      {scenario.isActive && (
                        <Badge variant="default" className="ml-2 text-xs">
                          Active
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{scenario.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Monthly Income</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${scenario.totalIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Expenses</p>
                    <p className="text-lg font-semibold text-red-600">
                      ${scenario.totalExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Net Cash Flow</p>
                    <p className={`text-lg font-semibold ${
                      scenario.totalIncome - scenario.totalExpenses > 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      ${(scenario.totalIncome - scenario.totalExpenses).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Projected Growth</p>
                    <div className="flex items-center">
                      {scenario.projectedGrowth > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <p className={`text-lg font-semibold ${
                        scenario.projectedGrowth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.projectedGrowth > 0 ? '+' : ''}{scenario.projectedGrowth}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageIncomeExpenses(scenario)}
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicateScenario(scenario)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!scenario.isActive && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleActivateScenario(scenario.id)}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Activate
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteScenario(scenario.id)}
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
      )}

      {activeTab === 'comparison' && (
        <ScenarioComparison scenarios={scenarios} />
      )}

      {activeTab === 'details' && (
        <div className="text-center py-12">
          <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analysis</h3>
          <p className="text-gray-500 mb-4">
            Select a scenario to view detailed income, expenses, and projections
          </p>
          <Button variant="outline">
            Select Scenario
          </Button>
        </div>
      )}

      {/* Modals */}
      {showScenarioForm && (
        <ScenarioForm
          scenario={selectedScenario}
          onClose={() => setShowScenarioForm(false)}
          onSave={(scenario) => {
            if (selectedScenario) {
              setScenarios(prev => prev.map(s => s.id === scenario.id ? scenario : s))
            } else {
              setScenarios(prev => [...prev, { ...scenario, id: Date.now().toString() }])
            }
            setShowScenarioForm(false)
          }}
        />
      )}

      {showIncomeExpenseForm && selectedScenario && (
        <IncomeExpenseForm
          scenario={selectedScenario}
          onClose={() => setShowIncomeExpenseForm(false)}
          onSave={(updatedScenario) => {
            setScenarios(prev => prev.map(s => s.id === updatedScenario.id ? updatedScenario : s))
            setShowIncomeExpenseForm(false)
          }}
        />
      )}
    </div>
  )
}