import axios from 'axios'
// import { useEffect, useState } from 'react'
import { useEffect, useState, useRef } from 'react'
// import { useEffect, useState, useMemo } from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const Mechanical = () => {

    // GRAPH DATA
    const [graphs, setGraphs] = useState({
        component1: [],
        component2: [],
        component3: [],
        component4: [],
        component5: [],
        component6: [],
        component7: [],
        component8: []
    })

    // COMPONENT STATUS
    const [componentStatus, setComponentStatus] = useState({
        component1: true,
        component2: true,
        component3: true,
        component4: true,
        component5: true,
        component6: true,
        component7: true,
        component8: true
    })

    const [popup, setPopup] = useState(null)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])

    const [streamStarted, setStreamStarted] = useState(false)
    const streamStartedRef = useRef(false)
    const [streamEnded, setStreamEnded] = useState(false)
    const [selectedRange, setSelectedRange] = useState("ALL")

    const components = [
        "Rollers","Track Frame","Track Chains","Swing Motor",
        "Cylinder Rods","Pistons","Couplings","Bearings"
    ]

    useEffect(() => {

        const loadHistory = async () => {

            const res = await axios.get(
                'http://localhost:3001/api/history'
            )

            const history = res.data.map(item => ({
                time: new Date(item.timestamp)
                    .toLocaleTimeString(),
                timestamp: new Date(item.timestamp)
                    .getTime(),
                price: item.value
            }))

            setGraphs(prev => {

                const updated = { ...prev }

                components.forEach((_, index) => {

                    const key = `component${index + 1}`

                    updated[key] = history
                })

                return updated
            })
        }

        const fetchData = async () => {

            try {

                const res = await axios.get(
                    'http://localhost:3001/api/live-data'
                )

                const hasData = res.data && res.data.value !== undefined
                const latest = res.data

                
                if (res.data.completed) {

                    setStreamEnded(true)

                    const endMessage = {
                        component: "System",
                        status: "COMPLETED",
                        message: "Live data stream completed",
                        time: new Date().toLocaleTimeString()
                    }

                    setNotifications(n => [endMessage, ...n])
                    setPopup(endMessage)

                    clearInterval(intervalId)

                    return
                }

                if (hasData) {

                    if (!streamStartedRef.current) {

                        streamStartedRef.current = true
                        setStreamStarted(true)

                        const startMessage = {
                            component: "System",
                            status: "STARTED",
                            message: "Live data streaming started",
                            time: new Date().toLocaleTimeString()
                        }

                        setNotifications(n => [startMessage, ...n])
                        setPopup(startMessage)

                        setTimeout(() => {
                            setPopup(null)
                        }, 4000)
                    }

                    const newPoint = {
                        time: new Date(latest.timestamp).toLocaleTimeString(),
                        timestamp: new Date(latest.timestamp).getTime(),
                        price: latest.value
                    }

    setGraphs(prev => {

        const updated = { ...prev }

        components.forEach((_, index) => {
            const key = `component${index + 1}`

            updated[key] = [
                ...updated[key],
                newPoint
            ]
        })

        return updated
    })
}

            } catch (err) {

                console.log("API ERROR:", err)

                components.forEach((component, index) => {

                    const componentKey = `component${index + 1}`

                    setComponentStatus(prev => {

                        if (prev[componentKey] === true) {

                            const errorMessage = {
                                component,
                                status: "STOPPED",
                                message: `${component} API error`,
                                time: new Date().toLocaleTimeString()
                            }

                            setNotifications(n => [errorMessage, ...n])
                            setPopup(errorMessage)

                            setTimeout(() => setPopup(null), 15000)
                        }

                        return {
                            ...prev,
                            [componentKey]: false
                        }
                    })
                })
            }
        }

        loadHistory()
        fetchData()

        const intervalId = setInterval(fetchData, 15000)

        return () => clearInterval(intervalId)

    }, [])

    // const currentTime = useMemo(() => Date.now(), [graphs])
    
    const getFilteredData = (data) => {

        if (!data || data.length === 0) {
            return []
        }

        if (selectedRange === "ALL") {
            return data
        }

        const latestTimestamp =
            data[data.length - 1].timestamp

        let duration

        switch(selectedRange) {

            case "0.25H":
                duration = 15 * 60 * 1000
                break
            case "0.5H":
                duration = 30 * 60 * 1000
                break
            case "1H":
                duration = 1 * 60 * 60 * 1000
                break

            case "6H":
                duration = 6 * 60 * 60 * 1000
                break

            case "12H":
                duration = 12 * 60 * 60 * 1000
                break

            case "24H":
                duration = 24 * 60 * 60 * 1000
                break

            default:
                duration = 60 * 60 * 1000
        }

        const startTime = latestTimestamp - duration

        return data.filter(item =>
            item.timestamp >= startTime &&
            item.timestamp <= latestTimestamp
        )
    }

    return (

<div className="min-h-screen bg-[#eef2ff] p-8">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-10">

        <div className="flex items-center gap-6">

            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="
                px-6 py-3
                border-2 border-blue-600
                text-blue-700
                rounded-2xl
                font-semibold
                hover:bg-blue-50
                transition-all duration-300
                shadow-sm
                "
            >
                ← Back
            </button>

            <h1 className="
                text-6xl
                font-extrabold
                text-[#001c72]
            ">
                Predictive Maintenance
            </h1>

        </div>

        {/* Notification */}
        <div className="relative">

            <button
                onClick={() =>
                    setShowNotifications(!showNotifications)
                }
                className="
                w-20 h-20
                rounded-full
                bg-white
                shadow-xl
                flex items-center justify-center
                text-3xl
                hover:scale-105
                transition-all duration-300
                "
            >
                🔔
            </button>

            {notifications.length > 0 && (
                <span className="
                    absolute
                    top-0 right-0
                    bg-red-600
                    text-white
                    text-sm
                    w-7 h-7
                    rounded-full
                    flex items-center justify-center
                    font-bold
                ">
                    {notifications.length}
                </span>
            )}
        </div>

    </div>

    {/* STREAM ENDED */}
    {streamEnded && (
        <div className="
            bg-red-700
            text-white
            px-6 py-4
            rounded-2xl
            mb-8
            shadow-lg
        ">
            No more live data available
        </div>
    )}

    {/* FILTER BUTTONS */}
    <div className="
        flex flex-wrap gap-5
        mb-12
    ">

        {["0.25H","0.5H","1H","6H","12H","24H"].map(range => (

            <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`
                    px-8 py-4
                    rounded-2xl
                    font-semibold
                    text-xl
                    shadow-md
                    transition-all duration-300

                    ${
                        selectedRange === range
                        ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                        : "bg-white text-[#001c72] hover:bg-blue-50"
                    }
                `}
            >
                Last {range}
            </button>

        ))}

    </div>

    {/* GRAPHS */}
    <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-8
    ">

        {components.map((component, index) => {

            const key = `component${index + 1}`

            return (

                <div
                    key={index}
                    className="
                    bg-white
                    rounded-[30px]
                    p-5
                    shadow-lg
                    hover:shadow-2xl
                    transition-all duration-300
                    "
                >

                    <h3 className="
                        text-center
                        text-2xl
                        font-bold
                        text-[#001c72]
                        mb-4
                    ">
                        {component}
                    </h3>

                    <div className="h-[240px]">

                        <ResponsiveContainer>

                            <LineChart
                                data={getFilteredData(graphs[key])}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#dbeafe"
                                />

                                <XAxis
                                    dataKey="time"
                                    stroke="#1d4ed8"
                                />

                                <YAxis
                                    stroke="#1d4ed8"
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke={
                                        componentStatus[key]
                                        ? "#1d4ed8"
                                        : "red"
                                    }
                                    strokeWidth={4}
                                    dot={{
                                        r:4,
                                        fill:"#ffffff",
                                        stroke:"#1d4ed8",
                                        strokeWidth:2
                                    }}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            )
        })}

    </div>

    {/* POPUP */}
    {popup && (

        <div className={`
            fixed
            bottom-6 right-6
            px-6 py-5
            rounded-2xl
            text-white
            shadow-2xl
            z-50

            ${
                popup.status === "STOPPED"
                ? "bg-red-600"
                : "bg-green-600"
            }
        `}>

            <b className="text-lg">
                {popup.component}
            </b>

            <p className="mt-1">
                {popup.message}
            </p>

        </div>

    )}

    {/* NOTIFICATION PANEL */}
    {showNotifications && (

        <div className="
            absolute
            right-8
            top-28
            w-[340px]
            bg-white
            rounded-3xl
            shadow-2xl
            p-6
            z-50
        ">

            <h3 className="
                text-2xl
                font-bold
                text-[#001c72]
                mb-5
            ">
                Notifications
            </h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">

                {notifications.map((n, i) => (

                    <div
                        key={i}
                        className="
                        bg-[#eef2ff]
                        rounded-2xl
                        p-4
                        "
                    >

                        <b className="text-[#001c72]">
                            {n.component}
                        </b>

                        <p className="text-gray-600 mt-1">
                            {n.message}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    )}

</div>
)
}

export default Mechanical