# React Hook Form Generator

A powerful and flexible package for building React forms using `react-hook-form` and `Material-UI`. This package allows you to implement complex forms easily with less code.

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Input Types](#input-types)
- [API Reference](#api-reference)
- [Theme Customization](#theme-customization)
- [Validation](#validation)
- [Advanced Examples](#advanced-examples)

## 📦 Installation

```bash
npm install react-hook-form-gen
```

or

```bash
yarn add react-hook-form-gen
```

### Required Dependencies

This package requires the following libraries:

- `react` (^18.3.1)
- `react-dom` (^18.3.1)
- `react-hook-form` (^7.51.2)
- `@mui/material` (^5.16.0)
- `@emotion/react` (^11.11.4)
- `@emotion/styled` (^11.11.5)

## 🚀 Quick Start

```tsx
import { useForm } from "react-hook-form";
import { Form, FormProvider } from "react-hook-form-gen";
import { Button, Stack } from "@mui/material";
import { TSchema } from "react-hook-form-gen";

function MyForm() {
  const form = useForm();

  const schema: TSchema[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      rules: {
        required: "First name is required",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <FormProvider>
      <Stack component="form" onSubmit={form.handleSubmit(handleSubmit)}>
        <Form schema={schema} form={form} />
        <Button type="submit">Submit</Button>
      </Stack>
    </FormProvider>
  );
}
```

## ✨ Features

- ✅ **Multiple Input Types**: text, email, password, number, textarea, select, multi-select, auto-complete, checkbox, radio, date-picker, currency, uploader
- ✅ **Integrated Validation**: Using `react-hook-form` rules
- ✅ **Theme Customization**: Ability to customize styles for all components
- ✅ **Grid Layout**: Using Material-UI Grid for layout
- ✅ **TypeScript**: Full TypeScript support
- ✅ **Lazy Loading**: Using `@loadable/component` for optimization
- ✅ **Error Boundary**: Rendering error management
- ✅ **RTL Support**: Right-to-left support
- ✅ **Responsive**: Responsive design with Material-UI Grid

## 📝 Input Types

### 1. Text Field

```tsx
{
  name: 'firstName',
  label: 'First Name',
  type: 'text', // 'text' | 'email' | 'password' | 'phone' | 'number'
  placeholder: 'Enter your name',
  rules: {
    required: 'First name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters',
    },
  },
  defaultValue: '',
  disabled: false,
  readonly: false,
}
```

### 2. Text Area

```tsx
{
  name: 'description',
  label: 'Description',
  type: 'text-area',
  placeholder: 'Enter description',
  rules: {
    required: 'Description is required',
    maxLength: {
      value: 500,
      message: 'Maximum 500 characters allowed',
    },
  },
  props: {
    rows: 4,
    multiline: true,
  },
}
```

### 3. Select

```tsx
{
  name: 'country',
  label: 'Country',
  type: 'select',
  options: [
    { value: 'iran', label: 'Iran' },
    { value: 'usa', label: 'USA' },
    { value: 'uk', label: 'UK' },
  ],
  rules: {
    required: 'Country selection is required',
  },
  defaultValue: '',
}
```

### 4. Multi Select

```tsx
{
  name: 'languages',
  label: 'Programming Languages',
  type: 'multi-select',
  options: [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
  ],
  rules: {
    required: 'Please select at least one language',
  },
  defaultValue: [],
}
```

### 5. Auto Complete

```tsx
{
  name: 'city',
  label: 'City',
  type: 'auto-complete',
  options: [
    { value: 'tehran', label: 'Tehran' },
    { value: 'isfahan', label: 'Isfahan' },
    { value: 'shiraz', label: 'Shiraz' },
  ],
  isLoading: false,
  onReachEnd: () => {
    // For loading more data (infinite scroll)
    console.log('Load more data');
  },
  rules: {
    required: 'City selection is required',
  },
}
```

### 6. Checkbox

```tsx
{
  name: 'agree',
  label: 'I agree to the terms',
  type: 'checkbox',
  rules: {
    required: 'You must agree to the terms',
  },
  defaultValue: false,
}
```

### 7. Multi Checkbox

```tsx
{
  name: 'interests',
  label: 'Interests',
  type: 'multi-checkbox',
  multiple: true,
  options: [
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'reading', label: 'Reading' },
  ],
  rules: {
    required: 'Please select at least one option',
  },
  defaultValue: [],
}
```

### 8. Radio

```tsx
{
  name: 'gender',
  label: 'Gender',
  type: 'radio',
  options: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
  rules: {
    required: 'Gender selection is required',
  },
}
```

### 9. Date Picker

```tsx
{
  name: 'birthDate',
  label: 'Birth Date',
  type: 'date-picker',
  rules: {
    required: 'Birth date is required',
  },
  props: {
    format: 'YYYY/MM/DD',
    calendar: 'persian', // 'persian' | 'gregorian'
  },
}
```

### 10. Currency

```tsx
{
  name: 'price',
  label: 'Price',
  type: 'currency',
  rules: {
    required: 'Price is required',
    min: {
      value: 0,
      message: 'Price cannot be negative',
    },
  },
  currencyIcon: <Typography>USD</Typography>,
  defaultValue: 0,
}
```

### 11. Uploader

```tsx
{
  name: 'documents',
  label: 'Documents',
  type: 'uploader',
  multiple: true,
  rules: {
    required: 'File upload is required',
  },
  onDelete: (index: number) => {
    console.log('Delete file at index:', index);
  },
  props: {
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}
```

## 📚 API Reference

### Form Component

Main component for rendering forms.

#### Props

| Prop                 | Type                                   | Default      | Description                               |
| -------------------- | -------------------------------------- | ------------ | ----------------------------------------- |
| `schema`             | `TFormSchema`                          | **required** | Array of input definitions                |
| `form`               | `UseFormReturn`                        | **required** | `useForm` instance from `react-hook-form` |
| `gridContainerProps` | `GridProps`                            | -            | Props for Grid container                  |
| `gridItemProps`      | `GridProps`                            | `{ xs: 4 }`  | Default props for Grid items              |
| `itemProps`          | `any`                                  | -            | Common props for all inputs               |
| `labelsProps`        | `TypographyProps`                      | -            | Props for labels                          |
| `hideRequiredStar`   | `boolean`                              | `false`      | Hide required star                        |
| `inputLabelMode`     | `'static' \| 'relative'`               | `'static'`   | Label display mode                        |
| `inputVariants`      | `'outlined' \| 'filled' \| 'standard'` | `'outlined'` | Variant type for inputs                   |
| `withoutHelperText`  | `boolean`                              | -            | Hide helper text                          |
| `disabled`           | `boolean`                              | -            | Disable all inputs                        |

#### Usage Example

```tsx
<Form
  schema={schema}
  form={form}
  gridItemProps={{ xs: 12, md: 6 }}
  inputVariants="filled"
  hideRequiredStar={false}
/>
```

### FormProvider Component

Provider for managing theme and custom inputs at the application level.

#### Props

| Prop           | Type              | Default      | Description                  |
| -------------- | ----------------- | ------------ | ---------------------------- |
| `theme`        | `TFormTheme`      | -            | Theme for customizing styles |
| `customInputs` | `ICustomInputs[]` | `[]`         | Custom input components      |
| `children`     | `ReactNode`       | **required** | Form content                 |

#### Usage Example

```tsx
<FormProvider theme={customTheme} customInputs={[]}>
  <Form schema={schema} form={form} />
</FormProvider>
```

### Base Input Properties

All inputs use these base properties:

| Property            | Type                                   | Description                           |
| ------------------- | -------------------------------------- | ------------------------------------- |
| `name`              | `string`                               | **required** - Field name in form     |
| `label`             | `ReactNode`                            | **required** - Field label            |
| `type`              | `string`                               | Input type                            |
| `rules`             | `RegisterOptions`                      | Validation rules from react-hook-form |
| `defaultValue`      | `any`                                  | Default value                         |
| `placeholder`       | `string`                               | Placeholder                           |
| `disabled`          | `boolean`                              | Disable field                         |
| `readonly`          | `boolean`                              | Make field read-only                  |
| `helperText`        | `string`                               | Helper text                           |
| `withoutHelperText` | `boolean`                              | Hide helper text                      |
| `gridItemProp`      | `GridProps`                            | Props for Grid item of this field     |
| `labelProps`        | `TypographyProps`                      | Props for label of this field         |
| `variant`           | `'outlined' \| 'filled' \| 'standard'` | Variant type                          |
| `inputLabelMode`    | `'static' \| 'relative'`               | Label display mode                    |

## 🎨 Theme Customization

You can customize the styles of all components through the `theme`:

```tsx
import { TFormTheme } from "react-hook-form-gen";

const customTheme: TFormTheme = {
  text: {
    // Styles for text inputs
    sx: {
      backgroundColor: "#f5f5f5",
    },
  },
  select: {
    selectProps: {
      sx: {
        borderRadius: "8px",
      },
    },
  },
  datePicker: {
    datePickerProps: {
      // Styles for date picker
    },
  },
  checkbox: {
    checkboxProps: {
      // Styles for checkbox
    },
    formControlLabelProps: {
      // Styles for checkbox label
    },
  },
  // ... other types
};

<FormProvider theme={customTheme}>
  <Form schema={schema} form={form} />
</FormProvider>;
```

### Style Priority

Styles are applied with the following priority:

1. `props` in schema (highest priority)
2. `itemProps` in schema
3. `theme` from FormProvider
4. Default styles

## ✅ Validation

Using `react-hook-form` validation rules:

```tsx
{
  name: 'email',
  label: 'Email',
  type: 'email',
  rules: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
    validate: (value) => {
      // Custom validation
      if (value === 'test@example.com') {
        return 'This email is not allowed';
      }
      return true;
    },
  },
}
```

### Common Rules

```tsx
// Required
rules: {
  required: 'This field is required',
}

// Min/Max Length
rules: {
  minLength: {
    value: 3,
    message: 'Minimum 3 characters',
  },
  maxLength: {
    value: 50,
    message: 'Maximum 50 characters',
  },
}

// Min/Max Value (for number)
rules: {
  min: {
    value: 0,
    message: 'Value must be positive',
  },
  max: {
    value: 100,
    message: 'Value must be less than 100',
  },
}

// Pattern
rules: {
  pattern: {
    value: /^[0-9]+$/,
    message: 'Only numbers are allowed',
  },
}
```

## 🔥 Advanced Examples

### Example 1: Complete Signup Form

```tsx
import { useForm } from "react-hook-form";
import { Form, FormProvider } from "react-hook-form-gen";
import { Button, Stack } from "@mui/material";
import { TSchema } from "react-hook-form-gen";

function SignupForm() {
  const form = useForm();

  const schema: TSchema[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      gridItemProp: { xs: 12, md: 6 },
      rules: {
        required: "First name is required",
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      gridItemProp: { xs: 12, md: 6 },
      rules: {
        required: "Last name is required",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      gridItemProp: { xs: 12 },
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      gridItemProp: { xs: 12 },
      rules: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      gridItemProp: { xs: 12, md: 6 },
      options: [
        { value: "iran", label: "Iran" },
        { value: "usa", label: "USA" },
      ],
      rules: {
        required: "Country selection is required",
      },
    },
    {
      name: "agree",
      label: "I agree to the terms",
      type: "checkbox",
      gridItemProp: { xs: 12 },
      rules: {
        required: "You must agree to the terms",
      },
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Signup Data:", data);
    // Send data to server
  };

  return (
    <FormProvider>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        spacing={3}
      >
        <Form schema={schema} form={form} />
        <Button type="submit" variant="contained" size="large">
          Sign Up
        </Button>
      </Stack>
    </FormProvider>
  );
}
```

### Example 2: Using Grid Layout

```tsx
<Form
  schema={schema}
  form={form}
  gridContainerProps={{
    spacing: 3,
  }}
  gridItemProps={{
    xs: 12,
    sm: 6,
    md: 4,
  }}
/>
```

### Example 3: Using Theme

```tsx
const theme: TFormTheme = {
  text: {
    sx: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
      },
    },
  },
  select: {
    selectProps: {
      sx: {
        borderRadius: "12px",
      },
    },
  },
};

<FormProvider theme={theme}>
  <Form schema={schema} form={form} />
</FormProvider>;
```

### Example 4: Auto Complete with Infinite Scroll

```tsx
{
  name: 'city',
  label: 'City',
  type: 'auto-complete',
  isLoading: loading,
  options: cities,
  onReachEnd: () => {
    // Load more cities
    loadMoreCities();
  },
}
```

### Example 5: Uploader with File Management

```tsx
{
  name: 'documents',
  label: 'Documents',
  type: 'uploader',
  multiple: true,
  rules: {
    required: 'File upload is required',
    validate: (value) => {
      if (!value?.files || value.files.length === 0) {
        return 'Please upload at least one file';
      }
      return true;
    },
  },
  onDelete: (index: number) => {
    const files = form.getValues('documents')?.files || [];
    const newFiles = files.filter((_: any, i: number) => i !== index);
    form.setValue('documents', {
      files: newFiles,
      preview: newFiles.map((file: File) => URL.createObjectURL(file)),
    });
  },
  props: {
    accept: 'image/*,.pdf',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}
```

### Example 6: Conditional Fields

```tsx
const schema: TSchema[] = [
  {
    name: "hasAddress",
    label: "I have an address",
    type: "checkbox",
  },
  // Show address field only if checkbox is checked
  ...(form.watch("hasAddress")
    ? [
        {
          name: "address",
          label: "Address",
          type: "text-area",
          rules: {
            required: "Address is required",
          },
        },
      ]
    : []),
];
```

## 🛠️ Standalone Components

You can also use input components separately:

```tsx
import {
  UFTextField,
  UFSelect,
  UFCheckbox,
  UFDatePicker,
  UFAutoComplete,
  // ... other components
} from "react-hook-form-gen";

// Direct usage
<UFTextField
  form={form}
  name="firstName"
  label="First Name"
  type="text"
  error={form.formState.errors.firstName}
/>;
```

## 📝 Important Notes

1. **FormProvider**: Always wrap your form inside `FormProvider` so that theme and context are available.

2. **Grid Layout**: By default, each field is `xs={4}`. You can change this with `gridItemProps` or `gridItemProp` for each field.

3. **Validation**: Use `react-hook-form` rules. Error messages are displayed automatically.

4. **TypeScript**: All types are defined in `type.d.ts`. Use TypeScript for type safety.

5. **Performance**: Components are lazy loaded with `@loadable/component` for better performance.

6. **RTL Support**: The package supports right-to-left. To enable it, configure the Material-UI theme.

## 🤝 Contributing

Your contributions to improving this package are welcome! Please submit issues and pull requests.

## 📄 License

ISC

## 👤 Author

Mohammad

---

**Note**: This documentation is continuously updated. For the latest changes, visit the [GitHub Repository](https://github.com/your-repo).
