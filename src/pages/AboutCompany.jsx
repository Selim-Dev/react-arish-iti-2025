function AboutCompany() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Company</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        We are a technology company founded in 2020 with a mission to make 
        web development accessible to everyone. Our team is passionate about 
        creating innovative solutions and teaching others.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-800">Founded</h3>
          <p className="text-blue-600">2020</p>
        </div>
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-800">Headquarters</h3>
          <p className="text-blue-600">San Francisco, CA</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        📍 URL: /about/company - This is a nested route!
      </p>
    </div>
  )
}

export default AboutCompany