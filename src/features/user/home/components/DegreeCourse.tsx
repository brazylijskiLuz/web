interface DegreeCourseParams {
  name: string;
}

const DegreeCourse = ({ name }: DegreeCourseParams) => {
  return (
    <p className=" mr-2 rounded-sm bg-light px-2 py-1 font-light text-darkGray">
      {name}
    </p>
  );
};

export default DegreeCourse;
