'use client'

import { useRef, useState } from 'react'
import { Contact, Globe, Link2, MapPin, Upload } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FieldLabelText,
  FormSection,
  SelectField,
  TextField,
} from '@/components/profile/form/form-primitives'
import { countries, timezones } from '@/lib/profile-form'
import type { ProfileDefaults } from '@/components/profile/form/profile-form'

const dialCodes = [
  { code: '+1', label: 'US +1' },
  { code: '+44', label: 'UK +44' },
  { code: '+61', label: 'AU +61' },
  { code: '+91', label: 'IN +91' },
  { code: '+49', label: 'DE +49' },
  { code: '+33', label: 'FR +33' },
  { code: '+81', label: 'JP +81' },
  { code: '+65', label: 'SG +65' },
]

export function ResumeUploadSection() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <FormSection
      icon={Upload}
      title="Resume Upload & Autofill"
      description="Upload a resume to autofill personal information, work history, education, certifications, and skills for this profile."
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-6 py-9 text-center transition-colors hover:border-primary/60 hover:bg-primary/10"
      >
        <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
          <Upload className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-bold">
          {fileName ?? 'Upload Resume to Autofill'}
        </span>
        <span className="text-xs text-muted-foreground">
          Drop a PDF here or click to browse. PDF only, up to 8MB.
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        />
      </button>
    </FormSection>
  )
}

export function ProfileDetailsSection({
  defaults,
}: {
  defaults: ProfileDefaults
}) {
  const [firstName, setFirstName] = useState(defaults.firstName)
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState(defaults.lastName)
  const [hasPreferredName, setHasPreferredName] = useState(false)
  const [preferredName, setPreferredName] = useState('')
  const [email, setEmail] = useState(defaults.email)
  const [dialCode, setDialCode] = useState('+1')
  const [phone, setPhone] = useState(defaults.phone)
  const [headline, setHeadline] = useState(defaults.title)

  return (
    <FormSection
      icon={Contact}
      title="Profile Details"
      description="Update your name, email, phone number, and professional headline."
    >
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 md:grid-cols-3">
          <TextField
            id="firstName"
            label="First Name"
            required
            value={firstName}
            onChange={setFirstName}
            placeholder="First name"
            autoComplete="given-name"
          />
          <TextField
            id="middleName"
            label="Middle Name"
            value={middleName}
            onChange={setMiddleName}
            placeholder="Middle name"
            autoComplete="additional-name"
          />
          <TextField
            id="lastName"
            label="Last Name"
            required
            value={lastName}
            onChange={setLastName}
            placeholder="Last name"
            autoComplete="family-name"
          />
        </div>

        <Field orientation="horizontal">
          <Checkbox
            id="hasPreferredName"
            checked={hasPreferredName}
            onCheckedChange={(checked) => setHasPreferredName(checked === true)}
          />
          <FieldLabel htmlFor="hasPreferredName" className="text-sm font-normal">
            I have a preferred name
          </FieldLabel>
        </Field>

        {hasPreferredName ? (
          <TextField
            id="preferredName"
            label="Preferred Name"
            value={preferredName}
            onChange={setPreferredName}
            placeholder="What should we call you?"
          />
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            id="email"
            label="Email"
            required
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.com"
            autoComplete="email"
          />
          <Field>
            <FieldLabelText htmlFor="phone" required>
              Phone Number
            </FieldLabelText>
            <div className="flex items-center gap-2">
              <Select value={dialCode} onValueChange={(next) => setDialCode(String(next))}>
                <SelectTrigger aria-label="Country dial code" className="h-9 w-28 shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {dialCodes.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
                autoComplete="tel"
                className="h-9"
              />
            </div>
          </Field>
        </div>

        <TextField
          id="headline"
          label="Professional Headline"
          required
          value={headline}
          onChange={setHeadline}
          placeholder="Senior Software Engineer"
        />
      </div>
    </FormSection>
  )
}

export function AddressLinksSection({
  defaults,
}: {
  defaults: ProfileDefaults
}) {
  const [addressLine, setAddressLine] = useState('')
  const [city, setCity] = useState(defaults.city)
  const [state, setState] = useState(defaults.state)
  const [zip, setZip] = useState('')
  const [county, setCounty] = useState('')
  const [country, setCountry] = useState('')
  const [timezone, setTimezone] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [otherUrl, setOtherUrl] = useState('')

  const links = [
    { id: 'linkedin', label: 'LinkedIn', icon: Link2, value: linkedin, set: setLinkedin, placeholder: 'https://www.linkedin.com/in/username' },
    { id: 'github', label: 'GitHub', icon: Link2, value: github, set: setGithub, placeholder: 'https://github.com/username' },
    { id: 'portfolio', label: 'Portfolio', icon: Globe, value: portfolio, set: setPortfolio, placeholder: 'https://portfolio.com' },
    { id: 'otherUrl', label: 'Other URL', icon: Link2, value: otherUrl, set: setOtherUrl, placeholder: 'https://other.com' },
  ]

  return (
    <FormSection
      icon={MapPin}
      title="Address Information"
      description="Keep your location, postal details, and timezone accurate for applications."
    >
      <div className="flex flex-col gap-5">
        <TextField
          id="addressLine"
          label="Address Line"
          required
          value={addressLine}
          onChange={setAddressLine}
          placeholder="Street address"
          autoComplete="street-address"
        />

        <div className="grid gap-5 md:grid-cols-3">
          <TextField id="city" label="City" required value={city} onChange={setCity} placeholder="City" />
          <TextField id="state" label="State" required value={state} onChange={setState} placeholder="State" />
          <TextField id="zip" label="ZIP Code" required value={zip} onChange={setZip} placeholder="ZIP code" inputMode="numeric" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TextField id="county" label="County" value={county} onChange={setCounty} placeholder="County" />
          <SelectField id="country" label="Country" required value={country} onValueChange={setCountry} options={countries} placeholder="Select country" />
          <SelectField id="timezone" label="Timezone" required value={timezone} onValueChange={setTimezone} options={timezones} placeholder="Select timezone" />
        </div>

        <div className="mt-1 flex items-center gap-2 border-t border-border pt-5">
          <Link2 className="size-4 text-primary" aria-hidden="true" />
          <div className="flex flex-col">
            <h3 className="text-sm font-bold">Links</h3>
            <p className="text-xs text-muted-foreground">
              Add portfolio, social links, and any product or showcase URL you want attached to this profile.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {links.map((link) => (
            <Field key={link.id}>
              <FieldLabel htmlFor={link.id} className="flex items-center gap-1.5 text-sm font-semibold">
                <link.icon className="size-4 text-primary" aria-hidden="true" />
                {link.label}
              </FieldLabel>
              <Input
                id={link.id}
                type="url"
                value={link.value}
                onChange={(event) => link.set(event.target.value)}
                placeholder={link.placeholder}
                className="h-9"
              />
            </Field>
          ))}
        </div>
      </div>
    </FormSection>
  )
}
