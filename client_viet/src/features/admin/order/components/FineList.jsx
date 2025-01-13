import { List, ListItem, ListItemText } from "@mui/material";
import Utils from "@utils/Utils";

function FineList({ items, handleDelete, handleOpenUpdate }) {
  return (
    <>
      {items && items.length > 0 && (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {items.map(
            (item) =>
              item.ma_phi_phat != 0 && (
                <ListItem
                  key={item.ma_phi_phat}
                  style={{ width: "40%", position: "relative" }}
                >
                  <ListItemText
                    onClick={() => handleOpenUpdate(item)}
                    style={{
                      backgroundColor: "#BBC0FF",
                      borderRadius: "10px",
                      padding: "5px",
                      cursor: "pointer",
                      paddingLeft: "5px",
                    }}
                    primary={item.ly_do_phat}
                    secondary={Utils.convertToVND(item.tien_phat)}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      padding: "0 auto",
                      display: "inline-block",
                      width: "24px",
                      height: "24px",
                      textAlign: "center",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleDelete(item)}
                  >
                    x
                  </span>
                </ListItem>
              )
          )}
        </List>
      )}
    </>
  );
}

export default FineList;
