import NodeCache from 'node-cache'
import split from '../helpers/split'
import { Router } from 'express'
import WizardService from '../services/wizard.service'

const WizardCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const router = Router()

router.get('/', async (req, res) => {
  const { search } = req.query
  const value = WizardCache.get("wizard")
  let data = []
  let filtered = []
  const searchSplitted = split(search)
  if (value === undefined) {
    const result = await WizardService.getWizards()
    data = result.data
    WizardCache.set("wizard", data, 10000)
  }

  // for loop is faster than Array.prototype.filter
  // And as you see, we have around 200 records in a json
  // But what if we have 20000 and more?
  for (let i = 0, length = result.data.length; i < length; i++) {
    const keywordsSplitted = split(data[i].keywords)
    data[i].matches = 0
    keywordsSplitted
      .forEach(el =>
        searchSplitted
          .forEach(key => { if (el.indexOf(key) > -1) data[i].matches++ }))

    if (data[i].matches > 0) filtered.push(data[i])
  }

  filtered = filtered.sort((a, b) => b.matches - a.matches).slice(0, 20)
  res.set({'Cache-Control': 'public, only-if-cached, max-age=360000'})
  await res.json({success: true, data: filtered})
})

export default router