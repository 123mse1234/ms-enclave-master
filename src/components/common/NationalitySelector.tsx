"use client";

import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";

interface Props {
  value: string; // stores label (example: "India", "France")
  onChange: (value: string) => void;
}

export default function NationalitySelector({ value, onChange }: Props) {
  const countries = useMemo(() => {
    return countryList().getData();
  }, []);

  // ⭐ Default = India
  const defaultCountry = countries.find(
    (country: any) => country.label === "India"
  );

  // ⭐ If value exists → pick it; else → India
  const selected = value
    ? countries.find((c: any) => c.label === value) || null
    : defaultCountry;

  // ⭐ Custom option UI (flag + label)
  const formatOptionLabel = (country: any) => (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={country.value}
        svg
        style={{ width: "1.4em", height: "1.4em" }}
      />
      <span>{country.label}</span>
    </div>
  );

  return (
    <Select
      options={countries}
      value={selected}
      formatOptionLabel={formatOptionLabel}
      placeholder="Select Nationality"
      onChange={(val) => onChange(val?.label || "")} // ⭐ Return label
      className="text-gray-900"
    />
  );
}
