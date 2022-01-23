import React from 'react';
import {FilterType} from '../../../../core/models/utils/enums/filter-type';
import {FilterEnabledModel} from '../../../../core/models/utils/filters/filterEnabled.model';
import {addFilter} from '../../../../core/helpers/filters/filter-enabled.helper';
import TextField from '@mui/material/TextField';
import {UserFilterModel} from "../../../../core/models/user/user.model";

interface IPropsFiltersExtra {
    filters?: UserFilterModel;
    filtersEnabled: FilterEnabledModel[];
    setFiltersEnabled: (filters: FilterEnabledModel[]) => void;
}

const FiltersUser = ({
                         filtersEnabled,
                         setFiltersEnabled,
                     }: IPropsFiltersExtra) => {
    const styles = {
        display: 'flex',
        flexDirection: 'row',
        margin: '1em 0'
    } as React.CSSProperties;

    // we set the currentValue of each filter to  -1 because we start the list of value to 1
    // And in the api we start with the array $types or $states from 0 to 2, we just fix the index
    const changeValue = (key: string, value: any, type: FilterType) => {
        const newFilter: FilterEnabledModel[] = addFilter(
            key,
            value,
            type,
            filtersEnabled
        );
        setFiltersEnabled(newFilter);
    };
    return (
        <div style={styles}>
            <>
                <TextField
                    onChange={(e) => changeValue('email', e.currentTarget.value, FilterType.Unique)}
                    type="text"
                    label="email"
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    onChange={(e) => changeValue('username', e.currentTarget.value, FilterType.Unique)}
                    type="text"
                    label="username"
                    InputLabelProps={{shrink: true}}
                />
            </>
        </div>
    );
};

export default FiltersUser;
