const Item = require('../models/Item');

exports.getItemDetails = async (req, res) => {
  const { slug } = req.params;
  try {
    const item = await Item.findOne({ slug });
    if (!item) {
      return res.status(200).send({ stock: 0, price: 0 });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send("Error fetching item details");
  }
};

exports.updateItem = async (req, res) => {
  const { slug } = req.params;
  const { stock, price, brand, os, image, screenSize, phone_name } = req.body;
  try {
    const options = { new: true };
    let item = await Item.findOneAndUpdate(
        { slug },
        { stock, price, brand, os, image, screenSize, phone_name },
        options
    );
    if (!item) {
      item = new Item({ slug, stock, price, brand, os, image, screenSize, phone_name });
      await item.save();
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send("Error updating item details");
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send("Error fetching items");
  }
};

exports.deleteItem = async (req, res) => {
  const { slug } = req.params;
  try {
    await Item.findOneAndDelete({ slug });
    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting item");
  }
};