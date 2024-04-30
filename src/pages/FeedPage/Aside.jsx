const Aside = (tweets) => {
  return (
    <div className="p-4 max-lg:hidden">
      {" "}
      Toplam Tweet Saysı: {tweets?.tweets?.length}
    </div>
  );
};

export default Aside;
