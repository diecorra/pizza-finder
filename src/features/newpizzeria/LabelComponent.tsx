const LabelComponent = ({ children, label }: any) => {
  return (
    <div className="flex pb-3 w-full items-center text-slate-900 border-slate-900">
      <p className="w-[30%]">{label}</p>
      <section className="w-[70%]">{children}</section>
    </div>
  );
};

export default LabelComponent;
