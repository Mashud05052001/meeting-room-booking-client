import { teamMembers } from "@/constant/fixedData.constant";

const OurTeam = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold text-center text-common-600 mb-16">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="relative group">
            <img
              src={member.image}
              alt={member.name}
              className="w-full rounded-full object-cover shadow-lg transition-transform transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 rounded-full">
              <div className="text-center text-white">
                <h3 className="lg:text-xl font-semibold">{member.name}</h3>
                <p className="text-xs md:text-sm">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
