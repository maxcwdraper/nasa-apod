import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type RoverProps = {
  date: Date;
  name: string;
  url: string;
  sol: number;
};

const Rover: React.FC = () => {
  const [rover, setRover] = useState<RoverProps>();

  useEffect(() => {
    const fetchRover = async () => {
      const url: string = "https://api.nasa.gov/mars-photos/api/v1/rovers";
      const params = new URLSearchParams({
        api_key: import.meta.env.VITE_NASA_API_KEY,
      });

      const response = await fetch(`${url}/${params}`);
      const result: RoverProps = await response.json();
      setRover(result);
    };
  });
  return (
    <div className="flex flex-col pb-[1%] pt-[1%] mb-[1%] mt-[1%] outline-[1%] outline-stone-400 rounded">
      <h1 className="text-4xl text-center mb-[2%]">Rover: {rover?.name}:</h1>
      <p className="grid text-white text-wrap text-center text-3xl">Martian Sol (Day(s) Rover has been on Mars): {rover?.sol}</p>
    </div>
  );
};

export default Rover;
