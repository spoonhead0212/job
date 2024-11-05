import React from "react";
import JobList from "@components/components/listjobs/list";
import  "../style.css";

function Home() {
    return(
        <div>
            <div className="top"></div>
            <main>
                <JobList />
            </main>
        </div>
    )
}

export default Home