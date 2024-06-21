import { Button } from "components/common/Button";
import { Checkbox, CheckboxField } from "components/common/Checkbox";
import { Divider } from "components/common/Divider";
import { Field, FieldGroup, Fieldset, Label, Legend } from "components/common/Fieldset";
import { Heading, Subheading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import { Select } from "components/common/Select";
import { Text } from "components/common/Text";
import { Textarea } from "components/common/Textarea";
import { getCountries } from "lib/utils";
import { useState } from "react";

export const Address = () => {
  let countries = getCountries()
  let [country, setCountry] = useState(countries[0])

  return (
    <div className="grid grid-cols-2 gap-6">
      <Input
        aria-label="Street Address"
        name="address"
        placeholder="Street Address"
        defaultValue="147 Catalyst Ave"
        className="col-span-2"
      />
      <Input aria-label="City" name="city" placeholder="City" defaultValue="Toronto" className="col-span-2" />
      <Listbox aria-label="Region" name="region" placeholder="Region" defaultValue="Ontario">
        {country.regions.map((region) => (
          <ListboxOption key={region} value={region}>
            <ListboxLabel>{region}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Input aria-label="Postal code" name="postal_code" placeholder="Postal Code" defaultValue="A1A 1A1" />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="code"
        value={country}
        onChange={(country) => setCountry(country)}
        className="col-span-2"
      >
        {countries.map((country) => (
          <ListboxOption key={country.code} value={country}>
            <img className="w-5 sm:w-4" src={country.flagUrl} alt="" />
            <ListboxLabel>{country.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  )
}

const OrganizationInformation = () => {

  return (
    <form method="post" className="mx-auto max-w-2xl">

      <Fieldset>
        <Legend>Organization information</Legend>
        <Text>Kindly, provide information about your organization</Text>
        <FieldGroup>
          <Field>
            <Label>Organization Name</Label>
            <Input type="text" name="name" placeholder="DDX LTD" />
          </Field>
          <Field>
            <Label>Organization Bio</Label>
            <Textarea name="bio" />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="info@ddx.com" />
          </Field>
          <Field>
            <Label>Country</Label>
            <Select name="country">
              <option>Cameroon</option>
              <option>France</option>
              <option>Canada</option>
              <option>United States</option>
            </Select>
            {/* <Description>We currently only ship to North America.</Description> */}
          </Field>
        </FieldGroup>
      </Fieldset>
    </form>
  )
}

export default OrganizationInformation;