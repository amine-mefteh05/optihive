type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="group flex justify-between gap-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/40 transition-colors duration-200 ">
        {label}
      </span>
      <span className="text-sm text-foreground/90 font-medium">{value}</span>
    </div>
  );
}

export default Field;
