import { useEffect, useState } from "react";

function App (){
  const[state,setstate] = useState(0)

  useEffect(()=>{
    let timer=setTimeout(() => {
      setstate(state+1)
    }, 1000);

    return () => {
      clearTimeout(timer)
    }
  },[])

  


return(
  <div>
    <div>
      Running: {state}
    </div>
    
    </div>
)

}

export default App