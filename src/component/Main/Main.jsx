import React, { useContext } from "react";
import "./Main.css"
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main=()=>{
    const {
        onSent,
        setRecentPrompts,
        recentPrompts,
        showResult,
        loading,
        resultdata,
        input,
        setInput}=useContext(Context)
    return(
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main_container">
                
                {!showResult?
                <>
                 <div className="greet">
                    <p><span>Hello,Suraj</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div  className="cards">
                    <div className="card">
                        <p > Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefely summarise the concept of an c++ and java</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>What song would you like to play</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>What kind of story you have to lisen</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                
                </>
                :
                <div className="result">
                  <div className="result_title">
                    <img src={assets.user_icon} alt=""/>
                    <p>{recentPrompts}</p>
                  </div>
                  <div className="result_data">
                    <img src={assets.gemini_icon} alt=""/>
                    {loading
                    ?
                    <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultdata}}></p>               
                }
                    
                  </div>
                </div>
                
            
                }
               
                <div className="main_bottom">
                    <div className="search_box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter an prompt here"/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                        
                    </div>
                    <p className="bottom_info">
                    Gemini may display inaccurate info, including about people, so double-check its responses
                </p>
                </div>
                
            </div>
          
        </div>
    )
}
export default Main