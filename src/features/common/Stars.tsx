import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size,
}) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const starColor = i <= rating ? "#EDDE57" : "#78797E";

    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width={size || 17}
        height={size || 16}
        viewBox="0 0 17 16"
        fill="none"
        className={`text-black`}
      >
        <path
          d="M8.97553 1.08156L10.1574 4.71885C10.3582 5.33688 10.9341 5.75532 11.5839 5.75532H15.4084C15.8928 5.75532 16.0942 6.37513 15.7023 6.65983L12.6082 8.9078C12.0825 9.28976 11.8625 9.96681 12.0633 10.5848L13.2452 14.2221C13.3948 14.6828 12.8676 15.0659 12.4757 14.7812L9.38168 12.5332C8.85595 12.1512 8.14405 12.1512 7.61832 12.5332L4.52426 14.7812C4.1324 15.0659 3.60516 14.6828 3.75484 14.2221L4.93667 10.5848C5.13748 9.96681 4.91749 9.28976 4.39176 8.90780L1.29770 6.65983C0.905841 6.37513 1.10723 5.75532 1.59159 5.75532H5.41606C6.0659 5.75532 6.64183 5.33688 6.84265 4.71885L8.02447 1.08156C8.17415 0.620903 8.82585 0.620906 8.97553 1.08156Z"
          fill={starColor}
          stroke={starColor}
          fillOpacity="0.1"
        />
      </svg>,
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
};

export default StarRating;
