import { crud } from './lib/fs'

function findApplicationsAndPopulateWithPerson(year='2016') {
  function mergeWithPeople(applications, people) {
    applications.forEach(application => {
      application.person = people.find(person => person.ssn === application.ssn)
    })

    return Promise.resolve(applications)
  }

  function findPeople(applications) {
    var people = []

    applications.forEach(application => {
      people.push(crud.person.find(application.ssn))
    })

    return Promise.all(people)
      .then(people => mergeWithPeople(applications, people))
  }

  crud.application.findAll(year)
    .then(applications => findPeople(applications))
    .then(result => console.log(result))
    .catch(error => console.error(`Oops: ${error}`))
}

function findPersonBySSN(ssn) {
  crud.person.find(process.argv[2])
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

// Example to get course
function findCourse() {
  crud.course.findAll()
    .then(courses => console.log(courses))
    .catch(err => console.log(err))
}

findCourse()
// customQuery()
// stalker()
// findPersonBySSN(process.argv[2])
// findApplicationsAndPopulateWithPerson(process.argv[2])
