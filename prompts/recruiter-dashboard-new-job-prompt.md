### First Prompt
```
I am develoing a job seeking and application website. using nextJS using JavaScript ( not TS), Hero UI (Version 3), tailwindcss, gravity ui icons, 

give me Post a Job (/dashboard/recruiter/jobs/new)

A form divided into sections:
Job Info:
Job Title, Job Category, Job Type (Full-time / Part-time / Contract / Internship)
Salary Range (Min & Max), Currency
Location (City, Country) or Remote toggle
Application Deadline
Job Description:
Responsibilities (rich text or textarea)
Requirements (rich text or textarea)
Benefits (optional)
Company: Auto-filled from the Recruiter's registered company (must be approved to post).
On submit: save job with status active, link to Recruiter's company, and make it publicly visible.

for the ui use the provided image as a style guide. Do not generate code for the provided image just use as a style guide 

while generating code use this hero ui components: 
https://heroui.com/en/docs/react/components/form
https://heroui.com/en/docs/react/components/fieldset
https://heroui.com/en/docs/react/components/field-error
https://heroui.com/en/docs/react/components/text-area
https://heroui.com/en/docs/react/components/text-field
https://heroui.com/en/docs/react/components/select
```

### Second Prompt
didnot read code from all the links. and got select error. thats why copy pasted the example code which solved the problem

```
i am ok to sacrifice the icon and use gravity ui icon. however i am getting an errror: 
Export SelectItem doesn't exist in target module

use the code from this: 
import {Header, Label, ListBox, Select, Separator} from "@heroui/react";

export function WithSections() {
  return (
    <Select className="w-[256px]" placeholder="Select a country">
      <Label>Country</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Section>
            <Header>North America</Header>
            <ListBox.Item id="usa" textValue="United States">
              United States
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="canada" textValue="Canada">
              Canada
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="mexico" textValue="Mexico">
              Mexico
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <Separator />
          <ListBox.Section>
            <Header>Europe</Header>
            <ListBox.Item id="uk" textValue="United Kingdom">
              United Kingdom
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="france" textValue="France">
              France
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="germany" textValue="Germany">
              Germany
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="spain" textValue="Spain">
              Spain
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="italy" textValue="Italy">
              Italy
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <Separator />
          <ListBox.Section>
            <Header>Asia</Header>
            <ListBox.Item id="japan" textValue="Japan">
              Japan
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="china" textValue="China">
              China
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="india" textValue="India">
              India
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="south-korea" textValue="South Korea">
              South Korea
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
```

### Third Prompt
another error of text area
```
Export Textarea doesn't exist in target module

https://heroui.com/en/docs/react/components/text-area
```

### Fourth Prompt
previous prompt gave only the corrected section of the code

```
give me the full code
```