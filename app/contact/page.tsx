import React from "react";

export default function Page() {
    return (
            <section className="py-24 m-5 min-h-[80vh]">
            <div className="max-w-5xl mx-auto px-5 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl sm:text-5xl font-bold">Contact</h1>
                    <p className="text-(--text-muted) text-lg">
                        Want to collaborate or chat about a project? I'm always open to
                        opportunities and meaningful conversations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3 p-6 rounded-2xl bg-(--bg) border border-(--border-muted)">
                        <h2 className="text-xl font-semibold text-(--highlight)">Email</h2>
                        <p className="text-(--text-muted)">Let's connect directly.</p>
                        <a
                            className="text-(--text) hover:text-(--primary) transition-colors"
                            href="mailto:clanthony.j@gmail.com"
                        >
                            clanthony.j@gmail.com
                        </a>
                    </div>

                    <div className="flex flex-col gap-3 p-6 rounded-2xl bg-(--bg) border border-(--border-muted)">
                        <h2 className="text-xl font-semibold text-(--highlight)">Social</h2>
                        <p className="text-(--text-muted)">Find me around the web.</p>
                        <div className="flex gap-4">
                            <a
                                className="text-(--text) hover:text-(--primary) transition-colors"
                                href="https://github.com/DrThaUnknown"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            <a
                                className="text-(--text) hover:text-(--primary) transition-colors"
                                href="https://www.linkedin.com/in/contreras-linarez-anthony/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Availability</h2>
                    <p className="text-(--text-muted)">
                        Open to internships, freelance work, and full-time opportunities.
                    </p>
                </div>
            </div>
        </section>
    );
}
