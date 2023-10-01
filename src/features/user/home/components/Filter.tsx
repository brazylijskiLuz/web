interface FilterProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const Filter = ({ label, children, className }: FilterProps) => {
  return (
    <div className={`${className} flex flex-col`}>
      <p className="mb-1 font-light text-darkGray">{label}</p>
      <div className="flex">{children}</div>
    </div>
  );
};

export default Filter;
