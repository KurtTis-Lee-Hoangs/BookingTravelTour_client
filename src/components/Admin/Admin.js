import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./admin.css";
import UsersTable from "./UsersTable/UsersTable";
import ToursTable from "./ToursTable/ToursTable";
import PostsTable from "./PostsTable/PostTable";
import BookingTable from "./BookingsTable/BookingTable";
import NewSletter from "../../shared/NewSletter";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <Container fluid>
          <Row className="mt-5">
            {/* Sidebar */}
            <h2 className="text-center mb-4">Admin Panel</h2>
            <Col lg="2" md="3" className="sidebar">
              <h3 className="sidebar-title text-center">Manage</h3>
              <ul className="sidebar-menu">
                <li>
                  <Button
                    className="btn primary__btn"
                    onClick={() => handleTabClick("users")}
                  >
                    All users
                  </Button>
                </li>
                <li>
                  <Button
                    className="btn primary__btn"
                    onClick={() => handleTabClick("tours")}
                  >
                    All tours
                  </Button>
                </li>
                <li>
                  <Button
                    className="btn primary__btn"
                    onClick={() => handleTabClick("posts")}
                  >
                    All posts
                  </Button>
                </li>
                <li>
                  <Button
                    className="btn primary__btn"
                    onClick={() => handleTabClick("bookings")}
                  >
                    All bookings
                  </Button>
                </li>
              </ul>
            </Col>

            {/* Content */}
            <Col lg="9" md="9" className="content">
              {activeTab === "users" && (
                <div>
                  {/* <h2>Users List</h2>
                  <p>Here you can manage users (Add, Delete, Create, Update)</p> */}
                  <UsersTable />
                </div>
              )}
              {activeTab === "tours" && (
                <div>
                  {/* <h2>Tours List</h2>
                  <p>Here you can manage tours.</p> */}
                  <ToursTable />
                </div>
              )}
              {activeTab === "posts" && (
                <div>
                  {/* <h2>Posts</h2>
                  <p>Here you can manage posts (Add, Delete, Create, Update)</p> */}
                  <PostsTable />
                </div>
              )}
              {activeTab === "bookings" && (
                <div>
                  {/* <h2>Bookings</h2>
                  <p>
                    Here you can manage bookings (Add, Delete, Create, Update)
                  </p> */}
                  <BookingTable />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <NewSletter />
    </>
  );
};

export default Admin;
