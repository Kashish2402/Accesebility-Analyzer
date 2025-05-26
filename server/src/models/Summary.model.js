import mongoose, { Schema } from "mongoose";

const summarySchema=new mongoose.Schema({
    totalViolations:Number,
    totalPasses:Number,
    totalIncomplete:Number,
    totalInapplicable:Number
})

const Summary=new mongoose.model('Summary',summarySchema)