import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// import { mirage } from "./services/mirage"
import App from "./App"

// mirage()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
