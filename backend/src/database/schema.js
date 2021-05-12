import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * This schema represents the Button state in the database.
 */
const buttonSchema = new Schema({
  pressed: { type: Boolean, required: true }
}, { collection: 'buttons' });

// Create the Button Schema
export const Button = mongoose.model('Button', buttonSchema);
