'use client'

import { useState } from 'react'
import { DollarSign, Globe, ScrollText, ShieldCheck, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Field, FieldLabel } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import {
  FieldLabelText,
  FormSection,
  SelectField,
} from '@/components/profile/form/form-primitives'
import {
  accommodationOptions,
  birthYears,
  countries,
  criteriaOptions,
  disabilityStatuses,
  ethnicities,
  genders,
  hearAboutUsOptions,
  noticePeriods,
  travelAvailabilities,
  veteranStatuses,
  workLocationTypes,
  yesNoPreferNot,
} from '@/lib/profile-form'

export function ApplicationDefaultsSection() {
  const [authorized, setAuthorized] = useState<string[]>([])
  const [gender, setGender] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [disability, setDisability] = useState('')
  const [veteran, setVeteran] = useState('')
  const [lgbtq, setLgbtq] = useState('')
  const [notice, setNotice] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [travel, setTravel] = useState('')
  const [accommodation, setAccommodation] = useState('')
  const [hearAbout, setHearAbout] = useState('')

  return (
    <FormSection
      icon={ScrollText}
      title="Application Defaults"
      description="Prefill demographic and availability answers commonly requested in applications."
    >
      <div className="flex flex-col gap-5">
        <Field>
          <FieldLabelText htmlFor="authorized" required>
            <span className="flex items-center gap-1.5">
              <Globe className="size-4 text-primary" aria-hidden="true" />
              Authorized Countries
            </span>
          </FieldLabelText>
          <Select
            multiple
            value={authorized}
            onValueChange={(value) => setAuthorized(value as string[])}
          >
            <SelectTrigger id="authorized" className="h-9 w-full">
              <SelectValue placeholder="Select authorized countries...">
                {(value: string[]) =>
                  value.length === 0
                    ? 'Select authorized countries...'
                    : `${value.length} ${value.length === 1 ? 'country' : 'countries'} selected`
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {authorized.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {authorized.map((country) => (
                <Badge key={country} variant="secondary" className="gap-1 rounded-full">
                  {country}
                  <button
                    type="button"
                    aria-label={`Remove ${country}`}
                    onClick={() =>
                      setAuthorized((prev) => prev.filter((item) => item !== country))
                    }
                    className="rounded-full text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}
        </Field>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Demographics
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <SelectField id="gender" label="Gender" required value={gender} onValueChange={setGender} options={genders} placeholder="Select gender" />
            <SelectField id="ethnicity" label="Ethnicity" required value={ethnicity} onValueChange={setEthnicity} options={ethnicities} placeholder="Select ethnicity" />
            <SelectField id="disability" label="Disability Status" required value={disability} onValueChange={setDisability} options={disabilityStatuses} placeholder="Select disability status" />
            <SelectField id="veteran" label="Veteran Status" required value={veteran} onValueChange={setVeteran} options={veteranStatuses} placeholder="Select veteran status" />
          </div>
          <div className="md:max-w-xs">
            <SelectField id="lgbtq" label="Do you identify as LGBTQ+?" value={lgbtq} onValueChange={setLgbtq} options={yesNoPreferNot} placeholder="Select an option" />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Availability &amp; Preferences
          </h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <SelectField id="notice" label="Notice Period" required value={notice} onValueChange={setNotice} options={noticePeriods} placeholder="Select notice period" />
            <SelectField id="birthYear" label="Birth Year" required value={birthYear} onValueChange={setBirthYear} options={birthYears} placeholder="Select birth year" />
            <SelectField id="travel" label="Travel Availability" value={travel} onValueChange={setTravel} options={travelAvailabilities} placeholder="Select travel availability" />
            <SelectField id="accommodation" label="Require Accommodations" value={accommodation} onValueChange={setAccommodation} options={accommodationOptions} placeholder="Select accommodation preference" />
          </div>
          <div className="md:max-w-xs">
            <SelectField id="hearAbout" label="Where did you hear about us" required value={hearAbout} onValueChange={setHearAbout} options={hearAboutUsOptions} placeholder="Select an option" />
          </div>
        </div>
      </div>
    </FormSection>
  )
}

const MAX_COMP = 300_000
const COMP_STEP = 5_000

function formatComp(value: number) {
  return `$${Math.round(value / 1000)}k`
}

export function PreferencesSection() {
  const [workLocation, setWorkLocation] = useState('')
  const [comp, setComp] = useState<number[]>([0, MAX_COMP])
  const [clearance, setClearance] = useState('')
  const [drugTest, setDrugTest] = useState('')
  const [visa, setVisa] = useState('')

  const ticks = Array.from({ length: 7 }, (_, i) => (MAX_COMP / 6) * i)

  return (
    <FormSection
      icon={DollarSign}
      title="Work & Compensation Preferences"
      description="Set your preferred work arrangement, target compensation, and legal requirements."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <FieldLabel className="text-sm font-semibold">Work Location Type</FieldLabel>
          <RadioGroup
            value={workLocation}
            onValueChange={(value) => setWorkLocation(String(value))}
            className="flex flex-wrap gap-6"
          >
            {workLocationTypes.map((option) => (
              <Field key={option} orientation="horizontal" className="w-auto">
                <RadioGroupItem id={`work-${option}`} value={option} />
                <FieldLabel htmlFor={`work-${option}`} className="text-sm font-normal">
                  {option}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <div className="flex items-center gap-1.5">
            <DollarSign className="size-4 text-primary" aria-hidden="true" />
            <h3 className="text-sm font-bold">Compensation</h3>
          </div>
          <Slider
            value={comp}
            min={0}
            max={MAX_COMP}
            step={COMP_STEP}
            onValueChange={(value) => setComp(value as number[])}
            aria-label="Compensation range"
            className="mt-2"
          />
          <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
            {ticks.map((tick) => (
              <span key={tick}>{formatComp(tick)}</span>
            ))}
          </div>
          <div className="mt-1 flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="size-3.5" aria-hidden="true" />
              Min: <span className="font-semibold text-foreground">{formatComp(comp[0])}</span>
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="size-3.5" aria-hidden="true" />
              Max: <span className="font-semibold text-foreground">{formatComp(comp[1])}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            <h3 className="text-sm font-bold">Legal &amp; Requirements</h3>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <SelectField id="clearance" label="Security Clearance" value={clearance} onValueChange={setClearance} options={criteriaOptions} placeholder="No criteria set" />
            <SelectField id="drugTest" label="Drug Test" value={drugTest} onValueChange={setDrugTest} options={criteriaOptions} placeholder="No criteria set" />
            <SelectField id="visa" label="Visa Sponsorship" value={visa} onValueChange={setVisa} options={criteriaOptions} placeholder="No criteria set" />
          </div>
        </div>
      </div>
    </FormSection>
  )
}
