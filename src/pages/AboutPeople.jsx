function AboutPeople() {
  const team = [
    { name: "Alice Johnson", role: "CEO & Founder", emoji: "👩‍💼" },
    { name: "Bob Smith", role: "CTO", emoji: "👨‍💻" },
    { name: "Carol Davis", role: "Lead Designer", emoji: "🎨" },
    { name: "David Wilson", role: "Senior Developer", emoji: "⚡" }
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-green-600">Our People</h2>
      <p className="text-gray-600 mb-6">
        Meet the amazing team that makes everything possible!
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {team.map((person, index) => (
          <div key={index} className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{person.emoji}</span>
              <div>
                <h3 className="font-semibold text-green-800">{person.name}</h3>
                <p className="text-green-600 text-sm">{person.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        📍 URL: /about/people - This is also a nested route!
      </p>
    </div>
  )
}

export default AboutPeople