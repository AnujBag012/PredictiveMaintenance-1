import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine
} from "recharts"

const pneumatic = () => {

    const navigate = useNavigate()

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

    const [showNotifications, setShowNotifications] =
        useState(false)

    const [notifications, setNotifications] =
        useState([])

    const [streamStarted, setStreamStarted] =
        useState(false)

    const streamStartedRef = useRef(false)

    const [streamEnded, setStreamEnded] =
        useState(false)

    const [selectedRange, setSelectedRange] =
        useState("0.25H")


    const components = [

        {
            name: "Rollers",
            slug: "rollers"
        },

        {
            name: "Track Frame",
            slug: "track-frame"
        },

        {
            name: "Track Chains",
            slug: "track-chains"
        },

        {
            name: "Swing Motor",
            slug: "swing-motor"
        },

        {
            name: "Cylinder Rods",
            slug: "cylinder-rods"
        },

        {
            name: "Pistons",
            slug: "pistons"
        },

        {
            name: "Couplings",
            slug: "couplings"
        },

        {
            name: "Bearings",
            slug: "bearings"
        }

    ]


    // ==========================================
    // LOAD HISTORY + LIVE DATA
    // ==========================================

    useEffect(() => {

        let intervalId


        const loadHistory = async () => {

            try {

                const res = await axios.get(
                    "https://predictivemaintenance-1.onrender.com/api/history"
                )


                const history = res.data.map(item => ({

                    time: new Date(
                        item.timestamp
                    ).toLocaleTimeString(),

                    timestamp: new Date(
                        item.timestamp
                    ).getTime(),

                    price: Number(item.value)

                }))


                setGraphs(prev => {

                    const updated = { ...prev }


                    components.forEach((_, index) => {

                        const key =
                            `component${index + 1}`

                        updated[key] = history

                    })


                    return updated

                })


            } catch (error) {

                console.log(
                    "History loading error:",
                    error
                )

            }

        }



        const fetchData = async () => {

            try {

                const res = await axios.get(
                    "https://predictivemaintenance-1.onrender.com/api/live-data"
                )


                if (res.data.completed) {

                    setStreamEnded(true)


                    const endMessage = {

                        component: "System",

                        status: "COMPLETED",

                        message:
                            "Live data stream completed",

                        time:
                            new Date().toLocaleTimeString()

                    }


                    setNotifications(prev => [

                        endMessage,

                        ...prev

                    ])


                    setPopup(endMessage)


                    clearInterval(intervalId)


                    return

                }


                const latest = res.data


                const hasData =
                    latest &&
                    latest.value !== undefined


                if (hasData) {


                    // STREAM START NOTIFICATION

                    if (!streamStartedRef.current) {

                        streamStartedRef.current = true

                        setStreamStarted(true)


                        const startMessage = {

                            component: "System",

                            status: "STARTED",

                            message:
                                "Live data streaming started",

                            time:
                                new Date().toLocaleTimeString()

                        }


                        setNotifications(prev => [

                            startMessage,

                            ...prev

                        ])


                        setPopup(startMessage)


                        setTimeout(() => {

                            setPopup(null)

                        }, 4000)

                    }



                    const newPoint = {

                        time:

                            new Date(
                                latest.timestamp
                            ).toLocaleTimeString(),


                        timestamp:

                            new Date(
                                latest.timestamp
                            ).getTime(),


                        price:

                            Number(latest.value)

                    }



                    setGraphs(prev => {

                        const updated = { ...prev }


                        components.forEach((_, index) => {

                            const key =
                                `component${index + 1}`


                            updated[key] = [

                                ...updated[key],

                                newPoint

                            ]

                        })


                        return updated

                    })

                }


            } catch (error) {

                console.log(
                    "API ERROR:",
                    error
                )


                components.forEach((component, index) => {

                    const componentKey =
                        `component${index + 1}`


                    setComponentStatus(prev => {

                        if (prev[componentKey] === true) {


                            const errorMessage = {

                                component:
                                    component.name,

                                status:
                                    "STOPPED",

                                message:
                                    `${component.name} API error`,

                                time:
                                    new Date().toLocaleTimeString()

                            }


                            setNotifications(n => [

                                errorMessage,

                                ...n

                            ])


                            setPopup(errorMessage)


                            setTimeout(() => {

                                setPopup(null)

                            }, 5000)

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


        intervalId = setInterval(
            fetchData,
            15000
        )


        return () => {

            clearInterval(intervalId)

        }

    }, [])



    // ==========================================
    // FILTER DATA
    // ==========================================

    // const getFilteredData = (data) => {

    //     if (!data || data.length === 0) {

    //         return []

    //     }


    //     if (selectedRange === "ALL") {

    //         return data

    //     }


    //     const latestTimestamp =
    //         data[data.length - 1].timestamp


    //     let duration


    //     switch (selectedRange) {

    //         case "0.25H":

    //             duration =
    //                 15 * 60 * 1000

    //             break


    //         case "0.5H":

    //             duration =
    //                 30 * 60 * 1000

    //             break


    //         case "1H":

    //             duration =
    //                 60 * 60 * 1000

    //             break


    //         case "6H":

    //             duration =
    //                 6 * 60 * 60 * 1000

    //             break


    //         case "12H":

    //             duration =
    //                 12 * 60 * 60 * 1000

    //             break


    //         case "24H":

    //             duration =
    //                 24 * 60 * 60 * 1000

    //             break


    //         default:

    //             return data

    //     }


    //     const startTime =
    //         latestTimestamp - duration


    //     return data.filter(item =>

    //         item.timestamp >= startTime &&
    //         item.timestamp <= latestTimestamp

    //     )

    // }
    const getFilteredData = (data) => {

      if (!data || data.length === 0) {
          return []
      }

      // Return complete data
      if (selectedRange === "ALL") {
          return data
      }

      let duration

      switch (selectedRange) {

          case "0.25H":
              duration = 15 * 60 * 1000
              break

          case "0.5H":
              duration = 30 * 60 * 1000
              break

          case "1H":
              duration = 60 * 60 * 1000
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
              duration = 15 * 60 * 1000
              break
      }

    // Current real time
    const now = Date.now()

    // Starting time
    const startTime = now - duration

    // Filter data between start time and current time
    return data.filter(item => {

        return (
            item.timestamp >= startTime &&
            item.timestamp <= now
        )

    })

}



    // ==========================================
    // CALCULATE CONTROL LIMITS
    // ==========================================

    const calculateControlLimits = (data) => {

        if (!data || data.length < 2) {

            return {

                mean: 0,

                ucl: 0,

                lcl: 0

            }

        }


        const values =
            data.map(item => item.price)


        // CENTER LINE / MEAN

        const mean =

            values.reduce(
                (sum, value) => sum + value,
                0
            )

            / values.length



        // STANDARD DEVIATION

        const variance =

            values.reduce(

                (sum, value) =>

                    sum +

                    Math.pow(
                        value - mean,
                        2
                    ),

                0

            )

            / values.length


        const standardDeviation =
            Math.sqrt(variance)



        // 3 SIGMA CONTROL LIMITS

        const ucl =

            mean +
            (3 * standardDeviation)


        const lcl =

            mean -
            (3 * standardDeviation)


        return {

            mean,

            ucl,

            lcl

        }

    }



    // ==========================================
    // DETECT OUT OF CONTROL POINTS
    // ==========================================

    const isOutOfControl = (

        value,

        ucl,

        lcl

    ) => {

        return (

            value > ucl ||

            value < lcl

        )

    }



    return (

        <div className="min-h-screen bg-[#eef2ff] p-8">


            {/* HEADER */}

            <div className="flex justify-between items-center mb-10">


                <div className="flex items-center gap-6">


                    <button

                        onClick={() =>
                            window.history.back()
                        }

                        className="
                        px-6 py-3
                        border-2 border-blue-600
                        text-blue-700
                        rounded-2xl
                        font-semibold
                        hover:bg-blue-50
                        transition-all
                        "

                    >

                        ← Back

                    </button>



                    <h1 className="
                    text-5xl
                    font-extrabold
                    text-[#001c72]
                    ">

                        Predictive Maintenance

                    </h1>


                </div>



                {/* NOTIFICATION BUTTON */}

                <div className="relative">


                    <button

                        onClick={() =>

                            setShowNotifications(
                                !showNotifications
                            )

                        }

                        className="
                        w-16 h-16
                        rounded-full
                        bg-white
                        shadow-xl
                        flex
                        items-center
                        justify-center
                        text-3xl
                        "

                    >

                        🔔

                    </button>



                    {notifications.length > 0 && (

                        <span className="
                        absolute
                        top-0
                        right-0
                        bg-red-600
                        text-white
                        text-sm
                        w-7
                        h-7
                        rounded-full
                        flex
                        items-center
                        justify-center
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
                px-6
                py-4
                rounded-2xl
                mb-8
                ">

                    No more live data available

                </div>

            )}



            {/* FILTER BUTTONS */}

            <div className="
            flex
            flex-wrap
            gap-4
            mb-10
            ">


                {[
                    "ALL",
                    "0.25H",
                    "0.5H",
                    "1H",
                    "6H",
                    "12H",
                    "24H"
                ].map(range => (


                    <button

                        key={range}

                        onClick={() =>
                            setSelectedRange(range)
                        }

                        className={`

                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all

                        ${

                            selectedRange === range

                                ? "bg-[#001c72] text-white"

                                : "bg-white text-[#001c72]"

                        }

                        `}

                    >

                        {

                            range === "ALL"

                                ? "All Data"

                                : `Last ${range}`

                        }

                    </button>


                ))}


            </div>



            {/* CONTROL CHARTS */}

            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
            ">


                {components.map((component, index) => {


                    const key =
                        `component${index + 1}`


                    const filteredData =
                        getFilteredData(graphs[key])


                    const {

                        mean,

                        ucl,

                        lcl

                    } = calculateControlLimits(
                        filteredData
                    )


                    const hasAlert =
                        filteredData.some(item =>

                            isOutOfControl(

                                item.price,

                                ucl,

                                lcl

                            )

                        )


                    return (


                        <div

                            key={component.slug}

                            onClick={() =>

                                navigate(
                                    `/${component.slug}/data`
                                )

                            }

                            className="
                            bg-white
                            rounded-[30px]
                            p-5
                            shadow-lg
                            hover:shadow-2xl
                            transition-all
                            cursor-pointer
                            relative
                            "

                        >


                            {/* COMPONENT TITLE */}

                            <h3 className="
                            text-center
                            text-2xl
                            font-bold
                            text-[#001c72]
                            mb-2
                            ">

                                {component.name}

                            </h3>



                            {/* ALERT STATUS */}

                            {hasAlert && (

                                <div className="
                                text-center
                                text-red-600
                                font-bold
                                text-sm
                                mb-2
                                ">

                                    ⚠ OUT OF CONTROL

                                </div>

                            )}



                            <div className="h-[240px]">


                                <ResponsiveContainer>


                                    <LineChart
                                        data={filteredData}
                                    >


                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />


                                        <XAxis
                                            dataKey="time"
                                        />


                                        <YAxis />


                                        <Tooltip />


                                        {/* UPPER CONTROL LIMIT */}

                                        <ReferenceLine

                                            y={ucl}

                                            stroke="#dc2626"

                                            strokeDasharray="5 5"

                                            label="UCL"

                                        />



                                        {/* CENTER LINE */}

                                        <ReferenceLine

                                            y={mean}

                                            stroke="#16a34a"

                                            strokeDasharray="5 5"

                                            label="CL"

                                        />



                                        {/* LOWER CONTROL LIMIT */}

                                        <ReferenceLine

                                            y={lcl}

                                            stroke="#dc2626"

                                            strokeDasharray="5 5"

                                            label="LCL"

                                        />



                                        {/* ACTUAL DATA */}

                                        <Line

                                            type="monotone"

                                            dataKey="price"

                                            stroke="#1d4ed8"

                                            strokeWidth={3}


                                            dot={(props) => {


                                                const {

                                                    cx,

                                                    cy,

                                                    payload

                                                } = props


                                                const outOfControl =

                                                    payload.price > ucl ||

                                                    payload.price < lcl


                                                return (

                                                    <circle

                                                        cx={cx}

                                                        cy={cy}

                                                        r={

                                                            outOfControl

                                                                ? 6

                                                                : 4

                                                        }

                                                        fill={

                                                            outOfControl

                                                                ? "red"

                                                                : "white"

                                                        }

                                                        stroke={

                                                            outOfControl

                                                                ? "red"

                                                                : "#1d4ed8"

                                                        }

                                                        strokeWidth={2}

                                                    />

                                                )

                                            }}

                                        />


                                    </LineChart>


                                </ResponsiveContainer>


                            </div>



                            {/* CONTROL LIMIT VALUES */}

                            <div className="
                            mt-3
                            text-xs
                            grid
                            grid-cols-3
                            text-center
                            gap-2
                            ">


                                <div className="
                                bg-red-50
                                rounded-lg
                                p-2
                                ">

                                    <b>UCL</b>

                                    <br />

                                    {ucl.toFixed(2)}

                                </div>



                                <div className="
                                bg-green-50
                                rounded-lg
                                p-2
                                ">

                                    <b>CL</b>

                                    <br />

                                    {mean.toFixed(2)}

                                </div>



                                <div className="
                                bg-red-50
                                rounded-lg
                                p-2
                                ">

                                    <b>LCL</b>

                                    <br />

                                    {lcl.toFixed(2)}

                                </div>


                            </div>


                        </div>


                    )

                })}


            </div>



            {/* POPUP */}

            {popup && (


                <div

                    className={`

                    fixed
                    bottom-6
                    right-6
                    px-6
                    py-5
                    rounded-2xl
                    text-white
                    shadow-2xl
                    z-50

                    ${

                        popup.status === "STOPPED"

                            ? "bg-red-600"

                            : popup.status === "ALERT"

                            ? "bg-red-600"

                            : "bg-green-600"

                    }

                    `}

                >


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
                fixed
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



                    <div className="
                    space-y-4
                    max-h-[400px]
                    overflow-y-auto
                    ">


                        {notifications.length === 0 && (

                            <p className="text-gray-500">

                                No notifications

                            </p>

                        )}



                        {notifications.map((notification, i) => (


                            <div

                                key={i}

                                className={`

                                rounded-2xl
                                p-4

                                ${

                                    notification.status === "ALERT"

                                        ? "bg-red-100"

                                        : "bg-[#eef2ff]"

                                }

                                `}

                            >


                                <b className="text-[#001c72]">

                                    {notification.component}

                                </b>


                                <p className="text-gray-600 mt-1">

                                    {notification.message}

                                </p>


                                <p className="
                                text-xs
                                text-gray-400
                                mt-2
                                ">

                                    {notification.time}

                                </p>


                            </div>


                        ))}


                    </div>


                </div>


            )}


        </div>

    )

}

export default pneumatic