import ProfileM from "../../components/profile/Profilem";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/profile/Sidebar";
import { Apis } from "../../network/apis";
import { ProfileResponse } from "../../network/dto/response/profile-response.dto";
import { ErrorResponse } from "../../network/dto/response/error-response.dto";
import Useravatar from "../../components/profile/Useravatar";
import Infouser from "../../components/profile/Infouser";
import Link from "next/link";
import styles from "../../styles/Profile/user.module.css"
import Overview from "../../components/profile/overview";
import axios from "axios";
import { style } from "@mui/system/Stack/createStack";
import { IoConstructOutline } from "react-icons/io5";
import { ProfilesUser } from "../../network/dto/payload/profileuser";

export default function Profile() {
    const router = useRouter();
         const [username, setusername] = useState('')
         const [avatar,setavatar] = useState("");
         const [view_history, setview_history] = useState(false);
         const [opensettings,setopensettings] = useState(false);
         const [openfriends,setopenfriends] = useState(false);
         const [currnetdispayname,setcurrnetdispayname] = useState('');
         useEffect(() => {
             Apis.CurrentProfile(
                 {
                     onSuccess: (profile:ProfileResponse)=>{
                         setusername(profile.username);
                         setcurrnetdispayname(profile.displayName);
                        //  setavatar(profile.avatar);
                         setavatar("/profile/Avatar.png");
                     },
                     onFailure:(error:ErrorResponse) =>{
                         console.log(error.message)
                     }
                 }
             )  
     },[])



     const listFreinds = [
        {
          image: avatar,
          displayn: currnetdispayname,
          user: username,
        },
        {
            image: avatar,
            displayn: currnetdispayname,
            user: username,
        },
        {
            image: avatar,
            displayn: currnetdispayname,
            user: username,
        },
       {
            image: avatar,
            displayn: currnetdispayname,
            user: username,
        },
        {
            image: avatar,
            displayn: currnetdispayname,
            user: username,
          },
          {
              image: avatar,
              displayn: currnetdispayname,
              user: username,
          },
          {
              image: avatar,
              displayn: currnetdispayname,
              user: username,
          },
         {
              image: avatar,
              displayn: currnetdispayname,
              user: username,
          },
      ];
    return (
        <>
    <div className="w-full flex absolute justify-end h-full top-0 right-0  ">
        <div className={`background z-10 absolute w-full h-full ${styles.background} `}></div>
        <div className="bgopaci z-20 top-0 opacity-90 left-0 w-full  bg-[#463573] "></div>
        <div className="contain absolute w-full h-full flex xl:justify-between">
            {openfriends || opensettings ? <div className="si xl:hidden absolute lg:hidden md:hidden z-60  sm:hidden hidden" >
                <Sidebar/>
                
            </div>:<div className="si xl:flex relative lg:hidden md:hidden z-60  sm:hidden hidden" >
                <Sidebar/>
                
            </div>}
           
            
            
            <div className="allinfo  z-50   w-full  xl:w-[84%] 2xl:w-[89%] h-full">
            {openfriends ? <div className="popup absolute justify-center  z-50 w-full items-center h-full flex  ">
                <div className="bgopaci absolute top-0 left-0 w-full h-full  min-w-full bg-opacity-95  bg-[#463573] " onClick={() => setopenfriends(!openfriends)}></div>
                        <div className="popupsettings absolute z-10 bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[60%] 2xl:w-[800px]  h-[50%] rounded-[18px]">
                            <div className="closebtn w-full flex justify-end p-8">
                                <button className="text-[23px]  flex justify-end text-[#000] w-[30px] " onClick={() => setopenfriends(!openfriends)}><img src="/profile/popup/exit.png" alt=""  /></button>
                            </div>
                            <div className="friend w-full flex justify-center">
                                <h1 className="text-[25px] font-bold text-[#42386f]">All Friends <span>{'(14)'}</span></h1>
                            </div>
                            <div className="listfriend  w-full flex justify-center items-center overflow-y-scroll mt-4 relative pt-[40%]  h-[75%] flex-col">
                                {listFreinds.map((friends,index) => {
                                        return (<>
                                        <div key={index} className="list  bg-[#dddae4] w-[90%] h-24 mt-3 rounded-[20px] justify-around flex items-center px-5">
                                    <div className="img w-[84px] z-20  rounded-full justify-center  bg-white h-[84px] items-center flex">
                                            <img src={avatar} className={`rounded-full w-[75px]`} alt="ss" />
                                    </div>
                                    <div className="displayname_user px-4 relative ">
                                        <h1 className="font-bold text-[20px]">{currnetdispayname}</h1>
                                        <h1 className="text-[18px]">@{username}</h1>
                                    </div>
                                    <div className="btns flex">
                                        <div className={`btnprofile flex p-5 justify-center rounded-[20px] cursor-pointer ${styles.btnprofile}`}>
                                            <img src="/profile/popup/user.png" className="w-[30px] " alt="" />
                                            <p className="px-2 text-[19px] font-bold text-[#4b3d7f]">Profile</p>
                                        </div>
                                        <div className={`btncontact mx-2 flex p-5 justify-center rounded-[20px] cursor-pointer ${styles.btnconact}`}>
                                            <img src="/profile/popup/chat.png" className="w-[30px]" alt="" />
                                            <p className="px-2 text-[19px] font-bold text-[#fff]">Contact</p>
                                        </div>
                                    </div>
                                </div>
                                        
                                        </>)
                                })}
                                

                            </div>
                        </div>
            </div>
            :null}
            {opensettings ? <div className="popup absolute justify-center  z-50 w-full items-center h-full flex  ">
                <div className="bgopaci absolute top-0 left-0 w-full h-full  min-w-full bg-opacity-95  bg-[#463573] " onClick={() => setopensettings(!opensettings)}></div>
                        <div className="popupsettings absolute z-10 bg-white w-[85%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[600px] h-[50%] rounded-[18px]">
                            <div className="closebtn w-full flex justify-end p-8">
                                <button className="text-[23px]  flex justify-end text-[#000] w-[30px] " onClick={() => setopenfriends(!openfriends)}><img src="/profile/popup/exit.png" alt=""  /></button>
                            </div>
                            
                        </div>
            </div>
            :null}

                <div className="contain  flex-col py-20  flex w-full h-full ">
                    <div className="avatar px-10 sm:px-20 md:px-28 lg:px-32 xl:px-44 2xl:px-72">
                        <Useravatar avata={avatar} userid={currnetdispayname} />
                    </div>
                    <div className="info px-6 lg:px-10 py-8  flex justify-center">
                        <Infouser avatar={avatar} userid={username} displayname={currnetdispayname} />
                    </div>
                    <div className="info px-6 lg:px-10 py-8 flex justify-center  w-full h-full">
                        <div className="over w-[95%] xl:w-[75%] h-full rounded-[20px] bg-opacity-50 bg-[#3d2c6bbe]">
                            <div className="menu bg-opacity-50 bg-[#644dad] w-full flex rounded-[20px] flex-col md:flex-row ">
                            <div className="firstbtn flex py-2 px-2 flex-col md:flex-row md:justify-between w-full">
                                <div className="btns flex flex-grow ">
                                <h1 onClick={() => setview_history(false)} style={{background:view_history?"#5d48a3db":"#705bb1"}} className=" flex-grow md:flex-grow-0 sm:text-[25px] md:px-4 lg:px-9 font-bold   py-4 rounded-[19px] bg-[#705bb1] text-[#cec0fb] flex justify-center  cursor-pointer">Overview</h1>
                                <h1 onClick={() => setview_history(true)} style={{background:view_history?"#705bb1":"#5d48a3db"}} className="sm:text-[25px] flex-grow md:flex-grow-0 font-bold md:px-4 lg:px-9  mx-1 py-4 rounded-[19px] bg-[#5d48a3db] text-[#cec0fb] flex justify-center  cursor-pointer">Match History</h1>
                                <h1 onClick={() => setopenfriends(!openfriends)} className="sm:text-[25px] font-bold  mx-2 py-4 rounded-[19px] flex-grow md:flex-grow-0 bg-[#5d48a3db] md:px-4 lg:px-9 text-[#cec0fb] flex justify-center  cursor-pointer">Friends</h1>
                                </div>
                                <div className="btnsettings">

                                <h1 onClick={() => setopensettings(!opensettings)} className={`text-[25px] relative grow md:flex-grow-0 font-bold  mx-3 py-4 rounded-[19px] lg:px-9 text-[#3f2d70] flex justify-center  cursor-pointer ${styles.btnsettings} `}>Settings</h1>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
                    

                </div>
            </div>
        </div>

        
    </div> 
    </>  
    );
}





        // <div className="contain  top-0 flex  justify-between">
            {/* <div className="sidebar  w-[20%]">
            </div> */}
            {/* {opensettings ?<div className="pernpop w-full z-10 h-full justify-center flex items-center absolute">
                            <div className="bgopaci absolute top-0 opacity-90 left-0 w-full h-full  min-w-full  bg-[#463573] " onClick={() => setopensettings(!opensettings)}></div>
                        <div className="popupsettings absolute z-10 bg-white w-[700px] h-[600px] rounded-[18px]">
                            <div className="closebtn w-full p-8">

                                <button className="text-[23px] flex justify-end text-[#000] " onClick={() => setopensettings(!opensettings)}>X</button>
                            </div>
                        </div>

                    </div>:null}
            {openfriends ?<div className="pernpop w-full z-10 h-full justify-center flex items-center absolute">
                    <div className="bgopaci absolute top-0 opacity-90 left-0 w-full h-full  min-w-full  bg-[#463573] " onClick={() => setopenfriends(!openfriends)}></div>
                <div className="popupsettings absolute z-10 bg-white w-[700px] h-[600px] rounded-[18px]">
                    <div className="closebtn w-full flex justify-end p-8">
                        <button className="text-[23px] text-[#000] " onClick={() => setopenfriends(!openfriends)}>X</button>

                    </div>
                </div>

            </div>:null} */}
                    
                {/* <div className="nav w-[20%] absolut top-0 xl:block hidden  left-0">
                <Sidebar/>
                </div> */}
            {/* <div className="contentss lg:w-full   absolute  h-full  border  border-red-300  flex 2xl:justify-center justify-end  ">
                <div className="centere w-[80%]  flex flex-col justify-center items-center border px-20 min-w-[800px] max-w-[1400px] border-red-300  ">

                <Useravatar avata={avatar} userid={currnetdispayname} />
                <br />
                <Infouser avatar={avatar} userid={username} displayname={currnetdispayname} />
                <br />
                <br />
                <div className="infogame relative h-[600px] border border-red-300 w-full max-w-[1000px] min-w-[1000px] ">
                    <div className="overlay rounded-[30px] h-[600px]  w-full relative opacity-50 bg-[#3d2c6bbe]"></div>
                    <div className="allbtn absolute top-0 w-full h-[95px] flex items-center ">
                    <div className="overlay relative rounded-[30px]  top-0 w-full h-[95px] flex items-center opacity-50 bg-[#644dad]"></div>
                        <div className="menu absolute w-full px-8 flex justify-between">
                            <div className="firstbtn flex">
                                <h1 onClick={() => setview_history(false)} style={{background:view_history?"#5d48a3db":"#705bb1"}} className="text-[25px] font-bold w-[240px]  py-4 rounded-[19px] bg-[#705bb1] text-[#cec0fb] flex justify-center  cursor-pointer">Overview</h1>
                                <h1 onClick={() => setview_history(true)} style={{background:view_history?"#705bb1":"#5d48a3db"}} className="text-[25px] font-bold w-[240px] mx-3 py-4 rounded-[19px] bg-[#5d48a3db] text-[#cec0fb] flex justify-center  cursor-pointer">Match History</h1>
                                <h1 onClick={() => setopenfriends(!openfriends)} className="text-[25px] font-bold w-[240px] mx-3 py-4 rounded-[19px] bg-[#5d48a3db] text-[#cec0fb] flex justify-center  cursor-pointer">Friends</h1>
                            </div>
                        <h1 onClick={() => setopenfriends(!openfriends)} className={`text-[25px] font-bold w-[220px] mx-3 py-4 rounded-[19px] bg-[#5d48a3db] text-[#3f2d70] flex justify-center  cursor-pointer ${styles.btnsettings} `}>Settings</h1>
                        </div>
                    </div>
                    {view_history ? null :<Overview />}
                    
                </div>
                </div>
            </div> */}
        // </div>