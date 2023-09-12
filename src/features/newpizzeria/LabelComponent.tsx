const LabelComponent = ({ children, label }: any) => {
  return (
    <div className="flex pb-3 w-full items-center text-slate-900 border-slate-900">
      <p className="w-[40%]">{label}</p>
      <section className="w-[60%]">{children}</section>
    </div>
  );
};

export default LabelComponent;
