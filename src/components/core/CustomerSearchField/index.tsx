import React, { useState, useEffect } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { ICustomer } from "@/store/app/types";
import { getRequest } from "@/services/utils";
import { StyledTextField } from "./index.styles";

const CustomerSearchField = ({
  setFieldValue,
  isEdit,
  value,
  ...props
}: TextFieldProps & {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  isEdit: boolean;
  value: ICustomer | null;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ICustomer | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchPhoneNumbers(debouncedSearchTerm).then((results) => {
        setLoading(false);
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
      setFieldValue("customer_detail.phone", searchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSelectPhoneNumber = (
    event: React.MouseEvent<HTMLElement>,
    value: ICustomer | null
  ) => {
    if (value) {
      setSelectedValue(value);
      setSearchTerm(value.phone);
      setFieldValue("customer_detail.phone", value.phone);
      setFieldValue("customer_detail.name", value.name);
      setFieldValue("customer_detail.email", value.email);
      setFieldValue("customer_detail.street_address", value.street_address);
      setFieldValue("customer_detail.id", value.id);
    } else {
      setSearchTerm(searchTerm);
    }
  };

  useEffect(() => {
    if (isEdit === true) {
      setSelectedValue(value);
      setFieldValue("customer_detail.phone", value?.phone);
    }
  }, [isEdit]);

  return (
    <Autocomplete
      id="search-phone-number"
      options={searchResults}
      getOptionLabel={(option: ICustomer) => option.phone}
      loading={loading}
      onChange={() => handleSelectPhoneNumber}
      value={selectedValue}
      renderInput={(params) => (
        <StyledTextField

          {...params}
          id="search-phone-number"
          name="customer_detail.phone_number"
          variant="outlined"
          type="number"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          InputProps={{
            ...params.InputProps,
            value: searchTerm,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            placeholder: "Enter Client Number",
          }}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.phone}
          onClick={(event) => handleSelectPhoneNumber(event, option)}
        >
          {searchResults && searchResults[0]?.previous_customer === false
            ? `${option.phone}  (Add New) `
            : option.phone}
        </li>
      )}
    />
  );
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

async function searchPhoneNumbers(searchTerm: string): Promise<ICustomer[]> {
  const response = await getRequest(`/bookings/get-customer/${searchTerm}`);

  const data = await response.data;

  if (data.length === 0) {
    return [{ phone: searchTerm, previous_customer: false } as ICustomer];
  }

  return data;
  // const mockPhoneNumbers = [
  //   {
  //     id: 1,
  //     phone: "123-456-7890",
  //     name: "abc",
  //     email: "abc@gmail.com",
  //     street_address: "123 House A",
  //   },
  //   {
  //     id: 2,
  //     phone: "555-123-4567",
  //     name: "abc1",
  //     email: "abc1@gmail.com",
  //     street_address: "456 House B",
  //   },
  //   {
  //     id: 3,
  //     phone: "888-555-1234",
  //     name: "abc2",
  //     email: "abc2@gmail.com",
  //     street_address: "789 House C",
  //   },
  //   {
  //     id: 4,
  //     phone: "555-555-5555",
  //     name: "abc3",
  //     email: "abc3@gmail.com",
  //     street_address: "101112 House D",
  //   },
  // // ];
  // const filteredPhoneNumbers = data.filter(
  //   (phoneNu) =>
  //     phoneNu.phone.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  // );
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // return filteredPhoneNumbers;
}

export default CustomerSearchField;
