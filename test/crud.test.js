import test from 'blue-tape'
import nock from 'nock'
import crud from '../src/fs/crud'

test('Finding SoknadsAlternativ from FS', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud"><SoknadsAlternativ><Fodselsdato>30988</Fodselsdato><Personnr>21133</Personnr><Opptakstypekode>MASTER</Opptakstypekode><Terminkode>HØST</Terminkode><Arstall>2015</Arstall><Institusjonsnr>1655</Institusjonsnr><Studietypenr>3100</Studietypenr><Prioritetsnr>2</Prioritetsnr><Opptorgankode_Saksbeh>WOACT</Opptorgankode_Saksbeh><Opptorgankode_Tilbudsgiver>WOACT</Opptorgankode_Tilbudsgiver></SoknadsAlternativ><SoknadsAlternativ><Fodselsdato>130988</Fodselsdato><Personnr>21133</Personnr><Opptakstypekode>MASTER</Opptakstypekode><Terminkode>HØST</Terminkode><Arstall>2015</Arstall><Institusjonsnr>1655</Institusjonsnr><Studietypenr>3110</Studietypenr><Prioritetsnr>1</Prioritetsnr><Opptorgankode_Saksbeh>WOACT</Opptorgankode_Saksbeh><Opptorgankode_Tilbudsgiver>WOACT</Opptorgankode_Tilbudsgiver></SoknadsAlternativ></doSelectManyResponse>`
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany')
    .reply(200, xml)

  return crud.soknadsAlternativ.findAll()
    .then(result => {
      assert.equal(result.length, 2)
      assert.equal(result[0].Arstall, '2015')
      assert.equal(result[0].Fodselsdato, '30988')
      assert.equal(result[0].getSSN(), '03098821133')
    })
})
