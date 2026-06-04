import express, { response } from 'express'
import { Liquid } from 'liquidjs'
import multer from 'multer'

const app = express()

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

const baseURL = 'https://fdnd-agency.directus.app/items'
const ctcEndpoint = `${baseURL}/ctc_smartzone`

app.get('/', async function (request, response) {
    const params = new URLSearchParams()
    params.set('fields', 'city')
    params.set('groupBy[]', 'city')

    const cityListApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
    const cityListApiResponseJSON = await cityListApiResponse.json()
    const cityList = cityListApiResponseJSON.data

  response.render('index.liquid', { cityList })
})

app.get('/quick-scan', async function (request, response) {
    const quickScanApiResponse = await fetch(`${ctcEndpoint}`)
    const quickScanApiResponseJSON = await quickScanApiResponse.json()
    const quickScan = quickScanApiResponseJSON.data[0]

  response.render('quick-scan.liquid', { quickScan })
})

app.get('/:city', async function (request, response) {
    const params = new URLSearchParams()
    params.set('filter[city][_eq]', request.params.city)

    const cityDetailsApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
    const cityDetailsApiResponseJSON = await cityDetailsApiResponse.json()
    const cityDetails = cityDetailsApiResponseJSON.data

  response.render('city.liquid', { cityDetails })
})

app.get('/:city/:address', async function (request, response) {
    const params = new URLSearchParams()
    params.set('filter[city][_eq]', request.params.city)
    params.set('filter[address][_eq]', request.params.address)

    const addressDetailsApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
    const addressDetailsApiResponseJSON = await addressDetailsApiResponse.json()
    const addressDetails = addressDetailsApiResponseJSON.data

  response.render('address.liquid', { addressDetails })
})

app.use((req, res) => {
  res.status(404).render('404.liquid')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})