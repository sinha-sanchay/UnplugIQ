import React from 'react'
import { AppLayout } from './AppLayout'

/**
 * Example component demonstrating how to use the AppLayout
 * Styled as a polished landing/demo page inside the layout
 */
export const LayoutExample: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary drop-shadow-sm">
            Welcome to <span className="text-primary-dark">ChallengeHub</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A platform to explore coding challenges, track progress, and sharpen your skills.
          </p>
        </div>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Responsive Sidebar</h2>
            <p className="text-gray-600">Full navigation on desktop, collapsible hamburger on mobile.</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">User Authentication</h2>
            <p className="text-gray-600">Seamless login, logout, and user profile menu.</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Challenge Filtering</h2>
            <p className="text-gray-600">Quickly filter challenges by type and difficulty.</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Consistent Layout</h2>
            <p className="text-gray-600">Unified design across all sections of the app.</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Mobile Friendly</h2>
            <p className="text-gray-600">Optimized for phones, tablets, and desktops.</p>
          </div>
          <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Adaptive Layout</h2>
            <p className="text-gray-600">Dynamic resizing for different devices.</p>
          </div>
        </section>

        {/* Responsive Behavior Section */}
        <section className="bg-gradient-to-r from-primary-light to-primary text-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Responsive Behavior</h2>
          <ul className="space-y-2 text-lg">
            <li>📌 <span className="font-medium">Desktop:</span> Full sidebar with navigation</li>
            <li>📱 <span className="font-medium">Mobile:</span> Collapsible hamburger menu</li>
            <li>💻 <span className="font-medium">Tablet:</span> Adaptive layout</li>
          </ul>
        </section>
      </div>
    </AppLayout>
  )
}

export default LayoutExample
