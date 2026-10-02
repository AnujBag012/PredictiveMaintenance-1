import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ComponentData = () => {

    const { component } = useParams()

    const [maintenanceData, setMaintenanceData] = useState(null)

    const [history, setHistory] = useState([])

    const [showHistory, setShowHistory] = useState(false)

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    useEffect(() => {

        const fetchMaintenanceData = async () => {

            try {

                setLoading(true)
                setError("")

                const response = await axios.get(
                    `https://predictivemaintenance-1.onrender.com/api/${component}/data`
                )

                setMaintenanceData(response.data)

            } catch (err) {

                console.error(
                    "Maintenance data error:",
                    err
                )

                setError(
                    "Unable to fetch maintenance data"
                )

            } finally {

                setLoading(false)

            }

        }

        fetchMaintenanceData()

    }, [component])


    if (loading) {

        return (
            <div className="p-10 text-2xl">
                Fetching maintenance data...
            </div>
        )

    }


    if (error) {

        return (
            <div className="p-10 text-red-600 text-xl">
                {error}
            </div>
        )

    }
    const fetchHistory = async () => {

        try {

            const response = await axios.get(
                `https://predictivemaintenance-1.onrender.com/api/${component}/history`
            )

            console.log("History:", response.data)

            setHistory(response.data)

            setShowHistory(true)

        } catch (error) {

            console.error(
                "History fetch error:",
                error
            )

        }
    }


    return (

        <div className="
            min-h-screen
            bg-[#eef2ff]
            p-8
        ">

            <button
                onClick={() => window.history.back()}
                className="
                    px-6
                    py-3
                    bg-white
                    rounded-2xl
                    shadow-md
                    text-[#001c72]
                    font-semibold
                    mb-8
                "
            >
                ← Back
            </button>

            


            <h1 className="
                text-5xl
                font-extrabold
                text-[#001c72]
                mb-10
                capitalize
            ">
                {component.replace("-", " ")}
            </h1>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-8
            ">


                {/* LUBRICATION */}

                <div className="
                    bg-white
                    rounded-[30px]
                    p-8
                    shadow-lg
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#001c72]
                    ">
                        Lubrication
                    </h2>

                    <p className="
                        text-gray-500
                        mt-4
                    ">
                        Last Lubrication
                    </p>

                    <p className="
                        text-xl
                        font-semibold
                        mt-1
                    ">
                        {maintenanceData?.lubrication?.timestamp
                            ? new Date(
                                maintenanceData.lubrication.timestamp
                            ).toLocaleString()
                            : "No record found"
                        }
                    </p>

                </div>


                {/* BEARING CHANGE */}

                <div className="
                    bg-white
                    rounded-[30px]
                    p-8
                    shadow-lg
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#001c72]
                    ">
                        Bearing Change
                    </h2>

                    <p className="
                        text-gray-500
                        mt-4
                    ">
                        Last Bearing Change
                    </p>

                    <p className="
                        text-xl
                        font-semibold
                        mt-1
                    ">
                        {maintenanceData?.bearingChange?.timestamp
                            ? new Date(
                                maintenanceData.bearingChange.timestamp
                            ).toLocaleString()
                            : "No record found"
                        }
                    </p>

                </div>


                {/* INSPECTION */}

                <div className="
                    bg-white
                    rounded-[30px]
                    p-8
                    shadow-lg
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#001c72]
                    ">
                        Inspection
                    </h2>

                    <p className="
                        text-gray-500
                        mt-4
                    ">
                        Last Inspection
                    </p>

                    <p className="
                        text-xl
                        font-semibold
                        mt-1
                    ">
                        {maintenanceData?.inspection?.timestamp
                            ? new Date(
                                maintenanceData.inspection.timestamp
                            ).toLocaleString()
                            : "No record found"
                        }
                                            </p>

                </div>


                {/* OIL CHANGE */}

                <div className="
                    bg-white
                    rounded-[30px]
                    p-8
                    shadow-lg
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#001c72]
                    ">
                        Oil Change
                    </h2>

                    <p className="
                        text-gray-500
                        mt-4
                    ">
                        Last Oil Change
                    </p>

                    <p className="
                        text-xl
                        font-semibold
                        mt-1
                    ">
                        {maintenanceData?.oilChange?.timestamp
                            ? new Date(
                                maintenanceData.oilChange.timestamp
                            ).toLocaleString()
                            : "No record found"
                        }
                    </p>

                </div>

            </div>

            {/* MAINTENANCE HISTORY */}

            <button
                onClick={fetchHistory}
                className="
                    px-6
                    py-3
                    bg-[#001c72]
                    text-white
                    rounded-2xl
                    font-semibold
                "
            >
                View History
            </button>

            {showHistory && (

                <div className="
                    mt-10
                    bg-white
                    rounded-[30px]
                    p-8
                    shadow-lg
                ">

                    <h2 className="
                        text-3xl
                        font-bold
                        text-[#001c72]
                        mb-6
                    ">
                        Maintenance History
                    </h2>


                    {history.length === 0 ? (

                        <p className="text-gray-500">
                            No maintenance history found.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {history.map((record) => (

                                <div
                                    key={record._id}
                                    className="
                                        border
                                        border-gray-200
                                        rounded-xl
                                        p-5
                                        flex
                                        justify-between
                                        items-center
                                    "
                                >

                                    <div>

                                        <p className="
                                            text-lg
                                            font-semibold
                                            text-[#001c72]
                                        ">
                                            {record.maintenanceType}
                                        </p>

                                    </div>


                                    <p className="
                                        text-gray-500
                                    ">

                                        {record.timestamp
                                            ? new Date(
                                                record.timestamp
                                            ).toLocaleString()
                                            : "No timestamp"
                                        }

                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            )}

        </div>

    )
}

export default ComponentData