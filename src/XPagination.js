import { useEffect, useState } from "react";
import "./xpagination.css"

// https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

function XPagination() {

    const [data , setData] = useState([]) ;
    const entryPerPage = 10 ;

    const [currPage , setCurrPage] = useState(1) ;
    const [paginatedEntries , setPaginatedEntries] = useState([]) ;

    const totalPages = Math.ceil(46 / entryPerPage) ;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json") ;
                 if(!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`) ;
                }
                const result = await response.json() ;
                setData(result) ;
            }catch(error) {
                console.error("Error " , error) ;
                alert("failed to fetch data");
            }
        } ;
        fetchData() ;
    } , []) ;

    useEffect(() => {
        const stIdx = (currPage - 1) * entryPerPage ;
        const endIdx = stIdx + entryPerPage ;
        setPaginatedEntries(data.slice(stIdx , endIdx)) ;
    } , [currPage , data]) ;

    const handlePageChange = (pageNo) => {
        setCurrPage(pageNo) ;
    } ;

    return (
        <div>
            <h1 style={{textAlign: "center" , fontWeight: "bold"}} >Employee Data Table</h1>
            <table style={{width: '100%', marginTop: "50px"}}>
                <thead>
                    <tr style={{backgroundColor: "#0D9276" , height: "50px" , textAlign: "left" , color: "aliceblue"}}>
                        <th style={{width: '10%' , paddingLeft: "10px"}} >ID</th>
                        <th style={{width: '20%' , paddingLeft: "10px"}} >Name</th>
                        <th style={{width: '50%' , paddingLeft: "10px"}} >Email</th>
                        <th style={{width: '20%' , paddingLeft: "10px"}} >Role</th>
                    </tr>
                </thead>
                {paginatedEntries.map((entry) => {
                    return (
                        <tr key={entry.id} style={{height: "50px"}}>
                            <td style={{paddingLeft: "10px"}}>{entry.id}</td>
                            <td style={{paddingLeft: "10px"}}>{entry.name}</td>
                            <td style={{paddingLeft: "10px"}}>{entry.email}</td>
                            <td style={{paddingLeft: "10px"}}>{entry.role}</td>
                        </tr>
                    )
                })}
                
            </table>

            <div className="footer">    
                <button 
                    className="footer-btn" 
                    onClick={() => handlePageChange(currPage - 1)}
                    disabled={currPage === 1}
                >
                    Previous
                </button>
                <div className="page-btn">{currPage}</div>
                <button 
                    className="footer-btn"
                    onClick={() => handlePageChange(currPage + 1)}
                    disabled={currPage === totalPages} 
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default XPagination ;