import {FilterModel} from '../utils/filters/filter.model';
import {UserModel} from '../user/user.model';
import {MissionModel} from '../mission/mission.model';

export interface PostBillModel {
    pdf_url: string
    code: string
    user_id: string;
    mission_id: string;
}

export interface PatchBillModel {
    user_id: string;
    pdf_url?: string
}

export interface BillModel {
    id: string;
    code: string;
    pdf_url: string;
    user: UserModel;
    mission: MissionModel;
    created_at: Date;
    updated_at: Date;
}

export interface BillFilterModel {
    user: FilterModel[];
}
