import React from "react";

export default function Page() {
  return (
    <section className="py-24 m-5 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-5 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold">About Me</h1>
          <div className="text-(--text-muted) text-lg leading-relaxed space-y-4">
            <p>
              Hey, my name is Anthony. I like building things, learning as I go, and figuring stuff out even when there’s no clear path.
            </p>
            <p>
              I came to the United States when I was 10 years old, and I didn’t know any English. Not a little, none at all. I had to learn it on my own while also helping my family adjust to a completely new country. We came to the U.S. with nothing, and there wasn’t anything waiting for us back home in the Dominican Republic either. From early on, I learned how to adapt, figure things out as I went, and keep moving forward even when things felt overwhelming.
            </p>
            
            <p>
              A lot of who I am today comes from that experience. I didn’t grow up with clear paths or instructions, so I learned to be resourceful. If I didn’t understand something, I taught myself. If there was a problem, I worked through it. That mindset followed me through school and into college.
            </p>
            
            <p>
              I’m currently a Computer Science student at Mercy University, pursuing both my bachelor’s and master’s degrees. I got into Mercy through the HEOP program, which opened the door for me despite financial challenges. That opportunity honestly changed everything. Through HEOP, and later being part of CSTEP, I gained access to resources, mentorship, programs, and experiences that I wouldn’t have had otherwise. Those programs didn’t just support me academically; they helped me see what was possible.
            </p>
            
            <p>
              Before I ever thought about computer science, I actually loved cooking. For a long time, I thought I might become a chef. I enjoy creating things with my hands, experimenting, and making something people can enjoy and in a weird way, that same feeling is what pulled me toward technology. Building software feels similar to cooking: you start with nothing, follow a process, mess up a few times, adjust, and eventually create something that works.
            </p>
            
            <p>
              My first exposure to programming didn’t come from a class. It came from a book I received as a gift. I didn’t fully understand everything in it at first, but I was curious, so I kept reading, trying things, and teaching myself. That curiosity turned into something serious over time. What started as “let me see how this works” became a passion for building, problem-solving, and understanding how systems fit together.
            </p>
            
            <p>
              As a person, I’m driven, self-taught, and grounded in my roots. I care deeply about growth, not just in skills, but as a human being. I like learning, building, and improving, and I’m not afraid to start from zero or ask questions along the way. Everything I do is shaped by the fact that I’ve had to earn every opportunity I’ve been given, and I don’t take any of them lightly.
            </p>
            
            <p className="font-medium text-(--text)">
              If you’re getting to know me for the first time, just know this: I’m someone who adapts, who keeps learning, and who never forgets where I came from.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
