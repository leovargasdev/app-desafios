/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChallengeModel, UserModel, connectMongoose } from 'service/mongoose'

import type { User } from 'types/user'
import type { Challenge, ChallengeMongo } from 'types/challenge'
import type { ImageFieldImage, FilledLinkToWebField } from '@prismicio/types'

interface ChallengePrismic {
  uid: string
  data: {
    name: string
    content: any
    deadline: string
    image: ImageFieldImage
    prototype: FilledLinkToWebField
    slices: any[]
  }
}
export const getListChallenges = async (data: any): Promise<Challenge[]> => {
  await connectMongoose()

  const participants: ChallengeMongo[] = await ChallengeModel.find()

  const users: User[] = await UserModel.find().limit(300)

  return data.map((challenge: ChallengePrismic) => {
    const authors = challenge.data.slices.map(slice => ({
      ...slice.primary,
      links: slice.items
    }))

    const usersInChallenge = users
      .reduce((acc, user) => {
        if (user.image && user.challenges.includes(challenge.uid)) {
          acc.push(user.image)
        }
        return acc
      }, [] as string[])
      .slice(-15)

    const participantsInChallenge = participants.find(
      p => p.challenge_id === challenge.uid
    ) as unknown as ChallengeMongo

    return {
      id: challenge.uid,
      name: challenge.data.name,
      content: challenge.data.content,
      description: challenge.data.content[0].text,
      deadline: challenge.data.deadline,
      image: challenge.data.image,
      prototype_url: challenge.data.prototype.url,
      authors,
      participants:
        participantsInChallenge.participants - usersInChallenge.length,
      users: usersInChallenge
    }
  })
}
