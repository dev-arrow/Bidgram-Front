'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { WEEK_DAYS, WEEK_DAYS_LONG } from '@/lib/profiles'
import { cn } from '@/lib/utils'

export function WeekBarChart({
  data,
  className,
  height = 56,
}: {
  data: number[]
  className?: string
  height?: number
}) {
  const max = Math.max(...data, 1)
  const peak = data.indexOf(max)

  return (
    <div
      className={cn('flex items-end gap-1.5', className)}
      style={{ height }}
      role="img"
      aria-label={`Applications per day for the last 7 days: ${data
        .map((value, index) => `${WEEK_DAYS_LONG[index]} ${value}`)
        .join(', ')}`}
    >
      {data.map((value, index) => (
        <Tooltip key={index}>
          <TooltipTrigger
            render={
              <button
                type="button"
                className="group flex h-full flex-1 cursor-default flex-col justify-end rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            }
          >
            <span
              className={cn(
                'w-full origin-bottom animate-rise rounded-t-md transition-colors duration-200',
                index === peak
                  ? 'bg-primary group-hover:bg-primary/85'
                  : 'bg-primary/25 group-hover:bg-primary/50',
              )}
              style={{
                height: `${Math.max((value / max) * 100, 6)}%`,
                animationDelay: `${index * 55}ms`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            {WEEK_DAYS_LONG[index]}: {value} applied
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function WeekAxis({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex gap-1.5 text-[10px] font-medium text-muted-foreground', className)}
    >
      {WEEK_DAYS.map((day, index) => (
        <span key={index} className="flex-1 text-center">
          {day}
        </span>
      ))}
    </div>
  )
}
