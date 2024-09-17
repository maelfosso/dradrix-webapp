import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AUTH_ORGANIZATION, setUpOrganization, SetUpOrganizationRequest } from "@/api/onboarding";
import { Button } from "@/components/common/Button";
import { Field, FieldGroup, Fieldset, Label } from "@/components/common/Fieldset";
import { Heading } from "@/components/common/Heading";
import { Input } from "@/components/common/Input";
import { Text } from "@/components/common/Text";
import { Textarea } from "@/components/common/Textarea";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePathUtils } from "@/lib/path";

// export const Address = () => {
//   let countries = getCountries()
//   let [country, setCountry] = useState(countries[0])
//   const {
//     organization,
//     setOrganization
//   } = useOnboardingContext();

//   return (
//     <FieldGroup className="grid grid-cols-2">
//       <Input
//         aria-label="Street Address"
//         name="address"
//         placeholder="Street Address"
//         wrapperClassName="col-span-2"
//         value={organization.address.street}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({
//           ...organization,
//           address: {
//             ...organization.address,
//             street: e.target.value
//           }}
//         )}
//       />
//       <Input
//         aria-label="City"
//         name="city"
//         placeholder="City"
//         wrapperClassName="col-span-2"
//         value={organization.address.city}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({
//           ...organization,
//           address: {
//             ...organization.address,
//             city: e.target.value
//           }}
//         )}
//       />
//       <Listbox
//         aria-label="Region"
//         name="region"
//         placeholder="Region"
//         value={organization.address.region}
//         onChange={(region) => {
//           setOrganization({
//             ...organization,
//             address: {
//               ...organization.address,
//               region: region
//             }
//           })
//         }}
//       >
//         {country.regions.map((region) => (
//           <ListboxOption key={region} value={region}>
//             <ListboxLabel>{region}</ListboxLabel>
//           </ListboxOption>
//         ))}
//       </Listbox>
//       <Input
//         aria-label="Postal code"
//         name="postal_code"
//         placeholder="Postal Code"
//         value={organization.address.postalCode}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganization({
//           ...organization,
//           address: {
//             ...organization.address,
//             postalCode: e.target.value
//           }}
//         )}
//       />
//       <Listbox
//         aria-label="Country"
//         name="country"
//         placeholder="Country"
//         by="code"
//         value={country}
//         onChange={(country) => {
//           setCountry(country);
//           setOrganization({
//             ...organization,
//             address: {
//               ...organization.address,
//               country: country.code
//             }
//           })
//         }}
//         className="col-span-2"
//       >
//         {countries.map((country) => (
//           <ListboxOption key={country.code} value={country}>
//             <img className="w-5 sm:w-4" src={country.flagUrl} alt="" />
//             <ListboxLabel>{country.name}</ListboxLabel>
//           </ListboxOption>
//         ))}
//       </Listbox>
//     </FieldGroup>
//   )
// }

const SetUpOrganization = () => {
  const navigate = useNavigate();
  const { authenticatedUser } =  useAuthContext();
  
  const [inputs, setInputs] = useState({
    phoneNumber: '',
    name: '',
    bio: '',
    email: '',
  })

  const { findParameter, removeParameter } = usePathUtils();
  useEffect(() => {
    const phoneNumber = findParameter("phone-number");
    setInputs({
      ...inputs,
      phoneNumber
    });
  }, [findParameter])

  const { mutateAsync: mutateOrganization } = useMutation({
    mutationKey: [AUTH_ORGANIZATION, authenticatedUser?.id],
    mutationFn:  (inputs: SetUpOrganizationRequest) => setUpOrganization(inputs)
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await mutateOrganization(inputs);
      removeParameter("phone-number");
      navigate(response.redirectToUrl, {
        replace: true
      });
    } catch (error) {
      
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      {/* <Heading>Set up your organization/company</Heading>
        <Text>Kindly, provide some information about your organization/company</Text>*/}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your organization
        </h1>
        <p className="text-sm text-muted-foreground">
          Please enter the organization details
        </p>
      </div>
      <form className="p-4 mt-8 space-y-6 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
        <Fieldset>
          <FieldGroup>
            <Field>
              <Label>Organization Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="DDX LTD"
                value={inputs.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, name: e.target.value})}
              />
            </Field>
            <Field>
              <Label>Organization Bio</Label>
              <Textarea
                name="bio"
                value={inputs.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputs({...inputs, bio: e.target.value})}
              />
            </Field>
            <Field>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="info@ddx.com"
                value={inputs.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, email: e.target.value})}
              />
            </Field>
          </FieldGroup>
        </Fieldset>

        <Button type="submit" className="w-full" color="dark/white">Submit</Button>
      </form>
    </div>
  )
}

export default SetUpOrganization;
