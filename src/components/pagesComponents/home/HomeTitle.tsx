const HomeTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-fit mx-auto mb-8 pb-1.5 ">
      <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-br from-common-900  to-common-100 pb-3 rounded-xl shadow-lg">
        <span className="bg-white px-12 rounded-lg pb-1.5">{title}</span>
      </h1>
    </div>
  );
};

export default HomeTitle;
