import react from "react";
import './index.css';

const Contact = () => {
    return (
        <div className="contact">
            <section className="hero-section">
                <h1>Contact Us</h1>
                <p>Get in touch with Ezysign for any queries or support.</p>
            </section>


            <section className="contact-section">
                <img className="contact-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Ly_XkufkFDyXcVNhvXaeQyXLrXJcfGbxNg&s" alt="Contact" />
                <div className="contact-details">
                    <h2>Reach Out to Us</h2>
                    <p>Email: support@ezysign.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Digital Street, Tech City</p>
                </div>
            </section>


            <section className="card-section">
                <div className="card1">
                    <h3>24/7 Support</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqBGTcwjqO17F8NGnvmihBz8A2cSi8xZkVag&s" alt="" />
                    <p>Our team is available round the clock to assist you.</p>
                </div>
                <div className="card2">
                    <h3>Secure Communication</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjKaJL8OGyzxN34NZC_-KSwj8THUJxd46UQ&s" alt="" />
                    <p>All your queries are handled with top-level security.</p>
                </div>
                <div className="card3">
                    <h3>Business Inquiries</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGLsWs5zIXZ3hdR9XgRcM4R6lqBTvwlXT5Q&s" alt="" />
                    <p>Connect with us for partnership opportunities.</p>
                </div>
            </section>
        </div>
    )
}
export default Contact;