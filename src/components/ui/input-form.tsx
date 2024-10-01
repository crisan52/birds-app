import { useField } from 'formik'
import { HTMLInputTypeAttribute } from 'react'

export type InputProps = {
  id: string
  label: string
  name: string
  type: HTMLInputTypeAttribute | undefined
  placeholder?: string | undefined
}

const Input = ({ label, ...props }: InputProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className="my-4">
      <label htmlFor={props.id || props.name}>{label}</label>

      <input
        className="my-2 text-gray-500 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">
          <p
            id={`error-${props.id || props.name}`}
            className="mt-2 text-red-500 text-xs italic"
          >
            {meta.error}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default Input
