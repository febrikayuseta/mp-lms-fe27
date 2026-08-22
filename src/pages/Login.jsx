import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const navigate = useNavigate()

  function handleLogin() {
    onLogin()
    navigate('/dashboard')
  }

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-sm cursor-pointer transition"
      >
        Masuk sebagai user
      </button>
    </div>
  )
}

export default Login
