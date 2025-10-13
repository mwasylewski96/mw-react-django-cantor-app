import { Card } from "@mui/material";

const MainCard = ({children, maxWidth}) => {
    return <Card 
        sx={{
            width: "90%",
            maxWidth: maxWidth,
            boxShadow: 4,
            borderRadius: 3,
            p: 2,
            mt: 5,
            mb: 5,
            backgroundColor: "#fff",
          }}
    >{children}</Card>
}

export default MainCard;