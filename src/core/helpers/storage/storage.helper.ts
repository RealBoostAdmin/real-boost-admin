import {supabase} from '../../supabase/client';

export const deleteFiles = async (bucket: string, files: string[]): Promise<any> => {
    const {data: fileData, error: fileError} = await supabase
        .storage
        .from(bucket)
        .remove(files)

    return {fileData, fileError};
}
