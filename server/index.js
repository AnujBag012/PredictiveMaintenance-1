const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require ('axios')
const EmployeeModel = require('./models/Employee')
const fs = require('fs')
const csv = require('csv-parser')

const Rollers = require("./models/Rollers")
const TrackFrame = require("./models/TrackFrame")
const TrackChains = require("./models/TrackChains")
const SwingMotor = require("./models/SwingMotor")
const CylinderRods = require("./models/CylinderRods")
const Pistons = require("./models/Pistons")
// const Couplings = require("./models/Couplings")
// const Bearings = require("./models/Bearings")

let csvData = []
let currentIndex = 0


const app = express()
app.use(express.json())
app.use(cors())

const componentModels = {

    rollers: Rollers,

    "track-frames": TrackFrames,

    "track-chains": TrackChains,

    "swing-motors": SwingMotors,

    "cylinder-rods": CylinderRods,

    pistons: Pistons,

    couplings: Couplings,

    bearings: Bearings

};

// mongoose.connect('mongodb://anujbag12_db_user:xSQPldMPOY0yYZWh@ac-uvq0u7x-shard-00-00.4ftql5a.mongodb.net:27017,ac-uvq0u7x-shard-00-01.4ftql5a.mongodb.net:27017,ac-uvq0u7x-shard-00-02.4ftql5a.mongodb.net:27017/?ssl=true&replicaSet=atlas-geuk6t-shard-0&authSource=admin&appName=PredictiveManitenance')
// .then(() => {console.log("MongoDB Connected")
// console.log(mongoose.connection.readyState)})
// .catch(err => console.log(err))

app.post('/login',(req,res)=>{
    const {role,email,password} = req.body
    EmployeeModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password === password && user.role === role){
                res.json("Success")
            }else{
                res.json('Wrong password')
            }
        }else{
            res.json('No record exists')
        }
    })
})

app.post('/signup', async (req, res) => {
    try {
        console.log("Signup Request:", req.body);

        const employee = await EmployeeModel.create(req.body);

        console.log("User Saved:", employee);

        res.status(201).json({
            success: true,
            employee
        });
    } catch (err) {
        console.error("Signup Error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// app.post('/signup',(req,res)=>{
//     // console.log("Route Hit")
//     // console.log(req.body)

//     EmployeeModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err => res.json(err))
// })
// app.post('/signup', async (req, res) => {

//     try {

//         console.log("Route Hit")
//         console.log(req.body)

//         const employee = await EmployeeModel.create(req.body)

//         console.log(employee)

//         res.json(employee)

//     } catch(err) {

//         console.log("ERROR:", err)

//         res.status(500).json(err)
//     }
// })

// app.get('/api/live-data', async (req, res) => {

//     try {

//         const response = await axios.get(
//             'https://api.marketstack.com/v1/eod?access_key=f6f13fbb76ac36b71fb5008d60d4f1f4=AAPL'
//             // 'https://finnhub.io/api/v1/quote?symbol=AAPL&token=d7sf0q1r01qorsvigca0d7sf0q1r01qorsvigcag'
//         )

//         res.json(response.data)

//     } catch(err) {

//         console.log(err)

//         res.status(500).json(err)
//     }
// })

fs.createReadStream(__dirname + '/data.csv')

    .pipe(csv())
    .on('data', (row) => {
        csvData.push(row)
    })
    .on('end', () => {

        console.log("CSV Loaded")

        
        const now = new Date()

        let minDiff = Infinity

        csvData.forEach((item, index) => {

            const itemTime = new Date(item.timestamp)
            // const itemTime = new Date(
            //     item.timestamp.replace(',', '.')
            // )

            const diff = Math.abs(now - itemTime)

            if (diff < minDiff) {
                minDiff = diff
                currentIndex = index
            }
        })

        console.log("Starting from index:", currentIndex)
    })

app.get('/api/history', (req, res) => {

    const formattedData = csvData.map(item => ({
        value: Number(item.value),
        timestamp: item.timestamp
    }))

    res.json(formattedData)
})



app.get('/api/live-data', (req, res) => {

    // if (currentIndex >= csvData.length) {
    //     currentIndex = 0
    // }
    // currentIndex = 0
    if (currentIndex >= csvData.length) {

        return res.json({
            completed: true,
            message: "No more live data available"
        })
    }

    

    const data = csvData[currentIndex]

    currentIndex++

    res.json({
        value: Number(data.value),
        timestamp: data.timestamp
    })
})



// app.listen(3001, ()=>{
//     console.log("Server is running")
// })

async function startServer() {
    try {
        await mongoose.connect('mongodb+srv://anujbag12_db_user:xSQPldMPOY0yYZWh@predictivemanitenance.4ftql5a.mongodb.net/?appName=PredictiveManitenance');

        console.log("MongoDB Connected");
        console.log("Ready State:", mongoose.connection.readyState);

        app.listen(3001, () => {
            console.log("Server is running");
        });

    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
}

startServer();

//Posting the update
app.post(
    "/api/maintenance/:component",

    async (req, res) => {

        try {

            const { component } = req.params;

            const { maintenanceType } = req.body;


            const Model = componentModels[component];


            if (!Model) {

                return res.status(404).json({
                    message: "Component not found"
                });

            }


            const maintenanceRecord =
                await Model.create({

                    maintenanceType

                });


            res.status(201).json({

                success: true,

                message: "Maintenance updated successfully",

                data: maintenanceRecord

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message: "Failed to update maintenance"

            });

        }

    }
);


//fetching data of each components from the database
app.get("/api/rollers/data", async (req, res) => {

    try {

        const lubrication = await Rollers
            .findOne({
                maintenanceType: "Lubrication"
            })
            .sort({ date: -1 })

        const bearingChange = await Rollers
            .findOne({
                maintenanceType: "Bearing Change"
            })
            .sort({ date: -1 })

        const inspection = await Rollers
            .findOne({
                maintenanceType: "Inspection"
            })
            .sort({ date: -1 })

        const oilChange = await Rollers
            .findOne({
                maintenanceType: "Oil Change"
            })
            .sort({ date: -1 })


        res.json({
            lubrication,
            bearingChange,
            inspection,
            oilChange
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Failed to fetch Rollers data"
        })

    }

})
app.get("/api/rollers/history", async (req, res) => {

    try {

        const history = await Rollers
            .find({})
            .sort({ date: -1 })

        res.json(history)

    } catch (error) {

        console.error(error)

        res.status(500).json({
            message: "Failed to fetch Rollers history"
        })

    }

})