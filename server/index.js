const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require ('axios')
const EmployeeModel = require('./models/Employee')
const fs = require('fs')
const csv = require('csv-parser')

let csvData = []
let currentIndex = 0


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://anujbag12_db_user:xSQPldMPOY0yYZWh@ac-uvq0u7x-shard-00-00.4ftql5a.mongodb.net:27017,ac-uvq0u7x-shard-00-01.4ftql5a.mongodb.net:27017,ac-uvq0u7x-shard-00-02.4ftql5a.mongodb.net:27017/?ssl=true&replicaSet=atlas-geuk6t-shard-0&authSource=admin&appName=PredictiveManitenance')
.then(() => {console.log("MongoDB Connected")
console.log(mongoose.connection.readyState)})
.catch(err => console.log(err))

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



app.listen(3001, ()=>{
    console.log("Server is running")
})