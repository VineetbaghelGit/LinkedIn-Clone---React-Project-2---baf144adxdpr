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
  isLiked: boolean
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
  author_details: {
    _id: string
    name: string
    profileImage: string
  }
}
export interface AddressType {
  city: string
  country: string
  state: string
  street: string
  zipCode: string
}

export interface EducationType {
  degree: string
  description: string
  endDate: string
  schoolName: string
  startDate: string
  _id: string
}
export interface WorkExperienceType {
  companyName: string
  description: string
  designation: string
  endDate: string
  location: string
  startDate: string
  _id: string
}
export interface UserProfileType {
  address: AddressType[]
  createdAt: string
  education: EducationType[]
  email: string
  gender: string
  isFollowed: boolean
  name: string
  phone: string
  profileImage: string
  skills: string[]
  updateAt: string
  workExperience: WorkExperienceType[]
  workExprience: any[]
  __v: number
  _id: string
  status: string
}
export interface ApiResponseType {
  data: UserProfileType
  status: string
}

export interface GroupData {
  createdAt: string
  description: string
  image: string
  isEdited: boolean
  name: string
  __v: number
  _id: string
}
