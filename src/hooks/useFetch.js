import { useState, useEffect } from 'react'

const BASE_URL = import.meta.env.VITE_API_URL

function useFetch(endpoint = null) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(endpoint !== null)

  // GET — ambil data saat mount (hanya jika endpoint diberikan)
  useEffect(() => {
    if (!endpoint) return
    fetch(`${BASE_URL}${endpoint}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
  }, [endpoint])

  // POST
  async function post(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return res.json()
  }

  // PUT
  async function put(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return res.json()
  }

  // DELETE
  async function del(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
    })
    return res.json()
  }

  return { data, loading, post, put, del }
}

export default useFetch
