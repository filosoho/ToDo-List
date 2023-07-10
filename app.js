const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.52soczt.mongodb.net/todoListAT");

const { Schema } = mongoose;

const itemsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {
  Item.find({})
    .then(foundItems => {
      if (foundItems.length === 0) {
        return Item.insertMany(defaultItems); 
      } else {
        return foundItems;
      }
    })
    .then(items => {
      res.render("list", { listTitle: "Today", newListItems: items });
    })
    .catch(err => {
      console.log(err);
    });
});


app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName})
    .then(foundList => {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        return list.save();
      } else {
        return foundList;
      }
    })
    .then(foundList => {
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    })
    .catch(err => {
      console.log(err);
    });
});


app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName})
      .then(foundList => {
        if (foundList) {
          foundList.items.push(item);
          return foundList.save();
        } else {
          throw new Error("List not found.");
        }
      })
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch(err => {
        console.log(err);
      });
  }
});


app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId)
      .exec()
      .then(() => {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
      .exec()
      .then(foundList => {
        res.redirect("/" + listName);
      })
      .catch(err => {
        console.log(err);
      });
  }
});


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});