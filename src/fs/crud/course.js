import { selectMany } from './request'
import { getAttribute } from '../helpers'

function serialize(course) {

  return {
    year:                       new Date().getFullYear(),
    name:                       getAttribute(course, 'Studieprognavn'),
    courseTypeId:               getAttribute(course, 'Studieprogramkode'),
    courseCode:                 null,
    hasAdmissionAssets:         false,
    admissionAssetUploadStart:  null,
    admissionAssetUploadEnd:    null,
    admissionDescription:       null
  }
}

function findAll() {
  return selectMany('Studieprogram', {}, serialize)
}

export { findAll }
