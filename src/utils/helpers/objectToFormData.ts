export const objectToFormData = (
  obj: any,
  formData = new FormData(),
  namespace = ''
) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const fullKey = namespace ? `${namespace}.${key}` : key;

      if (value instanceof Date) {
        addDateToFormData(formData, fullKey, value);
      } else if (value instanceof File) {
        addFileToFormData(formData, fullKey, value);
      } else if (Array.isArray(value)) {
        addArrayToFormData(value, formData, fullKey);
      } else if (typeof value === 'object' && !(value instanceof File)) {
        addObjectToFormData(value, formData, fullKey);
      } else {
        formData.append(fullKey, value);
      }
    }
  }

  return formData;
};

const addDateToFormData = (formData: FormData, key: string, value: Date) => {
  formData.append(key, value.toISOString());
};

const addFileToFormData = (formData: FormData, key: string, value: File) => {
  formData.append(key, value, value.name);
};

const addArrayToFormData = (
  value: unknown[],
  formData: FormData,
  fullKey: string
) => {
  value.forEach((item, index) => {
    const arrayKey = `${fullKey}[${index}]`;

    if (typeof item === 'string') {
      formData.append(arrayKey, item);
    } else {
      objectToFormData(item, formData, arrayKey);
    }
  });
};

const addObjectToFormData = (
  value: unknown,
  formData: FormData,
  fullKey: string
) => {
  objectToFormData(value, formData, fullKey);
};
