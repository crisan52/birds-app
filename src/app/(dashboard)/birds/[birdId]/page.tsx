'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Select from '@/components/ui/select'
import { URL_BIRD } from '@/lib/constant'

import Input from '@/components/ui/input-form'
import { Bird } from '@/types/bird'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { updateBird } from '../../actions'

// And now we can use these
const SignupForm = ({ data }: { data: Bird }) => {
  const router = useRouter()
  return (
    <>
      <Formik
        initialValues={{
          id: data.id,
          name: data.name,
          category: data.category, // added for our select
        }}
        validationSchema={Yup.object({
          id: Yup.number(),
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
          updateBird(values).then(() => {
            alert('Updated Successfully.!')
            setSubmitting(false)
            router.push('/')
          })
        }}
      >
        <Form>
          <Input
            label="Bird Name"
            name="name"
            type="text"
            placeholder="Picaflor"
          />

          <Select label="Bird Category" name="category">
            <option value="">Select a bird type</option>
            <option value="Rapaces">Rapaces</option>
            <option value="Corredoras">Corredoras</option>
            <option value="Pajaros">Pajaros</option>
            <option value="Otras">Otras</option>
          </Select>

          <Button type="submit">Update</Button>
        </Form>
      </Formik>
    </>
  )
}

export default function ManagementPage({
  params,
}: {
  params: { birdId: string }
}) {
  const { birdId } = params
  const [isLoading, setLoading] = useState(true)
  const [currentBird, setCurrentBird] = useState<Bird>({category: '', id: 0, name: ''})

  useEffect(() => {
    const getMethod = {
      method: 'GET', // Method itself
      headers: {
        'Content-Type': 'application/json',
      },
      // No need to have body, because we don't send nothing to the server.
    }

    const URL = `${URL_BIRD}?id=${birdId}`
    fetch(URL, getMethod)
      .then((res) => res.json())
      .then((data) => {
        setCurrentBird(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <span>Loading Information...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bird {currentBird?.id}</CardTitle>
        <CardDescription>Update an existing bird.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm data={currentBird} />
      </CardContent>
    </Card>
  )
}
