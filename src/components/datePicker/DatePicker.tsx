import { DatePicker } from '@mui/x-date-pickers'

interface IProps {
    setValue?: (date: string) => void,
    className?: string
    value: any
}

export default function IkcoDatePicker(props: IProps) {

    const handleOnChange = (e: Date | null) => {
        let op: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        props.setValue?.(e?.toString() ?? '');
    }

    return (
        <DatePicker onChange={(e) => handleOnChange(e)} className={props.className + 'p-0'}
            sx={{ "& .muirtl-1dune0f-MuiInputBase-input-MuiOutlinedInput-input": { padding: "10px" } }}
            value={new Date(props.value)}
        />
    )
}