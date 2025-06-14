import { Link, Outlet } from 'react-router'

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        About Us
      </h1>
      
      {/* Navigation for nested routes */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <nav className="flex justify-center space-x-4">
          <Link 
            to="/about/company"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Our Company
          </Link>
          <Link 
            to="/about/people"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Our People
          </Link>
        </nav>
      </div>
      
      {/* This is where nested components will render */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Outlet />
        
        {/* Default content when no nested route is selected */}
        <div className="text-center text-gray-600 p-8">
          <p className="text-lg">Welcome to our About section!</p>
          <p>Choose an option above to learn more about us.</p>
        </div>
      </div>
    </div>
  )
}

export default About