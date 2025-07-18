import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Settings, TrendingUp, Calendar, Percent } from 'lucide-react'

interface ProjectionSettingsProps {
  projectionYears: number
  inflationRate: number
  onProjectionYearsChange: (years: number) => void
  onInflationRateChange: (rate: number) => void
}

export function ProjectionSettings({ 
  projectionYears, 
  inflationRate, 
  onProjectionYearsChange, 
  onInflationRateChange 
}: ProjectionSettingsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Projection Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Projection Timeline
          </CardTitle>
          <CardDescription>
            Set how far into the future you want to project your finances
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="projectionYears">Projection Years: {projectionYears}</Label>
            <div className="mt-2">
              <Slider
                id="projectionYears"
                min={5}
                max={50}
                step={1}
                value={[projectionYears]}
                onValueChange={(value) => onProjectionYearsChange(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 years</span>
                <span>50 years</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="projectionYearsInput">Or enter exact value:</Label>
            <Input
              id="projectionYearsInput"
              type="number"
              min="1"
              max="100"
              value={projectionYears}
              onChange={(e) => onProjectionYearsChange(parseInt(e.target.value) || 30)}
              className="mt-1"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Timeline Recommendations</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>5-10 years:</strong> Short-term financial goals</li>
              <li>• <strong>15-25 years:</strong> Home purchase, children's education</li>
              <li>• <strong>30-40 years:</strong> Retirement planning</li>
              <li>• <strong>40+ years:</strong> Long-term wealth building</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Economic Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Percent className="w-5 h-5 mr-2" />
            Economic Assumptions
          </CardTitle>
          <CardDescription>
            Adjust economic factors that affect your projections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="inflationRate">Annual Inflation Rate: {inflationRate.toFixed(1)}%</Label>
            <div className="mt-2">
              <Slider
                id="inflationRate"
                min={0}
                max={10}
                step={0.1}
                value={[inflationRate]}
                onValueChange={(value) => onInflationRateChange(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>10%</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="inflationRateInput">Or enter exact value:</Label>
            <Input
              id="inflationRateInput"
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={inflationRate}
              onChange={(e) => onInflationRateChange(parseFloat(e.target.value) || 2.5)}
              className="mt-1"
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Inflation Context</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• <strong>2-3%:</strong> Historical US average</li>
              <li>• <strong>0-2%:</strong> Low inflation environment</li>
              <li>• <strong>3-5%:</strong> Moderate inflation</li>
              <li>• <strong>5%+:</strong> High inflation scenario</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Advanced Settings
          </CardTitle>
          <CardDescription>
            Additional configuration options for your projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Calculation Method</h4>
              <p className="text-sm text-gray-600 mb-2">
                All projections use compound interest calculations with monthly compounding for accuracy.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Assets: Future Value with contributions</li>
                <li>• Debts: Amortization schedules</li>
                <li>• Inflation: Real value adjustments</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Assumptions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Interest rates remain constant</li>
                <li>• Monthly contributions are consistent</li>
                <li>• No major economic disruptions</li>
                <li>• Tax implications not included</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Limitations</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Projections are estimates only</li>
                <li>• Market volatility not modeled</li>
                <li>• Life events not considered</li>
                <li>• Regular review recommended</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}