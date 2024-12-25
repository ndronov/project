import { FieldMetaProps } from 'formik';

export function isFieldInvalid<Value>(meta: FieldMetaProps<Value>) {
  return Boolean(meta.error) && meta.touched;
}

export function isFieldNonEmpty<Value>(meta: FieldMetaProps<Value>) {
  return Boolean(meta.value);
}
