import * as React from 'react';
import { useState } from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Button } from '@mui/material';
//import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'

export default function Calendar() {

    const [open, setOpen] = useState(false)

    return (
        <Card>
            <CardContent>
                <Button onClick={() => setOpen(!open)}>
                    Select Dates
                </Button>
                {/* <MultipleDatesPicker
                    open={open}
                    selectedDates={[]}
                    onCancel={() => setOpen(false)}
                    onSubmit={dates => console.log('selected dates', dates)}
                /> */}
            </CardContent>
        </Card>
    );
}
