import BaseService from './base.service'

const wizard = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"
class WizardService extends BaseService {
  async getWizards () { return await this.makeRequest(wizard, '') }
}

export default new WizardService()