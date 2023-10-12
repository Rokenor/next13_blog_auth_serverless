import './globals.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import TopNav from '@/components/TopNav'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Next13 blog',
  description: 'Next13 blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <TopNav />
        {children}
      </body>
    </html>
  )
}
