import React, {useState} from 'react';
import {MultiSelect} from 'react-multi-select-component';
import {FilterModel} from '../../../core/models/utils/filters/filter.model';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import './FilterColumn.scss';

export enum FilterType {
    Unique,
    Multiple,
}

interface IFilterColumn {
    label?: string;
    filters: Array<FilterModel>;
    name: string;
    type: FilterType;
    changeValue: (name: string, value: any, type: FilterType) => void;
}

const FilterColumn = (props: IFilterColumn) => {
    const setValueSelect = (value: any) => {
        props.changeValue(props.name, value, props.type);
    };

    return (
        <div className="filter">
            {props.type === FilterType.Multiple ? (
                <FilterMultiple {...props} updateSearch={setValueSelect}/>
            ) : (
                <></>
            )}
            {props.type === FilterType.Unique ? (
                <FilterSimple {...props} setValue={setValueSelect}/>
            ) : (
                <></>
            )}
        </div>
    );
};

interface IFilterSimple {
    label?: string;
    filters: Array<FilterModel>;
    name: string;
    type: FilterType;
    setValue: (option: any) => void;
}

const FilterSimple = (props: IFilterSimple) => {
    const [selected, setSelected] = useState([]);

    const updateSelect = (value: any) => {
        setSelected(value);
        props.setValue(value);
    };

    return (
        <>
            <FormControl /*className={classes.formControl}*/>
                <InputLabel id="filter-unique-label">{props.label}</InputLabel>
                <Select
                    name="filter_id"
                    labelId="filter-unique-label"
                    id="filter-unique-select"
                    value={selected}
                    onChange={(e) =>
                        updateSelect(
                            e.target.value === '-1' ? null : e.target.value
                        )
                    }
                >
                    <MenuItem aria-label="None" value="">
                        Aucun
                    </MenuItem>
                    {props.filters.map((filter: FilterModel, index: number) => {
                        return (
                            <MenuItem
                                key={`form_filter_${props.name}_${index}`}
                                value={filter.id ? filter.id : filter.label}
                            >
                                {filter.label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};

interface IFilterMultiple {
    label?: string;
    filters: Array<FilterModel>;
    name: string;
    type: FilterType;
    updateSearch: (option: any) => void;
}

const FilterMultiple = (props: IFilterMultiple) => {
    const [selected, setSelected] = useState([]);

    const setValuesMultiSelect = (values: any) => {
        // If values.length === number of possibilities in filters then no need to filters because you choose all datas
        setSelected(values);
        props.updateSearch(
            values.length === props.filters.length ? [] : values
        );
    };

    const options = props.filters.map((filter: FilterModel) => {
        return {
            label: filter.label,
            value: filter.id ? filter.id : filter.label,
        };
    });

    return (
        <MultiSelect
            options={options}
            value={selected}
            onChange={setValuesMultiSelect}
            labelledBy={'Select'}
            className="multi-select"
            overrideStrings={{
                selectSomeItems: props.label
                    ? props.label
                    : 'select items',
                allItemsAreSelected: 'All selected',
                selectAll: 'All',
                search: 'Search',
            }}
        />
    );
};

export default FilterColumn;
