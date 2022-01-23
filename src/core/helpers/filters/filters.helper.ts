import {FilterEnabledModel} from "../../models/utils/filters/filterEnabled.model";
import {FilterType} from "../../models/utils/enums/filter-type";

export const filtersHelper = (filterEnabled: FilterEnabledModel, query: any) => {
    return filterEnabled.type === FilterType.Multiple
        ? query.in(filterEnabled.key, [filterEnabled.value.map((val: any) => val.value)])
        : query.ilike(filterEnabled.key, `%${filterEnabled.value}%`);
}
