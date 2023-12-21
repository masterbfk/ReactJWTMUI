import { Outlet } from "react-router-dom"
import Sidebar from "../global/Sidebar"
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
import { useState } from "react";
const Layout = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}> 
                <CssBaseline />
                <div className="app">
                   <Sidebar isSidebar={isSidebar} />
                   <main className="content">
                       <Topbar setIsSidebar={setIsSidebar} />
                        <Outlet />
                    </main>
                </div>
             </ThemeProvider> 
        </ColorModeContext.Provider>
    )
}

export default Layout