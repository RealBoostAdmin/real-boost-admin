import {FilterType} from '../../models/utils/enums/filter-type';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';

export const handleFiltersChange = (
    filters: FilterEnabledModel[],
    setFiltersEnabled: (filters: FilterEnabledModel[]) => void,
    setCurrentPage: (page: number) => void
): void => {
    setFiltersEnabled(filters);
    setCurrentPage(1);
}

export const addFilter = (key: string, value: any, type: FilterType, filtersEnabled: FilterEnabledModel[]) => {
    if (type === FilterType.Unique) {
        return addUniqueFilter(key, value, type, filtersEnabled);
    } else if (type === FilterType.Multiple) {
        return addMultipleValuesFilter(key, value, type, filtersEnabled);
    }
}

// TO DO
const addUniqueFilter = (key: string, value: string, type: FilterType, filtersEnabled: FilterEnabledModel[]) => {
    const index = filtersEnabled.findIndex(
        (item: FilterEnabledModel) =>
            item.key === key && item.type === type
    );

    let newList = [...filtersEnabled];
    if (index !== -1) {
        if (value === '') {
            newList.splice(index, 1);
        } else {
            newList[index].value = value;
        }
    } else {
        newList.push({key, value, type});
    }

    return newList;
};

const addMultipleValuesFilter = (key: string, values: any, type: FilterType, filtersEnabled: FilterEnabledModel[]): FilterEnabledModel[] => {
    const newFiltersEnabled = [...filtersEnabled];
    if (newFiltersEnabled && newFiltersEnabled.length > 0) {
        // If newFiltersEnabled: FilterEnabledModel[] is not empty then we add an item FilterEnabledModel inside if his key doesn't exist
        // Otherwise if the key exist of the item we only update the array of values[] of the item
        const findFiltersEnabled = newFiltersEnabled.find(item => item.key === key);
        findFiltersEnabled
            ? findFiltersEnabled.value = values
            : newFiltersEnabled.push({key, value: values, type});
    } else newFiltersEnabled.push({key, value: values, type});

    // Delete item FilterEnabledModel of the array FilterEnabledModel[] if the values of the item are empty
    newFiltersEnabled.filter((item: FilterEnabledModel) => item.value);
    return (!values || values.length === 0) ? [] : newFiltersEnabled;
};
