'use client'

import type { ComponentType, ReactNode } from 'react'
import { CalendarDays, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export function FormSection({
  icon: Icon,
  title,
  description,
  children,
  className,
  style,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description?: string
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <section
      className={cn(
        'animate-fade-up rounded-2xl border border-border bg-card p-5 lg:p-6',
        className,
      )}
      style={style}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold tracking-tight">{title}</h2>
          {description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

/** Marks a required field with an accent asterisk. */
export function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden="true">
      *
    </span>
  )
}

export function FieldLabelText({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <FieldLabel htmlFor={htmlFor} className="text-sm font-semibold">
      {children}
      {required ? <RequiredMark /> : null}
    </FieldLabel>
  )
}

/** A card for one entry in a repeatable list, with reorder + delete controls. */
export function RepeatableItem({
  title,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
  style,
}: {
  title: string
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      className="animate-fade-up rounded-xl border border-border bg-muted/30 p-4 lg:p-5"
      style={style}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-bold">{title}</p>
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Move ${title} up`}
            disabled={index === 0}
            onClick={onMoveUp}
          >
            <ChevronUp />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Move ${title} down`}
            disabled={index === total - 1}
            onClick={onMoveDown}
          >
            <ChevronDown />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Remove ${title}`}
            className="text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}

export function AddButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <Plus data-icon="inline-start" />
      {children}
    </Button>
  )
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  inputMode,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
}) {
  return (
    <Field>
      <FieldLabelText htmlFor={id} required={required}>
        {label}
      </FieldLabelText>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="h-9"
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  )
}

export function SelectField({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  required,
}: {
  id: string
  label: string
  value: string
  onValueChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
  required?: boolean
}) {
  return (
    <Field>
      <FieldLabelText htmlFor={id} required={required}>
        {label}
      </FieldLabelText>
      <Select value={value} onValueChange={(next) => onValueChange(String(next))}>
        <SelectTrigger id={id} className="h-9 w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

/** MM/YYYY date field with a calendar affordance. */
export function MonthYearField({
  id,
  label,
  value,
  onChange,
  placeholder = 'MM/YYYY',
  required,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <Field>
      <FieldLabelText htmlFor={id} required={required}>
        {label}
      </FieldLabelText>
      <InputGroup className="h-9">
        <InputGroupInput
          id={id}
          value={value}
          inputMode="numeric"
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <CalendarDays aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
