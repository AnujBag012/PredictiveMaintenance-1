const mongoose = require("mongoose")

const CylinderRodsSchema = new mongoose.Schema({

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
    "CylinderRods",
    CylinderRodsSchema
)