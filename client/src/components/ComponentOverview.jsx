import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Settings,
    Cpu,
    Zap,
    Wind,
    ChevronRight,
    CircleGauge,
    PanelTop,
    Link,
    Cog,
    Cylinder,
    Boxes,
    Network,
    Radio,
    Monitor,
    Grid3X3,
    MapPin,
    Camera,
    Battery,
    GitBranch,
    Plug,
    ToggleLeft,
    Cable,
    Gauge,
    Filter,
    CircleDot,
    Waves,
    Droplets,
    Info
} from "lucide-react";


const ComponentOverview = () => {

    const navigate = useNavigate();


    const sections = [

        {
            title: "Mechanical Components",
            demo: "Demo 1",
            icon: Settings,

            components: [
                { name: "Rollers", slug: "rollers", icon: CircleGauge },
                { name: "Track Frames", slug: "track-frames", icon: PanelTop },
                { name: "Track Chains", slug: "track-chains", icon: Link },
                { name: "Swing Motors", slug: "swing-motors", icon: Cog },
                { name: "Cylinder Rods", slug: "cylinder-rods", icon: Cylinder },
                { name: "Pistons", slug: "pistons", icon: Boxes },
                { name: "Couplings", slug: "couplings", icon: Network },
                { name: "Bearings", slug: "bearings", icon: CircleDot }
            ]
        },


        {
            title: "Electronic Components",
            demo: "Demo 2",
            icon: Cpu,

            components: [
                { name: "Control Modules", slug: "control-modules", icon: Cpu },
                { name: "Sensors", slug: "sensors", icon: Radio },
                { name: "Display Units", slug: "display-units", icon: Monitor },
                { name: "Keypads", slug: "keypads", icon: Grid3X3 },
                { name: "ECU Units", slug: "ecu-units", icon: Cpu },
                { name: "Communication Units", slug: "communication-units", icon: Radio },
                { name: "GPS Modules", slug: "gps-modules", icon: MapPin },
                { name: "Camera Units", slug: "camera-units", icon: Camera }
            ]
        },


        {
            title: "Electrical Components",
            demo: "Demo 3",
            icon: Zap,

            components: [
                { name: "Alternators", slug: "alternators", icon: Battery },
                { name: "Starters", slug: "starters", icon: Zap },
                { name: "Batteries", slug: "batteries", icon: Battery },
                { name: "Relays", slug: "relays", icon: GitBranch },
                { name: "Fuses", slug: "fuses", icon: Plug },
                { name: "Wiring Harnesses", slug: "wiring-harnesses", icon: Cable },
                { name: "Switches", slug: "switches", icon: ToggleLeft },
                { name: "Connectors", slug: "connectors", icon: Plug }
            ]
        },


        {
            title: "Pneumatic Components",
            demo: "Demo 4",
            icon: Wind,

            components: [
                { name: "Air Compressors", slug: "air-compressors", icon: Cog },
                { name: "Air Valves", slug: "air-valves", icon: GitBranch },
                { name: "Cylinders", slug: "pneumatic-cylinders", icon: Cylinder },
                { name: "Air Filters", slug: "air-filters", icon: Filter },
                { name: "Pressure Regulators", slug: "pressure-regulators", icon: Gauge },
                { name: "Air Hoses", slug: "air-hoses", icon: Waves },
                { name: "Quick Couplers", slug: "quick-couplers", icon: Network },
                { name: "Lubricators", slug: "lubricators", icon: Droplets }
            ]
        }

    ];


    const handleComponentClick = (slug) => {

        navigate(
            `/Component-Maintenance/${slug}`
        );

    };


    return (

        <div className="min-h-screen bg-[#f4f7fc] px-8 py-10">

            {/* HEADER */}

            <div className="flex justify-between items-start mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-[#19366b]">

                        Component Maintenance

                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">

                        Select a component category to view details and maintenance data

                    </p>

                </div>


                {/* LIVE STATUS */}

                <div className="bg-white border rounded-xl px-6 py-3 shadow-sm flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-green-500"></div>

                    <span className="font-medium text-gray-700">

                        Live Status

                    </span>

                </div>

            </div>



            {/* COMPONENT SECTIONS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {sections.map((section) => {

                    const SectionIcon = section.icon;


                    return (

                        <div
                            key={section.title}
                            className="
                                bg-white
                                rounded-2xl
                                border
                                border-gray-200
                                shadow-lg
                                p-6
                            "
                        >


                            {/* SECTION HEADER */}

                            <div className="flex justify-between items-start mb-6">


                                <div>

                                    <h2 className="text-2xl font-bold text-[#19366b] leading-tight">

                                        {section.title}

                                    </h2>


                                    <span className="
                                        inline-block
                                        mt-4
                                        bg-[#edf3ff]
                                        text-[#2f5eaa]
                                        px-3
                                        py-1
                                        rounded-lg
                                        text-sm
                                        font-medium
                                    ">

                                        {section.demo}

                                    </span>

                                </div>


                                <div className="
                                    w-16
                                    h-16
                                    rounded-full
                                    bg-[#eef4ff]
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    <SectionIcon
                                        size={32}
                                        className="text-[#4a76b8]"
                                    />

                                </div>

                            </div>



                            {/* COMPONENT LIST */}

                            <div className="space-y-2">

                                {section.components.map((component) => {

                                    const ComponentIcon = component.icon;


                                    return (

                                        <button

                                            key={component.slug}

                                            onClick={() =>
                                                handleComponentClick(
                                                    component.slug
                                                )
                                            }

                                            className="
                                                w-full
                                                flex
                                                items-center
                                                justify-between
                                                border
                                                border-gray-200
                                                rounded-xl
                                                px-4
                                                py-4
                                                hover:bg-[#f4f7fc]
                                                hover:border-[#7195cf]
                                                hover:shadow-md
                                                transition-all
                                                duration-200
                                                group
                                            "
                                        >


                                            <div className="flex items-center gap-4">


                                                <ComponentIcon
                                                    size={22}
                                                    className="text-[#4974b8]"
                                                />


                                                <span className="
                                                    text-gray-700
                                                    font-medium
                                                    text-left
                                                ">

                                                    {component.name}

                                                </span>

                                            </div>


                                            <ChevronRight
                                                size={20}
                                                className="
                                                    text-gray-500
                                                    group-hover:text-[#315f9f]
                                                    group-hover:translate-x-1
                                                    transition
                                                "
                                            />

                                        </button>

                                    );

                                })}

                            </div>



                            {/* FOOTER */}

                            <div className="
                                mt-5
                                bg-[#eef3fb]
                                rounded-xl
                                px-4
                                py-4
                                flex
                                justify-between
                                items-center
                            ">

                                <span className="
                                    text-[#315f9f]
                                    font-semibold
                                ">

                                    Total Components: {section.components.length}

                                </span>


                                <ChevronRight
                                    className="text-[#315f9f]"
                                />

                            </div>


                        </div>

                    );

                })}

            </div>



            {/* BOTTOM INFORMATION */}

            <div className="
                max-w-3xl
                mx-auto
                mt-8
                border
                border-[#b8cae8]
                bg-[#f5f8fe]
                rounded-xl
                px-6
                py-5
                flex
                items-center
                gap-5
            ">

                <Info
                    className="text-[#4a76b8]"
                    size={28}
                />


                <div>

                    <h3 className="
                        font-semibold
                        text-[#1f3c70]
                    ">

                        Click on any component to view

                    </h3>


                    <p className="text-gray-600 text-sm mt-1">

                        Detailed information, live data, maintenance history,
                        and performance analytics.

                    </p>

                </div>

            </div>


        </div>

    );

};


export default ComponentOverview;