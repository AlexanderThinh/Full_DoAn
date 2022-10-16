import axios from "axios"

let endpoints = {
  loaiTour: '/loai-tour/',
  tours: '/tours/',
  tourDetail: (tourID) => `/tours/${tourID}/`,
  lichTrinh: (tourID) => `/tours/${tourID}/lich-trinh/`,
  register: '/users/',
  oauth2Info: '/oauth-info/',
  login: '/o/token/',
  currentUser: '/users/current-user/',
  booking: (tourID) => `/tours/${tourID}/booking/`,
  ratingTour: (tourID) => `/tours/${tourID}/rating/`,
  getCommentsTour: (tourID) => `/tours/${tourID}/comments/`,
  getImagesTour: (tourID) => `/tours/${tourID}/images/`,
  commentsTour: (tourID) => `/tours/${tourID}/add-comments/`,
  tinTuc: '/tin-tuc/',
  tinTucDetail: (tinTucID) => `/tin-tuc/${tinTucID}/`,
  likeTinTuc: (tinTucID) => `/tin-tuc/${tinTucID}/like/`,
  getCommentsTinTuc: (tinTucID) => `/tin-tuc/${tinTucID}/comments/`,
  commentsTinTuc: (tinTucID) => `/tin-tuc/${tinTucID}/add-comment/`
}

export default axios.create({
  baseURL: 'https://alexanderthinh.pythonanywhere.com/'
  // baseURL: 'http://localhost:8000/'
})

export { endpoints }