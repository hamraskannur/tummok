import { userModel } from "../model/userModel.js";
import {cityModel} from "../model/cityModel.js"

export const createCity =async (req, res, next) => {
    try {
        const city = new cityModel({
            name: req.body.city,
            population: 9000000,
          });
          
        await city.save()
          res.json({city:city})
          
    } catch (error) {
      console.log(error);
    }
  };



  export const populateUser =async (req, res) => {
    try {
      const users = await userModel.find().populate('city');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
}
  

export const getUser =async (req, res, next) => {
  try {
  const data=await  userModel.aggregate([
      {
        $lookup: {
          from: "city", 
          localField: "city",
          foreignField: "_id",
          as: "cityData",
        },
      }
    ])

  res.json({ data: data})

} catch (error) {
    console.log(error);
  }
};
