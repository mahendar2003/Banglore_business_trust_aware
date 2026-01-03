export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About TrustScore</h3>
            <p className="text-gray-400 text-sm">
              Building trust between customers and businesses in Bangalore through transparent analytics and relationship scoring.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Coverage Areas</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Whitefield • Indiranagar • BTM Layout</li>
              <li>Electronic City • HSR Layout</li>
              <li>Marathahalli • KR Puram • Yelahanka</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              For partnerships and inquiries:<br />
              hello@trustscoreblr.in
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2024 TrustScore Bangalore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}