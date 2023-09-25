import { getAppDataSelector } from "@/store/app";
import { CircularProgress, MenuItem, SelectChangeEvent } from "@mui/material";
import { StyledFormControl, StyledSelect } from "./index.styles";
import { COLORS } from "@/constants/colors";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  IBookingDurationService,
  IBookingService,
  IProduct_detail,
} from "@/store/app/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function DurationDropDown({
  setFieldValue,
  index,
  serviceID,
  duration,
  onSelect,
  nextIndex,
  endTime,
  discount,
  selectedBooking,
  ...props
}: any) {
  const { allServices, allServicesPending } = useSelector(getAppDataSelector);
  const { service_detail, services_fee, products_fee, product_detail } = props;

  const [selectedOption, setSelectedOption] = useState<any>();
  const [selectedDuration, setSelectedDuration] = useState<number>();

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedDuration(event.target.value as number);
    setFieldValue(
      `service_detail.${index}.selected_duration`,
      event.target.value
    );
    selectedOption?.filter((data: IBookingDurationService) => {
      if (data.duration === event.target.value) {
        setFieldValue(`service_detail.${index}.selected_price`, data.price);
      }
    });
  };

  useEffect(() => {
    let TotalServicesAmount = 0;
    service_detail?.forEach((servi: IBookingService) => {
      TotalServicesAmount =
        TotalServicesAmount +
        (isNaN(servi.selected_price) ? 0 : Number(servi.selected_price));
    });

    if (service_detail.length === 0) {
      TotalServicesAmount = 0;
    }

    let TotalproductsAmount = 0;
    product_detail?.forEach((produ: IProduct_detail) => {
      TotalproductsAmount =
        TotalproductsAmount +
        (isNaN(produ.product_price) ? 0 : Number(produ.product_price));
    });

    if (TotalServicesAmount === Number(selectedBooking.actual_services_fee)) {
      setFieldValue(`services_fee`, Number(selectedBooking.services_fee));
    } else {
      setFieldValue(`services_fee`, TotalServicesAmount);
    }


    if (TotalproductsAmount === Number(selectedBooking.actual_products_fee)) {
      setFieldValue(`products_fee`, Number(selectedBooking.products_fee));
    } else {
      setFieldValue(`products_fee`, TotalproductsAmount);
    }
    setFieldValue(`actual_services_fee`, TotalServicesAmount);
    setFieldValue(`actual_products_fee`, TotalproductsAmount);
  }, [duration, product_detail, service_detail, selectedBooking.id]);

  useEffect(() => {
    const total = Number(products_fee) + Number(services_fee);
    if (discount && discount !== 0) {
      const discountPrice = (discount / 100) * total;
      setFieldValue(`total_fee`, total - discountPrice);
    } else {
      setFieldValue(`total_fee`, total);
    }
  }, [products_fee, services_fee, discount]);

  useEffect(() => {
    const selectedOptions = allServices.find(
      (service) => service.id === serviceID
    );
    setSelectedOption(selectedOptions?.service_duration_price);

    selectedOption?.filter((data: IBookingDurationService) => {
      if (data.duration === duration) {
        setFieldValue(`service_detail.${index}.selected_price`, data.price);
      }
    });
  }, [serviceID]);

  useEffect(() => {
    selectedOption?.filter((data: IBookingDurationService) => {
      if (data.duration === duration) {
        setFieldValue(`service_detail.${index}.selected_price`, data.price);
      }
    });
  }, [duration]);

  return (
    <StyledFormControl fullWidth {...props}>
      <StyledSelect
        MenuProps={MenuProps}
        placeholder={"Duration"}
        defaultValue={[]}
        onSelect={onSelect}
        onChange={handleSelectChange}
        value={selectedDuration}
        {...props}
      >
        {allServicesPending ? (
          <CircularProgress style={{ color: COLORS.THEME_COLOR }} />
        ) : (
          selectedOption?.map(
            (duration_price: IBookingDurationService, index: any) => {
              return (
                <MenuItem key={index} value={duration_price.duration}>
                  {duration_price.duration}
                </MenuItem>
              );
            }
          )
        )}
      </StyledSelect>
    </StyledFormControl>
  );
}
