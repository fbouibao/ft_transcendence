import Head from 'next/head'
import styles from '../../styles/chat/Layout.module.css'
import NavBar from '../../components/utils/Navbar'
import { io } from "socket.io-client";
import ListView from '../../components/chat/ListView'
import ChatView from '../../components/chat/ChatView'
import Sidebar from '../../components/profile/Sidebar'
import { useRouter } from 'next/router'

// import localStorage from 'localStorage';

let token = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('access_token');

}

let backendHost = process.env.NEXT_PUBLIC_API_BASE_URL;


// let socket = io('http://localhost:8080', { transports: ['websocket'], auth: {
//   token: token
// }});
const URL = "http://localhost:8080/chat";
let socket = io(URL, {
  withCredentials: true,
  forceNew: true,
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ['websocket'],
  auth: {
    token: token,
  },
});
export { socket };




function Layout() {


  return (
    <div className="homepage w-full h-screen min-w-full relative">
      <img src="/profile/bg.png" className="  w-full h-full min-w-full " alt="" />
      <div className="bgopaci absolute top-0 opacity-90 left-0 w-full h-full  min-w-full  bg-[#463573] "></div>
      <div className="contain absolute top-0 w-full h-screen flex justify-between">
        <Sidebar />
        <div className={styles.layout}>
          <ListView />
          <ChatView />
        </div>
      </div>
    </div>
  );
}

function Chat() {

  const router = useRouter()
  const { chat } = router.query
  console.log("query =", chat);

  if (chat != '0' && chat != undefined) {
    socket.emit('getPrivateMsg', { user: chat });
    socket.emit('conversation');
  }

  return (
    <div>
      <Head>
        <title>Chat</title>
      </Head>
      <Layout />
    </div>
  );
}

export default Chat;