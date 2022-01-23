import React from 'react';
import {FilterType} from '../../../core/models/utils/enums/filter-type';
import FilterColumn from '../../components/FilterColumn/FilterColumn';
import {FilterEnabledModel} from '../../../core/models/utils/filters/filterEnabled.model';
import {addFilter} from '../../../core/helpers/filters/filter-enabled.helper';
import {LanguageFilterModel} from '../../../core/models/language/language.model';

interface IPropsFiltersTranslations {
    filters?: LanguageFilterModel;
    filtersEnabled: FilterEnabledModel[];
    setFiltersEnabled: (filters: FilterEnabledModel[]) => void;
}

const FiltersLanguage = ({
                                filters,
                                filtersEnabled,
                                setFiltersEnabled,
                            }: IPropsFiltersTranslations) => {
    const styles = {
        display: 'flex',
        flexDirection: 'row',
        margin: '1em 0',

    } as React.CSSProperties;

    // we set the currentValue of each filter to  -1 because we start the list of value to 1
    // And in the api we start with the array $types or $states from 0 to 2, we just fix the index
    const changeValue = (key: string, value: any, type: FilterType) => {
        if (filters) {
            const newFilter: FilterEnabledModel[] = addFilter(
                key,
                value,
                type,
                filtersEnabled
            );
            setFiltersEnabled(newFilter);
        }
    };
    return (
        <div style={styles}>
            {filters && (
                <>
                    {<FilterColumn
                        changeValue={(key, value, type) =>
                            changeValue(key, value, type)
                        }
                        filters={filters.translation.code}
                        label={'code'}
                        name={'translation->>code'}
                        type={FilterType.Multiple}
                    />}
                    {<FilterColumn
                        changeValue={(key, value, type) =>
                            changeValue(key, value, type)
                        }
                        filters={filters.country.name}
                        label={'country'}
                        name={'country->>name'}
                        type={FilterType.Multiple}
                    />}
                </>
            )}
        </div>
    );
};

export default FiltersLanguage;
