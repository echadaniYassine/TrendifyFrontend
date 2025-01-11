import React from "react";
import '../../styles/components/about.css';

const About = () => {
    return (
        <div id="About" className="about-container">
            {/* About Section */}
            <div className="about-txt-img">
                <div className="about-content">
                    <section className="about-section">
                        <h2 className="about-heading">Our Mission</h2>
                        <p className="about-description">
                            At Trendify, we aim to revolutionize the way people shop online by providing a seamless
                            and personalized shopping experience. Our platform connects fashion-forward individuals
                            with the latest trends and products that match their unique style.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-heading">What We Do</h2>
                        <p className="about-description">
                            Trendify offers a curated selection of trending fashion, accessories, and lifestyle products.
                            We use advanced algorithms to bring you the latest trends and make personalized recommendations
                            based on your preferences.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-heading">Our Vision</h2>
                        <p className="about-description">
                            Our vision is to become the go-to platform for anyone looking for the latest in fashion and
                            lifestyle. We believe in empowering our users to express themselves through their clothing choices
                            and offering them a convenient, online shopping experience.
                        </p>
                    </section>
                </div>
                <div className="about-image">
                    <img src="/assets/about.png" alt="About Trendify" />
                </div>
            </div>

            {/* Team Section */}
            <section className="team-wrapper">
                <h2 className="team-heading">Meet The Team</h2>
                <div className="team-grid">
                    <div className="team-card">
                        <div className="team-card-content">
                            <img src="/assets/team_1.png" alt="Team Member 1" />
                            <h3 className="team-card-title">Jane Doe</h3>
                            <p className="team-card-description">Founder & CEO</p>
                        </div>
                    </div>
                    <div className="team-card">
                        <div className="team-card-content">
                            <img src="/assets/developer.png" alt="Team Member 2" />
                            <h3 className="team-card-title">John Smith</h3>
                            <p className="team-card-description">Lead Developer</p>
                        </div>
                    </div>
                    <div className="team-card">
                        <div className="team-card-content">
                            <img src="/assets/team_2.png" alt="Team Member 3" />
                            <h3 className="team-card-title">Emily Clark</h3>
                            <p className="team-card-description">Marketing Manager</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
