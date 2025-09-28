import { useState, useCallback, useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charactersAllowed, setcharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const generatepassword = useCallback( ()=>{
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(numberAllowed) chars += '0123456789'
    if(charactersAllowed) chars += '!@#$%&*_~'
    let pass = ''
    for(let i=0; i<length; i++){
      const randomIndex = Math.floor(Math.random() * chars.length)
      pass += chars[randomIndex]
    }
    setPassword(pass)
  }, [length, numberAllowed, charactersAllowed, setPassword])

  // generatepassword()
  // console.log(password);
  const passRef=useRef()
  const copytoclip= useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 99); 
    window.navigator.clipboard.writeText(password)

  } ,[password])




  useEffect(()=>{
    generatepassword()
  }, [length, numberAllowed, charactersAllowed, generatepassword])

  return (
    <>
     <div className="min-h-screen w-full bg-black relative">
    {/* Deep Ocean Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
         "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)"
      }}
    />
  {/* Your Content/Components */}
  <div className="relative z-10 text-white p-8">
    <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Password Generator</h1>
    <p className="mb-8 text-center">Generate secure passwords with our easy-to-use tool.</p>
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"> 
      {/* Form Container */}
      <div className="mb-4 flex items-center gap-1">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full p-2 border border-gray-600 rounded bg-amber-50 text-black"
          placeholder="Your Generated Password"
           useRef={passRef}
        />
        <button onClick={copytoclip()} className='bg-blue-500 text-white px-4 py-2 rounded'>Copy</button>
      </div>
      <div className="mb-4 flex flex-col gap-4">
        <div className='flex items-center gap-2'>
          <input type="range" min="8" max="32"
           value={length}
           onChange={(e)=>setLength(e.target.value)}
            className="w-1/2 cursor-pointer"
           

          />
          <label htmlFor="length">Password Length: {length}</label>
        </div>




        <div className='flex items-center gap-2'><input type="checkbox"  id="numbers"
        defaultChecked={numberAllowed}
        onChange={()=>setNumberAllowed((prev)=>!prev)}/>
        <label htmlFor="numbers">Include Numbers</label></div>



        <div className='flex items-center gap-2'>
          <input type="checkbox" name="" id="characters"
        defaultChecked={charactersAllowed}
        onChange={()=>setcharacterAllowed((prev)=>!prev)}/>
        <label htmlFor="characters">Include Special Characters</label></div>



      </div>





    </div>
  </div>
</div>
    </>
  )
}

export default App
