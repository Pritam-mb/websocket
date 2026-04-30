import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Loading from './components/loading'

function App() {
  // const [products,error,loading,search,setSearch] = useReactquery()
  const [products, setproducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
    const [search,setSearch] = useState('wood');

  useEffect(() => {
    const controller = new  AbortController()
    ;(
      async ()=>{
        try {
          setLoading(true)
          setError(false)
          const response = await axios.get('/api/products?search=' + search ,{
            signal: controller.signal
          }
)
          console.log("Response from API:", response.data);
          
          
            setproducts(response.data)
            setLoading(false)
        } catch (error) {
          if(axios.isCancel(error)){
            console.log(error.message);
            return;
          }
          setLoading(false)
          setError(true)
        } finally {
        setLoading(false);
      }
        
        
      }
    )(
    )
    return ()=>{
      controller.abort()
    }
  },[search])
  // if(loading){
  //   return  <h1><Loading/></h1>
    
  // }
  // if(error){
  //   return <h1>Error fetching products</h1>
  // }
  return (
    <>
     <h1>Rengoku is GOAt</h1>
     <input type="text" 
     value={search}
     onChange={(e)=> setSearch(e.target.value)}/>
     {loading && <Loading/>}
     <h2>the products are {products.length}</h2>
    </>
  )
}

export default App

// const useReactquery =()=>{
   
// return[
//   products,
//   error,
//   loading,
//   search,
//   setSearch
// ]
// }
