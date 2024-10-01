'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Input from '@/components/ui/input-form'
import Select from '@/components/ui/select'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { addBird } from '../actions'

// And now we can use these
const SignupForm = () => {
  const router = useRouter()
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          category: '', // added for our select
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          category: Yup.string()
            .oneOf(
              ['Rapaces', 'Corredoras', 'Pajaros', 'Otras'],
              'Invalid Bird Type',
            )
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          addBird(values).then(() => {
            alert('Added Successfully.!')
            setSubmitting(false)
            router.push('/')
          })
        }}
      >
        <Form>
          <Input label="Bird Name" name="name" type="text" placeholder="Picaflor" />

          <Select label="Bird Category" name="category">
            <option value="">Select a bird type</option>
            <option value="Rapaces">Rapaces</option>
            <option value="Corredoras">Corredoras</option>
            <option value="Pajaros">Pajaros</option>
            <option value="Otras">Otras</option>
          </Select>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </>
  )
}

export default function ManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Birds</CardTitle>
        <CardDescription>Create a new bird.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  )
}
