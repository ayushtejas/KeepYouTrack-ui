
import { getUser } from "./api/auth";



export default function Home() {
  getUser().then(()=>{

      }).catch(()=>{
        window.location.href='/auth'
        localStorage.removeItem("token")
      })
  return (
    <>

    </>
  );
}
