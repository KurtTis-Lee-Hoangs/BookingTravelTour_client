import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./admin.css";
import UsersTable from "./UsersTable/UsersTable";
import ToursTable from "./ToursTable/ToursTable";
import PostsTable from "./PostsTable/PostTable";
import BookingTable from "./BookingsTable/BookingTable";
import Statistical from "./Statistical/Statistical";
import NewSletter from "../../shared/NewSletter";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";

const Admin = () => {
  // Fetch the users data from the API
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: user
  } = useFetch(`${BASE_URL}/users`, refreshKey);
  const [activeTab, setActiveTab] = useState("users");

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
          <div className="d-flex">
            <img
              src={user.avatar}
              alt="User Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "20px"
              }}
            />
            <h3 className="sidebar-title text-center">Manage</h3>
          </div>
          <ul className="sidebar-menu">
            <li>
              <Button
                className="btn primary__btn"
                onClick={() => handleTabClick("users")}
              >
                Manage users
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn"
                onClick={() => handleTabClick("tours")}
              >
                Manage tours
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn"
                onClick={() => handleTabClick("posts")}
              >
                Manage posts
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn"
                onClick={() => handleTabClick("bookings")}
              >
                Manage bookings
              </Button>
            </li>
            <li>
              <Button
                className="btn primary__btn"
                onClick={() => handleTabClick("statistical")}
              >
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
          {activeTab === "posts" && (
            <div>
              <h2 className="text-center mb-4">Manage blogs in the system</h2>
              <PostsTable />
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

      <NewSletter />
    </>
  );
};

export default Admin;
