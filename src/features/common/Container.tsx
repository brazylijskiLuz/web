interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div
      className={`${className} rounded-md border-gray bg-white p-5`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
