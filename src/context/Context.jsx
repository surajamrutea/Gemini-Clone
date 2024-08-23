import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context=createContext();
const ContextProvider=(props)=>{

   
  
const [input,setInput]=useState("");// to save the input data
const [recentPrompts,setRecentPrompts]=useState();//to display inmain component
const [prevPrompts,setPrevPrompts]=useState([]);//to store histery
const [showResult,setShowResult]=useState(false);//to show result hide grid box
const [loading,setLoading]=useState(false);//loading animation
const [resultdata,setResultdata]=useState("");//to display result on web page
const delaypara=(index,nextword)=>{ //using for typing effect
setTimeout(function(){
    setResultdata(prev=>prev+nextword);

},75*index)
}
const newChat=()=>{
    setLoading(false)
    setShowResult(false)
}
const onSent=async(prompt)=>{

    setResultdata("")//remove input text from text field
    setLoading(true)
    setShowResult(true)
    let response;
    if (prompt!==undefined) {
        response=await run(prompt);
        setRecentPrompts(prompt)
        
    }
    else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompts(input)
        response=await run(input)
    }
    
    //data comes into the **react.js** format to convert it we use the those variable for the new line and bold the heading
    let responseArray=response.split("**");
    let newresponse="";//to remove undefine which is come from the api
    for(let i=0;i<responseArray.length;i++){
        if(i===0|| i%2 !== 1){
            newresponse+=responseArray[i];
        }
        else{
            newresponse+="<b>"+responseArray[i]+"</b>";
        }
    }

    let newresponse2=newresponse.split("*").join("</br>");

    let newresopnseArray=newresponse2.split(" ");
    for(let i=0;i<newresopnseArray.length;i++){
        const nextword=newresopnseArray[i];
        delaypara(i,nextword+" ");
    }
    
    setLoading(false)
    setInput("")//to remove input
    
}
    const ContextValue={
      prevPrompts,
      setPrevPrompts,
      onSent,
      setRecentPrompts,
      recentPrompts,
      showResult,
      loading,
      resultdata,
      input,
      setInput,
      newChat


    }
    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider