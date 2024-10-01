'use server'

import { URL_BIRD } from '@/lib/constant'
import { Bird } from '@/types/bird'
import { revalidatePath } from 'next/cache'


export const deleteBird = async (id: number) => {
  const URL = `${URL_BIRD}?id=${id}`
  const deleteMethod = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }

  // // Make the HTTP Delete call using fetch api
  await fetch(URL, deleteMethod)
  revalidatePath('/')
}


export const addBird = async (bird: Bird) => {
  const URL = `${URL_BIRD}`
  const addMethod = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bird)
  }

  // // Make the HTTP Delete call using fetch api
  await fetch(URL, addMethod)
  revalidatePath('/')
}

export const updateBird = async (bird: Bird) => {
  console.log('BIRD ', JSON.stringify(bird))
  const URL = `${URL_BIRD}?id=${bird.id}`
  const addMethod = {
    method: 'PATCH',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bird)
  }

  // // Make the HTTP Delete call using fetch api
  await fetch(URL, addMethod)
  revalidatePath('/')
}