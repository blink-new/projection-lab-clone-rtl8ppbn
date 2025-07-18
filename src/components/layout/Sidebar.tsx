import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BarChart3, 
  Calculator, 
  Target, 
  Settings, 
  TrendingUp,
  PieChart,
  DollarSign,
  Menu,
  X
} from 'lucide-react'

interface SidebarProps {
  className?: string
  currentPage?: string
  onPageChange?: (page: string) => void
}

const navigation = [
  { name: 'Dashboard', page: 'dashboard', icon: BarChart3 },
  { name: 'Projections', page: 'projections', icon: TrendingUp },
  { name: 'Scenarios', page: 'scenarios', icon: Calculator },
  { name: 'Goals', page: 'goals', icon: Target },
  { name: 'Net Worth', page: 'net-worth', icon: PieChart },
  { name: 'Cash Flow', page: 'cash-flow', icon: DollarSign },
  { name: 'Settings', page: 'settings', icon: Settings },
]

export function Sidebar({ className, currentPage = 'dashboard', onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      'flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Projection Lab</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isCurrent = currentPage === item.page
            return (
              <Button
                key={item.name}
                variant={isCurrent ? 'default' : 'ghost'}
                onClick={() => onPageChange?.(item.page)}
                className={cn(
                  'w-full justify-start text-left font-medium transition-colors',
                  isCollapsed ? 'px-2' : 'px-3',
                  isCurrent 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Icon className={cn('w-5 h-5', isCollapsed ? '' : 'mr-3')} />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">User</p>
              <p className="text-xs text-gray-500 truncate">Free Plan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}