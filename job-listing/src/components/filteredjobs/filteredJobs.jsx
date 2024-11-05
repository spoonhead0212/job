'use client'
import Image from "next/image";
import style from './filtered.module.css'

function FilteredJobs( {datas, search} ) {
    const filteredJobs = search.length === 0 ? datas : datas.filter((dt) => {
        return search.some(term => 
            dt.languages.some(lang => lang.toLowerCase().includes(term.toLowerCase()))
        );
    });

    const credentials = filteredJobs.map(jobs => {
        return [jobs.role, jobs.level, ...jobs.languages]
    })

    return (
        <div className={style.jobs}>
            {filteredJobs.map((data, i) => (
                <div key={data.id} className={`${style.flex} ${style.jobsList}`}>
                    <div className={style.logo}>
                        <Image
                            src={data.logo}
                            alt={data.id}
                            width={50}
                            height={50}
                            className={style.logoImg}
                        />
                    </div>
                    <div className={style.stack}>
                        <ul className={`${style.flex} ${style.listOne}`}>
                            <li className={style.company}>{data.company}</li>
                            {data.new && <li>NEW</li>}
                            {data.featured && <li>FEATURED</li>}
                        </ul>
                        <h4>{data.position}</h4>
                        <ul className={`${style.flex} ${style.jobInfo}`}>
                            <li className={style.date}>{data.postedAt}</li>
                            <li>{data.contract}</li>
                            <li>{data.location}</li>
                        </ul>
                    </div>
                    <div className={style.lang}>
                    <ul className={`${style.flex} ${style.availableJobs}`}>
                       {credentials[i].map((cred, index) => (
                            <li key={index} className={style.available}>{cred}</li>
                       ))}
                    </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilteredJobs