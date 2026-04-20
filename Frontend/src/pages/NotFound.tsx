import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-12 mt-15">
       <p className="text-8xl font-semibold"> 404 Not Found </p>
        <p className="text-xs">Your visited page not Found. You may go to home page</p>
        <button className="bg-red-600 px-8 py-3 text-white rounded-sm">
           <Link to='/' className="text-xs">Back to Homepage</Link>
        </button>
    </div>
  )
}

export default NotFound