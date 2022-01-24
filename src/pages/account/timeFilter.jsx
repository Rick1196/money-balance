import React, { useState, useEffect, useMemo } from "react";
import { Box, InputLabel, Select, FormControl, MenuItem } from "@mui/material";
import { timeFilters, timeFiltersTypes } from "../../constants";
import { PropTypes } from "prop-types";
import { sub, endOfDay, startOfDay } from "date-fns";

const TimeFilter = ({ onFilterChange }) => {
  const [currentFilter, setCurrentFilter] = useState(timeFilters[0].value);
  const handleChange = (event) => {
    setCurrentFilter(event.target.value);
  };

  useEffect(() => {
    const calculatedFilter = calculateDate;
    console.log(currentFilter, calculatedFilter);
    onFilterChange(calculatedFilter);
  }),
    [currentFilter];

  const calculateDate = useMemo(() => {
    const today = endOfDay(new Date());
    switch (currentFilter) {
      case timeFiltersTypes.week:
        return startOfDay(sub(today, { weeks: 1 }));
      case timeFiltersTypes.month:
        return startOfDay(sub(today, { months: 1 }));
      case timeFiltersTypes.quarter:
        return startOfDay(sub(today, { months: 3 }));
      case timeFiltersTypes.year:
        return startOfDay(sub(today, { years: 1 }));
      case timeFiltersTypes.allTime:
        return new Date("0001/0001/1900");
    }
  }, [currentFilter]);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentFilter}
          label="Filter by"
          onChange={(event) => handleChange(event)}
        >
          {timeFilters.map((filter) => (
            <MenuItem key={filter.value} value={filter.value}>
              {filter.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

TimeFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
export default TimeFilter;
