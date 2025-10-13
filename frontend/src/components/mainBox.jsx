import { Box } from "@mui/material"

const MainBox = ({ children }) => {
    return <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f0f2f5" }}
      >
        {children}
      </Box>
}

export default MainBox;