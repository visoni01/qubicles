import Forum from '../redux-saga/service/forum'
import { showErrorMessage } from '../redux-saga/redux/snackbar'

class MyUploadAdapter {
  constructor(loader, setIsImageUploading, dispatch) {
    this.loader = loader
    this.setIsImageUploading = setIsImageUploading
    this.dispatch = dispatch
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then(async (file) => {
        this.setIsImageUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        const response = await Forum.imageUpload({ data: formData })
        this.setIsImageUploading(false)
        return {
          default: response.data && response.data.url,
        }
      }).catch((err) => {
        this.dispatch(showErrorMessage({ msg: err }))
        this.setIsImageUploading(false)
      })
  }
}

export default MyUploadAdapter
