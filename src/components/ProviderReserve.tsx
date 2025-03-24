"use client";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import {Dayjs} from "dayjs"

export default function ProviderReserve({onProviderChange}
  :{onProviderChange:Function}) {
  const [provider, setProvider] = useState("TahtoNaju");

  return (
    <div
      className="bg-slate-100 rounded-lg space-x-5  space-y-2
        w-fit px-10 py-5 flex-row justify-center 
    "
    >

      <Select
        variant="standard"
        name="provider"
        id="provider"
        value={provider}
        onChange={(e) => {setProvider(e.target.value); onProviderChange(e.target.value)}}
        className="h-[2em] w-[200px]"
      >
        {/* must edit */}
        <MenuItem value="TahtoNaju">Tahto Naju</MenuItem>
                    <MenuItem value="WataruEndo">Wataru Endo</MenuItem>
                    <MenuItem value="MaxSiraphop">Max Siraphop</MenuItem>
      </Select>
    </div>
  );
}
