const Contact = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
    <div className="bg-white shadow-md rounded-lg p-6">
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
          <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
          <textarea id="message" rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Send Message</button>
      </form>
    </div>
  </div>
);

export default Contact;