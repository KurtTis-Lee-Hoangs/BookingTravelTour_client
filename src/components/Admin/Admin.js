import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UsersTable from "./UsersTable/UsersTable";
import RestoreUsers from "./RestoreDeleted/RestoreUsers";
import ToursTable from "./ToursTable/ToursTable";
import RestoreTours from "./RestoreDeleted/RestoreTours";
import BlogsTable from "./BlogsTable/BlogTable";
import RestoreBlogs from "./RestoreDeleted/RestoreBlogs";
import HotelsTable from "./HotelsTable/HotelTable";
import RestoreHotels from "./RestoreDeleted/RestoreHotels";
import BookingTable from "./BookingsTable/BookingTable";
import Statistical from "./Statistical/Statistical";
import HotelStatistical from "./HotelStatistical/HotelStatistical";
import { BASE_URL } from "../../utils/config";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Manage users");
  const [openSections, setOpenSections] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const handleOpenLogoutDialog = () => setOpenLogoutDialog(true);
  const handleCloseLogoutDialog = () => setOpenLogoutDialog(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleHomePageClick = () => {
    navigate("/homepage");
  };

  const logout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/sign-out`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error during logout:", result.message);
        alert(result.message || "Logout failed. Please try again.");
      } else {
        // Clear user data and redirect to homepage
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Manage users":
        return <UsersTable />;
      case "Restore users":
        return <RestoreUsers />;
      case "Manage tours":
        return <ToursTable />;
      case "Restore tours":
        return <RestoreTours />;
      case "Manage blogs":
        return <BlogsTable />;
      case "Restore blogs":
        return <RestoreBlogs />;
      case "Manage hotels":
        return <HotelsTable />;
      case "Restore hotels":
        return <RestoreHotels />;
      case "Manage bookings":
        return <BookingTable />;
      case "Tour statistics":
        return <Statistical />;
      case "Hotel statistics":
        return <HotelStatistical />;
      default:
        return null;
    }
  };

  const getListItemStyles = (tab) => ({
    backgroundColor: activeTab === tab ? "#ff7e01" : "transparent", // Active color
    color: activeTab === tab ? "#fff" : "#ccc",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: activeTab === tab ? "#ff7e01" : "#faa935", // Hover color
    },
  });

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          backgroundColor: "#333",
          color: "#fff",
          boxShadow: 3,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "#fff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box p={2} display="flex" alignItems="center">
          <img
            src={user.avatar}
            alt="User Avatar"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />
          <Typography variant="h6">Admin</Typography>
        </Box>
        <List>
          <ListItem
            button
            onClick={handleHomePageClick}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="Home Page" />
          </ListItem>

          {/* User Section */}
          <ListItem
            button
            onClick={() => toggleSection("User")}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="User" />
            {openSections.User ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.User} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleTabClick("Manage users")}
                sx={{ ...getListItemStyles("Manage users"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Manage users" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTabClick("Restore users")}
                // sx={getListItemStyles("Restore users")}
                sx={{ ...getListItemStyles("Restore users"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Restore users" />
              </ListItem>
            </List>
          </Collapse>

          {/* Tour Section */}
          <ListItem
            button
            onClick={() => toggleSection("Tour")}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="Tour" />
            {openSections.Tour ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.Tour} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleTabClick("Manage tours")}
                // sx={getListItemStyles("Manage tours")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Manage tours"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Manage tours" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTabClick("Restore tours")}
                // sx={getListItemStyles("Restore tours")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Restore tours"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Restore tours" />
              </ListItem>
            </List>
          </Collapse>

          {/* Blog Section */}
          <ListItem
            button
            onClick={() => toggleSection("Blog")}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="Blog" />
            {openSections.Blog ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.Blog} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleTabClick("Manage blogs")}
                // sx={getListItemStyles("Manage blogs")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Manage blogs"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Manage blogs" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTabClick("Restore blogs")}
                // sx={getListItemStyles("Restore blogs")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Restore blogs"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Restore blogs" />
              </ListItem>
            </List>
          </Collapse>

          {/* Hotel Section */}
          <ListItem
            button
            onClick={() => toggleSection("Hotel")}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="Hotel" />
            {openSections.Hotel ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.Hotel} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleTabClick("Manage hotels")}
                // sx={getListItemStyles("Manage hotels")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Manage hotels"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Manage hotels" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTabClick("Restore hotels")}
                // sx={getListItemStyles("Restore hotels")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Restore hotels"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Restore hotels" />
              </ListItem>
            </List>
          </Collapse>

          {/* Statistics Section */}
          <ListItem
            button
            onClick={() => toggleSection("Statistics")}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="Statistics" />
            {openSections.Statistics ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSections.Statistics} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleTabClick("Manage bookings")}
                // sx={getListItemStyles("Manage bookings")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Manage bookings"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Manage bookings" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTabClick("Tour statistics")}
                // sx={getListItemStyles("Tour statistics")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Tour statistics"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Tour statistics" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTabClick("Hotel statistics")}
                // sx={getListItemStyles("Hotel statistics")} // Sử dụng getListItemStyles
                sx={{ ...getListItemStyles("Hotel statistics"), pl: 4 }} // Sử dụng getListItemStyles
              >
                <ListItemText primary="Hotel statistics" />
              </ListItem>
            </List>
          </Collapse>

          {/* Logout */}
          <ListItem
            button
            onClick={handleOpenLogoutDialog}
            sx={{ padding: "10px 20px" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {/* Dialog confirm */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out of your account?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseLogoutDialog();
              logout();
            }}
            color="primary"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {activeTab === "Manage users" && "Manage user accounts in the system"}
          {activeTab === "Restore users" && "Manage deleted user accounts"}
          {activeTab === "Manage tours" && "Manage tours in the system"}
          {activeTab === "Restore tours" && "Manage deleted tours"}
          {activeTab === "Manage blogs" && "Manage blogs in the system"}
          {activeTab === "Restore blogs" && "Manage deleted blogs"}
          {activeTab === "Manage hotels" && "Manage hotels in the system"}
          {activeTab === "Restore hotels" && "Manage deleted hotels"}
          {activeTab === "Manage bookings" && "Manage bookings in the system"}
          {activeTab === "Tour statistics" && "Revenue management"}
          {activeTab === "Hotel statistics" && "Hotel booking statistics"}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Admin;
