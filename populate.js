#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/user");
const Message = require("./models/message");

const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(
  index,
  first_name,
  last_name,
  username,
  password,
  membership,
  admin
) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: password,
    membership: membership,
    admin: admin,
  });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${first_name} ${last_name}`);
}

async function messageCreate(index, user, message) {
  const newMessage = new Message({
    user: user,
    message: message,
  });

  await newMessage.save();
  messages[index] = newMessage;
  console.log(`Added message: ${user} ${message}`);
}

// index, first_name, last_name, username, password, membership;
async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "John", "Doe", "johndoe@email.com", "12345", true, true),
    userCreate(1, "Jane", "Doe", "janedoe@email.com", "11111", false, false),
  ]);
}

// index, user, message
async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(0, users[0], "test from John"),
    messageCreate(1, users[1], "test from Jane"),
    messageCreate(2, users[0], "reply from John"),
    messageCreate(3, users[1], "reply from Jane"),
  ]);
}
