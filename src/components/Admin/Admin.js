import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./admin.css";
import UsersTable from "./UsersTable/UsersTable";
import ToursTable from "./ToursTable/ToursTable";
import BlogsTable from "./BlogsTable/BlogTable";
import HotelsTable from "./HotelsTable/HotelTable";
import BookingTable from "./BookingsTable/BookingTable";
import Statistical from "./Statistical/Statistical";
import NewSletter from "../../shared/NewSletter";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const { user } = useContext(AuthContext);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="d-flex mt-4 scrollbar__none">
        {/* Sidebar */}
        <Col lg="2" md="2" sm="2" className="sidebar">
          <div className="d-flex align-items-center mt-3 mb-3">
            <img
              src={user.avatar}
              alt="User Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "15px",
                marginLeft: "25px",
              }}
            />
            <h3 className="sidebar-title text-center">Admin</h3>
          </div>
          <ul className="sidebar-menu">
            <li>
              <Button
                className="btn primary__btn manage__btn d-flex align-items-center"
                onClick={() => handleTabClick("users")}
              >
                <i class="ri-user-settings-fill icon"></i>
                Manage users
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn d-flex align-items-center"
                onClick={() => handleTabClick("tours")}
              >
                <i class="ri-ancient-gate-fill icon"></i>
                Manage tours
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn d-flex align-items-center"
                onClick={() => handleTabClick("blogs")}
              >
                <i class="ri-edit-box-fill icon"></i>
                Manage blogs
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn d-flex align-items-center"
                onClick={() => handleTabClick("hotels")}
              >
                <i class="ri-hotel-fill icon"></i>
                Manage hotels
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn d-flex align-items-center"
                onClick={() => handleTabClick("bookings")}
              >
                <i class="ri-wallet-fill icon"></i>
                Manage bookings
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn d-flex align-items-center"
                onClick={() => handleTabClick("statistical")}
              >
                <i class="ri-line-chart-fill icon"></i>
                Revenue statistics
              </Button>
            </li>
          </ul>
        </Col>

        {/* Content */}
        <Col lg="10" md="9" sm="5" className="content">
          {activeTab === "users" && (
            <div>
              <h2 className="text-center mb-4">
                Manage user accounts in the system
              </h2>
              <UsersTable />
            </div>
          )}
          {activeTab === "tours" && (
            <div>
              <h2 className="text-center mb-4">Manage tour in the system</h2>
              <ToursTable />
            </div>
          )}
          {activeTab === "blogs" && (
            <div>
              <h2 className="text-center mb-4">Manage blogs in the system</h2>
              <BlogsTable />
            </div>
          )}
          {activeTab === "hotels" && (
            <div>
              <h2 className="text-center mb-4">Manage hotels in the system</h2>
              <HotelsTable />
            </div>
          )}
          {activeTab === "bookings" && (
            <div>
              <h2 className="text-center mb-4">
                Manage bookings in the system
              </h2>
              <BookingTable />
            </div>
          )}
          {activeTab === "statistical" && (
            <div>
              <h2 className="text-center mb-4">Revenue management</h2>
              <Statistical />
            </div>
          )}
        </Col>
      </div>

      {/* <NewSletter /> */}
    </>
  );
};

export default Admin;
