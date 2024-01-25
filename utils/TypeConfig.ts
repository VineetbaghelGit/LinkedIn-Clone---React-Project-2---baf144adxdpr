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
export interface CommentsDataTypes {
  _id: string
  content: string
  author: string
  children: Comment[]
  createdAt: string
  isEdited: boolean
  parentComment: string | null
  post: string
  __v: number
}
