# ToDo-List-Project
This is a simple web application built with Express.js and MongoDB that allows users to create and manage todo lists.

# Installation
To run this application locally, please follow these steps:

Clone the repository:

~~~
git clone https://github.com/your-username/your-repository.git
~~~

Install the dependencies:

~~~
npm install
~~~

Set up MongoDB:

Make sure you have MongoDB installed and running locally or provide the connection URL for a MongoDB database.  
Configure the application:

~~~
Open the app.js file in a text editor.
~~~

Update the MongoDB connection URL with YOUR_OWN username and password in the following line:  

~~~
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.52soczt.mongodb.net/todoListAT");
~~~

Start the application:

~~~
node app.js
~~~

Open your web browser and visit http://localhost:3000.  

<br>

# Usage

Home Page:  

The default page displays a todo list titled "Today" that contains some predefined items. You can add new items by entering the item name in the input field and clicking the "+" button. To delete an item, click the checkbox next to it and then click the "Delete" button.

Custom Lists:   

You can create custom todo lists by appending a custom list name to the URL. For example, http://localhost:3000/work creates a todo list titled "Work List". The functionality for adding and deleting items remains the same as on the home page.


Dependencies:

~~~
express
body-parser
mongoose
lodash
ejs
~~~

# Contributing:

Contributions are welcome! If you find any issues or would like to add new features, please submit a pull request.

# License:

Feel free to use and modify the code as per your requirements.
