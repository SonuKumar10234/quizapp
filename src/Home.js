import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import mcq from './mcqdata.json'

function Home(props) {
  const navigate = useNavigate();
  const[score , setScore] = useState(0);
  const[currentQue , setCurrentQue] = useState(0);
  const[finalResult , setFinalResult] = useState(false);
  const[initiated , setInitiated] = useState(false);
  const[getOptId, setGetOptId] = useState([]);
  // const[attempted, setAttempted] = useState(false);

  
  useEffect(()=>{
    if(!localStorage.getItem('visited')){
      navigate('/');
    }
  },[])
  if(localStorage.getItem('visited')){
    localStorage.clear();
  }
  const optionClicked=(isCorrect,optionID,e)=>{
    e.target.style.background = "orange";
    setGetOptId([...getOptId,optionID]);
    
    // if(attempted === false){
    //   setGetOptId([...getOptId,optionID]);
    //   setAttempted(true);// now user cant select any other option
    // }
    
    if(isCorrect){  // isCurrent == true means option is corect
      setScore(score+1);
    }
  }

  props.getResp[0] = (getOptId);// inserting at first row
  // console.log("resp",props.getResp);
  localStorage.setItem("userAns", [getOptId]);
  const nextQuestion=(currentQue)=>{
    // setAttempted(false)
    
    if(getOptId[currentQue]){
      if(currentQue<mcq.length-1){
        setCurrentQue(currentQue+1);
      }
      else{//currentQue === mcq.length-1
        setFinalResult(true);
      }
    }
 }
 const prevQuestion=()=>{
    if(currentQue > 0){
      setCurrentQue(currentQue-1);
    }
 }
 const startTest=()=>{
    setInitiated(true);
}
const showResponse=()=>{
  localStorage.setItem("visited", "true");
  navigate('/response');
}

    return (
      <>

  {initiated?  <div className="container">
       <h2>Assessment Test</h2>
       
       {finalResult?
          <div className='score-container'>
            <p>Congratulations! you have completed the Assessment.</p>
             <h2>Total score : {score}/{mcq.length}</h2>
             <p>{score} out of {mcq.length} correct - ({((score/mcq.length)*100).toFixed(2)})%</p>
             <button className='btn' onClick={showResponse}>Check Your Answers</button>
          </div>
       :
         
       <div>
          {
              <>
              
                <div key={mcq.id} className="Question-card">
              
                  <div className='options'>
                    <h2>Q.{currentQue+1}) {mcq[currentQue].Question}</h2>
                    {
                      mcq[currentQue].options.map(option=>{
                        return (

                          <p onClick={(e) => optionClicked(option.isCorrect, option.id,e)} key={option.id} className={getOptId[currentQue] == option.id ? "active" : ""} > {option.text}</p>
                          
                        );
                      })
                      
                    }
                  </div>
                  <div className='footer'>
                    <h3>{currentQue+1}/{mcq.length}</h3>
                    <button className='prev-btn btn' onClick={()=>prevQuestion(currentQue)}>Previous</button>
                    <button className='next-btn btn' onClick={()=>nextQuestion(currentQue)}>Next</button>
                  </div> 
              </div>

          </>
       }

       
       </div>

       }

      
    </div>
    :
    <div className='lets-start'>
      <h2>{mcq[0].title}</h2>
      <div className='start-box'>
         
         <h2>Instructions:</h2>
         <ol className='instruction'>
          <li>Read the Instructions Carefully before starting the Quiz.</li>
          <li>There are Total 5 Questions , each carry one marks and for each wrong answer one marks will be deducted.</li>
          <li>Each Question consists of four options and only one option is correct.</li>
          <li>you cannot jump to next Question without answering the current Questions.</li>
         </ol>
         <p>Best of Luck !!!</p>
         
      </div>
      <button className='btn' onClick={startTest}>Start Assessment</button>
    </div>
  }
  
  </>
    );
}

export default Home;
