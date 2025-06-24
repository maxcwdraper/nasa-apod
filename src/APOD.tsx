import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

type APODProps = {
  date: Date;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
};

type FormInputs = {
  date: Date;
};

const APOD: React.FC = () => {
  const [apod, setApod] = useState<APODProps>();
  const [date, setDate] = useState<Date>(new Date());
  const { control } = useForm<FormInputs>();

  useEffect(() => {
    const fetchApod = async () => {
      const url: string = "https://api.nasa.gov/planetary/apod";
      let year: string = date.getFullYear().toString();
      let month: string = date.getMonth().toString();
      if (month.length < 2) {
        month = "0" + month;
      }
      let day: string = date.getDate().toString();
      const params = new URLSearchParams({
        api_key: import.meta.env.VITE_NASA_API_KEY,
        date: year + "-" + month + "-" + day,
      });

      const response = await fetch(`${url}?${params}`);
      const result: APODProps = await response.json();
      setApod(result);
    };

    fetchApod();
  }, [date]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col text-center bg-black outline-[1%] outline-blue-400 rounded p-[1%] max-w-[40%] w-auto mt-[2%] md:absolute md:right-[2%] md:top-[2%]">
        <p>Choose a Date:</p>
        <div className="outline-[1%] outline-blue-500 rounded bg-gray-700 text-gray-200">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setDate(date || new Date());
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col w-[70%] md:justify-center md:items-center pb-[1%] pt-[1%] mb-[1%] mt-[1%] outline-[1%] rounded">
        <h1 className="p-[1%] mb-[2%] text-center text-xl lg:text-4xl">Astronomy Picture of the Day</h1>
        <p className="flex mb-[2%] justify-center text-white text-wrap text-center text-l lg:text-3xl">
          Title:
          <br />
          {apod?.title}
        </p>
        <p className="flex text-white text-wrap text-center text-md lg:text-xl p-[1%]">
          (What is this picture?):
          <br />
          {apod?.explanation}
        </p>
      </div>
      <div className="flex bg-slate-700 justify-center items-center m-[2%] p-[2%] rounded">
        {apod ? (
          <img className="w-auto h-auto justify-center items-center text-white" src={apod.url} alt="Astronomy Picture of the Day" />
        ) : (
          <ClipLoader color={"blue"} size={150} aria-label="Loading Spinner" data-testid="loader" />
        )}
      </div>
    </div>
  );
};

export default APOD;
