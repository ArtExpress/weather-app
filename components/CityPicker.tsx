"use client"

import Select from "react-select"
import { Country, City } from "country-state-city"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobeAltIcon } from "@heroicons/react/24/solid"

type option = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    };
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        stateCode: string;
    };
    label: string;
} | null;

const options = Country.getAllCountries().map(country => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}))

function CityPicker() {
    const [selectedCountry, setSelectedCountry] = useState<option>(null)
    const [selectedCity, setSelectedCity] = useState<cityOption>(null)
    const router = useRouter()

    const handleSelectedCountry = (option: option) => {
        setSelectedCountry(option);
        setSelectedCity(null);
    }

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }

  return (
    <div className="space-y-4">
        <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white/80">
                <GlobeAltIcon className="h-5 w-5 text-white" />
                <label htmlFor="country">Country</label>
            </div>
            <Select 
                className="text-black"
                options={options} 
                value={selectedCountry}
                onChange={handleSelectedCountry}
            />
        </div>

        {selectedCountry && (
            <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white/80">
                    <GlobeAltIcon className="h-5 w-5 text-white" />
                    <label htmlFor="city">City</label>
                </div>
                <Select 
                    className="text-black"
                    options={
                        City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(state => ({
                            value: {
                                latitude: state.latitude!,
                                longitude: state.longitude!,
                                countryCode: state.countryCode,
                                name: state.name,
                                stateCode: state.stateCode,
                            },
                            label: state.name,
                        }))
                    } 
                    value={selectedCity}
                    onChange={handleSelectedCity}
                />
            </div>
        )}
    </div>
  )
}

export default CityPicker