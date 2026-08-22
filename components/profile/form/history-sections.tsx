'use client'

import { useState } from 'react'
import {
  Award,
  Building2,
  GraduationCap,
  Info,
  Languages as LanguagesIcon,
  Plus,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  AddButton,
  FormSection,
  MonthYearField,
  RepeatableItem,
  SelectField,
  TextField,
} from '@/components/profile/form/form-primitives'
import {
  emptyCertification,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptyReference,
  languageProficiencies,
  reasonsForLeaving,
  type CertificationItem,
  type EducationItem,
  type ExperienceItem,
  type LanguageItem,
  type ReferenceItem,
} from '@/lib/profile-form'

/** Generic list helpers shared by every repeatable section. */
function useList<T extends { id: string }>(initial: T[]) {
  const [items, setItems] = useState<T[]>(initial)

  const add = (item: T) => setItems((prev) => [...prev, item])
  const remove = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id))
  const update = (id: string, patch: Partial<T>) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  const move = (index: number, direction: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev]
      const target = index + direction
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })

  return { items, add, remove, update, move }
}

export function WorkExperienceSection() {
  const { items, add, remove, update, move } = useList<ExperienceItem>([emptyExperience()])

  return (
    <FormSection
      icon={Building2}
      title="Work Experience"
      description="Add the roles that best represent your experience for this profile."
    >
      <div className="flex flex-col gap-4">
        <div>
          <AddButton onClick={() => add(emptyExperience())}>Add Work Experience</AddButton>
        </div>
        {items.map((item, index) => (
          <RepeatableItem
            key={item.id}
            title={`Role ${index + 1}`}
            index={index}
            total={items.length}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onRemove={() => remove(item.id)}
          >
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField id={`company-${item.id}`} label="Company Name" required value={item.company} onChange={(v) => update(item.id, { company: v })} placeholder="Company name" />
                <TextField id={`position-${item.id}`} label="Position Title" required value={item.positionTitle} onChange={(v) => update(item.id, { positionTitle: v })} placeholder="Position title" />
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-start">
                <TextField id={`work-location-${item.id}`} label="Work Location" value={item.location} onChange={(v) => update(item.id, { location: v })} placeholder="City, state, or remote" />
                <div className="md:w-40">
                  <MonthYearField id={`exp-start-${item.id}`} label="Start Date" required value={item.startDate} onChange={(v) => update(item.id, { startDate: v })} />
                </div>
                <div className="md:w-40">
                  <MonthYearField id={`exp-end-${item.id}`} label="End Date" value={item.endDate} onChange={(v) => update(item.id, { endDate: v })} placeholder={item.currentlyHere ? 'Present' : 'MM/YYYY'} />
                </div>
              </div>
              <Field orientation="horizontal">
                <Checkbox id={`current-${item.id}`} checked={item.currentlyHere} onCheckedChange={(checked) => update(item.id, { currentlyHere: checked === true })} />
                <FieldLabel htmlFor={`current-${item.id}`} className="text-sm font-normal">I currently work here</FieldLabel>
              </Field>
              <SelectField id={`reason-${item.id}`} label="Reason for Leaving" value={item.reasonForLeaving} onValueChange={(v) => update(item.id, { reasonForLeaving: v })} options={reasonsForLeaving} placeholder="Select a reason (optional)" />
              <AchievementList
                achievements={item.achievements}
                onChange={(achievements) => update(item.id, { achievements })}
                itemId={item.id}
              />
            </div>
          </RepeatableItem>
        ))}
      </div>
    </FormSection>
  )
}

function AchievementList({
  achievements,
  onChange,
  itemId,
}: {
  achievements: string[]
  onChange: (achievements: string[]) => void
  itemId: string
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-4">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-semibold">Achievements</p>
        <Tooltip>
          <TooltipTrigger
            render={
              <button type="button" aria-label="About achievements" className="text-muted-foreground">
                <Info className="size-3.5" />
              </button>
            }
          />
          <TooltipContent>Quantify impact where you can (metrics, scale, outcomes).</TooltipContent>
        </Tooltip>
      </div>
      {achievements.map((achievement, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={achievement}
            onChange={(event) => {
              const next = [...achievements]
              next[index] = event.target.value
              onChange(next)
            }}
            placeholder="Describe a measurable achievement"
            className="h-9"
            aria-label={`Achievement ${index + 1}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove achievement ${index + 1}`}
            className="text-destructive hover:text-destructive"
            onClick={() => onChange(achievements.filter((_, i) => i !== index))}
          >
            <X />
          </Button>
        </div>
      ))}
      <div>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...achievements, ''])}>
          <Plus data-icon="inline-start" />
          Add Achievement
        </Button>
      </div>
      <span className="sr-only">{`achievements for ${itemId}`}</span>
    </div>
  )
}

