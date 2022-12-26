import React from "react";
import mcq from './mcqdata.json'
import {useNavigate} from 'react-router-dom'

function UserResponse(props){
    // console.log("userresp", props.resp[0][0])
    // const userAns = localStorage.getItem("userAns");
    // console.log("userAnswer",userAns);

    const navigate = useNavigate();
    window.onbeforeunload = function() { 
      window.setTimeout(function () { 
          window.location.href = '/';
      },0);
      window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
  }
  const homePage=()=>{
    navigate('/');
  }
    return(
        <div className="container">
          <h3>Your Response :</h3>
          <div className="Question-card">
          
                {
                    mcq.map(data=>{
                        return(
                            <div className='option' key={data.id}>
                              <h2>Q.{data.id}) {data.Question}</h2>
                              {/* {props.resp[0][data.id-1]==0?<span className="unattempted">UnAttempted</span>:""} */}
                {
                  data.options.map((option,index)=>{
                    return(  
                      <div className="flex" key={option.id}>
                        
                       <p className={option.isCorrect?"sahi": option.id == props.resp[0][data.id-1]?"galat":""}> {option.text}
                        
                        {
                         option.isCorrect && option.id == props.resp[0][data.id-1]?<span className="correct"><i className="fa-solid fa-check"></i>Your Answer</span>
                         : option.id == props.resp[0][data.id-1]?<span className="wrong"><i className="fa-solid fa-xmark"></i>Your Answer</span>
                         : option.isCorrect ? <span className="correct">Correct Answer</span>
                         
                         : props.resp[0][data.id-1]==0?console.log("unattempted"):""
                      
                         
                        }
                       </p>
                      </div>
                    )
                 })
                }
              </div>

                        )
                    })
                }
               <div className="home-btn">
               <button className="btn" onClick={homePage}>Home Page</button>
               </div>
          </div>
          
        </div>
    )
}
export default UserResponse;



/*
data.options.map((option)=>{
                    return(  
                     
                       <p key={option.id} className={option.isCorrect?"sahi": option.id == props.resp[0][data.id-1]?"galat":""}> {option.text}
                        
                        {
                         option.isCorrect && option.id == props.resp[0][data.id-1]?<span className="correct"><i className="fa-solid fa-check"></i>Your Answer</span>
                         : option.id == props.resp[0][data.id-1]?<span className="wrong"><i className="fa-solid fa-xmark"></i>Your Answer</span>
                         : option.isCorrect ? <span className="correct">Correct Answer</span>
                         :""
                        }
                       </p>
                      
                    )
                 })
                }

*/