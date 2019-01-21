import { Router } from 'express'
import Waste from '../models/Waste'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const favourites = await Waste.find({}).lean()
    favourites.forEach(e => e.isFav = true)
    res.json({ data: favourites })
  } catch (e) {
    throw new Error(e)
  }
})

router.post('/', (req, res) => {
  const item  = req.body
  const newItem = new Waste(item)
  newItem.save((err, item) => {
    if (err) throw new Error(err)
    res.json({ success: true, message: 'Item was successfully created!', item })
  })
})

router.delete('/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title)
  Waste.removeFavourite(title, err => {
    if (err) res.json({ success: false, message: err })
    res.json({ success: true, message: "You successfully removed the favourite!" })
  })
})

export default router