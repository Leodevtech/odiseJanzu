import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './global.css'
import { AuthProvider } from '@/context/AuthContext'
import BootstrapClient from '@/components/BootstrapClient'
 
export const metadata = {
  title: 'Ô di Sé Janzu – Voyage aquatique',
  description: 'Un voyage sensoriel unique',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  )
}
 