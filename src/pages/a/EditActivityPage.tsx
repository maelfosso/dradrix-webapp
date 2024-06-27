import { Description, Field, FieldGroup, Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading"
import { Input } from "components/common/Input";

const EditActivityPage = () => {
  return (
    <>
      <Heading>Edit activity</Heading>
      <form>
        <Fieldset>
          {/* <Legend>Shipping details</Legend>
          <Text>Without this your odds of getting your order are low.</Text> */}
          <FieldGroup>
            <Field>
              <Input name="title" wrapperClassName="border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0" />
            </Field>
            {/* <Field>
            <Input name="description" />
              <Description>We currently only ship to North America.</Description>
            </Field> */}
          </FieldGroup>
        </Fieldset>
      </form>
    </>
  )
}

export default EditActivityPage;
