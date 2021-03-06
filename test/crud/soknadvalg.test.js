import test from 'blue-tape'
import nock from 'nock'
import {crud} from './helpers'

test('find should find a Soknadvalg', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud">
                <Soknadvalg>
                  <Arstall>2015</Arstall>
                  <Fodselsdato>180496</Fodselsdato>
                  <Institusjonsnr>1655</Institusjonsnr>
                  <Opptakstypekode>BACH/AR/HK</Opptakstypekode>
                  <Personnr>11225</Personnr>
                  <Studieprogramvalgkode>VOKAL</Studieprogramvalgkode>
                  <Studietypenr>1601</Studietypenr>
                  <Terminkode>HØST</Terminkode>
                  <Merknadtekst></Merknadtekst>
                </Soknadvalg>
              </doSelectManyResponse>`

  nock(crud.config.url)
    .post('/selectMany')
    .reply(200, xml)

  return crud.Soknadvalg.find({Fodselsdato: '180496', Personnr: '11225', Studietypenr: '1601'})
    .then(result => {
      assert.equal(result[0].Studieprogramvalgkode, 'VOKAL')
    })
})

test('find uses correct query', assert => {
  nock.cleanAll()
  nock(crud.config.url)
    .post('/selectMany', body => {
      assert.deepEqual({ xml: '<doSelectManyRequest xmlns="http://fsws.usit.no/schemas/crud"><Soknadvalg><Personnr>12345</Personnr></Soknadvalg></doSelectManyRequest>' }, body)
      return true
    })
    .reply(200, '<SomeXmlData></SomeXmlData>')

  return crud.Soknadvalg.find({Personnr: '12345'})
})
