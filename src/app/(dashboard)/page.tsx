'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { URL_GET_BIRDS, URL_GET_BIRDS_BY_CATEGORY } from '@/lib/constant'
import { File, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BirdsTable } from './birds-table'

const Home = () => {
  const router = useRouter()

  const [birds, setBirds] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [category, setCategory] = useState(
    'all' || 'rapaces' || 'corredoras' || 'pajaros' || 'otras',
  )

  const getBirds = () => {
    const getMethod = {
      method: 'GET', // Method itself
      headers: {
        'Content-Type': 'application/json',
      },
      // No need to have body, because we don't send nothing to the server.
    }

    const URL =
      category === 'all'
        ? URL_GET_BIRDS
        : `${URL_GET_BIRDS_BY_CATEGORY}?category=${category}`
    fetch(URL, getMethod)
      .then((res) => res.json())
      .then((data) => {
        setBirds(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    const refetch = birds === null
    if (refetch) {
      getBirds()
    }
  }, [birds, setBirds])

  const callRefetch = () => {
    setBirds(null)
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => {
              setCategory('all')
              callRefetch()
            }}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="rapaces"
            onClick={() => {
              setCategory('rapaces')
              callRefetch()
            }}
          >
            Rapaces
          </TabsTrigger>
          <TabsTrigger
            value="corredoras"
            onClick={() => {
              setCategory('corredoras')
              callRefetch()
            }}
          >
            Corredoras
          </TabsTrigger>
          <TabsTrigger
            value="pajaros"
            className="hidden sm:flex"
            onClick={() => {
              setCategory('pajaros')
              callRefetch()
            }}
          >
            Pajaros
          </TabsTrigger>
          <TabsTrigger
            value="otras"
            className="hidden sm:flex"
            onClick={() => {
              setCategory('otras')
              callRefetch()
            }}
          >
            Otros
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => router.push('/birds')}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Bird
            </span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-start items-center h-screen">
          <span>Loading Information...</span>
        </div>
      ) : (
        <BirdsTable
          data={birds ?? []}
          offset={0}
          totalProducts={0}
          refetch={() => callRefetch()}
        />
      )}
    </Tabs>
  )
}

export default Home
