import router from '../button';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';

let mongod, app, server;

// Some dummy data to test with
const pressedButton = {
  _id: 1,
  pressed: true,
};

const notPressedButton = {
  _id: 2,
  pressed: false,
};

// Start database and server before any tests run
beforeAll(async done => {
  mongod = new MongoMemoryServer();

  const connectionString = await mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use(express.json());
  app.use('/api/button', router);
  server = app.listen(3000, done);
});

// Clear database after each test
afterEach(async () => {
  await mongoose.connection.db.dropCollection('buttons');
});

// Stop db and server before we finish
afterAll(done => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    done();
  });
});

it('retrieves not pressed button successfully', async () => {
  const buttonColl = await mongoose.connection.db.createCollection('buttons');
  await buttonColl.insertOne(notPressedButton);

  const response = await axios.get('http://localhost:3000/api/button');
  expect(response.status).toBe(200);
  const responseButton = response.data;

  expect(responseButton._id.toString()).toEqual(notPressedButton._id.toString());
  expect(responseButton.pressed).toEqual(notPressedButton.pressed);
});

it('retrieves pressed button successfully', async () => {
  const buttonColl = await mongoose.connection.db.createCollection('buttons');
  await buttonColl.insertOne(pressedButton);

  const response = await axios.get('http://localhost:3000/api/button');
  expect(response.status).toBe(200);
  const responseButton = response.data;

  expect(responseButton._id.toString()).toEqual(pressedButton._id.toString());
  expect(responseButton.pressed).toEqual(pressedButton.pressed);
});

it('makes new button when none in database', async () => {
  const buttonColl = await mongoose.connection.db.createCollection('buttons');

  const response = await axios.get('http://localhost:3000/api/button');
  expect(response.status).toBe(200);
  const responseButton = response.data;

  expect(responseButton._id.toString()).toEqual((1).toString());
  expect(responseButton.pressed).toEqual(false);

  // Check that the button was actually added to the database
  const dbButton = await buttonColl.findOne({ _id: 1 });
  expect(dbButton.pressed).toEqual(false);
});

it('updates a not pressed button successfully', async () => {
  const buttonColl = await mongoose.connection.db.createCollection('buttons');
  await buttonColl.insertOne(notPressedButton);

  // Check pressed is false beforehand
  let dbButton = await buttonColl.findOne({ _id: notPressedButton._id });
  expect(dbButton.pressed).toEqual(false);

  // Update button to true (pressed)
  const response = await axios.put('http://localhost:3000/api/button', { pressed: true });

  // Check response
  expect(response.status).toBe(204);

  // Ensure DB was updated, and pressed is now true
  dbButton = await buttonColl.findOne({ _id: notPressedButton._id });
  expect(dbButton.pressed).toEqual(true);
})

it('updates a pressed button successfully', async () => {
  const buttonColl = await mongoose.connection.db.createCollection('buttons');
  await buttonColl.insertOne(pressedButton);

  // Check pressed is false beforehand
  let dbButton = await buttonColl.findOne({ _id: pressedButton._id });
  expect(dbButton.pressed).toEqual(true);

  // Update button to false (not pressed)
  const response = await axios.put('http://localhost:3000/api/button', { pressed: false });

  // Check response
  expect(response.status).toBe(204);

  // Ensure DB was updated, and pressed is now true
  dbButton = await buttonColl.findOne({ _id: pressedButton._id });
  expect(dbButton.pressed).toEqual(false);
})

it('404 when tries update when db has no button', async () => {
  await mongoose.connection.db.createCollection('buttons');

  // Update button, when none in database
  try{
    await axios.put('http://localhost:3000/api/button', { pressed: false });
    fail('Expected 404 Not Found');
  } catch (e) {
    // Check response is 404
    expect(e.response.status).toBe(404);
  }
})
