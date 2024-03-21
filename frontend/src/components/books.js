import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import picture from "../main_image.png";
import styles from "./books.module.css"

function Books(){

    const [allbooks,setallbooks]=useState([]);


    const navigate=useNavigate();
    const getbooks=async()=>{
        const response = await axios.get('http://localhost:3000/books/getbooks');
        // console.log(response.data[0].name);
        setallbooks(response.data);
    }

    useEffect(()=>{
        const token=localStorage.getItem('TOKEN');
        if(!token){
            navigate('/signin')
        }
        getbooks();
    },[]);

    return(
        <div className={styles.container}>
        <div className={styles.cover}>
        <div className={styles.medbooks}>
            <h1>Meditation Books</h1>
            {allbooks.map((data,index)=>{
                return (
                    <ul>
                        <li>
                            <p
                                key={index}
                                width={250}
                                height={250}
                                color="red"
                                onClick={()=>window.location.href=data.url}
                                className={styles.bookName}
                            >{data.name} </p>
                        </li>
                    </ul>
                )
            })}
        </div>
        <div className={styles.image}>
            <img src={picture} alt="" />
        </div>
    </div>
    </div>
)
}
export default Books;