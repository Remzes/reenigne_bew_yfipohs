import mongoose from 'mongoose'
import config from '../config'

export default () => {
  mongoose.connect(config.mongoURLDocker, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
}