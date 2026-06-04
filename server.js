import express, { response } from 'express'
import { Liquid } from 'liquidjs'

const app = express()

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


app.use((req, res) => {
  res.status(404).render('404.liquid')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})