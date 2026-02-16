import React from "react";

export default function Page() {
  return (
    <section className="py-24 m-5 min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-5 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold">About Me</h1>
          <p className="text-(--text-muted) text-lg leading-relaxed">
            I'm Anthony, a Computer Science student at Mercy University (B.S./M.S.) who builds dependable, human-centered web experiences. I care about clarity, accessibility, and products that feel good to use.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* <div className="md:top-24 w-full md:w-[320px] shrink-0">
            <div className="rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 to-white/0">
              <img
                src="/about/"
                alt="Portrait of Anthony"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div> */}

          <div className="text-(--text-muted) text-lg leading-relaxed space-y-4">
            <p>
              I moved to the U.S. from the Dominican Republic at 10 without speaking English. That experience taught me how to learn fast, adapt, and keep moving when the path isn't obvious. It's the same mindset I bring to software: start from zero, ask the right questions, and build the next step.
            </p>

            <p>
              I discovered programming through a gifted book and kept going because it felt like cooking: you experiment, you adjust, and you make something real. That curiosity turned into a commitment to building products that are both functional and thoughtful.
            </p>

            <p>
              <span className="font-semibold text-(--text)">HEOP</span> opened the door to university when financial challenges could've kept me out it gave me a shot I wouldn't have had otherwise. <span className="font-semibold text-(--text)">CSTEP</span> then helped me shape my career goals in tech, connecting me with mentorship, research opportunities, and a community that believed in what I could build.
            </p>

            <p>
              Through <span className="font-semibold text-(--text)">TechWise</span>, I explored different fields in software and data engineering, gaining clarity on where my strengths and interests intersect. <span className="font-semibold text-(--text)">CodePath's Technical Interview Prep (Intermediate)</span> taught me how to collaborate with peers, adapt to new technical challenges, and build confidence in group settings skills that translate directly to real teams. And <span className="font-semibold text-(--text)">StreetWise Partners</span> refined my professional presence: I learned how to network authentically, optimize my LinkedIn, connect with mentors, and navigate the unspoken rules of the professional world.
            </p>

            <p>
              <span className="font-medium text-(--text)">What I bring:</span> resourcefulness, clear communication, and a builder's mindset. If there's a problem, I'll learn what I need and deliver a solution that's easy to use and easy to maintain.
            </p>

            <p>
              <span className="font-medium text-(--text)">What I'm improving:</span> deeper systems thinking (architecture and scalability) and storytelling around impact how the work changes outcomes, not just how it was built.
            </p>

            <p className="font-medium text-(--text)">
              If you're getting to know me for the first time, here's the short version: I'm curious, grounded, and committed to building things that help people.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <h2 className="text-2xl font-semibold mb-5">Programs & Communities</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 p-5 space-y-2">
              <h3 className="font-semibold text-(--text)">HEOP</h3>
              <p className="text-sm text-(--text-muted) leading-relaxed">
                Higher Education Opportunity Program opened the door to university despite financial barriers, making higher education accessible.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2">
              <h3 className="font-semibold text-(--text)">CSTEP</h3>
              <p className="text-sm text-(--text-muted) leading-relaxed">
                Collegiate Science & Technology Entry Program provided mentorship, research opportunities, and career guidance in tech.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2">
              <h3 className="font-semibold text-(--text)">TechWise</h3>
              <p className="text-sm text-(--text-muted) leading-relaxed">
                Explored software and data engineering fields, helping me understand where my skills and interests align.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2">
              <h3 className="font-semibold text-(--text)">CodePath</h3>
              <p className="text-sm text-(--text-muted) leading-relaxed">
                Technical Interview Prep (Intermediate) built collaboration skills, technical confidence, and real-world problem-solving experience.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 p-5 space-y-2">
              <h3 className="font-semibold text-(--text)">StreetWise Partners</h3>
              <p className="text-sm text-(--text-muted) leading-relaxed">
                Professional development through mentorship refined networking, LinkedIn presence, and how to navigate professional environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
