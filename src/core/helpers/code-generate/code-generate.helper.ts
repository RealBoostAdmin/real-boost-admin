import {getLastBillOfMission} from '../../service/bill/bill.service';
import {getLastMission} from '../../service/mission/mission.service';
import {getLastOrder} from '../../service/order/order.service';

export const billCodeGenerateHelper = async (missionId: string): Promise<string> => {
    const {data} = await getLastBillOfMission(missionId);
    return generateCodeHelper('B', !!data && data.length !== 0 ? data[0] : null);
}

export const missionCodeGenerateHelper = async (): Promise<string> => {
    const {data} = await getLastMission();
    return generateCodeHelper('M', !!data && data.length !== 0 ? data[0] : null);
}

export const orderCodeGenerateHelper = async (): Promise<string> => {
    const {data} = await getLastOrder();
    return generateCodeHelper('O', !!data && data.length !== 0 ? data[0] : null);
}

const generateCodeHelper = (letter: string, data?: any): string => {
    if (data) {
        const codeNumber = data[0].code.match(/\d+/);
        const newCodeNumber = Number(codeNumber[0]) + 1;
        return `${letter}-${newCodeNumber}`;
    } else {
        return `${letter}-1`;
    }
}
