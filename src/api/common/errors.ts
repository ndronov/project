import { CustomErrorResponseData, ErrorResponseData, FormErrors, StandardErrorResponseData } from '@/api';

const DEFAULT_ERROR_MESSAGE = 'Неизвестная ошибка';

function isStandardErrorResponseData(
  data: StandardErrorResponseData | CustomErrorResponseData,
): data is StandardErrorResponseData {
  return typeof (data as StandardErrorResponseData).error === 'string';
}

function isCustomErrorResponseData(
  data: StandardErrorResponseData | CustomErrorResponseData,
): data is CustomErrorResponseData {
  return Array.isArray((data as CustomErrorResponseData).errors);
}

export function mapToResponseErrors(data?: ErrorResponseData) {
  if (!data) return { error: DEFAULT_ERROR_MESSAGE };

  if (isCustomErrorResponseData(data)) {
    const { errors } = data;
    const formErrors = {} as FormErrors;

    errors.forEach(({ field, msg }) => {
      formErrors[field] = msg;
    });

    return { formErrors };
  }

  const standardError = isStandardErrorResponseData(data) ? data.error : '';
  const error = standardError || DEFAULT_ERROR_MESSAGE;

  return { error };
}
