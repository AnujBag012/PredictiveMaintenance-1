const mongoose = require("mongoose")

const TrackFrameSchema = new mongoose.Schema({

    maintenanceType: {
        type: String,
        required: true,
        enum: [
            "Lubrication",
            "Bearing Change",
            "Inspection",
            "Oil Change"
        ]
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    "TrackFrame",
    TrackFrameSchema
)