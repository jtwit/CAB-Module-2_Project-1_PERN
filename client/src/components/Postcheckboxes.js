import React from 'react'
import { Checkbox, CheckboxGroup, Stack, Box } from '@chakra-ui/react'


function Postcheckboxes() {
    const [checkedItems, setCheckedItems] = React.useState([false, false])
    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    return (
        <Box m="10px" className="" borderRadius="5px" color='black' display="flex-columns" alignItems="center" justifyContent="center">
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
            >
                Browse All Posts
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                    isChecked={checkedItems[0]}
                    onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                >
                    Road Works
                </Checkbox>
                <Checkbox
                    isChecked={checkedItems[1]}
                    onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                >
                    Events
                </Checkbox>
            </Stack>
        </Box>
    )
}

export default Postcheckboxes