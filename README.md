# React Hook Form Generator

یک پکیج قدرتمند و انعطاف‌پذیر برای ساخت فرم‌های React با استفاده از `react-hook-form` و `Material-UI`. این پکیج به شما امکان می‌دهد فرم‌های پیچیده را به راحتی و با کد کمتری پیاده‌سازی کنید.

## 📋 فهرست مطالب

- [نصب](#نصب)
- [شروع سریع](#شروع-سریع)
- [ویژگی‌ها](#ویژگی‌ها)
- [انواع Input](#انواع-input)
- [API Reference](#api-reference)
- [Theme Customization](#theme-customization)
- [Validation](#validation)
- [مثال‌های پیشرفته](#مثال‌های-پیشرفته)

## 📦 نصب

```bash
npm install react-hook-form-gen
```

یا

```bash
yarn add react-hook-form-gen
```

### وابستگی‌های مورد نیاز

این پکیج به کتابخانه‌های زیر نیاز دارد:

- `react` (^18.3.1)
- `react-dom` (^18.3.1)
- `react-hook-form` (^7.51.2)
- `@mui/material` (^5.16.0)
- `@emotion/react` (^11.11.4)
- `@emotion/styled` (^11.11.5)

## 🚀 شروع سریع

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
      label: "نام",
      type: "text",
      rules: {
        required: "نام الزامی است",
      },
    },
    {
      name: "email",
      label: "ایمیل",
      type: "email",
      rules: {
        required: "ایمیل الزامی است",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "ایمیل معتبر نیست",
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
        <Button type="submit">ارسال</Button>
      </Stack>
    </FormProvider>
  );
}
```

## ✨ ویژگی‌ها

- ✅ **پشتیبانی از انواع Input**: text, email, password, number, textarea, select, multi-select, auto-complete, checkbox, radio, date-picker, currency, uploader
- ✅ **Validation یکپارچه**: استفاده از قوانین `react-hook-form`
- ✅ **Theme Customization**: امکان سفارشی‌سازی استایل تمام کامپوننت‌ها
- ✅ **Grid Layout**: استفاده از Material-UI Grid برای چیدمان
- ✅ **TypeScript**: پشتیبانی کامل از TypeScript
- ✅ **Lazy Loading**: استفاده از `@loadable/component` برای بهینه‌سازی
- ✅ **Error Boundary**: مدیریت خطاهای رندرینگ
- ✅ **RTL Support**: پشتیبانی از راست به چپ
- ✅ **Responsive**: طراحی واکنش‌گرا با Material-UI Grid

## 📝 انواع Input

### 1. Text Field

```tsx
{
  name: 'firstName',
  label: 'نام',
  type: 'text', // 'text' | 'email' | 'password' | 'phone' | 'number'
  placeholder: 'نام خود را وارد کنید',
  rules: {
    required: 'نام الزامی است',
    minLength: {
      value: 3,
      message: 'نام باید حداقل 3 کاراکتر باشد',
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
  label: 'توضیحات',
  type: 'text-area',
  placeholder: 'توضیحات را وارد کنید',
  rules: {
    required: 'توضیحات الزامی است',
    maxLength: {
      value: 500,
      message: 'حداکثر 500 کاراکتر مجاز است',
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
  label: 'کشور',
  type: 'select',
  options: [
    { value: 'iran', label: 'ایران' },
    { value: 'usa', label: 'آمریکا' },
    { value: 'uk', label: 'انگلستان' },
  ],
  rules: {
    required: 'انتخاب کشور الزامی است',
  },
  defaultValue: '',
}
```

### 4. Multi Select

```tsx
{
  name: 'languages',
  label: 'زبان‌های برنامه‌نویسی',
  type: 'multi-select',
  options: [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
  ],
  rules: {
    required: 'حداقل یک زبان را انتخاب کنید',
  },
  defaultValue: [],
}
```

### 5. Auto Complete

```tsx
{
  name: 'city',
  label: 'شهر',
  type: 'auto-complete',
  options: [
    { value: 'tehran', label: 'تهران' },
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'shiraz', label: 'شیراز' },
  ],
  isLoading: false,
  onReachEnd: () => {
    // برای لود کردن داده‌های بیشتر (infinite scroll)
    console.log('Load more data');
  },
  rules: {
    required: 'انتخاب شهر الزامی است',
  },
}
```

### 6. Checkbox

```tsx
{
  name: 'agree',
  label: 'قوانین را می‌پذیرم',
  type: 'checkbox',
  rules: {
    required: 'باید قوانین را بپذیرید',
  },
  defaultValue: false,
}
```

### 7. Multi Checkbox

```tsx
{
  name: 'interests',
  label: 'علاقه‌مندی‌ها',
  type: 'multi-checkbox',
  multiple: true,
  options: [
    { value: 'sports', label: 'ورزش' },
    { value: 'music', label: 'موسیقی' },
    { value: 'reading', label: 'مطالعه' },
  ],
  rules: {
    required: 'حداقل یک مورد را انتخاب کنید',
  },
  defaultValue: [],
}
```

### 8. Radio

```tsx
{
  name: 'gender',
  label: 'جنسیت',
  type: 'radio',
  options: [
    { value: 'male', label: 'مرد' },
    { value: 'female', label: 'زن' },
  ],
  rules: {
    required: 'انتخاب جنسیت الزامی است',
  },
}
```

### 9. Date Picker

```tsx
{
  name: 'birthDate',
  label: 'تاریخ تولد',
  type: 'date-picker',
  rules: {
    required: 'تاریخ تولد الزامی است',
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
  label: 'قیمت',
  type: 'currency',
  rules: {
    required: 'قیمت الزامی است',
    min: {
      value: 0,
      message: 'قیمت نمی‌تواند منفی باشد',
    },
  },
  currencyIcon: <Typography>تومان</Typography>,
  defaultValue: 0,
}
```

### 11. Uploader

```tsx
{
  name: 'documents',
  label: 'مدارک',
  type: 'uploader',
  multiple: true,
  rules: {
    required: 'آپلود فایل الزامی است',
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

کامپوننت اصلی برای رندر کردن فرم.

#### Props

| Prop                 | Type                                   | Default      | Description                          |
| -------------------- | -------------------------------------- | ------------ | ------------------------------------ |
| `schema`             | `TFormSchema`                          | **required** | آرایه‌ای از تعاریف input ها          |
| `form`               | `UseFormReturn`                        | **required** | نمونه `useForm` از `react-hook-form` |
| `gridContainerProps` | `GridProps`                            | -            | Props برای Grid container            |
| `gridItemProps`      | `GridProps`                            | `{ xs: 4 }`  | Props پیش‌فرض برای Grid items        |
| `itemProps`          | `any`                                  | -            | Props مشترک برای تمام input ها       |
| `labelsProps`        | `TypographyProps`                      | -            | Props برای label ها                  |
| `hideRequiredStar`   | `boolean`                              | `false`      | مخفی کردن ستاره required             |
| `inputLabelMode`     | `'static' \| 'relative'`               | `'static'`   | حالت نمایش label                     |
| `inputVariants`      | `'outlined' \| 'filled' \| 'standard'` | `'outlined'` | نوع variant برای input ها            |
| `withoutHelperText`  | `boolean`                              | -            | مخفی کردن helper text                |
| `disabled`           | `boolean`                              | -            | غیرفعال کردن تمام input ها           |

#### مثال استفاده

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

Provider برای مدیریت theme و custom inputs در سطح اپلیکیشن.

#### Props

| Prop           | Type              | Default      | Description                   |
| -------------- | ----------------- | ------------ | ----------------------------- |
| `theme`        | `TFormTheme`      | -            | Theme برای سفارشی‌سازی استایل |
| `customInputs` | `ICustomInputs[]` | `[]`         | کامپوننت‌های input سفارشی     |
| `children`     | `ReactNode`       | **required** | محتوای فرم                    |

#### مثال استفاده

```tsx
<FormProvider theme={customTheme} customInputs={[]}>
  <Form schema={schema} form={form} />
</FormProvider>
```

### Base Input Properties

تمام input ها از این properties پایه استفاده می‌کنند:

| Property            | Type                                   | Description                          |
| ------------------- | -------------------------------------- | ------------------------------------ |
| `name`              | `string`                               | **required** - نام فیلد در فرم       |
| `label`             | `ReactNode`                            | **required** - برچسب فیلد            |
| `type`              | `string`                               | نوع input                            |
| `rules`             | `RegisterOptions`                      | قوانین validation از react-hook-form |
| `defaultValue`      | `any`                                  | مقدار پیش‌فرض                        |
| `placeholder`       | `string`                               | placeholder                          |
| `disabled`          | `boolean`                              | غیرفعال کردن فیلد                    |
| `readonly`          | `boolean`                              | فقط خواندنی کردن فیلد                |
| `helperText`        | `string`                               | متن راهنما                           |
| `withoutHelperText` | `boolean`                              | مخفی کردن helper text                |
| `gridItemProp`      | `GridProps`                            | Props برای Grid item این فیلد        |
| `labelProps`        | `TypographyProps`                      | Props برای label این فیلد            |
| `variant`           | `'outlined' \| 'filled' \| 'standard'` | نوع variant                          |
| `inputLabelMode`    | `'static' \| 'relative'`               | حالت نمایش label                     |

## 🎨 Theme Customization

می‌توانید استایل تمام کامپوننت‌ها را از طریق `theme` سفارشی کنید:

```tsx
import { TFormTheme } from "react-hook-form-gen";

const customTheme: TFormTheme = {
  text: {
    // استایل برای input های text
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
      // استایل برای date picker
    },
  },
  checkbox: {
    checkboxProps: {
      // استایل برای checkbox
    },
    formControlLabelProps: {
      // استایل برای label checkbox
    },
  },
  // ... سایر انواع
};

<FormProvider theme={customTheme}>
  <Form schema={schema} form={form} />
</FormProvider>;
```

### اولویت استایل

استایل‌ها با اولویت زیر اعمال می‌شوند:

1. `props` در schema (بالاترین اولویت)
2. `itemProps` در schema
3. `theme` از FormProvider
4. استایل پیش‌فرض

## ✅ Validation

استفاده از قوانین validation `react-hook-form`:

```tsx
{
  name: 'email',
  label: 'ایمیل',
  type: 'email',
  rules: {
    required: 'ایمیل الزامی است',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل معتبر نیست',
    },
    validate: (value) => {
      // validation سفارشی
      if (value === 'test@example.com') {
        return 'این ایمیل مجاز نیست';
      }
      return true;
    },
  },
}
```

### قوانین رایج

```tsx
// Required
rules: {
  required: 'این فیلد الزامی است',
}

// Min/Max Length
rules: {
  minLength: {
    value: 3,
    message: 'حداقل 3 کاراکتر',
  },
  maxLength: {
    value: 50,
    message: 'حداکثر 50 کاراکتر',
  },
}

// Min/Max Value (برای number)
rules: {
  min: {
    value: 0,
    message: 'مقدار باید مثبت باشد',
  },
  max: {
    value: 100,
    message: 'مقدار باید کمتر از 100 باشد',
  },
}

// Pattern
rules: {
  pattern: {
    value: /^[0-9]+$/,
    message: 'فقط اعداد مجاز است',
  },
}
```

## 🔥 مثال‌های پیشرفته

### مثال 1: فرم ثبت‌نام کامل

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
      label: "نام",
      type: "text",
      gridItemProp: { xs: 12, md: 6 },
      rules: {
        required: "نام الزامی است",
      },
    },
    {
      name: "lastName",
      label: "نام خانوادگی",
      type: "text",
      gridItemProp: { xs: 12, md: 6 },
      rules: {
        required: "نام خانوادگی الزامی است",
      },
    },
    {
      name: "email",
      label: "ایمیل",
      type: "email",
      gridItemProp: { xs: 12 },
      rules: {
        required: "ایمیل الزامی است",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "ایمیل معتبر نیست",
        },
      },
    },
    {
      name: "password",
      label: "رمز عبور",
      type: "password",
      gridItemProp: { xs: 12 },
      rules: {
        required: "رمز عبور الزامی است",
        minLength: {
          value: 8,
          message: "رمز عبور باید حداقل 8 کاراکتر باشد",
        },
      },
    },
    {
      name: "country",
      label: "کشور",
      type: "select",
      gridItemProp: { xs: 12, md: 6 },
      options: [
        { value: "iran", label: "ایران" },
        { value: "usa", label: "آمریکا" },
      ],
      rules: {
        required: "انتخاب کشور الزامی است",
      },
    },
    {
      name: "agree",
      label: "قوانین را می‌پذیرم",
      type: "checkbox",
      gridItemProp: { xs: 12 },
      rules: {
        required: "باید قوانین را بپذیرید",
      },
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Signup Data:", data);
    // ارسال داده به سرور
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
          ثبت‌نام
        </Button>
      </Stack>
    </FormProvider>
  );
}
```

### مثال 2: استفاده از Grid Layout

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

### مثال 3: استفاده از Theme

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

### مثال 4: Auto Complete با Infinite Scroll

```tsx
{
  name: 'city',
  label: 'شهر',
  type: 'auto-complete',
  isLoading: loading,
  options: cities,
  onReachEnd: () => {
    // لود کردن شهرهای بیشتر
    loadMoreCities();
  },
}
```

### مثال 5: Uploader با مدیریت فایل

```tsx
{
  name: 'documents',
  label: 'مدارک',
  type: 'uploader',
  multiple: true,
  rules: {
    required: 'آپلود فایل الزامی است',
    validate: (value) => {
      if (!value?.files || value.files.length === 0) {
        return 'حداقل یک فایل آپلود کنید';
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

### مثال 6: Conditional Fields

```tsx
const schema: TSchema[] = [
  {
    name: "hasAddress",
    label: "آدرس دارم",
    type: "checkbox",
  },
  // نمایش فیلد آدرس فقط اگر checkbox تیک خورده باشد
  ...(form.watch("hasAddress")
    ? [
        {
          name: "address",
          label: "آدرس",
          type: "text-area",
          rules: {
            required: "آدرس الزامی است",
          },
        },
      ]
    : []),
];
```

## 🛠️ کامپوننت‌های جداگانه

می‌توانید از کامپوننت‌های input به صورت جداگانه نیز استفاده کنید:

```tsx
import {
  UFTextField,
  UFSelect,
  UFCheckbox,
  UFDatePicker,
  UFAutoComplete,
  // ... سایر کامپوننت‌ها
} from "react-hook-form-gen";

// استفاده مستقیم
<UFTextField
  form={form}
  name="firstName"
  label="نام"
  type="text"
  error={form.formState.errors.firstName}
/>;
```

## 📝 نکات مهم

1. **FormProvider**: همیشه فرم را داخل `FormProvider` قرار دهید تا theme و context در دسترس باشد.

2. **Grid Layout**: به صورت پیش‌فرض هر فیلد `xs={4}` است. می‌توانید با `gridItemProps` یا `gridItemProp` در هر فیلد تغییر دهید.

3. **Validation**: از قوانین `react-hook-form` استفاده کنید. پیام‌های خطا به صورت خودکار نمایش داده می‌شوند.

4. **TypeScript**: تمام types در `type.d.ts` تعریف شده‌اند. از TypeScript برای type safety استفاده کنید.

5. **Performance**: کامپوننت‌ها با `@loadable/component` lazy load می‌شوند تا performance بهتری داشته باشید.

6. **RTL Support**: پکیج از راست به چپ پشتیبانی می‌کند. برای فعال کردن، theme Material-UI را تنظیم کنید.

## 🤝 مشارکت

مشارکت شما در بهبود این پکیج خوشآمد است! لطفاً issues و pull requests را ارسال کنید.

## 📄 لایسنس

ISC

## 👤 نویسنده

Mohammad

---

**نکته**: این داکیومنت به صورت مداوم به‌روزرسانی می‌شود. برای آخرین تغییرات، به [GitHub Repository](https://github.com/your-repo) مراجعه کنید.
