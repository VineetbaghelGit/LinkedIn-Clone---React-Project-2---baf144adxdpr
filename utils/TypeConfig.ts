export interface Author {
  name: string
  profileImage: string | null
  _id: string
}

export interface PostTypes {
  author: Author
  commentCount: number
  content: string
  createdAt: string
  dislikeCount: number
  images: string[]
  likeCount: number
  title: string
  _id: string
}
