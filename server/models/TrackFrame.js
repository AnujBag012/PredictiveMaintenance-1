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

    timestamp: {
    type: Date,
    required: true
}
})

module.exports = mongoose.model(
    "TrackFrame",
    TrackFrameSchema
)