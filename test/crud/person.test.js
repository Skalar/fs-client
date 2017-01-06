import test from 'blue-tape'
import nock from 'nock'
import {crud} from './helpers'

test('it finds people', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud">
                <Person>
                    <Fodselsdato>130988</Fodselsdato>
                    <Personnr>32578</Personnr>
                    <Kjonn>M</Kjonn>
                    <Etternavn>Fredriksen</Etternavn>
                    <Fornavn>Fredrik</Fornavn>
                    <Landnr_Hjemland>0</Landnr_Hjemland>
                    <Adrlin1_Hjemsted/>
                    <Adrlin2_Hjemsted/>
                    <Adrlin3_Hjemsted/>
                    <Adresseland_Hjemsted/>
                    <Postnr_Hjemsted/>
                    <Emailadresse_Privat>fredrik@hotmail.com</Emailadresse_Privat>
                    <Studentgrunnlagkode/>
                    <Emailadresse/>
                    <Status_Dod/>
                    <Brukernavn/>
                    <Telefonnr_Mobil>99912345</Telefonnr_Mobil>
                    <Telefonnr_Hjemsted>2212345</Telefonnr_Hjemsted>
                  </Person>
                  <Person>
                    <Fodselsdato>130988</Fodselsdato>
                    <Personnr>24141</Personnr>
                    <Kjonn>M</Kjonn>
                    <Etternavn>Sorgenfri</Etternavn>
                    <Fornavn>Ole Martin</Fornavn>
                    <Landnr_Hjemland>0</Landnr_Hjemland>
                    <Adrlin1_Hjemsted/>
                    <Adrlin2_Hjemsted>Stangevegen 12</Adrlin2_Hjemsted>
                    <Adrlin3_Hjemsted>2335 STANGE</Adrlin3_Hjemsted>
                    <Adresseland_Hjemsted/>
                    <Postnr_Hjemsted>2335</Postnr_Hjemsted>
                    <Emailadresse_Privat>ole@outlook.com</Emailadresse_Privat>
                    <Studentgrunnlagkode/>
                    <Emailadresse>ole123@student.westerdals.no</Emailadresse>
                    <Status_Dod/>
                    <Brukernavn>ole123</Brukernavn>
                    <Telefonnr_Mobil/>
                    <Telefonnr_Hjemsted>12345678</Telefonnr_Hjemsted>
                  </Person>
              </doSelectManyResponse>`

  nock.cleanAll()
  nock(crud.config.url)
    .post('/selectMany')
    .reply(200, xml)

  return crud.Person.find({Fodselsdato: 130988})
    .then(result => {
      assert.equal(result.length, 2)
      assert.equal(result[0].address, null)
      assert.equal(result[0].phone, '99912345')

      assert.equal(result[1].name, 'Ole Martin Sorgenfri')
      assert.equal(result[1].Fodselsdato, '130988')
      assert.equal(result[1].ssn, '13098824141')
      assert.equal(result[1].email, 'ole@outlook.com')
      assert.equal(result[1].phone, '12345678')
      assert.equal(result[1].address, 'Stangevegen 12, 2335 STANGE')
    })
})

test('find uses correct query', assert => {
  nock.cleanAll()
  nock(crud.config.url)
    .post('/selectMany', body => {
      assert.deepEqual({ xml: '<doSelectManyRequest xmlns="http://fsws.usit.no/schemas/crud"><Person><Kjonn>K</Kjonn></Person></doSelectManyRequest>' }, body)
      return true
    })
    .reply(200, '<SomeXmlData></SomeXmlData>')

  return crud.Person.find({Kjonn: 'K'})
})
