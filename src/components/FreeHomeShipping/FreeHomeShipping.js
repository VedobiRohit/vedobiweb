import React, { useEffect, useState } from "react";
import { GetData } from "../../utils/apiRequestHandler";
import ReactHtmlParser from "react-html-parser";

export const FreeHomeShipping = () => {
    const [FreeHomeShippingdescription, setJobs] = useState([]);

    useEffect(() => {

        GetData("api/FreeHomeShipping/41").then((response) => {
            if (response.status === true) {
                setJobs(response.FreeHomeShipping.description);
            }

        });
    }, []);


    return (
        <section className="category py-2 my-2 bg-white">
            {ReactHtmlParser(FreeHomeShippingdescription)}
        </section>
    );

}
