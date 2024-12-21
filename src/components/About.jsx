import React from "react";

const About = () => {
    return (
        <div id="About" className="about-container">

            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    At Trendify, we aim to revolutionize the way people shop online by providing a seamless
                    and personalized shopping experience. Our platform connects fashion-forward individuals
                    with the latest trends and products that match their unique style.
                </p>
            </section>

            <section className="about-section">
                <h2>What We Do</h2>
                <p>
                    Trendify offers a curated selection of trending fashion, accessories, and lifestyle products.
                    We use advanced algorithms to bring you the latest trends and make personalized recommendations
                    based on your preferences.
                </p>
            </section>

            <section className="about-section">
                <h2>Meet The Team</h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src="/assets/team-member1.jpg" alt="Team Member 1" />
                        <h3>Jane Doe</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/team-member2.jpg" alt="Team Member 2" />
                        <h3>John Smith</h3>
                        <p>Lead Developer</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/team-member3.jpg" alt="Team Member 3" />
                        <h3>Emily Clark</h3>
                        <p>Marketing Manager</p>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>Our Vision</h2>
                <p>
                    Our vision is to become the go-to platform for anyone looking for the latest in fashion and
                    lifestyle. We believe in empowering our users to express themselves through their clothing choices
                    and offering them a convenient, online shopping experience.
                </p>
            </section>


        </div>
    );
};

export default About;
