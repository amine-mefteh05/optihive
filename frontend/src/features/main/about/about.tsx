import React from "react";
import { MdEmail } from "react-icons/md";
function About() {
  return (
    <section id="about-us" className="flex flex-col gap-5 items-center mb-10">
      <h2 className="text-4xl font-bold text-primary text-center">
        Who are we?
      </h2>
      <p className="text-center">
        We're a team of five computer science students who are passionate about
        building innovative solutions for the modern world.{" "}
      </p>
      <p className="text-foreground/60 text-center">
        we'll be gratefull for any feedback or suggestions you may have.
      </p>
      <a
        href="mailto:chihaadam137@gmail.com"
        className="flex gap-2 items-center font-bold text-2xl py-2 px-8 border border-transparent dark:border-white/20 bg-primary dark:bg-primary-hover text-foreground dark:text-background dark:shadow-lg rounded-lg cursor-pointer"
      >
        <MdEmail size={20} /> email us
      </a>
    </section>
  );
}
export default About;
