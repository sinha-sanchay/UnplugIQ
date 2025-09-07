import React from 'react'
import { AppLayout } from './AppLayout'

interface LayoutWrapperProps {
  children: React.ReactNode
}

/**
 * LayoutWrapper ensures authenticated pages
 * are always displayed inside the AppLayout.
 * 
 * Use this for protected routes.
 */
export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <AppLayout>
      <div className="p-8 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {children}
      </div>
    </AppLayout>
  )
}

export default LayoutWrapper
