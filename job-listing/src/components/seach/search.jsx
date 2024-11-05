'use client'
import style from './search.module.css'
import { useCallback } from 'react'
import removeIcon from '/public/images/icon-remove.svg'
import Image from "next/image"

function SearchBar( {handleInput, input, handleSearch, search, setSearch, removeQuery} ) {

    const clearSearch = useCallback(() => {
        setSearch([])
    }, [setSearch])
    
    return(
        <div>
            <input
            type="text" 
            onChange={handleInput}
            value={input}
            className={style.inputSearch}
            />
            <button 
            onClick={handleSearch}
            className={style.searchBtn}
            >search
            </button>

            {
                search.length > 0 ?
                <div className={style.searchQuery}>
                    <ul>
                        {search.map((s, i) => {
                            return (
                                <li key={i} className={style.searchLi}>
                                {s}
                                <Image
                                        onClick={() => removeQuery(i)}
                                        src={removeIcon}
                                        alt="remove-icon"
                                        width={20}
                                        height={20}
                                />
                                </li>
                            )
                        })}
                    </ul>
                    <div>
                        <button onClick={clearSearch} className={style.clearBtn}>Clear</button>
                    </div> 
                </div> :
                null
            }
            
        </div>
    )
}

export default SearchBar