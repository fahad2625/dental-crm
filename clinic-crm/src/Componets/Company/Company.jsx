export default function Company() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">

      {/* HERO */}
      <section className="px-6 py-24 text-center max-w-5xl mx-auto">
        <p className="text-emerald-400 text-sm uppercase tracking-widest mb-4">
          Healthcare SaaS · India
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Clinic Automation & <br />
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Healthcare SaaS
          </span>{" "}
          Solutions
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Mikexa builds intelligent software platforms for clinics — from
          patient management and appointment booking to WhatsApp automation and
          admin dashboards.
        </p>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">
            About Mikexa
          </p>

          <h2 className="text-3xl font-semibold mb-4">
            Powering Clinics with Smart Software
          </h2>

          <p className="text-gray-400 mb-4">
            Mikexa is a software service provider building scalable web
            applications and automation platforms for clinics and healthcare
            businesses.
          </p>

          <p className="text-gray-400">
            We specialize in patient management systems, appointment scheduling,
            and WhatsApp automation solutions that help clinics improve
            operations and patient experience.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <p className="text-emerald-400 text-xs uppercase mb-4">
            Founder & Developer
          </p>

          <h3 className="text-xl font-bold">Fahad Basheer</h3>
          <p className="text-emerald-400 text-sm mb-3">Founder & CEO, Mikexa</p>

          <p className="text-gray-400 mb-4">
            Full-stack developer focused on building scalable SaaS solutions for
            healthcare businesses and automation platforms.
          </p>

          <div className="inline-block bg-blue-500/10 text-blue-400 px-3 py-1 rounded text-sm">
            Developer ID: HX Cero
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">
          What We Build
        </p>

        <h2 className="text-3xl font-semibold mb-10">
          Healthcare Software Solutions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Clinic Management Systems",
            "Patient Management Software",
            "Appointment Booking Platforms",
            "WhatsApp Automation Integration",
            "Admin Dashboard Development",
            "Custom Web Application Development",
          ].map((service) => (
            <div
              key={service}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-400 transition"
            >
              <h3 className="font-semibold mb-2">{service}</h3>
              <p className="text-gray-400 text-sm">
                Scalable cloud-based solutions designed for modern clinic
                operations.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM */}
      <section className="px-6 py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">
            Our Platform
          </p>

          <h2 className="text-3xl font-semibold mb-6">
            One Platform. Complete Clinic Automation.
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>✓ Unified patient database and secure records</li>
            <li>✓ Appointment scheduling and reminders</li>
            <li>✓ Automated WhatsApp notifications</li>
            <li>✓ Role-based admin dashboards</li>
            <li>✓ Real-time analytics and reports</li>
            <li>✓ Cloud-based multi-device support</li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center">
        <p className="text-emerald-400 text-xs uppercase mb-2">Contact</p>

        <h2 className="text-3xl font-semibold mb-8">
          Start Your Clinic's Digital Journey
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-left max-w-xl mx-auto">
          <p className="mb-2"><strong>Business:</strong> Mikexa Software Services</p>
          <p className="mb-2"><strong>Founder:</strong> Fahad Basheer</p>
          <p className="mb-2"><strong>Developer Identity:</strong> HX Cero</p>
          <p className="text-gray-400">
            Chettiyatt Parambil House, Kalathodu, Ollukara PO, Thrissur,
            Kerala — 680655, India
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 text-center text-gray-400">
        © {new Date().getFullYear()} Mikexa Software Services · Founded by Fahad Basheer
      </footer>
    </div>
  );
}