import axios from "axios"
import { useEffect, useState } from "react"

const MaintenanceList = () => {

    const [componentsData, setComponentsData] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    /*
    --------------------------------
    COMPONENT LIST
    --------------------------------
    */

    const components = [

        {
            name: "Rollers",
            slug: "rollers"
        },

        {
            name: "Track Frames",
            slug: "track-frames"
        },

        {
            name: "Track Chains",
            slug: "track-chains"
        },

        {
            name: "Swing Motors",
            slug: "swing-motors"
        },

        {
            name: "Cylinder Rods",
            slug: "cylinder-rods"
        },

        {
            name: "Pistons",
            slug: "pistons"
        }

    ]


    /*
    --------------------------------
    CALCULATE DAYS SINCE MAINTENANCE
    --------------------------------
    */

    const calculateDays = (timestamp) => {

        if (!timestamp) {

            return null

        }


        const maintenanceDate = new Date(timestamp)

        const currentDate = new Date()


        const difference =

            currentDate - maintenanceDate


        const days = Math.floor(

            difference / (1000 * 60 * 60 * 24)

        )


        return days

    }



    /*
    --------------------------------
    GET URGENCY SCORE
    --------------------------------
    */

    const getUrgency = (

        days,

        maintenanceType

    ) => {


        /*
        NO RECORD
        */

        if (days === null) {

            return {

                score: 4,

                level: "No Record"

            }

        }



        /*
        LUBRICATION
        */

        if (

            maintenanceType === "Lubrication"

        ) {


            if (days < 30) {

                return {

                    score: 1,

                    level: "Normal"

                }

            }


            if (

                days >= 30 &&
                days < 60

            ) {

                return {

                    score: 2,

                    level: "Warning"

                }

            }


            return {

                score: 3,

                level: "Critical"

            }

        }



        /*
        BEARING CHANGE
        */

        if (

            maintenanceType === "Bearing Change"

        ) {


            if (days < 180) {

                return {

                    score: 1,

                    level: "Normal"

                }

            }


            if (

                days >= 180 &&
                days < 365

            ) {

                return {

                    score: 2,

                    level: "Warning"

                }

            }


            return {

                score: 3,

                level: "Critical"

            }

        }



        /*
        OIL CHANGE
        */

        if (

            maintenanceType === "Oil Change"

        ) {


            if (days < 90) {

                return {

                    score: 1,

                    level: "Normal"

                }

            }


            if (

                days >= 90 &&
                days < 180

            ) {

                return {

                    score: 2,

                    level: "Warning"

                }

            }


            return {

                score: 3,

                level: "Critical"

            }

        }



        /*
        INSPECTION
        */

        if (

            maintenanceType === "Inspection"

        ) {


            if (days < 30) {

                return {

                    score: 1,

                    level: "Normal"

                }

            }


            if (

                days >= 30 &&
                days < 60

            ) {

                return {

                    score: 2,

                    level: "Warning"

                }

            }


            return {

                score: 3,

                level: "Critical"

            }

        }


    }



    /*
    --------------------------------
    FETCH ALL COMPONENT DATA
    --------------------------------
    */

    useEffect(() => {


        const fetchAllComponents = async () => {


            try {


                setLoading(true)

                setError("")


                const results = []


                for (

                    const component of components

                ) {


                    try {


                        const response =

                            await axios.get(

                                `https://predictivemaintenance-1.onrender.com/api/${component.slug}/data`

                            )


                        const data = response.data



                        /*
                        ------------------------
                        CALCULATE DAYS
                        ------------------------
                        */


                        const lubricationDays =

                            calculateDays(

                                data?.lubrication?.timestamp

                            )


                        const bearingDays =

                            calculateDays(

                                data?.bearingChange?.timestamp

                            )


                        const oilDays =

                            calculateDays(

                                data?.oilChange?.timestamp

                            )


                        const inspectionDays =

                            calculateDays(

                                data?.inspection?.timestamp

                            )



                        /*
                        ------------------------
                        GET URGENCY SCORES
                        ------------------------
                        */


                        const lubricationUrgency =

                            getUrgency(

                                lubricationDays,

                                "Lubrication"

                            )


                        const bearingUrgency =

                            getUrgency(

                                bearingDays,

                                "Bearing Change"

                            )


                        const oilUrgency =

                            getUrgency(

                                oilDays,

                                "Oil Change"

                            )


                        const inspectionUrgency =

                            getUrgency(

                                inspectionDays,

                                "Inspection"

                            )



                        /*
                        ------------------------
                        TOTAL SCORE
                        ------------------------
                        */


                        const totalUrgency =

                            lubricationUrgency.score +

                            bearingUrgency.score +

                            oilUrgency.score +

                            inspectionUrgency.score



                        results.push({

                            component: component.name,

                            slug: component.slug,


                            lubricationDays,

                            bearingDays,

                            oilDays,

                            inspectionDays,


                            lubricationUrgency,

                            bearingUrgency,

                            oilUrgency,

                            inspectionUrgency,


                            totalUrgency

                        })


                    } catch (componentError) {


                        console.error(

                            `Failed to fetch ${component.name}`,

                            componentError

                        )


                        results.push({

                            component: component.name,

                            slug: component.slug,

                            error: true,

                            totalUrgency: 0

                        })

                    }

                }



                /*
                --------------------------------
                SORT BY URGENCY
                HIGHEST FIRST
                --------------------------------
                */


                results.sort(

                    (a, b) =>

                        b.totalUrgency -

                        a.totalUrgency

                )



                setComponentsData(results)


            } catch (error) {


                console.error(error)


                setError(

                    "Failed to generate urgency matrix"

                )


            } finally {


                setLoading(false)

            }


        }


        fetchAllComponents()


    }, [])



    /*
    --------------------------------
    GET COLOR
    --------------------------------
    */


    const getStatusColor = (level) => {


        if (level === "Normal") {

            return "bg-green-100 text-green-700"

        }


        if (level === "Warning") {

            return "bg-yellow-100 text-yellow-700"

        }


        if (level === "Critical") {

            return "bg-red-100 text-red-700"

        }


        return "bg-gray-200 text-gray-600"

    }



    /*
    --------------------------------
    OVERALL URGENCY
    --------------------------------
    */


    const getOverallUrgency = (score) => {


        if (score >= 13) {

            return {

                label: "Critical",

                className:

                    "bg-red-600 text-white"

            }

        }


        if (score >= 9) {

            return {

                label: "High",

                className:

                    "bg-orange-500 text-white"

            }

        }


        if (score >= 6) {

            return {

                label: "Medium",

                className:

                    "bg-yellow-400 text-black"

            }

        }


        return {

            label: "Low",

            className:

                "bg-green-500 text-white"

        }

    }



    /*
    --------------------------------
    LOADING
    --------------------------------
    */


    if (loading) {


        return (

            <div className="

                min-h-screen

                flex

                items-center

                justify-center

                bg-[#eef2ff]

            ">


                <div className="text-center">


                    <div className="

                        text-3xl

                        font-bold

                        text-[#001c72]

                    ">

                        Generating Urgency Matrix...

                    </div>


                    <p className="

                        text-gray-500

                        mt-3

                    ">

                        Analyzing maintenance records

                    </p>


                </div>


            </div>

        )

    }



    /*
    --------------------------------
    ERROR
    --------------------------------
    */


    if (error) {


        return (

            <div className="

                min-h-screen

                flex

                items-center

                justify-center

                bg-[#eef2ff]

            ">


                <div className="

                    bg-white

                    p-10

                    rounded-3xl

                    shadow-xl

                    text-center

                ">


                    <h2 className="

                        text-2xl

                        font-bold

                        text-red-600

                    ">

                        {error}

                    </h2>


                </div>


            </div>

        )

    }



    /*
    --------------------------------
    MAIN PAGE
    --------------------------------
    */


    return (


        <div className="

            min-h-screen

            bg-[#eef2ff]

            p-8

            lg:p-12

        ">


            {/* HEADER */}


            <div className="

                max-w-7xl

                mx-auto

            ">


                <div className="

                    flex

                    flex-col

                    md:flex-row

                    justify-between

                    md:items-center

                    mb-10

                    gap-5

                ">


                    <div>


                        <p className="

                            text-sm

                            font-semibold

                            tracking-widest

                            text-[#536dfe]

                            uppercase

                        ">

                            Predictive Maintenance System

                        </p>


                        <h1 className="

                            text-4xl

                            md:text-5xl

                            font-extrabold

                            text-[#001c72]

                            mt-2

                        ">

                            Maintenance Urgency Matrix

                        </h1>


                        <p className="

                            text-gray-500

                            mt-3

                            text-lg

                        ">

                            Components ranked according to

                            maintenance urgency

                        </p>


                    </div>


                    <button

                        onClick={() => window.location.reload()}

                        className="

                            px-6

                            py-3

                            bg-[#001c72]

                            text-white

                            rounded-xl

                            font-semibold

                            shadow-md

                            hover:scale-105

                            transition

                        "

                    >

                        Refresh Analysis

                    </button>


                </div>



                {/* SUMMARY CARDS */}


                <div className="

                    grid

                    grid-cols-1

                    sm:grid-cols-2

                    lg:grid-cols-4

                    gap-6

                    mb-10

                ">


                    <SummaryCard

                        title="Total Components"

                        value={componentsData.length}

                    />


                    <SummaryCard

                        title="Critical Components"

                        value={

                            componentsData.filter(

                                item =>

                                    item.totalUrgency >= 13

                            ).length

                        }

                    />


                    <SummaryCard

                        title="High Priority"

                        value={

                            componentsData.filter(

                                item =>

                                    item.totalUrgency >= 9 &&

                                    item.totalUrgency < 13

                            ).length

                        }

                    />


                    <SummaryCard

                        title="Low Priority"

                        value={

                            componentsData.filter(

                                item =>

                                    item.totalUrgency < 6

                            ).length

                        }

                    />


                </div>



                {/* TABLE */}


                <div className="

                    bg-white

                    rounded-[30px]

                    shadow-xl

                    overflow-hidden

                ">


                    <div className="

                        p-7

                        border-b

                    ">


                        <h2 className="

                            text-2xl

                            font-bold

                            text-[#001c72]

                        ">

                            Component Priority Ranking

                        </h2>


                        <p className="

                            text-gray-500

                            mt-2

                        ">

                            Higher urgency score means

                            immediate maintenance attention

                        </p>


                    </div>



                    <div className="overflow-x-auto">


                        <table className="

                            w-full

                            text-left

                        ">


                            <thead className="

                                bg-[#f5f7ff]

                                text-[#001c72]

                            ">


                                <tr>


                                    <th className="p-5">

                                        Rank

                                    </th>


                                    <th className="p-5">

                                        Component

                                    </th>


                                    <th className="p-5">

                                        Lubrication

                                    </th>


                                    <th className="p-5">

                                        Bearing

                                    </th>


                                    <th className="p-5">

                                        Oil Change

                                    </th>


                                    <th className="p-5">

                                        Inspection

                                    </th>


                                    <th className="p-5">

                                        Urgency Score

                                    </th>


                                    <th className="p-5">

                                        Priority

                                    </th>


                                </tr>


                            </thead>



                            <tbody>


                                {

                                    componentsData.map(

                                        (item, index) => {


                                            const overall =

                                                getOverallUrgency(

                                                    item.totalUrgency

                                                )


                                            return (


                                                <tr

                                                    key={item.slug}

                                                    className="

                                                        border-b

                                                        hover:bg-gray-50

                                                        transition

                                                    "

                                                >


                                                    {/* RANK */}


                                                    <td className="

                                                        p-5

                                                        font-bold

                                                        text-[#001c72]

                                                    ">


                                                        #{index + 1}


                                                    </td>



                                                    {/* COMPONENT */}


                                                    <td className="

                                                        p-5

                                                        font-semibold

                                                        text-lg

                                                    ">


                                                        {item.component}


                                                    </td>



                                                    {/* LUBRICATION */}


                                                    <td className="p-5">


                                                        <MaintenanceCell

                                                            days={

                                                                item.lubricationDays

                                                            }

                                                            urgency={

                                                                item.lubricationUrgency

                                                            }

                                                            getStatusColor={

                                                                getStatusColor

                                                            }

                                                        />


                                                    </td>



                                                    {/* BEARING */}


                                                    <td className="p-5">


                                                        <MaintenanceCell

                                                            days={

                                                                item.bearingDays

                                                            }

                                                            urgency={

                                                                item.bearingUrgency

                                                            }

                                                            getStatusColor={

                                                                getStatusColor

                                                            }

                                                        />


                                                    </td>



                                                    {/* OIL */}


                                                    <td className="p-5">


                                                        <MaintenanceCell

                                                            days={

                                                                item.oilDays

                                                            }

                                                            urgency={

                                                                item.oilUrgency

                                                            }

                                                            getStatusColor={

                                                                getStatusColor

                                                            }

                                                        />


                                                    </td>



                                                    {/* INSPECTION */}


                                                    <td className="p-5">


                                                        <MaintenanceCell

                                                            days={

                                                                item.inspectionDays

                                                            }

                                                            urgency={

                                                                item.inspectionUrgency

                                                            }

                                                            getStatusColor={

                                                                getStatusColor

                                                            }

                                                        />


                                                    </td>



                                                    {/* SCORE */}


                                                    <td className="

                                                        p-5

                                                        font-bold

                                                        text-xl

                                                    ">


                                                        {

                                                            item.totalUrgency

                                                        }


                                                    </td>



                                                    {/* PRIORITY */}


                                                    <td className="p-5">


                                                        <span

                                                            className={`

                                                                px-4

                                                                py-2

                                                                rounded-full

                                                                text-sm

                                                                font-bold

                                                                ${overall.className}

                                                            `}

                                                        >


                                                            {

                                                                overall.label

                                                            }


                                                        </span>


                                                    </td>


                                                </tr>


                                            )

                                        }

                                    )

                                }


                            </tbody>


                        </table>


                    </div>


                </div>



                {/* LEGEND */}


                <div className="

                    bg-white

                    rounded-3xl

                    shadow-md

                    p-7

                    mt-10

                ">


                    <h2 className="

                        text-xl

                        font-bold

                        text-[#001c72]

                        mb-5

                    ">

                        Urgency Score Explanation

                    </h2>


                    <div className="

                        grid

                        grid-cols-1

                        md:grid-cols-4

                        gap-5

                    ">


                        <Legend

                            title="Normal"

                            description="Maintenance is within the recommended interval."

                            score="Score: 1"

                            className="bg-green-100"

                        />


                        <Legend

                            title="Warning"

                            description="Maintenance will soon be required."

                            score="Score: 2"

                            className="bg-yellow-100"

                        />


                        <Legend

                            title="Critical"

                            description="Maintenance interval has been exceeded."

                            score="Score: 3"

                            className="bg-red-100"

                        />


                        <Legend

                            title="No Record"

                            description="No maintenance history is available."

                            score="Score: 4"

                            className="bg-gray-200"

                        />


                    </div>


                </div>


            </div>


        </div>


    )

}



export default MaintenanceList



/*
====================================
SUMMARY CARD
====================================
*/


const SummaryCard = ({

    title,

    value

}) => {


    return (


        <div className="

            bg-white

            rounded-3xl

            p-6

            shadow-lg

        ">


            <p className="

                text-gray-500

                font-medium

            ">

                {title}

            </p>


            <h2 className="

                text-4xl

                font-extrabold

                text-[#001c72]

                mt-3

            ">

                {value}

            </h2>


        </div>


    )

}



/*
====================================
MAINTENANCE CELL
====================================
*/


const MaintenanceCell = ({

    days,

    urgency,

    getStatusColor

}) => {


    if (days === null) {


        return (


            <div>


                <p className="font-semibold">

                    No Record

                </p>


                <span

                    className="

                        text-xs

                        text-gray-500

                    "

                >

                    Maintenance missing

                </span>


            </div>


        )

    }


    return (


        <div>


            <p className="

                font-semibold

            ">

                {days} days


            </p>


            <span

                className={`

                    inline-block

                    mt-2

                    px-3

                    py-1

                    rounded-full

                    text-xs

                    font-semibold

                    ${getStatusColor(

                        urgency?.level

                    )}

                `}

            >


                {urgency?.level}


            </span>


        </div>


    )

}



/*
====================================
LEGEND COMPONENT
====================================
*/


const Legend = ({

    title,

    description,

    score,

    className

}) => {


    return (


        <div className={`

            ${className}

            p-5

            rounded-2xl

        `}>


            <h3 className="

                font-bold

                text-lg

            ">

                {title}

            </h3>


            <p className="

                text-sm

                mt-2

                text-gray-600

            ">

                {description}

            </p>


            <p className="

                font-bold

                mt-3

            ">

                {score}

            </p>


        </div>


    )

}