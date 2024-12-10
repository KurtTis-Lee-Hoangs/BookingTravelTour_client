import React, { useEffect } from "react";
import "./about.css";
import ScrollButton from "../../shared/ScrollButton";
import logo from "../../assets/images/logo4.jpg";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="about mb-4 mt-3">
      <div className="section-header mb-4">
        <h2>About TisTrips</h2>
        <img src={logo} alt="" />
      </div>

      <div className="content">
        <div className="info">
          <h4>1. We are TisTrips</h4>
          <p>
            TisTrips.com is the official product of TisTrips Travel and Service
            LLC.
          </p>
          <p>
            With a passion for travel and exploration, we have come together to
            build a website – a place where customers can easily choose
            memorable vacations for themselves and their loved ones. TisTrips
            curates tours, hotels, and partners with airlines to provide the
            most diverse and best services for travelers.
          </p>
        </div>

        <div className="info">
          <h4>2. Why choose us?</h4>
          <p>
            We want travelers to enjoy quality travel services through the real
            experiences of our enthusiastic, dedicated, and professional team at
            TisTrips.
          </p>
          <div className="features-grid">
            <div className="feature">
              <div className="icon">
                <i class="ri-copper-diamond-line" alt="Professional team"></i>
              </div>
              <h5>Professional, dedicated team</h5>
              <p>
                We have an experienced and dedicated team, always listening to
                customer queries and feedback via hotline and continuously
                connected fanpage.
              </p>
            </div>

            <div className="feature">
              <div className="icon">
                <i class="ri-star-line" alt="Diverse products"></i>
              </div>
              <h5>Diverse products</h5>
              <p>
                On our website, travelers can easily find detailed information
                about tours, including schedules and destinations.
              </p>
            </div>

            <div className="feature">
              <div className="icon">
                <i
                  class="ri-money-dollar-circle-line"
                  alt="Attractive prices"
                ></i>
              </div>
              <h5>Attractive prices</h5>
              <p>
                TisTrips is committed to offering quality services at the best
                prices. We believe that the costs you pay are completely worth
                it.
              </p>
            </div>

            <div className="feature">
              <div className="icon">
                <i
                  class="ri-git-repository-private-line"
                  alt="Data security"
                ></i>
              </div>
              <h5>Data security</h5>
              <p>
                We ensure that all personal information of customers will be
                kept strictly confidential.
              </p>
            </div>
          </div>
        </div>

        <div className="info">
          <h4>3. Our services</h4>
          <p>
            TisTrips offers a wide range of travel services to give travelers
            many options:
          </p>
          <ul>
            <p>Domestic and international tours.</p>
            <p>Check the weather at your desired destination.</p>
            <p>Add tours to your favorites and leave reviews for them.</p>
            <p>Book rooms at different hotels.</p>
            <p>Review tour order information and payment status (paid or canceled).</p>
          </ul>
          <p>
            In addition, we will soon offer more services such as high-quality
            car rentals, tour guides, visas, and train tickets, making travel
            more comfortable and convenient for our customers.
          </p>
        </div>

        <div className="info">
          <h4>4. Our Partners</h4>
          <p>
            To build a fast and powerful website system that provides the best
            services to our customers, TisTrips would like to thank our partners
            who have supported and accompanied us:
          </p>
          <div className="partners">
            <a
              className="partner"
              href="https://www.facebook.com/profile.php?id=100028798721439"
            >
              <div className="partner-logo">
                <img
                  src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1730600707~exp=1730604307~hmac=63d2ed023c4a722f90f9c59a0417ca2eba185a3b9323bf93f4a6ff988c6bd6d7&w=740"
                  alt="FARES Logo"
                />
              </div>
              <div className="partner-info">
                <h5>LÊ MINH HOÀNG</h5>
                <p className="partner-category">
                  Software Technology - Frontend
                </p>
                <p>
                  Le Minh Hoang is a Frontend developer specializing in creating
                  optimized, user-friendly web interfaces. With experience in
                  HTML, CSS, JavaScript, and modern frameworks like React, he
                  always prioritizes user experience. He also plays an active
                  role in handling and optimizing application performance to
                  deliver high-quality products that meet customer requirements.
                </p>
              </div>
            </a>

            <a
              className="partner"
              href="https://www.facebook.com/nhanhhuynh244"
            >
              <div className="partner-logo">
                <img
                  src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1730600707~exp=1730604307~hmac=63d2ed023c4a722f90f9c59a0417ca2eba185a3b9323bf93f4a6ff988c6bd6d7&w=740"
                  alt="Zestif Logo"
                />
              </div>
              <div className="partner-info">
                <h5>HUỲNH HỮU NHÂN</h5>
                <p className="partner-category">
                  Software Technology - Backend
                </p>
                <p>
                  Huynh Huu Nhan is an outstanding Backend developer,
                  specializing in system architecture solutions and data
                  processing. With experience working on platforms such as
                  Node.js, Python, and NoSQL databases, he has contributed to
                  developing many leading blockchain products, delivering great
                  value to enterprise clients.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="info contact-us">
          <h4>5. Contact Us</h4>
          <div className="contact-card">
            <h5>
              TIS TRIPS TRAVEL AND SERVICE COMPANY LIMITED
              <br />
              {/* <span>TISTRIPS TRAVEL AND SERVICE COMPANY LIMITED</span> */}
            </h5>
            <p>Tax ID: 1111111111</p>
            <p>Business license number: 1111111111</p>
            <p>
              Issued by: Department of Planning and Investment, Ho Chi Minh City
            </p>
            <p>
              <strong>Address:</strong> 1 Võ Văn Ngân, Linh Chiểu Ward, Thu Duc
              City, Ho Chi Minh City
            </p>
            <p>
              <strong>Phone:</strong> 0386343954
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:minhhoangle031211@gmail.com">
                minhhoangle031211@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <ScrollButton />
    </section>
  );
};

export default About;
