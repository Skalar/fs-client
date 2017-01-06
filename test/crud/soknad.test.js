import test from 'blue-tape'
import nock from 'nock'
import {crud} from './helpers'

test('find can find one Soknad', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud">
                <Soknad>
                  <Fodselsdato>110471</Fodselsdato>
                  <Personnr>10300</Personnr>
                  <Opptakstypekode>ENKELTEMNE</Opptakstypekode>
                  <Terminkode>HØST</Terminkode>
                  <Arstall>2016</Arstall>
                  <Regnr>99001</Regnr>
                  <Opptorgankode_B_Rolle></Opptorgankode_B_Rolle>
                </Soknad>
              </doSelectManyResponse>`

  nock(crud.config.url)
    .post('/selectMany')
    .reply(200, xml)

  return crud.Soknad.find({Fodselsdato: '110471', Personnr: '10300', Arstall: '2016', Terminkode: 'HØST'})
    .then(result => {
      assert.equal(result.length, 1)
      assert.equal(result[0].Opptakstypekode, 'ENKELTEMNE')
    })
})
