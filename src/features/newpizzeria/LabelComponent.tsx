const LabelComponent = ({ children, label }: any) => {
  return (
    <div className="flex justify-around pb-2 w-full items-center text-slate-900 ">
      <p className="w-[30%]">{label}</p>
      <section className="w-[70%]">{children}</section>
    </div>
  );
};

export default LabelComponent;
