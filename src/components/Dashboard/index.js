import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Dash from './dash'
import Login from '../Login'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const allowedDomain = '@kiit.ac.in'
const Dashboard = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the email ends with the allowed domain
        if (
          user.email.endsWith(allowedDomain) ||
          user.email === 'its.rudraneel@gmail.com'
        ) {
          setUser(user)
        } else {
            setUser(null)
            auth.signOut();
            toast.error('Please login with college ID only');
        }
      } else {
        setUser(null)
      }
    });

    return () => unsubscribe();
  }, [auth])

  return (
    <>
      <div>
        {user ? <Dash /> : <Login />}
      </div>
      <ToastContainer />
    </>
  )
}

export default Dashboard