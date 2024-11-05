'use client'
import style from './list.module.css'
import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../seach/search";
import FilteredJobs from "../filteredjobs/filteredJobs";
import Modal from "../modalBox"

function JobList() {
    const [search, setSearch] = useState([])
    const [input, setInput] = useState('')
    // -----------------------
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // ---------------------------
    const [switchModal, setSwitchModal] = useState(false)
    
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    function removeQuery(index) {
        const deleteQuery = search.filter((_, i) => i !== index)
        setSearch(deleteQuery)
    }
    // ----------------------

    const jobData = async () => {
        setLoading(true)
        try {
            const response = await fetch('/data.json')
            if (!response.ok) {
                throw new Error("couldn't fetch jobs");
            }
            const result = await response.json()
            return setData(result)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        jobData()
    }, [])  

    useEffect(() => {
        document.body.style.overflow = switchModal ? 'hidden' : 'auto';

        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [switchModal]);
    
    const handleSearch = () => {
        const chill = []
        const isLanguage = data.map(dt => {
            return dt.languages
        })
        const auth = new Set(chill.concat(...isLanguage))
        const convertAuthToArr = [...auth]
        
        if (input.trim() !== "" && convertAuthToArr.includes(input.trim().toLowerCase())) {
            setSearch((prevSearch) => {
                if (!prevSearch.includes(input.trim().toLowerCase())) {
                    return [...prevSearch, input.trim().toLowerCase()]
                }
                return prevSearch
            })
            setSwitchModal(false)
            setInput('')
        } else {
            setSwitchModal(input.trim() !== "");
            setInput(input)
        }
    }

    if (loading) return <p>Loading....</p>
    if (error) return <p>error.message</p>

    return (
        <div className={style.content}>
            {switchModal && !search.includes(input) ? 
            <Modal setSwitchModal={setSwitchModal} switchModal={switchModal}>
                <p style={{width: '50px', border: '2px solid green'}}>{`${input} is not an available job`}</p>
            </Modal> :
            null}
            <SearchBar 
            input={input}
            handleInput={handleInput}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            removeQuery={removeQuery}
            />
            <div>
                <FilteredJobs 
                datas={data}
                search={search}
                setSearch={setSearch}
                />
            </div>
        </div>
    )
}

export default JobList