import {supabase} from '../../supabase/client';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {GameFilterModel, GameModel, PatchGameModel, PostGameModel} from '../../models/game/game.model';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getGame: GameModel | any = async (name: string) => {

    let query = await supabase
        .from('games')
        .select('*')
        .match({name: name})
        .limit(1)
        .single()

    return query;
}

export const getGames: GameModel[] | any = async () => {
    const query = await supabase
        .from('games')
        .select('*')
        .order('name')

    return query;
}

export const getGamesFiltered: GameModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'created_at',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('games')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    query.order('name')

    return query;
}

export const getCountGames = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('games')
        .select('name', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });

    if (search) {
        query.or(`name.ilike.%${search}%`)
    }

    return query;
}

export const getFiltersGame = async () => {
    const {data: gameData, error} = await supabase
        .from('games')
        .select('name')

    const gamesName: FilterModel[] = [];

    gameData.forEach((item: any) => {
        gamesName.push({id: item.name, label: item.name})
    });

    const listValues: GameFilterModel = {
        name: gamesName,
    };

    return {listValues, error};
}

export const createGame: any = async ({name, image_url}: PostGameModel) => {
    const {data, error} = await supabase
        .from('games')
        .insert([{name, image_url}])
        .single();

    return {data, error};
}

export const updateGame: any = async (patchGameData: PatchGameModel, id: string) => {
    const {data, error} = await supabase
        .from('games')
        .update(patchGameData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteGame: any = async (id: string) => {
    const {data, error} = await supabase
        .from('games')
        .delete()
        .match({id: id})

    return {data, error};
}
