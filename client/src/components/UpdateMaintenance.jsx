import React, { useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import axios from "axios";

import {
    Droplets,
    CircleDot,
    Fuel,
    ClipboardCheck,
    ArrowLeft,
    CheckCircle,
    Send
} from "lucide-react";


const UpdateMaintenance = () => {

    const { component } = useParams();

    const navigate = useNavigate();


    // Stores selected maintenance types

    const [selectedMaintenance, setSelectedMaintenance] =
        useState([]);


    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] =
        useState("");


    const maintenanceOptions = [

        {
            name: "Lubrication",
            icon: Droplets
        },

        {
            name: "Bearing Change",
            icon: CircleDot
        },

        {
            name: "Oil Change",
            icon: Fuel
        },

        {
            name: "Inspection",
            icon: ClipboardCheck
        }

    ];


    // HANDLE CHECKBOX SELECTION

    const handleMaintenanceChange = (
        maintenanceType,
        checked
    ) => {

        if (checked) {

            setSelectedMaintenance(prev => [

                ...prev,

                maintenanceType

            ]);

        } else {

            setSelectedMaintenance(prev =>

                prev.filter(
                    item => item !== maintenanceType
                )

            );

        }

    };


    // SUBMIT MAINTENANCE

    const handleSubmit = async () => {


        // Check if at least one maintenance type selected

        if (selectedMaintenance.length === 0) {

            alert(
                "Please select at least one maintenance type."
            );

            return;

        }


        // FIRST CONFIRMATION

        const firstConfirmation = window.confirm(

            `Are you sure you want to update maintenance for ${formattedComponentName}?`

        );


        if (!firstConfirmation) {

            return;

        }


        // SECOND CONFIRMATION

        const secondConfirmation = window.confirm(

            `Final confirmation!\n\nYou are about to update the following maintenance records:\n\n${selectedMaintenance.join(", ")}\n\nDo you want to continue?`

        );


        if (!secondConfirmation) {

            return;

        }


        try {

            setLoading(true);


            // Send each selected maintenance type

            const requests = selectedMaintenance.map(
                maintenanceType =>

                    axios.post(

                        `https://predictivemaintenance-1.onrender.com/api/maintenance/${component}`,

                        {
                            maintenanceType
                        }

                    )

            );


            // Wait for all requests to complete

            await Promise.all(requests);


            setSuccessMessage(

                "Maintenance records updated successfully!"

            );


            // Clear selected checkboxes

            setSelectedMaintenance([]);


            // Remove success message after 4 seconds

            setTimeout(() => {

                setSuccessMessage("");

            }, 4000);


        } catch (error) {

            console.error(
                "Failed to update maintenance:",
                error
            );


            alert(
                "Failed to update maintenance records."
            );

        } finally {

            setLoading(false);

        }

    };


    // FORMAT COMPONENT NAME

    const formattedComponentName =
        component
            .replaceAll("-", " ")
            .replace(/\b\w/g, char =>
                char.toUpperCase()
            );


    return (

        <div className="min-h-screen bg-[#f4f7fc] px-6 py-10">


            {/* BACK BUTTON */}

            <button

                onClick={() => navigate(-1)}

                className="
                    flex
                    items-center
                    gap-2
                    text-[#315f9f]
                    font-medium
                    mb-8
                    hover:text-[#19366b]
                "

            >

                <ArrowLeft size={20} />

                Back to Component Overview

            </button>



            {/* MAIN WINDOW */}

            <div className="
                max-w-2xl
                mx-auto
                bg-white
                rounded-2xl
                shadow-xl
                border
                border-gray-200
                overflow-hidden
            ">


                {/* HEADER */}

                <div className="
                    bg-[#eef4ff]
                    px-8
                    py-7
                    border-b
                ">

                    <h1 className="
                        text-3xl
                        font-bold
                        text-[#19366b]
                    ">

                        Update Maintenance

                    </h1>


                    <p className="
                        text-gray-600
                        mt-2
                        text-lg
                    ">

                        Component: {formattedComponentName}

                    </p>


                    <p className="
                        text-sm
                        text-gray-500
                        mt-3
                    ">

                        Select all maintenance activities
                        that have been performed.

                        The current date and time will be
                        recorded automatically after submission.

                    </p>

                </div>



                {/* MAINTENANCE OPTIONS */}

                <div className="p-8">


                    <h2 className="
                        text-lg
                        font-semibold
                        text-[#19366b]
                        mb-5
                    ">

                        Select Maintenance Type

                    </h2>


                    <div className="space-y-4">


                        {maintenanceOptions.map(option => {


                            const Icon = option.icon;


                            const isChecked =
                                selectedMaintenance.includes(
                                    option.name
                                );


                            return (

                                <label

                                    key={option.name}

                                    className={`

                                        flex
                                        items-center
                                        justify-between
                                        p-5
                                        border
                                        rounded-xl
                                        cursor-pointer
                                        transition-all

                                        ${isChecked

                                            ? "border-green-500 bg-green-50 shadow-sm"

                                            : "border-gray-200 hover:border-[#7195cf] hover:bg-[#f7f9fd]"

                                        }

                                    `}

                                >


                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">


                                        {/* ICON */}

                                        <div className="
                                            w-11
                                            h-11
                                            rounded-full
                                            bg-[#eef4ff]
                                            flex
                                            items-center
                                            justify-center
                                        ">

                                            <Icon

                                                size={22}

                                                className="
                                                    text-[#4974b8]
                                                "

                                            />

                                        </div>



                                        {/* TEXT */}

                                        <div>


                                            <p className="
                                                font-semibold
                                                text-gray-700
                                            ">

                                                {option.name}

                                            </p>


                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">

                                                Mark as completed

                                            </p>


                                        </div>


                                    </div>



                                    {/* CHECKBOX */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">


                                        {isChecked && (

                                            <CheckCircle

                                                size={22}

                                                className="
                                                    text-green-600
                                                "

                                            />

                                        )}


                                        <input

                                            type="checkbox"

                                            checked={isChecked}

                                            onChange={(e) =>

                                                handleMaintenanceChange(

                                                    option.name,

                                                    e.target.checked

                                                )

                                            }

                                            className="
                                                w-5
                                                h-5
                                                accent-green-600
                                                cursor-pointer
                                            "

                                        />


                                    </div>


                                </label>

                            );

                        })}


                    </div>



                    {/* SELECTED COUNT */}

                    <div className="
                        mt-6
                        p-4
                        rounded-lg
                        bg-[#f4f7fc]
                        text-sm
                        text-gray-600
                    ">


                        Selected Maintenance Activities:

                        <span className="
                            ml-2
                            font-bold
                            text-[#19366b]
                        ">

                            {selectedMaintenance.length}

                        </span>


                    </div>



                    {/* SUCCESS MESSAGE */}

                    {successMessage && (

                        <div className="
                            mt-5
                            p-4
                            rounded-lg
                            bg-green-50
                            border
                            border-green-300
                            text-green-700
                            font-medium
                        ">

                            ✓ {successMessage}

                        </div>

                    )}



                    {/* SUBMIT BUTTON */}

                    <button

                        onClick={handleSubmit}

                        disabled={

                            loading ||

                            selectedMaintenance.length === 0

                        }

                        className="

                            w-full
                            mt-6
                            flex
                            items-center
                            justify-center
                            gap-3

                            bg-[#19366b]

                            hover:bg-[#244a8a]

                            text-white

                            py-4

                            rounded-xl

                            font-semibold

                            transition-all

                            disabled:bg-gray-400

                            disabled:cursor-not-allowed

                        "

                    >


                        <Send size={20} />


                        {loading

                            ? "Updating Maintenance..."

                            : "Submit Maintenance Update"

                        }


                    </button>


                </div>



                {/* FOOTER */}

                <div className="
                    px-8
                    py-5
                    bg-gray-50
                    border-t
                    text-sm
                    text-gray-500
                ">

                    Maintenance records will only be saved
                    after submission and final confirmation.

                </div>


            </div>


        </div>

    );

};


export default UpdateMaintenance;