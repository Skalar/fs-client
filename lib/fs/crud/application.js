import { selectMany } from './request'
import { getAttribute, toSSN } from '../helpers'

function serialize(application) {
  return {
    year:             getAttribute(application, 'Arstall'),
    ssn:              toSSN(getAttribute(application, 'Fodselsdato'), getAttribute(application, 'Personnr')),
    admissionType:    getAttribute(application, 'Opptakstypekode'),
    courseTypeNumber: getAttribute(application, 'Studietypenr'),
    priority:         getAttribute(application, 'Prioritetsnr'),
    semesterCode:     getAttribute(application, 'Terminkode')
  }
}

function findAll(year=new Date().getFullYear()) {
  return selectMany('SoknadsAlternativ', { Arstall: year }, serialize)
}

export { findAll }
