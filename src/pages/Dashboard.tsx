import { MetricsCards } from '@/components/dashboard/MetricsCards'
import { ProjectionChart } from '@/components/dashboard/ProjectionChart'
import { GoalsProgress } from '@/components/dashboard/GoalsProgress'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

interface DashboardProps {
  onNavigate?: (page: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your financial progress and projections.
        </p>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projection Chart - Takes 2 columns */}
        <ProjectionChart />
        
        {/* Goals Progress - Takes 1 column */}
        <GoalsProgress />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity />
        
        {/* Quick Actions Card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <p className="text-primary-foreground/80 mb-4">
            Take control of your financial future with these tools
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors">
              <div className="text-sm font-medium">Add Transaction</div>
              <div className="text-xs text-primary-foreground/80">Record income/expense</div>
            </button>
            <button 
              onClick={() => onNavigate?.('scenarios')}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
            >
              <div className="text-sm font-medium">Create Scenario</div>
              <div className="text-xs text-primary-foreground/80">Model what-if situations</div>
            </button>
            <button className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors">
              <div className="text-sm font-medium">Set New Goal</div>
              <div className="text-xs text-primary-foreground/80">Define financial targets</div>
            </button>
            <button 
              onClick={() => onNavigate?.('projections')}
              className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
            >
              <div className="text-sm font-medium">Run Projection</div>
              <div className="text-xs text-primary-foreground/80">Forecast your future</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}