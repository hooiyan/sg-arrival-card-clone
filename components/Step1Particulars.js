import { Flex, Group, Select, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import fetcher from '../lib/fetcher';

export default function Step1Particulars() {
  const COUNTRY_API = 'https://restcountries.com/v3.1/all';
  const [country, setCountry] = useState([]);
  const [countryName, setCountryName] = useState([]);

  const { data, error } = useSWR(COUNTRY_API, fetcher);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: 'Hoe Hooi Yan',
      passportNo: 'A1234567890',
      dob: '',
      nationality: 'Malaysia',
    },
  });

  useEffect(() => {
    axios.get(COUNTRY_API).then((res) => setCountry(res.data));
  }, []);

  useEffect(() => {
    const data = country.map((c) => c.name.common);
    setCountryName(data);
  }, [country]);

  return (
    <>
      <>
        <Text fz="xs">Estimated completion time: 5 to 7 mins</Text>
        <Text fz="xs">
          Mandatory fields are indicated by a red asterisk{' '}
          <Text span color="red.8">
            *
          </Text>
        </Text>
      </>
      <Flex direction="column" mt={4} mb={4} w="100%">
        <Text fz="lg" fw={700} c="blue.9">
          Personal Information
        </Text>
        <Flex component="form" direction="column">
          <TextInput label="Full Name (In Passport)" withAsterisk />
          <Group grow>
            <TextInput label="Passport Number" withAsterisk />
            <DatePicker
              placeholder="dd/mm/yyyy"
              label="Date of Birth"
              withAsterisk
              maxDate={dayjs().toDate()}
            />
          </Group>
        </Flex>
        <Group grow>
          <Select
            label="Nationality/Citizenship"
            placeholder="Please Select Option"
            searchable
            nothingFound="No options"
            data={countryName}
            w="50%"
          />
          <input type="hidden" />
        </Group>
      </Flex>
    </>
  );
}
