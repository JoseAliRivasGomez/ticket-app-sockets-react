import { useState } from "react"
import { UIContext } from "./UIContext";


export const UIProvider = ({children}) => {

    const [ocultarMenu, setOcultarMenu] = useState(false);

    const showMenu = () => {
        setOcultarMenu(false);
    }

    const hideMenu = () => {
        setOcultarMenu(true);
    }

    return (
        <UIContext.Provider value={{
            ocultarMenu,
            showMenu,
            hideMenu
        }}>
            {children}
        </UIContext.Provider>
    )
}
