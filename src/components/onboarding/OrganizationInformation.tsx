import { Field, FieldGroup, Fieldset, Label, Legend } from "components/common/Fieldset";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import { Text } from "components/common/Text";
import { Textarea } from "components/common/Textarea";
import { getCountries } from "lib/utils";
import { useOnboardingContext } from "pages/OnboardingPage";
import { useState } from "react";

export const Address = () => {
  let countries = getCountries()
  let [country, setCountry] = useState(countries[0])
  const {
    organization,
    setOrganization
  } = useOnboardingContext();

  return (
    <FieldGroup className="grid grid-cols-2">
      <Input
        aria-label="Street Address"
        name="address"
        placeholder="Street Address"
        wrapperClassName="col-span-2"
        value={organization.address.street}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({
          ...organization,
          address: {
            ...organization.address,
            street: e.target.value
          }}
        )}
      />
      <Input
        aria-label="City"
        name="city"
        placeholder="City"
        wrapperClassName="col-span-2"
        value={organization.address.city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({
          ...organization,
          address: {
            ...organization.address,
            city: e.target.value
          }}
        )}
      />
      <Listbox
        aria-label="Region"
        name="region"
        placeholder="Region"
        value={organization.address.region}
        onChange={(region) => {
          setOrganization({
            ...organization,
            address: {
              ...organization.address,
              region: region
            }
          })
        }}
      >
        {country.regions.map((region) => (
          <ListboxOption key={region} value={region}>
            <ListboxLabel>{region}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Input
        aria-label="Postal code"
        name="postal_code"
        placeholder="Postal Code"
        value={organization.address.postalCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({
          ...organization,
          address: {
            ...organization.address,
            postalCode: e.target.value
          }}
        )}
      />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="code"
        value={country}
        onChange={(country) => {
          setCountry(country);
          setOrganization({
            ...organization,
            address: {
              ...organization.address,
              country: country.code
            }
          })
        }}
        className="col-span-2"
      >
        {countries.map((country) => (
          <ListboxOption key={country.code} value={country}>
            <img className="w-5 sm:w-4" src={country.flagUrl} alt="" />
            <ListboxLabel>{country.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </FieldGroup>
  )
}

const OrganizationInformation = () => {
  const {
    organization,
    setOrganization
  } = useOnboardingContext();

  return (
    <form method="post" className="mx-auto max-w-2xl">

      <Fieldset>
        <Legend>Organization information</Legend>
        <Text>Kindly, provide information about your organization</Text>
        <FieldGroup>
          <Field>
            <Label>Organization Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="DDX LTD"
              value={organization.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({...organization, name: e.target.value})}
            />
          </Field>
          <Field>
            <Label>Organization Bio</Label>
            <Textarea
              name="bio"
              value={organization.bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOrganization({...organization, bio: e.target.value})}
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="info@ddx.com"
              value={organization.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({...organization, email: e.target.value})}
            />
          </Field>
          <Field>
            <Label>Address</Label>
            <Address />
          </Field>
        </FieldGroup>
      </Fieldset>
    </form>
  )
}

export default OrganizationInformation;