export function EducationSection() {
  const { items, add, remove, update, move } = useList<EducationItem>([emptyEducation()])

  return (
    <FormSection
      icon={GraduationCap}
      title="Education"
      description="List your degrees, schools, and areas of study."
    >
      <div className="flex flex-col gap-4">
        <div>
          <AddButton onClick={() => add(emptyEducation())}>Add Education</AddButton>
        </div>
        {items.map((item, index) => (
          <RepeatableItem
            key={item.id}
            title={`Education ${index + 1}`}
            index={index}
            total={items.length}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onRemove={() => remove(item.id)}
          >
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField id={`university-${item.id}`} label="University Name" required value={item.university} onChange={(v) => update(item.id, { university: v })} placeholder="University name" />
                <TextField id={`degree-${item.id}`} label="Degree" required value={item.degree} onChange={(v) => update(item.id, { degree: v })} placeholder="Degree" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField id={`major-${item.id}`} label="Major" value={item.major} onChange={(v) => update(item.id, { major: v })} placeholder="Major or specialization" />
                <TextField id={`edu-location-${item.id}`} label="Location" value={item.location} onChange={(v) => update(item.id, { location: v })} placeholder="City, state, or country" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <MonthYearField id={`edu-start-${item.id}`} label="Start Date" value={item.startDate} onChange={(v) => update(item.id, { startDate: v })} />
                <MonthYearField id={`edu-end-${item.id}`} label="End Date" value={item.endDate} onChange={(v) => update(item.id, { endDate: v })} placeholder={item.currentlyEnrolled ? 'Present' : 'MM/YYYY'} />
              </div>
              <Field orientation="horizontal">
                <Checkbox id={`enrolled-${item.id}`} checked={item.currentlyEnrolled} onCheckedChange={(checked) => update(item.id, { currentlyEnrolled: checked === true })} />
                <FieldLabel htmlFor={`enrolled-${item.id}`} className="text-sm font-normal">I&apos;m currently enrolled here</FieldLabel>
              </Field>
            </div>
          </RepeatableItem>
        ))}
      </div>
    </FormSection>
  )
}

export function CertificationsSection() {
  const { items, add, remove, update, move } = useList<CertificationItem>([])

  return (
    <FormSection
      icon={Award}
      title="Certifications"
      description="Add licenses and certifications relevant to your work."
    >
      <div className="flex flex-col gap-4">
        <div>
          <AddButton onClick={() => add(emptyCertification())}>Add Certification</AddButton>
        </div>
        {items.map((item, index) => (
          <RepeatableItem
            key={item.id}
            title={`Certification ${index + 1}`}
            index={index}
            total={items.length}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onRemove={() => remove(item.id)}
          >
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField id={`cert-name-${item.id}`} label="Certification Name" required value={item.name} onChange={(v) => update(item.id, { name: v })} placeholder="e.g. AWS Solutions Architect" />
                <TextField id={`cert-issuer-${item.id}`} label="Issuing Organization" value={item.issuer} onChange={(v) => update(item.id, { issuer: v })} placeholder="Issuer" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <MonthYearField id={`cert-date-${item.id}`} label="Issue Date" value={item.issueDate} onChange={(v) => update(item.id, { issueDate: v })} />
                <TextField id={`cert-url-${item.id}`} label="Credential URL" type="url" value={item.credentialUrl} onChange={(v) => update(item.id, { credentialUrl: v })} placeholder="https://credential.link" />
              </div>
            </div>
          </RepeatableItem>
        ))}
      </div>
    </FormSection>
  )
}

export function LanguagesSection() {
  const { items, add, remove, update, move } = useList<LanguageItem>([])

  return (
    <FormSection
      icon={LanguagesIcon}
      title="Languages"
      description="Add the languages you speak and your proficiency in each."
    >
      <div className="flex flex-col gap-4">
        <div>
          <AddButton onClick={() => add(emptyLanguage())}>Add Language</AddButton>
        </div>
        {items.map((item, index) => (
          <RepeatableItem
            key={item.id}
            title={`Language ${index + 1}`}
            index={index}
            total={items.length}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onRemove={() => remove(item.id)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextField id={`lang-${item.id}`} label="Language" required value={item.language} onChange={(v) => update(item.id, { language: v })} placeholder="e.g. Spanish" />
              <SelectField id={`prof-${item.id}`} label="Proficiency" value={item.proficiency} onValueChange={(v) => update(item.id, { proficiency: v })} options={languageProficiencies} placeholder="Select proficiency" />
            </div>
          </RepeatableItem>
        ))}
      </div>
    </FormSection>
  )
}

export function ReferencesSection() {
  const { items, add, remove, update, move } = useList<ReferenceItem>([])

  return (
    <FormSection
      icon={Users}
      title="References"
      description="Add professional references who can speak to your work."
    >
      <div className="flex flex-col gap-4">
        <div>
          <AddButton onClick={() => add(emptyReference())}>Add Reference</AddButton>
        </div>
        {items.map((item, index) => (
          <RepeatableItem
            key={item.id}
            title={`Reference ${index + 1}`}
            index={index}
            total={items.length}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onRemove={() => remove(item.id)}
          >
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField id={`ref-name-${item.id}`} label="Full Name" required value={item.name} onChange={(v) => update(item.id, { name: v })} placeholder="Reference name" />
                <TextField id={`ref-rel-${item.id}`} label="Relationship" value={item.relationship} onChange={(v) => update(item.id, { relationship: v })} placeholder="e.g. Former manager" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField id={`ref-email-${item.id}`} label="Email" type="email" value={item.email} onChange={(v) => update(item.id, { email: v })} placeholder="name@example.com" />
                <TextField id={`ref-phone-${item.id}`} label="Phone" type="tel" value={item.phone} onChange={(v) => update(item.id, { phone: v })} placeholder="Phone number" />
              </div>
            </div>
          </RepeatableItem>
        ))}
      </div>
    </FormSection>
  )
}
