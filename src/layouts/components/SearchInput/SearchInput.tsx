import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {Refresh} from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import './SearchInput.scss';

interface ISearchInputProps {
    onSearch: (value: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({onSearch}) => {
    const [value, setValue] = useState<string>('');

    return (
        <Stack className="search-block">
            <TextField
                label="Search"
                className="input-search"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onKeyUp={() => onSearch(value)}
            />
            <Refresh
                className="refresh"
                onClick={() => {
                    setValue('')
                    onSearch(null)
                }}
            />
        </Stack>
    )
}

export default SearchInput;
