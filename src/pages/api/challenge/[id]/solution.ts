import { ZodError } from 'zod'
import { getSession } from 'next-auth/react'
import type { NextApiResponse, NextApiRequest } from 'next'

import { zodSolutionSchema } from 'utils/zod'
// import { connectMongoose, SolutionModel } from 'service/mongoose'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const isRedirect = !['POST', 'GET'].includes(req.method || '')

  if (isRedirect) {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
    return
  }

  const session = await getSession({ req })

  console.log('session', session)

  // if (!session?.user) {
  //   return res.status(401).send('Unauthorized')
  // }

  // const user_id = session.user._id
  // const challenge_id = req.query.id as string

  // await connectMongoose()

  if (req.method === 'POST') {
    try {
      const solution = zodSolutionSchema.parse(req.body)
      console.log(solution)
      // const isSolution = await SolutionModel.findOneAndUpdate(
      //   { user_id, challenge_id },
      //   solution
      // )

      // // Primeiro envio
      // if (!isSolution) {
      //   await SolutionModel.create({ user_id, challenge_id, ...solution })
      // }

      return res.status(200).send('')
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json(error.flatten().fieldErrors)
      }

      return res.status(500).send('Internal Server Error')
    }
  }

  // await connectMongoose()
  // const queryMongo = { user_id, challenge_id }
  // const ignoreFields = { createdAt: 0, updatedAt: 0, _id: 0, user_id: 0 }
  // const solution = await SolutionModel.findOne(queryMongo, ignoreFields)

  // return res.status(200).json(solution)
  return res.status(200).json({
    repository_url: 'http://localhost:3000/desafio/paqueta-calcados',
    linkedin_url: '',
    url: 'http://aaa.com.br',
    level: 'medium'
  })
}
