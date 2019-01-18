import { Router } from 'express'
import WizardService from '../services/wizard.service'

const router = Router()

router.get('/', async (req, res) => {
  const result = await WizardService.getWizards()
  await res.json({data: result.data})
})

export default router