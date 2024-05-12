export interface ICreateProjectInput {
  userId: string,
  name: string,
  description: string,
  domainId: string,
  statusId: string,
  projectUrl: string | null,
  gitUrl: string | null,
  imageId: string | null,
  documentsIds: string[]
  positions: {
    name: string,
    level: number,
    description: string
  }[]
}

export interface IProjectDto {
  id: string,
  name: string,
  description: string,
  domainId: string,
  domainName: string,
  statusId: string,
  statusName: string,
  projectUrl: string,
  gitUrl: string,
  imageId: string,
  imageUrl: string,
  like: {
    projectId: string,
    likes: number,
    isLike: boolean
  },
  positions: {
    name: string,
    level: number,
    description: string
  }[]
}

export interface IProjectLikeDto {
  projectId: string,
  likes: number,
  isLike: boolean
}
