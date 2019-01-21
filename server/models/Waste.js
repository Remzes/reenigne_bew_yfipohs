import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WasteSchema = Schema({
  title: { type: String },
  body: { type: String },
  category: { type: String },
  keywords: { type: String }
}, { versionKey: false } )

WasteSchema.statics.removeFavourite = function(id, cb) {
  this.findOneAndRemove({ title: id }, (err) => {
    if (err) throw new Error(err)
    cb()
  })
}

const Waste = mongoose.model("Waste", WasteSchema)

export default Waste