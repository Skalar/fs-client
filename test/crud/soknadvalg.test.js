import test from 'blue-tape'
import nock from 'nock'
import Soknadvalg from '../../src/fs/crud/soknad'

test('find should find a Soknadvalg', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud">
                <Soknadvalg>
                  <Arstall>2015</Arstall>
                  <Fodselsdato>180496</Fodselsdato>
                  <Institusjonsnr>1655</Institusjonsnr>
                  <Opptakstypekode>BACH/AR/HK</Opptakstypekode>
                  <Personnr>32254</Personnr>
                  <Studieprogramvalgkode>VOKAL</Studieprogramvalgkode>
                  <Studietypenr>1601</Studietypenr>
                  <Terminkode>HØST</Terminkode>
                  <Merknadtekst></Merknadtekst>
                </Soknadvalg>
              </doSelectManyResponse>`

  nock(process.env.FS_CRUD_URL)
    .post('/selectMany')
    .reply(200, xml)

  return Soknadvalg.find({Fodselsdato: '180496', Personnr: '32254', Studietypenr: '1601'})
    .then(result => {
      assert.equal(result[0].Studieprogramvalgkode, 'VOKAL')
    })
})
