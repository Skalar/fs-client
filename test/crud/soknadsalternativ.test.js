import test from 'blue-tape'
import nock from 'nock'
import SoknadsAlternativ from '../../src/fs/crud/soknadsalternativ'

test('find returns JSON data', assert => {
  const xml = `<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud">
                <SoknadsAlternativ><Fodselsdato>30988</Fodselsdato><Personnr>21133</Personnr><Opptakstypekode>MASTER</Opptakstypekode><Terminkode>HØST</Terminkode><Arstall>2015</Arstall><Institusjonsnr>1655</Institusjonsnr><Studietypenr>3100</Studietypenr><Prioritetsnr>2</Prioritetsnr><Opptorgankode_Saksbeh>WOACT</Opptorgankode_Saksbeh><Opptorgankode_Tilbudsgiver>WOACT</Opptorgankode_Tilbudsgiver></SoknadsAlternativ>
                <SoknadsAlternativ><Fodselsdato>130988</Fodselsdato><Personnr>21133</Personnr><Opptakstypekode>MASTER</Opptakstypekode><Terminkode>HØST</Terminkode><Arstall>2015</Arstall><Institusjonsnr>1655</Institusjonsnr><Studietypenr>3110</Studietypenr><Prioritetsnr>1</Prioritetsnr><Opptorgankode_Saksbeh>WOACT</Opptorgankode_Saksbeh><Opptorgankode_Tilbudsgiver>WOACT</Opptorgankode_Tilbudsgiver></SoknadsAlternativ>
              </doSelectManyResponse>`

  nock.cleanAll()
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany')
    .reply(200, xml)

  return SoknadsAlternativ.find({Personnr: 21133})
    .then(result => {
      assert.equal(result.length, 2)
      assert.equal(result[0].Arstall, '2015')
      assert.equal(result[0].Fodselsdato, '030988')
      assert.equal(result[0].ssn, '03098821133')
    })
})

test('find returning no results', assert => {
  const xml = '<doSelectManyResponse xmlns="http://fsws.usit.no/schemas/crud"></doSelectManyResponse>'
  nock.cleanAll()
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany')
    .reply(200, xml)

  return SoknadsAlternativ.find()
    .then(result => assert.equal(0, result.length))
})

test('find when server returns error', assert => {
  nock.cleanAll()
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany')
    .reply(500, 'Invalid query')

  return SoknadsAlternativ.find({Personnr: 'foo'})
    .catch(error => assert.equal('Invalid query', error))
})

test('findByYear filters by year', assert => {
  nock.cleanAll()
  nock(process.env.FS_CRUD_URL)
    .post('/selectMany', body => {
      assert.deepEqual({ xml: '<doSelectManyRequest xmlns="http://fsws.usit.no/schemas/crud"><SoknadsAlternativ><Arstall>2014</Arstall></SoknadsAlternativ></doSelectManyRequest>' }, body)
      return true
    })
    .reply(200, '<SomeXmlData></SomeXmlData>')

  return SoknadsAlternativ.findByYear(2014)
})
