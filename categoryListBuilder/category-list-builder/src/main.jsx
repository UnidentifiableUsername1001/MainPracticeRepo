import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CategoryManager from './CategoryManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryManager />
  </StrictMode>,
)
