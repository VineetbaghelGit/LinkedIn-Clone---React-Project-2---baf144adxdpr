/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable arrow-parens */
/* eslint-disable quote-props */
import {Box, Button, FormControl, Modal, Typography} from '@mui/material'
import React from 'react'
import ApiUtils from '@/components/apis/ApiUtils'
import InputTextField from '../components/InputField/InputTextField'
import {useFormik} from 'formik'
import * as Yup from 'yup'
// import DefaultPlaceholderImg from '../../images/default-placeholder.jpg'
// import Image from 'next/image'
// import CameraAltIcon from '@mui/icons-material/CameraAlt'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
interface CreateGrpModalProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly setGroupListData: any
}
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '0.8rem',
  p: 4,
  height: '50vh',
  ':focus-visible': {
    outline: 'none',
  },
}
function CreateGrpModal({
  open,
  onClose,
  setGroupListData,
}: CreateGrpModalProps): React.JSX.Element {
  // const [imagePreview,setImagePreview] = useState('')
  const formValidationGroup = useFormik({
    initialValues: {
      title: '',
      description: '',
      images: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      // images: Yup.mixed()
      //   .nullable()
      //   .required()
      //   .test('fileSize', 'Image is required', (value: any) => {
      //     if (!value) {
      //       return true
      //     }
      //     const maxFileSize = 5 * 1024 * 1024
      //     return value.size <= maxFileSize
      //   }),
    }),
    onSubmit: async value => {
      try {
        const formData = new FormData()
        // formData.append('images', value.images)
        formData.append('name', value.title)
        formData.append('description', value.description)

        const response: any = await ApiUtils.createGroup(formData)
        const responseFetch: any = await ApiUtils.getGroupsList()
        setGroupListData(responseFetch?.data)
        ToasterMessage('success', response?.message)
        onClose()
        formValidationGroup.resetForm()
      } catch (err: any) {
        ToasterMessage('error', err?.response?.data.message)
      }
    },
  })
  // const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   if (e?.target?.files != null) {
  //     void formValidationGroup.setFieldValue('images', e?.target?.files[0])
  //     const objectUrl: string = URL.createObjectURL(e.target.files[0])
  //     setImagePreview(objectUrl)
  //   }
  // }
  // useEffect(() => {
  //   if (open) {
  //     formValidationGroup.resetForm()
  //     setImagePreview('')
  //   }
  // }, [open])
  return (
    <Modal
      className="create_post_modal"
      open={open}
      disableScrollLock={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box
          className="share_box_modal"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}>
          <Box
            className="modal_header"
            sx={{
              display: 'block',
            }}>
            <Typography component="h3" sx={{color: '#666666'}}>
              Create Group
            </Typography>
          </Box>
          <Box
            sx={{overflow: 'auto'}}
            component="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              formValidationGroup.handleSubmit()
            }}>
            <FormControl
              sx={{
                marginTop: '24px',
                marginBottom: '0px',
                display: 'block',
              }}>
              {/* <div className="avatar-edit">
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImage}
                  accept=".png, .jpg, .jpeg"
                />
                <label htmlFor="imageUpload" className="image-upload-cam">
                  <CameraAltIcon />
                </label>
              </div> */}
              {/* <div className="avatar-preview">
                <Image
                  className="profile-user-img img-responsive img-circle"
                  id="imagePreview"
                  alt="User profile picture"
                  src={
                    imagePreview.length > 0
                      ? imagePreview
                      : DefaultPlaceholderImg
                  }
                  width={100}
                  height={100}
                />
              </div> */}
              <Typography
                sx={{
                  color: '#d32f2f',
                  fontSize: '0.75rem',
                  marginTop: '4px',
                  marginLeft: '14px',
                }}>
                {(formValidationGroup.touched.images ?? false) &&
                  formValidationGroup.errors.images}
              </Typography>
            </FormControl>
            <FormControl
              sx={{
                marginTop: '24px',
                marginBottom: '0px',
                display: 'block',
              }}>
              {' '}
              <InputTextField
                id="title"
                name="title"
                label="Group name"
                type="text"
                required
                size="small"
                fullWidth={true}
                placeholder="Inspiring Entrepreneurs in DC"
                onChange={formValidationGroup.handleChange}
                value={formValidationGroup.values.title}
                onBlur={formValidationGroup.handleBlur}
                error={
                  (formValidationGroup.touched.title ?? false) &&
                  Boolean(formValidationGroup.errors.title)
                }
                helperText={
                  (formValidationGroup.touched.title ?? false) &&
                  formValidationGroup.errors.title
                }
              />
            </FormControl>
            <FormControl
              sx={{
                marginTop: '24px',
                marginBottom: '0px',
                display: 'block',
              }}>
              <InputTextField
                id="description"
                name="description"
                label="Group Description"
                type="text"
                required
                size="large"
                fullWidth={true}
                placeholder="Inspiring Entrepreneurs in DC"
                multiline={true}
                maxRows={7}
                onChange={formValidationGroup.handleChange}
                value={formValidationGroup.values.description}
                onBlur={formValidationGroup.handleBlur}
                error={
                  (formValidationGroup.touched.description ?? false) &&
                  Boolean(formValidationGroup.errors.description)
                }
                helperText={
                  (formValidationGroup.touched.description ?? false) &&
                  formValidationGroup.errors.description
                }
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              sx={{
                float: 'right',
                my: '15px',
                height: '35px',
                overflow: 'hidden',
                padding: '0 18px',
                borderRadius: '28px',
                background: '#0a66c2',
                ':hover': {
                  background: '#004182',
                },
              }}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateGrpModal
