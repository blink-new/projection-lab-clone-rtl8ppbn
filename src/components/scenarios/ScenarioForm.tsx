import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

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

interface ScenarioFormProps {
  scenario?: Scenario | null
  onClose: () => void
  onSave: (scenario: Scenario) => void
}

export function ScenarioForm({ scenario, onClose, onSave }: ScenarioFormProps) {
  const [formData, setFormData] = useState({
    name: scenario?.name || '',
    description: scenario?.description || '',
    isActive: scenario?.isActive || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Scenario name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const scenarioData: Scenario = {
      id: scenario?.id || '',
      name: formData.name.trim(),
      description: formData.description.trim(),
      isActive: formData.isActive,
      totalIncome: scenario?.totalIncome || 0,
      totalExpenses: scenario?.totalExpenses || 0,
      netWorth: scenario?.netWorth || 0,
      projectedGrowth: scenario?.projectedGrowth || 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    onSave(scenarioData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {scenario ? 'Edit Scenario' : 'Create New Scenario'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Scenario Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Scenario Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Career Change, Conservative Plan"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what this scenario represents..."
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="active">Set as Active Scenario</Label>
              <p className="text-sm text-gray-500">
                Make this your primary scenario for projections
              </p>
            </div>
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {scenario ? 'Update Scenario' : 'Create Scenario'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}