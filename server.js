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

// Voor menu navigatie
const cityListNavApiResponse = await fetch(`${ctcEndpoint}?fields=city&filter[city][_neq]=null&groupBy[]=city`)
const cityListNavApiResponseJSON = await cityListNavApiResponse.json()
const cityListNav = cityListNavApiResponseJSON.data

app.get('/', async function (request, response) {
  const params = new URLSearchParams()
  params.set('fields', 'city')
  params.set('filter[city][_neq]', null)
  params.set('groupBy[]', 'city')

  // Om de steden van a-z en z-a te sorteren
  const sort = request.query.sort
  let sortCity

  if (sort === 'descending') {
    sortCity = '-city'
  } else {
    sortCity = 'city'
  }

  params.set('sort', sortCity)

  const cityListApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
  const cityListApiResponseJSON = await cityListApiResponse.json()
  const cityList = cityListApiResponseJSON.data

  response.render('index.liquid', { cityList, sortCity: sort, cityListNav })
})

app.get('/quick-scan', async function (request, response) {
  const params = new URLSearchParams()
  params.set('fields', 'city')
  params.set('groupBy[]', 'city')

  const quickScanApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
  const quickScanApiResponseJSON = await quickScanApiResponse.json()
  const quickScanCities = quickScanApiResponseJSON.data

  const status = request.query.status

  response.render('quick-scan.liquid', { quickScanCities, status, cityListNav })
})

app.post('/quick-scan', upload.single('picture'), async function (request, response) {

  // Step 1: Upload file naar Directus

  let pictureId = null

  // Als er een foto is meegestuurd, voer dit dan uit
  if (request.file) {
    // Haal de data van de file/foto op uit het formulier in de HTML
    const file = request.file

    // Maak een nieuwe FormData object om de file data te versturen in een multipart/form-data request
    const formData = new FormData()
    const blob = new Blob([file.buffer], { type: file.mimetype })
    formData.append("picture", blob, file.originalname)

    // Verstuur een POST request naar de Directus API om de file te uploaden
    const uploadResponse = await fetch('https://fdnd-agency.directus.app/files', {
      method: "POST",
      body: formData,
    })

    // Parse de JSON response van Directus
    const uploadResponseData = await uploadResponse.json()

    // Zet de geparsde JSON repsonse om in een variabele
    pictureId = uploadResponseData.data.id
  }

  // Step 2: Maak een nieuw object met data in Directus
  const apiResponse = await fetch(`${ctcEndpoint}`, {
    method: 'POST',

    body: JSON.stringify({
      picture: pictureId,
      city: request.body.city,
      address: request.body.address,
      long: request.body.long,
      lat: request.body.lat,
      length: request.body.length,
      time: request.body.time,
      monitoring_suitability: request.body.monitoring_suitability,
      smartzone_suitability: request.body.smartzone_suitability,
      status: request.body.status,
      traffic_sign: request.body.traffic_sign,
      comment: request.body.comment,
    }),

    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Als het maken van een nieuw data object heeft gefaald. Stuur een error bericht
  if (!apiResponse.ok) {
    return response.redirect(303, '/quick-scan?status=error')
  }

  return response.redirect(303, `/${request.body.city}?status=success`)
})

app.get('/:city', async function (request, response) {
  const params = new URLSearchParams()
  params.set('filter[city][_eq]', request.params.city)

  const cityDetailsApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
  const cityDetailsApiResponseJSON = await cityDetailsApiResponse.json()
  const cityDetails = cityDetailsApiResponseJSON.data

  const status = request.query.status

  response.render('city.liquid', { cityDetails, status, cityListNav })
})

app.get('/:city/:address', async function (request, response) {
  const params = new URLSearchParams()
  params.set('filter[city][_eq]', request.params.city)
  params.set('filter[address][_eq]', request.params.address)

  const addressDetailsApiResponse = await fetch(`${ctcEndpoint}?${params.toString()}`)
  const addressDetailsApiResponseJSON = await addressDetailsApiResponse.json()
  const addressDetails = addressDetailsApiResponseJSON.data

  response.render('address.liquid', { addressDetails, cityListNav })
})

// app.post("/delete", async (req, res) => {
//   const id = req.body.id

//   await fetch(`https://fdnd-agency.directus.app/items/ctc_smartzone/${id}`, {
//     method: "DELETE",
//   })

//   res.redirect(303, `/`)
// })

app.use((req, res) => {
  res.status(404).render('404.liquid')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})