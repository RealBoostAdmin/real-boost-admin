import React, {useEffect, useState} from 'react'
import {supabase} from '../../../../core/supabase/client';
import {Avatar} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

interface IFileUpload {
    url: string;
    size: number;
    onUpload?: (file: any) => void;
    storageName: string;
    oldFiles?: string[];
    setOldFiles?: (files: string[]) => void;
}

const ImageUpload: React.FC<IFileUpload> = ({
                                                url,
                                                size,
                                                onUpload,
                                                storageName,
                                                oldFiles,
                                                setOldFiles
                                            }) => {
    const [imageUrl, setImageUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const downloadImage = async (path: any) => {
            try {
                const {data, error} = await supabase.storage.from(storageName).download(path)
                if (error) console.log(error);
                const url = URL.createObjectURL(data)
                setImageUrl(url)
            } catch (error: any) {
                console.log('Error downloading image: ', error.message)
            }
        }
        if (url) downloadImage(url)
    }, [url])

    async function uploadAvatar(event: any) {
        try {
            setUploading(true);
            setOldFiles([...oldFiles, url]) // STORE PREVIOUS FILES IN STATE

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let {error: uploadError} = await supabase.storage
                .from(storageName)
                .update(filePath, file)

            if (uploadError) throw uploadError
            onUpload(filePath)
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Box>
            {imageUrl ? (
                <Avatar
                    variant={'rounded'}
                    alt="The image"
                    src={imageUrl}
                    sx={{
                        width: size,
                        height: size,
                        margin: '0 auto'
                    }}
                />
            ) : (
                <div className="avatar no-image" style={{height: size, width: size}}/>
            )}
            {onUpload &&
            <div style={{width: size}}>
                <Button color="primary" variant="contained">
                    <label htmlFor="single">
                        {!uploading && <Stack sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            flexDirection: 'row'
                        }}><AddIcon/> Upload</Stack>}
                        {uploading && <>Uploading</>}
                    </label>
                    <input
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                        }}
                        type="file"
                        id="single"
                        accept="image/*,application/pdf"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                </Button>
            </div>
            }
        </Box>
    )
}

export default ImageUpload;
