import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import './styles/global.scss'
import Footer from './components/structure/Footer'
import Header from './components/structure/Header'
import Home from './pages/Home'
import NotFound from './pages/404'

function App() {

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</Router>
			<Footer />
		</ThemeProvider>
	)
}

export default App
