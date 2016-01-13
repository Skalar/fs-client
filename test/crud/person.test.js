import test from 'blue-tape'
import nock from 'nock'
import Person from '../../src/fs/crud/person'

test('it finds people', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud">
                <Person>
                    <Fodselsdato>130988</Fodselsdato>
                    <Personnr>34758</Personnr>
                    <Kjonn>M</Kjonn>
                    <Etternavn>Lindtun</Etternavn>
                    <Fornavn>Fredrik</Fornavn>
                    <Landnr_Hjemland>0</Landnr_Hjemland>
                    <Adrlin1_Hjemsted/>
                    <Adrlin2_Hjemsted/>
                    <Adrlin3_Hjemsted/>
                    <Adresseland_Hjemsted/>
                    <Postnr_Hjemsted/>
                    <Emailadresse_Privat>fredriklindtun@hotmail.com</Emailadresse_Privat>
                    <Studentgrunnlagkode/>
                    <Emailadresse/>
                    <Status_Dod/>
                    <Brukernavn/>
                  </Person>
                  <Person>
                    <Fodselsdato>130988</Fodselsdato>
                    <Personnr>28383</Personnr>
                    <Kjonn>M</Kjonn>
                    <Etternavn>Sørlie</Etternavn>
                    <Fornavn>Martin Nikolai</Fornavn>
                    <Landnr_Hjemland>0</Landnr_Hjemland>
                    <Adrlin1_Hjemsted/>
                    <Adrlin2_Hjemsted>Stangevegen 862</Adrlin2_Hjemsted>
                    <Adrlin3_Hjemsted>2335 STANGE</Adrlin3_Hjemsted>
                    <Adresseland_Hjemsted/>
                    <Postnr_Hjemsted>2335</Postnr_Hjemsted>
                    <Emailadresse_Privat>martz@outlook.com</Emailadresse_Privat>
                    <Studentgrunnlagkode/>
                    <Emailadresse>sormar13@student.westerdals.no</Emailadresse>
                    <Status_Dod/>
                    <Brukernavn>sormar13</Brukernavn>
                  </Person>
              </doSelectManyResponse>`

  nock.cleanAll()
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany')
    .reply(200, xml)

  return Person.find({Fodselsdato: 130988})
    .then(result => {
      assert.equal(result.length, 2)
      assert.equal(result[0].name, 'Fredrik Lindtun')
      assert.equal(result[0].Fodselsdato, '130988')
      assert.equal(result[0].ssn, '13098834758')
    })
})

test('find uses correct query', assert => {
  nock.cleanAll()
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany', body => {
      assert.deepEqual({ xml: '<doSelectManyRequest xmlns="http://fsws.usit.no/schemas/crud"><Person><Kjonn>K</Kjonn></Person></doSelectManyRequest>' }, body)
      return true
    })
    .reply(200, '<SomeXmlData></SomeXmlData>')

  return Person.find({Kjonn: 'K'})
})
