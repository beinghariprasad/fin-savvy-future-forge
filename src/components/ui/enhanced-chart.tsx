import * as React from "react"
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

interface ChartWrapperProps {
  children: React.ReactElement
  className?: string
  height?: number
}

export const ChartWrapper = React.forwardRef<HTMLDivElement, ChartWrapperProps>(
  ({ children, className, height = 300 }, ref) => (
    <div 
      ref={ref} 
      className={cn("w-full", className)} 
      style={{ height: `${height}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
)
ChartWrapper.displayName = "ChartWrapper"

interface ModernTooltipProps extends TooltipProps<any, any> {
  labelFormatter?: (value: any) => string
  valueFormatter?: (value: any, name: string) => [string, string]
}

export const ModernTooltip: React.FC<ModernTooltipProps> = ({ 
  active, 
  payload, 
  label,
  labelFormatter,
  valueFormatter
}) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="modern-card p-4 min-w-[200px] shadow-xl border border-border/50">
      {label && (
        <p className="font-semibold text-foreground mb-2">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.name || entry.dataKey}
              </span>
            </div>
            <span className="font-medium text-foreground">
              {valueFormatter 
                ? valueFormatter(entry.value, entry.name || entry.dataKey)?.[0] || entry.value
                : entry.value
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const EnhancedLineChart: React.FC<{
  data: any[]
  lines: Array<{
    dataKey: string
    name?: string
    color: string
    strokeWidth?: number
    strokeDasharray?: string
  }>
  height?: number
  className?: string
  labelFormatter?: (value: any) => string
  valueFormatter?: (value: any, name: string) => [string, string]
}> = ({ data, lines, height = 300, className, labelFormatter, valueFormatter }) => (
  <ChartWrapper height={height} className={className}>
    <LineChart data={data}>
      <CartesianGrid 
        strokeDasharray="3 3" 
        stroke="hsl(var(--border))" 
        opacity={0.3}
      />
      <XAxis 
        dataKey="year"
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => valueFormatter ? valueFormatter(value, 'value')[0] : value}
      />
      <Tooltip 
        content={<ModernTooltip labelFormatter={labelFormatter} valueFormatter={valueFormatter} />}
        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeOpacity: 0.3 }}
      />
      {lines.map((line, index) => (
        <Line
          key={line.dataKey}
          type="monotone"
          dataKey={line.dataKey}
          name={line.name || line.dataKey}
          stroke={line.color}
          strokeWidth={line.strokeWidth || 3}
          strokeDasharray={line.strokeDasharray}
          dot={{ 
            fill: line.color, 
            strokeWidth: 0, 
            r: 4,
            className: "hover:r-6 transition-all duration-200"
          }}
          activeDot={{ 
            r: 6, 
            stroke: line.color, 
            strokeWidth: 2,
            fill: 'hsl(var(--background))'
          }}
        />
      ))}
    </LineChart>
  </ChartWrapper>
)

export const EnhancedAreaChart: React.FC<{
  data: any[]
  areas: Array<{
    dataKey: string
    name?: string
    color: string
    fillOpacity?: number
    stackId?: string
  }>
  height?: number
  className?: string
  labelFormatter?: (value: any) => string
  valueFormatter?: (value: any, name: string) => [string, string]
}> = ({ data, areas, height = 300, className, labelFormatter, valueFormatter }) => (
  <ChartWrapper height={height} className={className}>
    <AreaChart data={data}>
      <CartesianGrid 
        strokeDasharray="3 3" 
        stroke="hsl(var(--border))" 
        opacity={0.3}
      />
      <XAxis 
        dataKey="year"
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => valueFormatter ? valueFormatter(value, 'value')[0] : value}
      />
      <Tooltip 
        content={<ModernTooltip labelFormatter={labelFormatter} valueFormatter={valueFormatter} />}
        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeOpacity: 0.3 }}
      />
      {areas.map((area, index) => (
        <Area
          key={area.dataKey}
          type="monotone"
          dataKey={area.dataKey}
          name={area.name || area.dataKey}
          stackId={area.stackId || "1"}
          stroke={area.color}
          fill={area.color}
          fillOpacity={area.fillOpacity || 0.6}
          strokeWidth={2}
        />
      ))}
    </AreaChart>
  </ChartWrapper>
)

export const EnhancedBarChart: React.FC<{
  data: any[]
  bars: Array<{
    dataKey: string
    name?: string
    color: string
    radius?: [number, number, number, number]
  }>
  height?: number
  className?: string
  labelFormatter?: (value: any) => string
  valueFormatter?: (value: any, name: string) => [string, string]
}> = ({ data, bars, height = 300, className, labelFormatter, valueFormatter }) => (
  <ChartWrapper height={height} className={className}>
    <BarChart data={data}>
      <CartesianGrid 
        strokeDasharray="3 3" 
        stroke="hsl(var(--border))" 
        opacity={0.3}
      />
      <XAxis 
        dataKey="year"
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => valueFormatter ? valueFormatter(value, 'value')[0] : value}
      />
      <Tooltip 
        content={<ModernTooltip labelFormatter={labelFormatter} valueFormatter={valueFormatter} />}
        cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
      />
      {bars.map((bar, index) => (
        <Bar
          key={bar.dataKey}
          dataKey={bar.dataKey}
          name={bar.name || bar.dataKey}
          fill={bar.color}
          radius={bar.radius || [4, 4, 0, 0]}
        />
      ))}
    </BarChart>
  </ChartWrapper>
)

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const EnhancedPieChart: React.FC<{
  data: Array<{ name: string; value: number; color: string }>
  height?: number
  className?: string
  innerRadius?: number
  outerRadius?: number
  showLabels?: boolean
  valueFormatter?: (value: any) => string
}> = ({ 
  data, 
  height = 300, 
  className, 
  innerRadius = 0, 
  outerRadius = 100, 
  showLabels = true,
  valueFormatter 
}) => (
  <ChartWrapper height={height} className={className}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={showLabels ? renderCustomizedLabel : false}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        fill="#8884d8"
        dataKey="value"
        stroke="hsl(var(--background))"
        strokeWidth={2}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip 
        content={
          <ModernTooltip 
            valueFormatter={valueFormatter ? (value, name) => [valueFormatter(value), name] : undefined} 
          />
        }
      />
      <Legend 
        wrapperStyle={{
          paddingTop: '20px',
          fontSize: '14px'
        }}
        iconType="circle"
      />
    </PieChart>
  </ChartWrapper>
)