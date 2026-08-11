import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
// import dari named xport
// import { Heading } from './components/heading'
import Heading from './components/heading'
import { LESSON_TODAY } from './constant'


function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [selected, setSelected] = useState('a')
  const materi = 'dibimbing'

  const showingAlert = () => {
    setCount((count) => count + 1)
    alert('halo')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(name === '') {
      alert('ga ada nama!')
      return;
    }

    alert('nama kamu ' + name)
  }

  const onReset = () => {
    setName('')
    setSelected('a')
  }

  const [isDark, setIsDark] = useState(false)

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=> {
    console.log('running')
  }, [isDark, count])

  useEffect(()=> {
    const timer = setInterval(() => {
      console.log('tik')
    }, 1000)

    return () => {
      clearInterval(timer);
    }
  }, [])

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data)
  //     })
  //     .catch((err) => {
  //       setError(err.message)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  function fetchingUsers(userId) {
    return new Promise((resolve, reject) => {
      console.log("fetch users");

      setTimeout(() => {
        if(userId > 0) {
          resolve({id: userId, name: "andika"})
        } else {
          reject({message: "user not found"})
        }
      }, 2000)
    })
  }

  useEffect(() => {
    async function fetchUser(userId) {
      try {
        const response = await fetchingUsers(userId)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser(0)
  }, [])


  return (
    <>
      <Heading title='halo-1' description='ini deskripsi' onShowAlert={showingAlert}  />
      <Heading title='halo-2' />
      <Heading title='halo-3' />

      <form onSubmit={onSubmit}>
        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <select onChange={(e) => setSelected(e.target.value)} value={selected}>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </select>
        
        <button type="submit">submit</button>
        <button type="reset" onClick={onReset}>cancel</button>
      </form>


      <p style={{color: 'red'}} className="text-4xl text-blue-500">hello {materi} {LESSON_TODAY} {name}</p>
      {/* template literal */}
      <p>{`hello ${materi}`} pilihanku {selected}</p>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    

      {/* show use tailwind */}
      {/* <div className="bg-red-400 p-10 rounded-2xl text-white text-2xl"> */}
      <div className={`${isDark ? 'bg-red-200' : 'bg-red-400'} p-10 rounded-2xl text-white text-2xl`}>
        <p>lorem</p>
      </div>

      <h2 className="text-2xl font-bold mt-5">User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.name} - {user.email}
          </li>
        ))}
        {users.map((user) => {
          const name = `nama user: ${user.name}`
          return (
            <li key={user.id} className="p-2 border-b">
              {name} - {user.email}
            </li>
          )
        })}
      </ul>

      <button
        onClick={()=> setIsDark(!isDark)}
        className="bg-blue-500 cursor-pointer hover:bg-blue-700 p-5 text-sm text-white rounded-2xl"
      >
          click to change bg
      </button>
    
    </>
  )
}

export default App
