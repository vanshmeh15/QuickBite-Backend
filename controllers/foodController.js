import food_model from "../models/Food_model.js";
import fs from 'fs'
import foodModel from "../models/Food_model.js";

const addFood = async (req, res) => {

     let image_filename = `${req.file.filename}`;
     const food = new foodModel({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: image_filename,
          category: req.body.category,
     });
     try {
          await food.save()
          res.json({ success: true, message: "Food Added" })
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: "Error" })
     }
}

//All food list 
const listFood = async (req, res) => {
     try {
          const foods = await foodModel.find({})
          res.json({ success: true, data: foods })
     } catch (error) {
          console.log(error)
          res.json({ success: false, message: "Error" })
     }
}
//Remove food items
const removeFoodItem = async (req, res) => {
     try {
          let id = req.body.id
          const food = await foodModel.findById(id);
          fs.unlink(`uploads/${food.image}`, () => { });
          await foodModel.findByIdAndDelete(id);
          res.json({ success: true, message: "Food removed" });
     } catch (error) {
          console.log(error)
          res.json({ success: false, message: "Error" })
     }
}

export { addFood, listFood, removeFoodItem };