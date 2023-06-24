import mongoose, {Schema} from "mongoose";

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

export const cityModel = mongoose.model('City', citySchema);