import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AlertNotif = ({stock, setNoerror}) => {

  return (
    <Box sx={{ width: "100%" }}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setNoerror(true);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity="error"
      >
        Il ne reste que {stock} tshirts disponibles. Veuillez ajuster votre
        commande et/ou votre panier.
      </Alert>
    </Box>
  );
};

export default AlertNotif;
