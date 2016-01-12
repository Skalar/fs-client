import { crud } from './src/fs'

function findApplicationsAndPopulateWithPerson(year='2016') {
  function mergeWithPeople(applicationAlternatives, people) {
    applicationAlternatives.forEach(applicationAlternative => {
      applicationAlternative.person = people.find(person =>
        person.getSSN() === applicationAlternative.getSSN())
    })

    return Promise.resolve(applicationAlternatives)
  }

  function findPeople(applicationAlternatives) {
    var people = []

    applicationAlternatives.forEach(applicationAlternative => {
      people.push(crud.person.findBySSN(applicationAlternative.getSSN()))
    })

    return Promise.all(people)
      .then(people => mergeWithPeople(applicationAlternatives, people))
  }

  crud.soknadsAlternativ.findByYear(year)
    .then(applicationAlternatives => findPeople(applicationAlternatives))
    .then(result => console.log(result))
    .catch(error => console.error(`Oops: ${error}`))
}

function findPersonBySSN(ssn=process.argv[2]) {
  crud.person.findBySSN(ssn)
    .then(person => console.log(person))
    .catch(error => console.log(`Oops: ${error}`))
}

// girls girls girls
function stalker() {
  crud.person.findAll({Kjonn: 'K'})
    .then(girls => console.log(girls))
    .catch(err => console.log(err))
}

// Example to fetch data from a custom table (Student)
function customQuery() {
  crud.selectMany('Student', { Postnr_Semadr: '0380'})
    .then(students => console.log(students))
    .catch(err => console.log(err))
}

// customQuery()
// stalker()
// findPersonBySSN(process.argv[2])
findApplicationsAndPopulateWithPerson(process.argv[2])
