import { RouterPage } from "./pages/RouterPage"
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./context/UIProvider";
import { SocketProvider } from "./context/SocketProvider";


function App() {

  return (
    <SocketProvider>
      <UIProvider>
        <BrowserRouter>
          <RouterPage />
        </BrowserRouter>
      </UIProvider>
    </SocketProvider>
  )
}

export default App
