const mongoose = require("mongoose")

const SwingMotorsSchema = new mongoose.Schema({

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
    "SwingMotors",
    SwingMotorsSchema
)